# Divvye Kansara — Portfolio

A neo-brutalist portfolio site with an AI assistant that answers recruiter questions in first person, grounded strictly in my résumé.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Lenis** and the **Groq SDK**.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then paste your Groq key into .env.local
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable        | Required | Default                   | Notes                                                  |
| --------------- | -------- | ------------------------- | ------------------------------------------------------ |
| `GROQ_API_KEY`  | yes      | —                         | Get one free at https://console.groq.com/keys          |
| `GROQ_MODEL`    | no       | `llama-3.3-70b-versatile` | Any Groq production model, e.g. `openai/gpt-oss-120b`  |

The key is only ever read server-side inside the API route, so it never reaches the browser.
Without a key the site still works — the chat just replies with a friendly "not wired up yet" message.

## Scripts

| Command         | What it does                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Dev server with Turbopack           |
| `npm run build` | Production build                    |
| `npm start`     | Serve the production build          |

---

## Structure

```
app/
  layout.tsx              # fonts, metadata, global shell (nav, résumé dock, chat)
  page.tsx                # section composition for the landing page
  globals.css             # design tokens + custom utilities (Tailwind v4 @theme)
  api/chat/route.ts       # Groq streaming endpoint for the AI assistant
  projects/[slug]/page.tsx# static project detail pages
components/
  Hero, About, Skills, Projects, AiBand, Achievements, Contact, Footer
  Navbar.tsx              # sticky nav with scroll-spy + mobile overlay menu
  ResumeDock.tsx          # always-visible résumé tab + in-page PDF viewer
  ChatWidget.tsx          # floating AI chat panel with token streaming
  ui/                     # Reveal, SplitText, Marquee, Magnetic, ProjectArt, Icons…
lib/
  resume.ts               # single source of truth for all résumé content
  chat-prompt.ts          # system prompt + résumé context for the LLM
  scroll.ts               # Lenis instance helpers
  events.ts               # tiny event bus to open the chat / résumé from anywhere
public/
  Divvye_Kansara_Resume.pdf
  divvye.jpg
```

### Editing content

Everything on the page — projects, skills, stats, links, achievements — comes from `lib/resume.ts`.
Update that one file and both the UI **and** the chatbot's knowledge update together.

To swap the résumé PDF, replace `public/Divvye_Kansara_Resume.pdf` (keep the filename, or update
`profile.resumePath`). To swap the portrait, replace `public/divvye.jpg`.

---

## The AI assistant

`app/api/chat/route.ts` streams tokens from Groq's chat completions API. The system prompt in
`lib/chat-prompt.ts` enforces the behaviour:

- answers in **first person** as me, so it reads like I'm replying
- **grounded** in the résumé context — no invented employers, metrics or experience
- asks **one clarifying question** when a request is too vague to answer usefully
- **never a flat "no"**: names the closest thing I've genuinely built, why it transfers, and a
  concrete plan to ramp up
- stays on topic, and hands off to email/LinkedIn when someone wants to move forward

Server-side guards: 14 requests per IP per minute, last 12 turns of history only, 1,200 characters
per message, and friendly messages for missing keys, bad keys and upstream rate limits.

## Deploying to Vercel

1. Push the repo to GitHub.
2. Import it in Vercel — the framework preset is detected automatically.
3. Add `GROQ_API_KEY` (and optionally `GROQ_MODEL`) as an environment variable.
4. Deploy. Project pages are prerendered; only `/api/chat` runs on demand.

---

## Design notes

- **Palette:** bone `#f2efe6`, ink `#0b0b0b`, acid `#d5f84a`, volt `#1f1fff` — all defined as
  Tailwind theme tokens in `globals.css`, so changing the accent is a one-line edit.
- **Type:** Anton for display, Space Grotesk for body, JetBrains Mono for labels, Instrument Serif
  for italic accents.
- **Motion:** masked word-by-word headline reveals, magnetic buttons, parallax hero, marquee
  tickers, procedural project cover art, Lenis smooth scroll. Everything respects
  `prefers-reduced-motion`.
