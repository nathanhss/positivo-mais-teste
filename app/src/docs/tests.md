# Documentação dos Testes

Este documento descreve a estratégia de testes, a estrutura dos arquivos e o que cada suíte de testes cobre.

---

## Visão geral

Os testes são **unitários**: cada camada (repository, service, controller, routes) é testada isoladamente, com as dependências **mockadas**. Assim não é necessário banco de dados nem servidor HTTP real para rodar a suíte.

- **Ferramentas:** Jest (test runner + mocks), Supertest (testes de rotas HTTP).
- **Onde ficam:** `src/tests/unit/`.
- **Como rodar:** `npm test` (todos) ou `npm test -- --testPathPattern=nome-do-arquivo`.

---

## Estrutura de arquivos

```
src/
├── tests/
│   └── unit/
│       ├── client.repository.test.js   # Repository (model Mongoose mockado)
│       ├── client.service.test.js      # Service (repository mockado)
│       ├── client.controller.test.js   # Controller (service mockado)
│       └── client.routes.test.js       # Rotas HTTP (controller mockado + supertest)
└── ...
```

A pirâmide segue **repository → service → controller → routes**: cada nível mocka o nível de baixo e testa apenas a lógica da própria camada.

---

## 1. Testes do Repository (`client.repository.test.js`)

**Objetivo:** Garantir que o `ClientRepository` chama os métodos corretos do model Mongoose e repassa retornos e erros.

**Mocks:**

- `../../models/clients.js` — model Mongoose (Client) substituído por mock; não usa MongoDB.
- `../../utils/logger.js` — logger substituído para não escrever em arquivo.

**O que é testado:**

| Método   | Cenários |
|----------|----------|
| `create` | Chama `Client.create` com os dados e retorna o resultado; propaga erro quando `Client.create` falha. |
| `getAll` | Chama `Client.find()` e retorna a lista; propaga erro em falha. |
| `getById`| Chama `Client.findById(id)` e retorna o cliente; propaga erro em falha. |
| `update` | Chama `Client.findByIdAndUpdate(id, data)` e retorna o atualizado; propaga erro em falha. |
| `delete` | Chama `Client.findByIdAndDelete(id)` e retorna o removido; propaga erro em falha. |

Cada método tem pelo menos um teste de **sucesso** (retorno esperado) e um de **erro** (rejeição da promise).

---

## 2. Testes do Service (`client.service.test.js`)

**Objetivo:** Garantir que o `ClientService` traduz o retorno do repository no formato da API (status, success, message, data) e trata sucesso, “não encontrado” e erro.

**Mocks:**

- `../../repositories/client.js` — repository substituído; não chama o repository real nem o model.
- `../../utils/logger.js` — logger mockado.

**O que é testado:**

| Método   | Cenários |
|----------|----------|
| `create` | Sucesso (201, data); repository retorna `null` (204, “Client not created”); repository lança erro (500, “Internal server error”). |
| `getAll` | Sucesso (200, lista em `data`); repository lança erro (500). |
| `getById`| Sucesso (200, client em `data`); não encontrado (204, “Client not found”); repository lança erro → service **relança** a exceção (comportamento diferente dos outros métodos). |
| `update` | Sucesso (200, data); não encontrado (204); erro (500). |
| `delete` | Sucesso (200, data); não encontrado (204); erro (500). |

Asserções verificam também que o repository foi chamado com os argumentos corretos (ex.: `toHaveBeenCalledWith(id)`, `toHaveBeenCalledWith(input)`).

---

## 3. Testes do Controller (`client.controller.test.js`)

**Objetivo:** Garantir que o controller repassa os parâmetros corretos ao service e devolve o retorno do service (ou relança o erro).

**Mocks:**

- `../../services/client.js` — service substituído.

**O que é testado:**

Para cada método (`create`, `getAll`, `getById`, `update`, `delete`):

1. **Sucesso:** chama o method do service com os argumentos corretos (ex.: `create(data)` com `name`, `email`, `document`, `username`, `password`; `update(id, data)`; `delete(id)`) e retorna o mesmo objeto que o service.
2. **Erro:** quando o service rejeita/lança, o controller relança a mesma exceção (ex.: `rejects.toThrow("Service error")`).

O controller é uma camada fina; os testes focam em delegação e repasse de erros.

---

## 4. Testes de Rotas (`client.routes.test.js`)

**Objetivo:** Garantir que as rotas HTTP respondem com status e body corretos, que a validação (express-validator) é aplicada e que erros do controller viram 500.

**Ferramenta:** **Supertest** — envia requisições HTTP para o app Express **sem** subir servidor (usa o objeto `app` diretamente).

**Mocks:**

- `../../controllers/client.js` — controller substituído; não chama service nem banco.

**App de teste:** Usa `createApp()` de `config/express.js` e monta só as rotas de client, para ter uma instância limpa por execução de testes.

**O que é testado:**

| Rota              | Cenários |
|-------------------|----------|
| `GET /clients`    | Retorna 200 e o body devolvido pelo controller (lista). |
| `POST /clients`  | Body válido → 201 e resposta do controller; body inválido (validação) → 400 e `errors`; controller lança → 500 e `message`. |
| `GET /clients/:id`| Id válido → 200 e resposta do controller; id vazio/inexistente → 400 ou 404 conforme roteamento; controller lança → 500. |
| `PUT /clients/:id`| Id e body válidos → 200 e resposta do controller; controller lança → 500. |
| `DELETE /clients/:id` | Id válido → status e body do controller (ex.: 200 ou 204); id ausente → 404; controller lança → 500. |

Os testes conferem `res.status`, `res.body` e, quando faz sentido, que o controller foi chamado com os argumentos esperados (ex.: body em POST, id em GET/PUT/DELETE).

---

## Comandos úteis

```bash
# Todos os testes
npm test

# Apenas um arquivo
npm test -- --testPathPattern=client.service

# Com coverage
npm run test:coverage

# Modo watch (re-executa ao salvar)
npm run test:watch
```

---

## Silenciar console nos testes

Se o código de produção usar `console.error` ou `console.log` em blocos `catch`, esses logs aparecem no terminal ao rodar testes que forçam erro. Para evitar isso, pode-se usar um arquivo de setup do Jest que faz mock de `console.log`, `console.error` e `console.warn` durante os testes (por exemplo em `tests/setup.js`) e registrá-lo em `jest.config.cjs` com `setupFilesAfterEnv`.

---

## Resumo da pirâmide

| Camada     | Arquivo de teste           | Mocka              | Testa                          |
|------------|----------------------------|--------------------|--------------------------------|
| Repository | `client.repository.test.js`| Model + logger     | Chamadas ao Mongoose e erros   |
| Service    | `client.service.test.js`   | Repository + logger| Regras de negócio e formato API|
| Controller | `client.controller.test.js`| Service            | Delegação e repasse de erros   |
| Routes     | `client.routes.test.js`    | Controller         | HTTP, validação, status/body   |

Nenhum teste depende de MongoDB ou de servidor em execução.
