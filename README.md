# Sand

A minimal, focused time app. Peak minimalism, UX-first, and native-feeling performance.

Client-only SPA — no backend, no accounts. State lives in `localStorage`, so it works offline.

## Modules

| Module    | Purpose                  | Status                                                        |
| --------- | ------------------------ | ------------------------------------------------------------- |
| Clock     | Current time and date    | Done                                                          |
| Reminders | Todos and alarms         | Partial — todos (add/toggle, persisted); alarms not built     |
| Calendar  | Month view               | Planned                                                       |
| Monitor   | Stopwatch and timer      | Planned                                                       |

## Stack

SolidJS · TypeScript (strict) · Vite · Tailwind CSS v4

## Getting started

```bash
bun install
bun run dev     # http://localhost:3000
```

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `bun run dev`   | Vite dev server (port 3000)    |
| `bun run build` | Production build to `dist/`    |
| `bun run serve` | Preview the built output       |

## Deployment

Static output in `dist/` — deploy to any static host (Netlify, Cloudflare Pages, Surge, etc.).
