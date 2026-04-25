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
MVP implementado. Frontend conectado ao backend Java local.
