# ProtocoloMED

Documentação técnica do projeto ProtocoloMED — frontend em React + Vite.

Este repositório contém a aplicação frontend do projeto ProtocoloMED, construída com React, TypeScript, Vite e TailwindCSS. A documentação abaixo descreve a arquitetura, como executar localmente, convenções de código e passos para contribuir.

## **Visão Geral**
- **Nome:** ProtocoloMED
- **Tipo:** Aplicação web frontend (SPA)
- **Stack principal:** React, TypeScript, Vite, TailwindCSS

## **Estrutura do Repositório**
Principais diretórios e arquivos:

- `frontend/` — código fonte da aplicação React
	- `src/` — código TypeScript e componentes
		- `components/` — componentes UI e de página
		- `pages/` — rotas/páginas (Dashboard, Login, Questionnaire, etc.)
		- `auth/` — provedor de autenticação
		- `hooks/` — hooks reutilizáveis
		- `lib/` — utilitários
	- `index.html`, `vite.config.ts`, `package.json` — configuração do build

Mais detalhes da arquitetura e dos componentes estão em `docs/TECHNICAL_DOCUMENTATION.md`.

## **Pré-requisitos**
- Node.js (versão recomendada: 18.x ou superior)
- npm ou bun/pnpm/yarn (o projeto contém `package.json` no `frontend/`)
- Git

## **Instalação e execução (desenvolvimento)**
1. Abrir o diretório do frontend:

```
cd frontend
```

2. Instalar dependências (exemplo com npm):

```
npm install
```

3. Iniciar em modo de desenvolvimento:

```
npm run dev
```

O Vite iniciará um servidor local (por padrão `http://localhost:5173`).

## **Scripts úteis** (no `frontend/package.json`)
- `dev` — inicia o servidor de desenvolvimento (Vite)
- `build` — gera build de produção
- `preview` — pré-visualiza o build de produção localmente
- `lint` — executa ESLint (se configurado)

Execute esses comandos dentro do diretório `frontend`.

## **Qualidade de código e convenções**
- TypeScript: prefira tipos explícitos onde fizer sentido.
- Formatação: use Prettier (se disponível) com configurações do projeto.
- Linting: seguir regras definidas em `eslint.config.js`.
- Commits: adote Conventional Commits (ex.: `feat`, `fix`, `chore`).

## **Arquitetura e componentes**
O frontend usa uma organização baseada em componentes e páginas. Componentes de UI reutilizáveis estão em `src/components/ui/`. Páginas e rotas estão em `src/pages/`.

O provedor de autenticação está em `src/auth/AuthProvider.tsx` e o roteamento protegido usa `ProtectedRoute.tsx`.

Veja `docs/TECHNICAL_DOCUMENTATION.md` para detalhe por componente e fluxos.

## **Variáveis de ambiente**
- Configure variáveis (ex.: endpoints de API, chaves) em um arquivo `.env` na raiz do `frontend` conforme necessário. Nunca commit valores sensíveis — use `.gitignore` para esses arquivos.

## **Segurança**
- Não commitar credenciais.
- Validar e sanitizar entradas do usuário no backend.

## **Como contribuir**
Leia `CONTRIBUTING.md` para o fluxo de trabalho, padrões de PR e checklist de revisão.

## **Changelog e Releases**
O arquivo `CHANGELOG.md` contém o histórico de mudanças e formatação sugerida.

## **Contato**
- Mantainer: `lucasfukuta`

---
Para documentação técnica detalhada, exemplos de componentes, e decisões arquiteturais, consulte `docs/TECHNICAL_DOCUMENTATION.md`.
