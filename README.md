# Positivo Mais Teste

Projeto Node.js com TypeScript, estrutura organizada e fácil compreensão.

## Estrutura do Projeto

```
├── src/                    # Código fonte principal
│   ├── config/            # Configurações (banco de dados, etc.)
│   ├── controllers/       # Controladores (lógica de requisições)
│   ├── middlewares/       # Middlewares (autenticação, validação, etc.)
│   ├── models/            # Modelos de dados
│   ├── routes/            # Definição de rotas
│   ├── services/          # Lógica de negócio
│   ├── types/             # Definições de tipos TypeScript
│   ├── utils/             # Funções utilitárias
│   ├── validators/        # Validadores de dados
│   └── index.ts           # Ponto de entrada da aplicação
├── dist/                  # Código compilado (gerado automaticamente)
├── tests/                 # Testes
│   ├── unit/              # Testes unitários
│   ├── integration/       # Testes de integração
│   └── e2e/               # Testes end-to-end
├── docs/                  # Documentação
├── public/                # Arquivos estáticos
│   └── uploads/           # Arquivos enviados pelos usuários
└── logs/                  # Arquivos de log
```

## Instalação

```bash
npm install
```

## Execução

### Desenvolvimento
```bash
npm run dev
```
Executa o TypeScript diretamente com `tsx` (sem necessidade de compilar).

### Produção
```bash
npm run build  # Compila o TypeScript para JavaScript
npm start      # Executa o código compilado
```

## Testes

```bash
npm test
```

## Scripts Disponíveis

- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia a aplicação em produção (código compilado)
- `npm run dev` - Inicia a aplicação em modo desenvolvimento com hot-reload
- `npm run dev:nodemon` - Alternativa usando nodemon
- `npm run type-check` - Verifica erros de tipo sem compilar
- `npm test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:coverage` - Gera relatório de cobertura de testes
- `npm run lint` - Verifica problemas de código TypeScript
- `npm run lint:fix` - Corrige problemas de código automaticamente
