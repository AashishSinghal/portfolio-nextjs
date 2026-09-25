# aashishsinghal.com

Project directives live in **[AGENTS.md](./AGENTS.md)**. Read it before working in this
repo. The short version:

- **Vite + React 19 + Tailwind 4 SPA** on Vercel. Not Next.js, despite the repo name.
- **Keep it simple and dark-only.** Gold `#C49D71` (from the logo) and teal `#2DD4BF` are the
  only accents; everything else is black and grey. No decorative effects or theme switch.
  Propose design changes as ASCII mockups first.
- **All content is in `src/data/`.** Work history and skills come from the resume repo
  (`../aashish-resume`); `public/resume.pdf` is its fullstack build.
- **No placeholder or invented content**, ever. Leave fields empty and say so.
- Images appear only as case-study covers, never on the home or projects list.
- Blog posts are Markdown in `content/writing/`; `draft: true` posts show in dev only.
- Games are not here: they live at arcade.aashishsinghal.com (`../arcade`).
- Verify with `pnpm build` and `pnpm lint`. Pushing `main` deploys to production.
- Stop any dev server you start.

@AGENTS.md
