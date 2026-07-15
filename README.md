# <p align="center"><img src="./public/logo-branco-2.png" alt="Rachou Logo" width="280"/></p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite" alt="Vite 8">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS 4.0">
  <img src="https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
</p>

---

## 📋 Sobre o Rachou

O **Rachou** é uma plataforma moderna e colaborativa de carona compartilhada criada para aproximar motoristas e passageiros que percorrem trajetos semelhantes. Ao dividir custos de combustível, pedágios e manutenção de forma inteligente, o projeto incentiva uma mobilidade urbana viável, sustentável e com forte espírito comunitário.

Este repositório armazena o **Módulo Front-end** da aplicação, desenvolvido com as tecnologias mais ágeis do ecossistema web para entregar uma experiência fluida, rápida e responsiva.

---

## 💻 Estrutura Visual & Telas Implementadas

A interface do aplicativo foi inspirada em referências líderes de mercado (como o *BlaBlaCar*), adaptando-se para o tema exclusivo do projeto com foco em minimalismo e usabilidade clara:

* 🏠 **Página Inicial (Home):** Painel interativo com efeitos visuais modernos no cabeçalho e um botão destacado de ação rápida para abrir o assistente de busca.
* 🔍 **Modal de Busca Avançada (`SearchModal`):** Um componente dinâmico com efeito de desfoque de fundo (*backdrop blur*) que reúne filtros rápidos de local de partida, destino, data e quantidade de passageiros.
* 🚗 **Listagem de Caronas Ativas:** Cards responsivos com dados de origem, destino, valor de divisão sugerido, motorista responsável e estimativas automáticas de horários.
* 📝 **Cadastro de Novas Ofertas de Viagem:** Formulário protegido e intuitivo que permite ao motorista selecionar a modalidade do percurso e definir o local de partida, chegada e preço.

---

## 🎨 Identidade Visual (Tema OKLCH)

Seguindo os padrões do Tailwind CSS 4.x, a estilização utiliza o espaço de cores **OKLCH**, garantindo fidelidade de cor em displays modernos e transições suaves. A paleta padrão definida sob a marca `@theme` no arquivo `index.css` é a **Ultrasonic Blue**:

```css
@theme {
  --color-ultrasonic-blue-50: #eaeafb;
  --color-ultrasonic-blue-100: #d4d4f7;
  --color-ultrasonic-blue-200: #aaaaee;
  --color-ultrasonic-blue-300: #7f7fe6;
  --color-ultrasonic-blue-400: #5555dd;
  --color-ultrasonic-blue-500: #2a2ad5; /* Cor Destaque Principal */
  --color-ultrasonic-blue-600: #2222aa;
  --color-ultrasonic-blue-700: #191980;
  --color-ultrasonic-blue-800: #111155;
  --color-ultrasonic-blue-900: #08082b;
  --color-ultrasonic-blue-950: #06061e; /* Fundo do App (bg-slate-950) */
}
```

---

## 🔐 Gerenciamento de Estado Global & Autenticação

A aplicação possui um sistema nativo de persistência de sessão e proteção de rotas centralizado na camada React Context:

* **AuthContext:** Contexto responsável por manter o estado global do usuário (`usuarioLogin`), lidar com a ativação de sessões via JWT recebido pelo back-end e redefinir o estado ao efetuar o logout.
* **Integração do Token:** O token de autenticação fica guardado dinamicamente para assegurar que requisições a rotas sensíveis do back-end (como criar novas ofertas de viagens) enviem o cabeçalho `Authorization: Bearer <token>` de forma transparente.

---

## 📂 Arquitetura de Pastas do Front-end

O código-fonte segue uma hierarquia de diretórios escalável e modularizada para facilitar a manutenção colaborativa do time:

```text
src/
├── assets/          # Mídia estática (Imagens, ilustrações como passageira-home.jpg)
├── components/      # Componentes compartilhados reutilizáveis
│   ├── footer/      # Rodapé padronizado com links e créditos
│   ├── modal/       # Modal dinâmico de busca rápida (VerCarona)
│   └── navbar/      # Cabeçalho adaptativo com busca e animações integradas
├── contexts/        # Estado global e autenticação (AuthContext)
├── models/          # Interfaces e contratos TypeScript (Usuario, UsuarioLogin)
├── pages/           # Views principais ligadas ao roteador do React
│   ├── home/        # Tela de boas-vindas e CTA
│   ├── sobre/       # Informações institucionais e valores da plataforma
│   └── viagem/      # Listagem de caronas e cadastro de novos trajetos
├── services/        # Configuração do Axios e chamadas à API remota (Service.ts)
├── App.css          # Estilos locais e animações de suporte
├── App.tsx          # Definição e amarração de Rotas (react-router-dom)
├── index.css        # Configurações globais do Tailwind 4.x e fontes Google Poppins
└── main.tsx         # Arquivo de entrada da aplicação
```

---

## 🛠️ Tecnologias & Bibliotecas Utilizadas

* **React 19 & TypeScript:** Construção da lógica de componentes com tipagem estática segura.
* **Vite 8:** Ferramenta de compilação ultra-rápida.
* **Tailwind CSS v4:** Estilização com utilitários otimizados e suporte nativo ao tema OKLCH.
* **Axios:** Cliente HTTP para comunicação assíncrona robusta com o back-end.
* **React Router DOM v7:** Motor de navegação de páginas *Single Page Application* (SPA).
* **Oxlint:** Linters de alto desempenho que substituem ferramentas tradicionais de análise estática de código com velocidade extrema.

---

## 👥 Organização do Time (Grupo 04)

O planejamento, metodologias ágeis (Scrum) e o desenvolvimento deste ecossistema contam com a colaboração de:

* 🔴 **Product Owner (PO):** Roberta Rodrigues
* 🔵 **Scrum Master:** Igor Kenzo
* 🟢 **Equipe de Desenvolvimento (Devs):**
  * Fabriciana Lima
  * Fernando Garcia Cabeceiro
  * Vinicius Vicente
* 💗 **QA / Tester:** Lilian Lacerda

---
<p align="center">Desenvolvido com dedicação e muito café pelo time Rachou 🚗✨</p>
