# AGENTS.md - minc.cg

Always use Context7 when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

## Build & Dev Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build (rolldown-vite)
npm run lint     # ESLint flat config
npm run preview  # Preview production build locally
```

No typecheck, no test suites, no CI.

## Architecture

- **Vite + React 19 SPA** — NOT Next.js. The `next` dependency exists only for `@vercel/analytics/next`.
- **rolldown-vite** (`npm:rolldown-vite@7.1.14`) aliased as `vite` via `overrides` in `package.json`.
- **react-router-dom v7** with `BrowserRouter` for client-side routing.
- **Sass** with indented `.sass` syntax (no braces). Entry: `src/styles/app.sass`.
- **React Compiler** (`babel-plugin-react-compiler`) active via Vite config.
- No TypeScript.

## Directory Quirks

- `src/componets/` is the real directory name. **Do NOT rename to `components`** — every import uses this path.

## Backend API

- Backend: `https://minc-cg-back.onrender.com`
- `VITE_API_URL` env var used by `ProductPage.jsx`, but `Market.jsx` hardcodes the backend URL directly.
- Copy `env.example` to `.env` for local dev (`VITE_API_URL`, `VITE_SNIPCART_API_KEY`).

## E-Commerce

- **Snipcart v3** handles checkout (inlined script in `index.html`). Stripe is managed internally by Snipcart — `@stripe/stripe-js` is a dep but never directly imported.
- Snipcart public API key is hardcoded in `index.html`.

## Data Sources

- **Videos & Programming**: Static data in `src/utils/videos.js` and `src/utils/programming.js`.
- **Market products**: Fetched from the backend API at runtime.
- `src/utils/market.js` is **unused** — not imported anywhere.

## Deploy

- **Vercel** with SPA fallback routing (`vercel.json` rewrites all non-file paths to `/`).

## Style

- `.jsx` extensions for React components.
- Two custom fonts: VCR OSD Mono (`.woff2`) and Questiora (`.ttf`), loaded in `app.sass`.
- `color-scheme: dark` on `:root`.
