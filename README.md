# rixwan44mts.github.io

Professional React + Vite landing page for an automation studio.

## Route Structure

- `/` → HeroPage (landing with liquid cursor background)
- `/services` → ServicesPage (6 service cards)
- `/case-study` → CaseStudyPage (construction client deep-dive)
- `/about` → AboutPage (story, stack, certs)
- `/contact` → ContactPage (booking + email form)

## Tech Notes

- Vite config is set with `base: '/'` in `vite.config.ts`.
- `index.html` is configured with the standard root mount and module script for deployment.
- PIXI is used for a cursor-driven liquid ripple background.
- React Router powers multi-page navigation.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Implemented Files

- `index.html`
- `vite.config.ts`
- `src/App.tsx`
- `src/index.css`
- `public/profile-portrait.svg`
- `README.md`
