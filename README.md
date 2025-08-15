# Leandro Araújo Estúdio de Dança

Website moderno e responsivo para o estúdio de dança Leandro Araújo em Foz do Iguaçu.

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** para desenvolvimento e build
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Lucide React** para ícones

## 🌟 Funcionalidades

- Design responsivo e moderno
- Formulário de contato com validação
- Integração com WhatsApp
- Carousel de benefícios
- Efeitos visuais (shimmer em botões)
- Seções de depoimentos e FAQ

## 💻 Desenvolvimento

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

### Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run build:client` - Build apenas do cliente
- `npm run build:server` - Build apenas do servidor
- `npm run start` - Executar servidor de produção
- `npm run test` - Executar testes
- `npm run typecheck` - Verificação de tipos TypeScript

## 🚀 Deploy na Vercel

### Opção 1: Deploy Automático via Git

1. Faça push do código para um repositório no GitHub/GitLab/Bitbucket
2. Conecte sua conta Vercel ao repositório
3. A Vercel detectará automaticamente as configurações do Vite
4. O deploy será feito automaticamente

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login na Vercel
vercel login

# Deploy
vercel

# Para deploy de produção
vercel --prod
```

### Configuração do Projeto na Vercel

- **Framework Preset**: Vite
- **Build Command**: `npm run build:client`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 📁 Estrutura do Projeto

```
client/
├── components/ui/     # Componentes de UI reutilizáveis
├── hooks/             # Custom hooks
├── lib/               # Utilitários
├── pages/             # Páginas da aplicação
├── App.tsx            # Componente principal
└── global.css         # Estilos globais

public/                # Arquivos estáticos
server/                # Código do servidor (se aplicável)
shared/                # Código compartilhado
```

## 🎨 Customização

### Cores do Tema

As cores principais estão definidas em `client/global.css`:

- **Gold/Dourado**: #ccb079 (HSL: 42 30% 63%)
- **Background**: Preto (#000000)
- **Text**: Branco (#ffffff)

### Fontes

- **Headings**: Playfair Display
- **Body**: Poppins

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🔧 Configurações do Vercel

O arquivo `vercel.json` já está configurado com:

- Reescritas para SPA (Single Page Application)
- Cache otimizado para assets estáticos
- Configurações de build automatizadas

## 📞 Contato

Para dúvidas sobre o desenvolvimento ou modificações, entre em contato através do WhatsApp integrado no site.

---

Desenvolvido com ❤️ para o Estúdio Leandro Araújo
