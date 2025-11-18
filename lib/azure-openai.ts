import { AzureOpenAI } from 'openai';

let azureClient: AzureOpenAI | null = null;

export function getAzureOpenAIClient() {
  if (!azureClient) {
    azureClient = new AzureOpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      endpoint: process.env.AZURE_OPENAI_ENDPOINT,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview',
    });
  }
  return azureClient;
}

export async function analyzeTicket(title: string, description: string, application: string) {
  const client = getAzureOpenAIClient();
  
  const systemPrompt = `Eres un ingeniero de soporte técnico nivel 1 experto en:
- SharePoint Online (configuración, permisos, bibliotecas, listas, flujos de trabajo)
- Facturador (aplicación .NET con base de datos SQL para facturación)

Tu trabajo es:
1. Analizar el problema reportado
2. Determinar la prioridad (Urgente, Media, Normal)
3. Intentar resolver el problema si está en tu alcance (nivel 1)
4. Si puedes resolverlo, proporciona una solución clara y cierra el ticket
5. Si no puedes resolverlo, escala a nivel 2 explicando por qué

Responde en formato JSON:
{
  "priority": "Urgente" | "Media" | "Normal",
  "can_resolve": boolean,
  "support_level": 1 | 2,
  "resolution": "solución detallada si can_resolve es true, o null",
  "escalation_reason": "razón de escalamiento si can_resolve es false, o null",
  "analysis": "análisis del problema"
}`;

  try {
    const response = await client.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-5-chat-formacion',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Aplicación: ${application}\nTítulo: ${title}\nDescripción: ${description}` 
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    console.log('[v0] AI Analysis completed:', result);
    return result;
  } catch (error) {
    console.error('[v0] Azure OpenAI error:', error);
    // Fallback response if AI fails
    return {
      priority: 'Media',
      can_resolve: false,
      support_level: 2,
      resolution: null,
      escalation_reason: 'Error en el análisis de IA. Requiere revisión manual.',
      analysis: 'El sistema no pudo analizar automáticamente este ticket.',
    };
  }
}
