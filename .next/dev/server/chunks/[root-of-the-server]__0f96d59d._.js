module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/sentry/lvm-tickets-app/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getPool",
    ()=>getPool,
    "query",
    ()=>query
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// Create a singleton connection pool
let pool = null;
function getPool() {
    if (!pool) {
        pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
            connectionString: process.env.DATABASE_URL,
            ssl: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        });
    }
    return pool;
}
async function query(text, params) {
    const pool = getPool();
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('[v0] Executed query', {
            text,
            duration,
            rows: res.rowCount
        });
        return res;
    } catch (error) {
        console.error('[v0] Database query error:', error);
        throw error;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/sentry/lvm-tickets-app/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSession",
    ()=>createSession,
    "deleteSession",
    ()=>deleteSession,
    "getSession",
    ()=>getSession,
    "hashPassword",
    ()=>hashPassword,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
const secret = new TextEncoder().encode(process.env.SESSION_SECRET || 'default-secret-change-this');
async function hashPassword(password) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hash"])(password, 10);
}
async function verifyPassword(password, hashedPassword) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["compare"])(password, hashedPassword);
}
async function createSession(user) {
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"]({
        user
    }).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime('24h').sign(secret);
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).set('session', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/'
    });
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('session');
    if (!token) return null;
    try {
        const verified = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token.value, secret);
        return verified.payload.user;
    } catch (error) {
        return null;
    }
}
async function deleteSession() {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).delete('session');
}
}),
"[project]/sentry/lvm-tickets-app/lib/azure-openai.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeTicket",
    ()=>analyzeTicket,
    "getAzureOpenAIClient",
    ()=>getAzureOpenAIClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$openai$2f$azure$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/node_modules/openai/azure.mjs [app-route] (ecmascript)");
;
let azureClient = null;
function getAzureOpenAIClient() {
    if (!azureClient) {
        azureClient = new __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$openai$2f$azure$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AzureOpenAI"]({
            apiKey: process.env.AZURE_OPENAI_API_KEY,
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview'
        });
    }
    return azureClient;
}
async function analyzeTicket(title, description, application) {
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
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: `Aplicación: ${application}\nTítulo: ${title}\nDescripción: ${description}`
                }
            ],
            temperature: 0.3,
            max_tokens: 1000,
            response_format: {
                type: 'json_object'
            }
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
            analysis: 'El sistema no pudo analizar automáticamente este ticket.'
        };
    }
}
}),
"[project]/sentry/lvm-tickets-app/app/api/tickets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$azure$2d$openai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sentry/lvm-tickets-app/lib/azure-openai.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function GET(request) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No autenticado'
            }, {
                status: 401
            });
        }
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');
        const priority = searchParams.get('priority');
        const application = searchParams.get('application');
        let sql = `
      SELECT t.*, 
        u1.name as creator_name, 
        u2.name as assigned_name,
        u3.name as closer_name
      FROM lvm_tickets t
      LEFT JOIN lvm_users u1 ON t.created_by = u1.id
      LEFT JOIN lvm_users u2 ON t.assigned_to = u2.id
      LEFT JOIN lvm_users u3 ON t.closed_by = u3.id
      WHERE 1=1
    `;
        const params = [];
        let paramCount = 0;
        if (status) {
            paramCount++;
            sql += ` AND t.status = $${paramCount}`;
            params.push(status);
        }
        if (priority) {
            paramCount++;
            sql += ` AND t.priority = $${paramCount}`;
            params.push(priority);
        }
        if (application) {
            paramCount++;
            sql += ` AND t.application = $${paramCount}`;
            params.push(application);
        }
        sql += ' ORDER BY t.created_at DESC';
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(sql, params);
        return __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            tickets: result.rows
        });
    } catch (error) {
        console.error('[v0] Error fetching tickets:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al obtener tickets'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])();
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No autenticado'
            }, {
                status: 401
            });
        }
        const { title, description, application, area } = await request.json();
        if (!title || !description || !application || !area) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Todos los campos son requeridos'
            }, {
                status: 400
            });
        }
        // Analyze ticket with AI
        const aiAnalysis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$azure$2d$openai$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeTicket"])(title, description, application);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])(`INSERT INTO lvm_tickets (
        title, description, application, area, priority, status, 
        support_level, created_by, resolution, ai_analysis
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *`, [
            title,
            description,
            application,
            area,
            aiAnalysis.priority,
            aiAnalysis.can_resolve ? 'cerrado' : 'abierto',
            aiAnalysis.support_level,
            user.id,
            aiAnalysis.resolution,
            aiAnalysis.analysis
        ]);
        const ticket = result.rows[0];
        // If AI resolved it, mark it as closed
        if (aiAnalysis.can_resolve) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('UPDATE lvm_tickets SET closed_at = NOW(), closed_by = $1 WHERE id = $2', [
                user.id,
                ticket.id
            ]);
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["query"])('INSERT INTO lvm_ticket_history (ticket_id, action, changed_by, new_value) VALUES ($1, $2, $3, $4)', [
            ticket.id,
            'created',
            user.id,
            JSON.stringify(aiAnalysis)
        ]);
        return __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ticket,
            aiAnalysis
        });
    } catch (error) {
        console.error('[v0] Error creating ticket:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$sentry$2f$lvm$2d$tickets$2d$app$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Error al crear ticket'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f96d59d._.js.map