# AGENTS.md

Minimal SolidJS + Vite + Tailwind v4 time app ("Sand"). Client-only, no backend (client state via `localStorage`). Modules: Clock, Reminders (todos + alarms), Calendar, Monitor (stopwatch + timer). Goal: peak minimalism with a focus on UX and native performance.

## Commands

Uses **bun** (`bun.lock` is current; `pnpm-lock.yaml` is a leftover from the template — ignore it).

```bash
bun install
bun run dev              # vite dev server, port 3000 (bun start also works)
bun run build            # no typecheck; vite build only -> dist/
bun run serve            # preview built dist/
bun run typecheck        # tsc --noEmit
bun run lint             # biome check: lint + format + import order
bun run lint:fix         # biome check --write (apply safe fixes + format)
bun run format           # biome format --write
bun run organize-imports # biome: sort imports only (no lint/format)
```

There is **no** test script. Lint/format is **Biome** (`biome.json`, recommended rules); it respects `.gitignore` (`vcs.useIgnoreFile`), so `dist/` and `docs/` are skipped. CSS lint/format is **disabled on purpose** (Tailwind v4 `@apply`/`@theme`), so `src/styles/*.css` is untouched. Prefer `bun run organize-imports` to sort imports — `lint:fix` (`check --write`) also reformats everything. `bun run typecheck` runs `tsc --noEmit`; `tsconfig.json` needs `skipLibCheck` because `@types/bun` and `vite/client` ship conflicting global `ImportMeta` declarations. `build` does **not** typecheck. For Zed, `.zed/settings.json` runs organize-imports (and Biome formatting) on save.

## Architecture

- `src/index.tsx` — entry, mounts to `#root` from `index.html`, wires `Router` with `App` as the root layout.
- `src/routes.ts` — all routes. `/` -> `pages/home.tsx`, `/remainder` -> `pages/remainder.tsx`, `**` -> lazy `components/404.tsx`.
- `src/App.tsx` — shell: `<main>` + `Suspense` + fixed `<Navbar/>` footer.
- `src/components/navbar.tsx` — nav links.
- `@/*` aliases `src/*` (set in both `tsconfig.json` `paths` and via `resolve.tsconfigPaths` in `vite.config.ts`). Use `@/` imports.
- `Child` is a global ambient type declared in `declarations.d.ts`, used as `Component<Child>`.

## Product scope

- Implemented routes: `/` (Clock) and `/remainder` (Reminders — todos only).
- Calendar and Monitor are planned; no routes or pages exist yet.
- Spelling: code and nav intentionally use `remainder` / `calender` (and `localStorage["remainders"]`) while the docs/README use standard English "reminder"/"calendar". Keep code spellings as-is unless doing a deliberate rename. `navbar.tsx` links to `/calender`, which has no route and lands on the 404.
- Known gap: `remainder.tsx` reads `localStorage["remainders"]` on mount but never writes back, despite the in-file comment suggesting a `createEffect` — persistence is incomplete.

## Tailwind v4 (CSS-first)

No `tailwind.config.js`. All theme config lives in `src/styles/index.css`:

- `@import 'tailwindcss'` (v4 style).
- Design tokens are defined as CSS vars in `:root` then exposed via `@theme` (`--color-background`, `--color-foreground`, `--color-primary`, `--font-sans`). Add new colors/fonts here, not in a JS config.
- `center` is a custom `@utility` (flex centering) — use it as a class, not `justify-center items-center` everywhere.
- `@keyframes blink` is used inline via arbitrary values, e.g. `animate-[blink_1s_steps(1)_infinite]`.

## Assets & PWA

- `assets/` (repo root) holds design assets (fonts, images). `index.html` references them as `./assets/...`; CSS `url()` paths resolve relative to the CSS file, so `src/styles/index.css` reaches the font via `../../assets/fonts/...`.
- `public/` holds files copied verbatim to `dist/` root (unhashed, reference by absolute path): `manifest.json`, `sw.js`, and PWA icons `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`.
- App icon is `assets/images/logo.jpg` (512x512 JPEG). To change it, replace that file (keep it square) and regenerate the `public/` PWA icons from it with ImageMagick (Linux); the **maskable** icon needs ~80% content padding on `#0c0c0c` (e.g. resize to 410 then `-extent 512x512`), and apple-touch-icon is 180x180.
- Service worker `public/sw.js` (network-first, cache fallback) is registered from `src/index.tsx` only in production (`import.meta.env.PROD`), so dev is unaffected.
