<p align="center">
  <img src="src/assets/icons/scissors.svg" alt="Logo WanyHair Agenda" width="90" />
</p>

<h1 align="center">💇‍♀️ WanyHair Agenda V1</h1>
<p align="center">Agenda inteligente para salões de beleza com validações de horários, UX refinada e visual premium.</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Webpack-1C78C0?style=for-the-badge&logo=webpack&logoColor=white" alt="Webpack" />
  <img src="https://img.shields.io/badge/JSON%20Server-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON Server" />
  <img src="https://img.shields.io/badge/Day.js-000000?style=for-the-badge&logo=dayjs&logoColor=white" alt="Day.js" />
</p>

<a id="indice"></a>

## 📌 Índice

- [💡 Sobre o Projeto](#sobre-o-projeto)
- [🎬 Demo](#demo)
- [✨ Funcionalidades](#funcionalidades)
- [🚀 Tecnologias](#tecnologias)
- [🧠 Conceitos Aplicados](#conceitos-aplicados)
- [🎯 Destaques Técnicos](#destaques-tecnicos)
- [📱 Responsividade](#responsividade)
- [🎨 Design System](#design-system)
- [📁 Estrutura do Projeto](#estrutura-do-projeto)
- [🔧 Instalação](#instalacao)
- [📖 Como Usar](#como-usar)
- [🗺️ Roadmap](#roadmap)
- [🎓 Aprendizados](#aprendizados)
- [🤝 Contribuições](#contribuicoes)
- [👨‍💻 Autor](#autor)

<a id="sobre-o-projeto"></a>

## 💡 Sobre o Projeto

Este projeto simula uma agenda profissional para salão de beleza, permitindo gerenciar serviços, horários e clientes de forma elegante e responsiva. A aplicação foi pensada para demonstrar arquitetura front-end modular, validações de negócio e uma experiência de uso premium.

O que o projeto demonstra tecnicamente:

- Organização em camadas (api, app, ui, state, utils) com responsabilidades claras.
- Estado centralizado com renderização reativa, evitando acoplamento entre UI e dados.
- Validações de horário e conflitos usando Day.js e regras de negócio.
- UX refinada: loaders, mensagens de status, animações e feedback imediato.

Foco em habilidades desenvolvidas:

- JavaScript moderno (ES Modules, async/await, DOM API, Fetch).
- CSS avançado com design system, glassmorphism e tipografia fluida.
- Boas práticas de organização de projeto e leitura de estado.

<a id="demo"></a>

## 🎬 Demo

- **Deploy:** Em breve
- **Preview visual:**

<p align="center">
  <img src="https://placehold.co/1200x700/0a0a0a/d6b36a?text=WanyHair+Agenda+Preview" alt="Preview WanyHair Agenda" />
</p>

<a id="funcionalidades"></a>

## ✨ Funcionalidades

**Core Features**

- ✅📆 Cadastro de agendamentos por data e horário
- ✅💇‍♀️ Catálogo de serviços carregado via API (JSON Server)
- ✅🕒 Organização automática por períodos (manhã, tarde, noite)
- ✅🗑️ Cancelamento de agendamentos diretamente na lista

**Validações e UX**

- ✅⏰ Bloqueio de horários antes da abertura (08:00)
- ✅🚫 Prevenção de conflitos de horários (overlap)
- ✅📨 Mensagens de status e erro em tempo real
- ✅🧠 Botão de submit habilitado apenas quando o draft é válido
- ✅✨ Loader animado e transições suaves na interface
- ✅🟢 Status de agenda aberta entre 08:00 e 21:00

<a id="tecnologias"></a>

## 🚀 Tecnologias

**Frontend**

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox, Clamp)
- JavaScript ES6+
- Day.js `^1.11.10`

**Backend (mock API)**

- JSON Server `0.17.4`

**Ferramentas**

- Webpack `^5.89.0`
- Babel `^7.23.7`
- Webpack Dev Server `^4.15.1`
- Lucide Icons (CDN)
- Unicorn Studio (background visual)

<a id="conceitos-aplicados"></a>

## 🧠 Conceitos Aplicados

**JavaScript**

- ✅ ES Modules e organização por domínio
- ✅ async/await com tratamento de erros
- ✅ Fetch API com wrapper de request
- ✅ Imutabilidade e atualização parcial de estado
- ✅ Event delegation em listas dinâmicas
- ✅ Guard clauses para legibilidade
- ✅ Manipulação de datas com Day.js

**CSS**

- ✅ Design System com CSS Variables
- ✅ Tipografia fluida com `clamp()`
- ✅ Layout responsivo com Grid e Flexbox
- ✅ Glassmorphism com `backdrop-filter`
- ✅ Animações via `@keyframes`
- ✅ Gradientes e efeitos de glow
- ✅ Acessibilidade básica com `:focus-visible`

**Arquitetura**

- ✅ Separação por camadas (api/app/ui/state/utils)
- ✅ Fluxo de dados unidirecional
- ✅ Renderização desacoplada do estado
- ✅ Reuso de utilitários para datas e horários

<a id="destaques-tecnicos"></a>

## 🎯 Destaques Técnicos

### 1) Validação inteligente do agendamento

```javascript
// Validação centralizada do rascunho antes de liberar o submit.
import {
  buildInterval,
  hasConflict,
  isOnOrAfterOpenTime,
} from "../../utils/time.js";

export function validateBookingDraft({ draft, services, schedulesOfDay }) {
  const clientName = draft.clientName?.trim() ?? "";
  // Regra 1: campos obrigatórios
  if (!draft.date || !draft.time || !draft.serviceId || !clientName) {
    return { isValid: false, reason: "missing_fields" };
  }
  // Regra 2: horário mínimo do salão
  if (!isOnOrAfterOpenTime(draft.time, "08:00")) {
    return { isValid: false, reason: "before_open_time" };
  }
  const service = services.find(
    (s) => String(s.id) === String(draft.serviceId),
  );
  if (!service) return { isValid: false, reason: "service_not_found" };
  const durationMin = Number(service.durationMin);
  const candidateInterval = buildInterval({
    date: draft.date,
    time: draft.time,
    durationMin,
  });
  if (hasConflict(schedulesOfDay, candidateInterval)) {
    return { isValid: false, reason: "conflict" };
  }
  return { isValid: true, reason: null };
}
```

**Como funciona?**
A validação é centralizada e retorna um motivo específico para cada falha, permitindo feedback de UI mais claro.

- Foco em regras de negócio antes de chamadas de rede.
- Motivos explícitos simplificam mensagens para o usuário.
- Evita agendamentos inválidos e conflitos de horário.

### 2) Intervalos confiáveis e detecção de conflito

```javascript
import dayjs from "dayjs";

function buildStart(date, time) {
  // Normaliza data + hora em um único timestamp
  return dayjs(`${date}T${time}`);
}

export function buildInterval({ date, time, durationMin }) {
  const start = buildStart(date, time);
  const end = start.add(durationMin, "minute");
  return {
    startMs: start.valueOf(),
    endMs: end.valueOf(),
    startAtISO: start.toISOString(),
    endAtISO: end.toISOString(),
  };
}

export function overlaps(a, b) {
  // Regra clássica de overlap entre intervalos
  return a.startMs < b.endMs && a.endMs > b.startMs;
}
```

**Por que essa abordagem?**
O cálculo é feito por milissegundos, garantindo precisão e fácil comparação.

- Abstrai a manipulação de datas em utilitários reutilizáveis.
- Permite validar conflitos antes de salvar no backend.
- Facilita testes de regras de disponibilidade.

### 3) Store imutável com atualização granular

```javascript
let state = {
  services: [],
  schedulesOfDay: [],
  bookingDraft: { date: "", time: "", serviceId: "", clientName: "" },
  draftStatus: { isValid: false, reason: null },
  ui: {
    loadingServices: false,
    loadingSchedules: false,
    savingSchedule: false,
    errorSaveSchedule: null,
  },
};

const listeners = new Set();

export function setState(patch) {
  // Merge shallow + merge profundo para sub-objetos críticos
  state = {
    ...state,
    ...patch,
    bookingDraft: { ...state.bookingDraft, ...(patch.bookingDraft ?? {}) },
    draftStatus: { ...state.draftStatus, ...(patch.draftStatus ?? {}) },
    ui: { ...state.ui, ...(patch.ui ?? {}) },
  };
  listeners.forEach((fn) => fn(state));
}
```

**Como funciona?**
A store centraliza o estado e dispara renderizações apenas quando algo muda.

- Atualizações parciais evitam sobrescrever dados intactos.
- `Set` de listeners simplifica assinaturas e evita duplicidade.
- UI reage ao estado sem acoplamento direto aos eventos.

### 4) Renderização da agenda por período

```javascript
import {
  groupSchedulesByPeriod,
  formatTimeHHmm,
  formatDateDDMMYYYY,
} from "../../utils/schedulePeriods.js";

function createScheduleLi(schedule, serviceName, dateLabel) {
  const li = document.createElement("li");
  const strong = document.createElement("strong");
  strong.textContent = formatTimeHHmm(schedule.startAt);
  const client = document.createElement("span");
  client.className = "schedule-client";
  client.textContent = schedule.clientName;
  const service = document.createElement("span");
  service.className = "schedule-service";
  service.textContent = serviceName;
  const date = document.createElement("span");
  date.className = "schedule-date";
  date.textContent = dateLabel;
  li.append(strong, client, service, date);
  return li;
}

function renderPeriod(ulEl, schedules, servicesById) {
  if (!ulEl) return;
  const fragment = document.createDocumentFragment();
  for (const s of schedules) {
    const serviceName = servicesById.get(String(s.serviceId)) ?? "Sem serviço";
    const dateLabel = formatDateDDMMYYYY(s.startAt);
    fragment.appendChild(createScheduleLi(s, serviceName, dateLabel));
  }
  ulEl.replaceChildren(fragment);
}

export function renderAgendaOfDay(dom, schedules, services) {
  const grouped = groupSchedulesByPeriod(schedules);
  const servicesById = new Map(services.map((s) => [String(s.id), s.name]));
  renderPeriod(dom.periodMorning, grouped.morning, servicesById);
  renderPeriod(dom.periodAfternoon, grouped.afternoon, servicesById);
  renderPeriod(dom.periodNight, grouped.night, servicesById);
}
```

**Por que essa abordagem?**
A renderização por período garante organização visual e performance com `DocumentFragment`.

- Evita múltiplos reflows ao inserir vários itens.
- Mantém o DOM limpo e fácil de atualizar.
- Separa regras de agrupamento da renderização final.

### 5) Consulta por data com filtros no JSON Server

```javascript
import dayjs from "../../libs/dayjs.js";
import { requestJson } from "./http.js";

export async function listSchedulesByDate(date) {
  if (!date) return [];
  const from = dayjs(date).startOf("day").toISOString();
  const to = dayjs(date).endOf("day").toISOString();

  // Filtros nativos do JSON Server para range e ordenação
  const qs = new URLSearchParams({
    startAt_gte: from,
    startAt_lte: to,
    _sort: "startAt",
    _order: "asc",
  });

  return requestJson(`/schedules?${qs.toString()}`);
}
```

**Como funciona?**
A busca é otimizada por data, reduzindo volume de dados no front.

- Mantém a lista ordenada por horário de início.
- Simula paginação/filtragem real de APIs REST.
- Facilita a atualização da agenda ao trocar a data.

<a id="responsividade"></a>

## 📱 Responsividade

A abordagem é **mobile-first**, com escalas fluidas e pontos de quebra apenas quando necessário. O layout cresce naturalmente com `clamp()` e ajusta a grade no desktop.

```css
:root {
  --fs-1: clamp(0.95rem, 0.9rem + 0.28vw, 1.05rem);
  --fs-3: clamp(1.45rem, 1.15rem + 1.35vw, 2.05rem);
  --sp-2: clamp(0.75rem, 0.65rem + 0.45vw, 1rem);
  --sp-4: clamp(1.25rem, 1rem + 1.2vw, 2rem);
  --container: 72rem;
}

.container {
  width: min(calc(100% - (2 * var(--sp-2))), var(--container));
}

@media (min-width: 64rem) {
  .main {
    grid-template-columns: 7fr 5fr;
  }
  .header {
    grid-template-columns: 1fr auto;
  }
}
```

**Por que funciona bem?**

- Tipografia e espaçamentos crescem de forma suave em qualquer tela.
- O layout mantém foco no formulário em telas menores.
- A mudança para duas colunas acontece apenas quando há espaço real.

<a id="design-system"></a>

## 🎨 Design System

A identidade visual utiliza tons dourados sobre fundo obsidian, com cards em glassmorphism e gradientes sutis.

```css
:root {
  --gold-100: #f9f1d8;
  --gold-300: #d6b36a;
  --gold-500: #8c6b3d;
  --obsidian-900: #050505;
  --obsidian-surface: #121212;
  --c-text: #ededed;
  --c-border: rgba(255, 255, 255, 0.08);
  --shadow-card: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

**Tokens principais**
| Token | Valor | Uso |
|------|-------|-----|
| `--sp-1` | `clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem)` | Espaçamento micro |
| `--sp-2` | `clamp(0.75rem, 0.65rem + 0.45vw, 1rem)` | Espaçamento base |
| `--sp-3` | `clamp(1rem, 0.85rem + 0.8vw, 1.5rem)` | Espaçamento médio |
| `--sp-4` | `clamp(1.25rem, 1rem + 1.2vw, 2rem)` | Espaçamento macro |
| `--r-sm` | `0.75rem` | Raios pequenos |
| `--r-md` | `1rem` | Campos e botões |
| `--r-lg` | `1.25rem` | Cards principais |
| `--shadow-card` | `0 25px 50px -12px rgba(0,0,0,0.5)` | Profundidade dos cards |

**Efeitos especiais aplicados**

- Glassmorphism com `backdrop-filter` e bordas translúcidas.
- Gradientes dourados nos botões e títulos.
- Glow suave em elementos de destaque.

<a id="estrutura-do-projeto"></a>

## 📁 Estrutura do Projeto

```
📦 WanyHairAgendaV1
├─ 📄 index.html
├─ 📄 server.json
├─ 📄 webpack.config.js
├─ 📄 package.json
├─ 📁 src
│  ├─ 📁 assets
│  │  └─ 📁 icons
│  │     ├─ 🖼️ cancel.svg
│  │     └─ 🖼️ scissors.svg
│  ├─ 📁 js
│  │  ├─ 📁 api
│  │  ├─ 📁 app
│  │  ├─ 📁 events
│  │  ├─ 📁 state
│  │  ├─ 📁 ui
│  │  ├─ 📄 background.js
│  │  ├─ 📄 icons.js
│  │  ├─ 📄 loader.js
│  │  └─ 📄 main.js
│  ├─ 📁 styles
│  │  ├─ 📄 global.css
│  │  ├─ 📄 layout.css
│  │  ├─ 📄 form.css
│  │  ├─ 📄 schedule.css
│  │  ├─ 📄 ui.css
│  │  ├─ 📄 effects.css
│  │  └─ 📄 loader.css
│  ├─ 📁 utils
│  │  ├─ 📄 time.js
│  │  └─ 📄 schedulePeriods.js
│  └─ 📁 libs
│     └─ 📄 dayjs.js
├─ 📁 dist
└─ 📄 README.md
```

**Organização modular**

- `api/`: comunicação com JSON Server.
- `app/`: fluxos principais (init, submit, delete).
- `state/`: store central e validações.
- `ui/`: renderização e atualização de DOM.
- `utils/`: regras de tempo e agrupamento.

<a id="instalacao"></a>

## 🔧 Instalação

**Pré-requisitos**

- Node.js e npm instalados

**Passo a passo**

```bash
# 1) Clone o repositório
git clone https://github.com/juninalmeida/WanyHairAgendaV1.git

# 2) Acesse a pasta
cd WanyHairAgendaV1

# 3) Instale as dependências
npm install

# 4) Inicie a API (JSON Server)
npm run server

# 5) Em outro terminal, rode o front
npm run dev
```

**Portas locais**

- Frontend: `http://localhost:3000`
- API (JSON Server): `http://localhost:3333`

**Deploy (GitHub Pages / Vercel)**

- Build do projeto: `npm run build`
- Publicar a pasta `dist/` como site estático.
- Para dados reais, substitua o JSON Server por uma API hospedada.
  - **GitHub Pages:** configurar publicação do diretório `dist/`.
  - **Vercel:** Build Command `npm run build` e Output `dist`.

<a id="como-usar"></a>

## 📖 Como Usar

1. Selecione a **data** desejada no formulário.
2. Escolha o **horário** e o **serviço** disponível.
3. Informe o **nome da cliente**.
4. Clique em **Confirmar agendamento**.
5. Veja a agenda do dia organizada por períodos.
6. Clique no ícone de **cancelar** para remover um agendamento.

> Dica: o status “Agenda Aberta/Fechada” atualiza automaticamente conforme o horário.

<a id="aprendizados"></a>

## 🎓 Aprendizados

**Front-end**

- Modularização de código com ES Modules
- Consumo de API mock com JSON Server
- Gestão de estado com atualização reativa

**UI/UX**

- Construção de um design system consistente
- Feedbacks visuais e mensagens de status
- Animações sutis para percepção de qualidade

**Arquitetura**

- Separação de responsabilidades por camada
- Reuso de utilitários e redução de acoplamento

<a id="contribuicoes"></a>

<a id="autor"></a>

## 👨‍💻 Autor

<p align="center">
  <img src="https://github.com/juninalmeida.png?size=200" alt="Foto de Horacio Junior" width="160" />
</p>

<p align="center"><strong>Horacio Junior</strong></p>

<p align="center">
  <a href="https://www.linkedin.com/in/j%C3%BAnior-almeida-3563a934b/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/juninalmeida">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="mailto:junioralmeidati2023@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</p>

<p align="center">Desafio Prático</p>
