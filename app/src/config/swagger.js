const port = process.env.SERVER_PORT || 3000;

export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Client API",
        version: "1.0.0",
        description: "API para gerenciamento de clientes (teste técnico Positivo Mais)",
    },
    servers: [
        { url: `http://localhost:${port}`, description: "Local" },
    ],
    paths: {
        "/clients": {
            get: {
                summary: "Listar clientes",
                tags: ["Clients"],
                responses: {
                    200: {
                        description: "Lista de clientes",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number", example: 200 },
                                        success: { type: "boolean", example: true },
                                        message: { type: "string" },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Client" },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    500: { description: "Erro interno do servidor" },
                },
            },
            post: {
                summary: "Criar cliente",
                tags: ["Clients"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ClientCreate" },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Cliente criado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number", example: 201 },
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                        data: { $ref: "#/components/schemas/Client" },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: "Dados inválidos (validação)",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ValidationErrors" },
                            },
                        },
                    },
                    500: { description: "Erro interno do servidor" },
                },
            },
        },
        "/clients/{id}": {
            get: {
                summary: "Buscar cliente por ID",
                tags: ["Clients"],
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } },
                ],
                responses: {
                    200: {
                        description: "Cliente encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number" },
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                        data: { $ref: "#/components/schemas/Client" },
                                    },
                                },
                            },
                        },
                    },
                    204: { description: "Cliente não encontrado" },
                    400: { description: "ID inválido" },
                    500: { description: "Erro interno do servidor" },
                },
            },
            put: {
                summary: "Atualizar cliente",
                tags: ["Clients"],
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ClientUpdate" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Cliente atualizado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "number" },
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                        data: { $ref: "#/components/schemas/Client" },
                                    },
                                },
                            },
                        },
                    },
                    204: { description: "Cliente não encontrado" },
                    400: { description: "Dados inválidos" },
                    500: { description: "Erro interno do servidor" },
                },
            },
            patch: {
                summary: "Atualizar cliente (parcial)",
                tags: ["Clients"],
                description:
                    "Atualiza apenas os campos enviados no body. Todos os campos são opcionais.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "string" },
                        description: "MongoDB ObjectId do cliente",
                    },
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ClientPatch" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Cliente atualizado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        code: { type: "number", example: 200 },
                                        success: { type: "boolean" },
                                        message: { type: "string" },
                                        data: { $ref: "#/components/schemas/Client" },
                                    },
                                },
                            },
                        },
                    },
                    404: { description: "Cliente não encontrado" },
                    400: {
                        description: "Dados inválidos (validação)",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/ValidationErrors" },
                            },
                        },
                    },
                    500: { description: "Erro interno do servidor" },
                },
            },
            delete: {
                summary: "Remover cliente",
                tags: ["Clients"],
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } },
                ],
                responses: {
                    200: { description: "Cliente removido" },
                    204: { description: "Cliente não encontrado" },
                    400: { description: "ID inválido" },
                    500: { description: "Erro interno do servidor" },
                },
            },
        },
    },
    components: {
        schemas: {
            Client: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "507f1f77bcf86cd799439011" },
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    document: { type: "string" },
                    username: { type: "string" },
                    status: { type: "string", enum: ["active", "inactive"] },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                },
            },
            ClientCreate: {
                type: "object",
                required: ["name", "email", "document", "username", "password"],
                properties: {
                    name: { type: "string", description: "Nome completo" },
                    email: { type: "string", format: "email" },
                    document: { type: "string" },
                    username: { type: "string" },
                    password: { type: "string" },
                },
            },
            ClientUpdate: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    document: { type: "string" },
                    username: { type: "string" },
                    password: { type: "string" },
                    status: { type: "string", enum: ["active", "inactive"] },
                },
            },
            ClientPatch: {
                type: "object",
                description:
                    "Todos os campos são opcionais. Apenas os enviados serão atualizados.",
                properties: {
                    name: { type: "string", description: "Nome completo" },
                    email: { type: "string", format: "email" },
                    document: { type: "string" },
                    username: { type: "string" },
                },
            },
            ValidationErrors: {
                type: "object",
                properties: {
                    errors: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                msg: { type: "string" },
                                path: { type: "string" },
                                value: {},
                            },
                        },
                    },
                },
            },
        },
    },
};
