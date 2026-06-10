@/Users/arthurnorat/Java_Projects/home-budget-api/CLAUDE.md

# Home Budget App — Frontend Angular

## Objetivo
Interface web para o app de controle de gastos domésticos compartilhado entre dois usuários.
Consome a API REST Java documentada acima.

## Perfil do Desenvolvedor
- Estudante em transição de mobile (Swift/iOS) para desenvolvimento web
- Conhecimentos prévios: Swift, Objective-C, iOS, Git, Java básico
- Explicações devem ser didáticas e com exemplos práticos quando solicitado

## Stack
- **Angular 21** — framework SPA com SSR habilitado
- **TypeScript** — linguagem principal (strict mode ativado)
- **CSS puro** — sem biblioteca de UI
- **Vercel** — hospedagem (`https://home-budget-web-ten.vercel.app`)

## Arquitetura

```
src/app/
├── models/
│   └── expense.model.ts          # interfaces Expense, ExpenseRequest, tipo Category
├── services/
│   └── expense.service.ts        # chamadas HTTP ao backend
└── components/
    ├── expense-form/             # formulário para lançar/editar gasto
    ├── expense-table/            # tabela com filtro (Variável/Fixo/Todos) e botão Importar
    ├── expense-summary/          # total do mês e totais por categoria
    └── month-navigator/          # navegação entre meses (← Abril 2026 →)
```

O componente raiz `App` (`app.ts`) orquestra o estado: mês selecionado, lista de gastos, gasto em edição e chamadas ao service.

## Convenções específicas do frontend
- `amount` chega em centavos do backend; dividir por 100 ao exibir, multiplicar por 100 ao enviar
- Datas exibidas como `DD/MM/YYYY`; enviadas ao backend como `YYYY-MM-DD`
- Código e variáveis em inglês; commits em inglês

## Funcionalidades Implementadas
- [x] Formulário de lançamento (descrição, valor, data, categoria)
- [x] Edição de gasto existente (inline, mesmo formulário)
- [x] Tabela de gastos do mês com botões editar e excluir
- [x] Filtro por categoria na tabela (Variável / Fixo / Todos) — padrão: Variável
- [x] Botão "Importar" — copia gastos fixos do mês anterior para o mês atual
- [x] Navegação entre meses
- [x] Resumo: total do mês e totais por categoria (Fixo / Variável)
- [x] Layout responsivo (desktop, tablet, mobile)

## Comandos Úteis
```bash
ng serve                  # dev server em http://localhost:4200
ng serve --host 0.0.0.0   # expõe na rede local (acesso pelo celular via IP)
ng build                  # build de produção
```

## Histórico de Sessões

### Sessão 2026-04-25
- Criados models, service e os quatro componentes iniciais
- Integração com backend via signals e HttpClient
- Layout e estilos CSS base

### Sessão 2026-04-26
- Configurados arquivos de ambiente (dev/prod)
- Deploy no Vercel com `vercel.json` e rewrite SPA
- CORS do backend atualizado com URL do Vercel

### Sessão 2026-04-27
- Media queries adicionadas em todos os componentes para responsividade mobile

### Sessão 2026-04-28
- `ExpenseForm` ganhou modo de edição (input `editingExpense`, outputs `expenseUpdate` e `cancelEdit`)
- `ExpenseTable` ganhou botão de editar (✎)
- `App` orquestra o fluxo de edição com signal `editingExpense`

### Sessão 2026-05-02
- `ExpenseTable`: filter bar com botões Variável / Fixo / Todos (padrão: Variável)
- `ExpenseTable`: coluna de categoria removida (redundante com o filtro)
- `ExpenseTable`: botão "Importar" que chama `POST /expenses/import-fixed`
- Ajustes de responsividade mobile (padding reduzido, `text-overflow: ellipsis` na descrição)
- CLAUDE.md refatorado: seção de API removida em favor de `@import` do backend
