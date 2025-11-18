# DoctuxDB Support System

Sistema de soporte técnico con IA integrada para gestión de incidencias de SharePoint Online y aplicación Facturador.

## Características

- **Autenticación por roles**: Administrador, Analista e Ingeniero de Soporte
- **Agente de IA GPT-5**: Análisis automático y resolución de tickets nivel 1
- **Bandeja de tickets interactiva**: Filtros, ordenamiento y semáforos de prioridad
- **Reportes empresariales**: Análisis por área y aplicación
- **Base de datos PostgreSQL**: Azure PaaS con doctux-db

## Requisitos

- Node.js v24.x
- PostgreSQL (Azure)
- Azure OpenAI GPT-5

## Instalación

1. Clone el repositorio
2. Instale dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configure variables de entorno (copie .env.example a .env):
\`\`\`
DATABASE_URL=postgresql://user:pass@doctux-db.postgres.database.azure.com:5432/doctux?sslmode=require
AZURE_OPENAI_API_KEY=your-key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-5-chat-formacion
\`\`\`

4. Ejecute los scripts SQL en PostgreSQL:
\`\`\`sql
-- Desde psql o Azure Query Editor
\i scripts/01-create-tables.sql
\i scripts/02-seed-users.sql
\`\`\`

5. Inicie el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## Usuarios de Prueba

- **Administrador**: cedula=`admin`, password=`admin2025*`
- **Ingeniero**: cedula=`1234567890`, password=`doctux2025`
- **Analistas**: cedula=`0987654321`, password=`doctux2025`

## Arquitectura

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Backend**: Next.js API Routes + Node.js v24
- **Base de Datos**: PostgreSQL en Azure
- **IA**: Azure OpenAI GPT-5 con análisis automático
- **Estilos**: TailwindCSS v4 + shadcn/ui

## Despliegue en Azure

1. Configure una Web App en Azure App Service
2. Configure las variables de entorno en la Web App
3. Conecte con GitHub para CI/CD automático
4. El sistema se desplegará automáticamente

## Flujo de Trabajo

1. **Analista** crea ticket describiendo el problema
2. **Agente IA** analiza y determina prioridad automáticamente
3. **IA resuelve** si es nivel 1, o **escala** a nivel 2
4. **Ingeniero** revisa y cierra manualmente tickets nivel 2
5. **Reportes** muestran áreas y apps con más incidencias

## Licencia

Privado - DoctuxDB © 2025
