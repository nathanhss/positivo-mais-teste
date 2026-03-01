# Documentação da API (Swagger)

A API é documentada com **OpenAPI 3.0** e a interface **Swagger UI** para visualização e testes.

## Como acessar

Com o servidor rodando (`npm start` ou `npm run dev`), abra no navegador:

```
http://localhost:<SERVER_PORT>/api-docs
```

Exemplo: `http://localhost:3000/api-docs`

## O que foi configurado

- **Pacote:** `swagger-ui-express` — serve a UI e usa a spec em tempo de execução.
- **Spec:** `config/swagger.js` — objeto OpenAPI 3.0 com todos os endpoints de **Clients** (GET/POST /clients, GET/PUT/DELETE /clients/:id), schemas de request/response e códigos de status (200, 201, 204, 400, 500).
- **Montagem:** em `index.js` a rota `/api-docs` usa `swaggerUi.serve` e `swaggerUi.setup(swaggerDocument)`.

## Endpoints documentados

| Método | Rota          | Descrição              |
|--------|---------------|------------------------|
| GET    | /clients      | Listar clientes        |
| POST   | /clients      | Criar cliente          |
| GET    | /clients/:id  | Buscar cliente por ID  |
| PUT    | /clients/:id  | Atualizar cliente      |
| DELETE | /clients/:id  | Remover cliente        |

Na Swagger UI você pode ver os schemas (Client, ClientCreate, ClientUpdate, ValidationErrors) e testar as requisições diretamente pela interface.

## Alterar a spec

Edite `config/swagger.js`. O objeto `swaggerDocument` segue o padrão [OpenAPI 3.0](https://swagger.io/specification/). Para mudar o servidor (URL base), altere o array `servers`; a porta é lida de `process.env.SERVER_PORT`.
