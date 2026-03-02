# Positivo+ Teste

Teste técnico para a Positivo Mais. API REST em Node.js com Express e MongoDB para gerenciamento de clientes.

## Tecnologias

- **Node.js** (v20) + **Express 5**
- **MongoDB** + Mongoose
- Validação (express-validator), documentação (Swagger/OpenAPI 3.0), logs (Winston)
- Testes com Jest e Supertest

## Como rodar

### Com Docker

Na raiz do repositório:

```bash
docker-compose up
```

- Backend: `http://localhost:3000`
- Documentação Swagger UI: `http://localhost:3000/api-docs`
- MongoDB: porta `27017`

### Local

Entre na pasta da aplicação, instale as dependências e suba o servidor:

```bash
cd app/src
npm install
npm run dev
```

Configure as variáveis de ambiente em `app/src/config/.env` (ou use `.env_dev` como referência). Principais: `SERVER_PORT`, `MONGO_URL`.

## Scripts

Os comandos abaixo devem ser executados de dentro de `app/src/`:

| Comando                 | Descrição                    |
| ----------------------- | ---------------------------- |
| `npm start`             | Inicia a aplicação           |
| `npm run dev`           | Desenvolvimento com watch    |
| `npm test`              | Executa os testes (Jest)     |
| `npm run test:watch`    | Testes em modo watch          |
| `npm run test:coverage` | Testes com relatório de cobertura |

## Documentação

- **[Documentação dos testes](app/src/docs/tests.md)** — Estratégia de testes, mocks, pirâmide (repository → service → controller → routes) e o que cada suíte cobre.
- **[Documentação da API (Swagger)](app/src/docs/api-swagger.md)** — Formato das respostas, endpoints e como acessar a Swagger UI em `/api-docs`.

A API segue o padrão de resposta `{ code, success, message, data }`. Endpoints: `GET/POST /clients`, `GET/PUT/PATCH/DELETE /clients/:id`.

## Estrutura

O código da aplicação fica em **`app/src/`**:

- `config/` — Express, Mongoose, Swagger, env
- `controllers/` — Controladores
- `middlewares/` — Validação (validator)
- `models/` — Schemas Mongoose
- `repositories/` — Acesso a dados
- `routes/` — Rotas HTTP
- `services/` — Lógica de negócio
- `utils/` — Logger, errorHandler
- `validators/` — Regras express-validator
- `tests/unit/` — Testes unitários
- `docs/` — Documentação (testes e Swagger)

O `docker-compose` monta `app/src` no container e executa `npm run dev` nesse diretório.

---

Parte deste projeto foi desenvolvida com apoio do **Cursor Agent** (assistente de IA do editor Cursor) para estruturação e documentação, além do **Cursor Planning** para melhorar visualização dos passos a serem executados.
