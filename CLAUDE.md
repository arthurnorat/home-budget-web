# Home Budget App — Frontend Angular

## Objetivo
Interface web para o app de controle de gastos domésticos compartilhado entre dois usuários.
Consome a API REST Java hospedada no backend.

## Perfil do Desenvolvedor
- Estudante em transição de mobile (Swift/iOS) para desenvolvimento web
- Conhecimentos prévios: Swift, Objective-C, iOS, Git, Java básico
- Explicações devem ser didáticas e com exemplos práticos quando solicitado

## Stack

### Frontend (este projeto)
- **Angular 21** — framework SPA com SSR habilitado
- **TypeScript** — linguagem principal (strict mode ativado)
- **CSS puro** — sem biblioteca de UI por enquanto
- **Vercel** — hospedagem

### Backend (projeto separado: `~/Java_Projects/orcamento`)
- **Java + Spring Boot** — API REST na porta 8080
- **PostgreSQL** — banco de dados em produção
- **Render** — hospedagem do backend

## API do Backend

URL base (dev): `http://localhost:8080`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/expenses` | Criar gasto |
| GET | `/expenses?month=yyyy-MM` | Listar gastos do mês |
| DELETE | `/expenses/{id}` | Remover gasto |

### Formato do gasto (request)
```json
{
  "description": "Supermercado",
  "amount": 15000,
  "date": "2026-04-25",
  "category": "VARIABLE"
}
```

### Formato do gasto (response)
```json
{
  "expenseId": "uuid",
  "description": "Supermercado",
  "amount": 15000,
  "date": "2026-04-25",
  "category": "VARIABLE",
  "createdAt": "2026-04-25T10:30:00Z"
}
```

## Convenções
- Valores monetários em **centavos** no backend; o frontend divide por 100 ao exibir e multiplica por 100 ao enviar
- Datas em **ISO 8601** (`YYYY-MM-DD`) no backend; exibidas como `DD/MM/YYYY` no frontend
- Código e variáveis em **inglês**
- Commits em **inglês**
- Categorias: `FIXED` (Fixo) e `VARIABLE` (Variável)

## Arquitetura

```
src/app/
├── models/
│   └── expense.model.ts          # interfaces Expense, ExpenseRequest, tipo Category
├── services/
│   └── expense.service.ts        # chamadas HTTP ao backend
└── components/
    ├── expense-form/             # formulário para lançar novo gasto
    ├── expense-table/            # tabela com lista de gastos e botão de excluir
    ├── expense-summary/          # total do mês e totais por categoria
    └── month-navigator/          # navegação entre meses (← Abril 2026 →)
```

O componente raiz `App` (`app.ts`) orquestra o estado: mês selecionado, lista de gastos e chamadas ao service.

## Funcionalidades Implementadas
- [x] Formulário de lançamento (descrição, valor, data, categoria)
- [x] Tabela de gastos do mês com botão de excluir
- [x] Navegação entre meses
- [x] Total do mês
- [x] Totais por categoria (Fixo / Variável)

## Próximos Passos (futuro)
- Edição de gasto existente
- Filtro por categoria na tabela
- Autenticação por usuário
- App iOS nativo (Swift)

## Comandos Úteis
```bash
npm start              # inicia dev server em http://localhost:4200
npm run build          # build de produção
npm test               # roda os testes com Vitest
```

## Status Atual
App em produção completo. Frontend no Vercel, backend no Render.

- **Frontend:** `https://home-budget-web-ten.vercel.app/`
- **Backend:** `https://home-budget-api-wml2.onrender.com`

### Sessão 2026-04-25
**O que foi feito:**
- Criado CLAUDE.md com documentação do projeto
- Criados models (`expense.model.ts`) e service (`expense.service.ts`)
- Configurado `provideHttpClient` no `app.config.ts`
- Implementados os quatro componentes: `month-navigator`, `expense-summary`, `expense-form`, `expense-table`
- Integração no `app.ts` com signals e chamadas ao service
- Layout e estilos CSS (sem biblioteca de UI)

### Sessão 2026-04-26
**O que foi feito:**
- Criados arquivos de ambiente (`src/environments/environment.ts` e `environment.prod.ts`)
- Service atualizado para usar `environment.apiUrl` (dev aponta para localhost, prod aponta para Render)
- `angular.json`: `outputMode` trocado de `server` para `static` (compatível com Vercel)
- `fileReplacements` configurado no build de produção para trocar o environment automaticamente
- Guard `isPlatformBrowser` adicionado em `app.ts` para não chamar a API durante o prerender
- `vercel.json` criado com rewrite SPA (`/* → /index.html`)
- Deploy realizado no Vercel (auto-deploy via push no GitHub)
- CORS do backend Java atualizado com a URL do Vercel e redeploy no Render

**Próxima sessão:**
1. Responsividade para mobile (media queries — o formulário em grid de 5 colunas quebra no celular)
2. Edição de gasto existente (`PUT /expenses/{id}` no backend + UI no frontend)
