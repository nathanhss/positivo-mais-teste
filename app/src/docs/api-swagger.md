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
- **Spec:** `config/swagger.js` — objeto OpenAPI 3.0 com todos os endpoints de **Clients** e códigos de resposta (200, 201, 404, 400, 500).
- **Montagem:** em `index.js` a rota `/api-docs` usa `swaggerUi.serve` e `swaggerUi.setup(swaggerDocument)`.

## Formato das respostas

Todas as respostas da API seguem o formato:

- **code** — código HTTP (200, 201, 404, 500)
- **success** — boolean
- **message** — mensagem descritiva
- **data** — payload (objeto ou array) ou `null` em erro

## Endpoints documentados

| Método | Rota          | Descrição                        |
|--------|---------------|----------------------------------|
| GET    | /clients      | Listar clientes                  |
| POST   | /clients      | Criar cliente                    |
| GET    | /clients/:id  | Buscar cliente por ID            |
| PUT    | /clients/:id  | Atualizar cliente (substituição) |
| PATCH  | /clients/:id  | Atualizar cliente (parcial)      |
| DELETE | /clients/:id  | Remover cliente                  |

Na Swagger UI você pode ver os schemas (**Client**, **ClientCreate**, **ClientUpdate**, **ClientPatch**, **ValidationErrors**) e testar as requisições pela interface ("Try it out").

## Alterar a spec

Edite `config/swagger.js`. O objeto `swaggerDocument` segue o padrão [OpenAPI 3.0](https://swagger.io/specification/). Para mudar o servidor (URL base), altere o array `servers`; a porta é lida de `process.env.SERVER_PORT`.
