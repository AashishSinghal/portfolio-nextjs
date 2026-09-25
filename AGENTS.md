# aashishsinghal.com: Project Directives

Aashish Singhal's personal portfolio: a short, text-first site with work history, projects
(with case-study pages), writing and contact. It is deliberately simple. Games live in a separate app,
[arcade.aashishsinghal.com](https://arcade.aashishsinghal.com)
([repo](https://github.com/AashishSinghal/arcade)).

Stack: Vite 8, React 19, React Router 8, Tailwind CSS 4, TypeScript 6. Hosted on Vercel from
`main`. The repo is still named `portfolio-nextjs` for history; it is no longer a Next.js app.

## Prime directives

1. **Keep it simple.** The owner explicitly rejected busy designs: an 8-bit/pixel theme, the
   animated line/starfield background, photo walls, icon-bar navigation. Don't reintroduce
   decorative effects, extra sections or theme machinery without being asked. When unsure,
   propose the layout as an ASCII mockup first; that's how design decisions get made here.
2. **Dark mode only.** There is no theme switch and no light palette. Don't add `dark:` variants.
3. **Two accent colours, everything else black and grey:**
   - `gold` `#C49D71`, taken from the logo: brand accent (active nav item, section markers,
     primary buttons, hover on titles).
   - `teal` `#2DD4BF`: secondary accent (link hover, focus rings, bullets).
   - One font: Albert Sans (loaded in `index.html`). Mono only for numbers and dates.
4. **Images only on dedicated pages.** Home and the projects list are text-only. A project's
   `image` is shown only as the Medium-style cover at the top of its case-study page.
5. **Content must be real.** Everything here was once full of placeholders: fake blog posts,
   fake projects, a hardcoded visitor count, a contact form that sent nothing. Never add
   placeholder or invented content. If data is missing, leave the field empty (case-study
   sections only render when filled) and tell the owner.
6. **The resume is the source of truth for work history and skills.** Source:
   `/Users/100ms/personal/aashish-resume` (LaTeX, built PDFs in `build/`). When the resume
   changes, update `src/data/work.ts` and `src/data/profile.ts` and re-copy
   `build/Aashish-Singhal-fullstack.pdf` to `public/resume.pdf`. The PDF intentionally
   includes the phone number; don't edit it.

## Architecture

```
index.html            meta/SEO/OG tags (shared by every route; it's a client-rendered SPA), fonts
src/
  main.tsx            entry; loads GA from VITE_GA_MEASUREMENT_ID
  app.tsx             routes: / · /projects · /projects/:slug · /writing · /writing/:slug · 404
  styles/globals.css  Tailwind 4 @theme tokens (colours, fonts) + base styles. No JS config.
  data/               ALL content lives here; edit these to update the site
    profile.ts        name, role, intro, links (github, linkedin, resume, arcade…), skills, Formspark id
    work.ts           jobs with 2–3 measurable highlights each (from the resume)
    projects.ts       projects; `featured: true` = has a case-study page; `caseStudy` sections
    writing.ts        loads content/writing/*.md, parses frontmatter, drafts, reading time
  components/         layout (nav, footer, scroll handling), section, project-row,
                      contact-form, external-link, visitor-count
  pages/              home, projects, project (case study), writing, post, not-found
  lib/                utils (cn), analytics, use-document-title
content/writing/      blog posts as Markdown (filename = URL slug)
api/visitor-count.ts  Vercel function: Upstash Redis visit counter (hidden until configured)
vite.config.ts        runs api/*.ts in `vite dev`; strips draft posts from production builds
vercel.json           Vite preset, SPA rewrite, redirects /arcade, /arcade/:path*, /games → arcade
public/               logo.png, favicon.ico, meta-ss.png, resume.pdf, images/projects/*.webp
```

- **Home** shows the first 4 featured projects (`featuredProjects.slice(0, 4)`), so order in
  `projects.ts` matters. Current order: Voice Agent, Coupon Press, Videostil, AI Incident
  Triage, then totp-web, AI Detect, Alpha Exchange, CryptoWatch (all featured), then the rest.
- **Case studies** have three optional sections, `problem`, `built` and `challenges`, rendered
  as "The problem" / "What I built" / "Hard parts". Separate paragraphs with a blank line (`\n\n`).
  Write them from the project's own README/source; don't embellish.
- **Writing** (blog): each post is `content/writing/<slug>.md` with frontmatter `title`,
  `date` (YYYY-MM-DD), `summary`, and optional `draft: true`. Rendered with `marked` (GFM) and
  styled by the `.prose` rules in `globals.css`. **Drafts show only in `pnpm dev`**: the
  runtime filter hides them, and a build plugin in `vite.config.ts` keeps their text out of
  the production bundle. The nav item and home section appear only when a visible post
  exists. To publish, delete the `draft` line. The first post, `next-to-vite.md`, is about
  this site's migration; its numbers were measured during the migration.
- **Cover images**: capture the live app at 1440×900 @2x, crop empty space, save as ~1600px
  wide WebP (quality ~82) in `public/images/projects/`. Older covers are on Vercel Blob URLs.

## Commands

```bash
pnpm install
pnpm dev        # Vite dev server (starts in ~300ms)
pnpm build      # tsc -b && vite build → dist/
pnpm lint       # eslint (flat config)
```

A husky pre-commit hook runs `eslint --fix` on staged files (lint-staged).

## Environment variables (Vercel)

| Name | Purpose |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics. Renamed from `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Vite move; the Vercel value must use the new name. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_*`) | Visit counter. Added by the Upstash integration. Without them the API returns 503 and the counter stays hidden. |

The contact form posts to Formspark (`profile.formsparkId`, forwards to the owner's inbox).
On failure it shows an honest error with a LinkedIn fallback, never a fake "thanks".

## Conventions and gotchas

- **TypeScript is pinned to 6.** typescript-eslint doesn't support TS 7 yet.
- **eslint-plugin-react-hooks v7:** only `rules-of-hooks` and `exhaustive-deps` are enabled.
  The React Compiler rules were left off during the port.
- **React Router doesn't scroll on navigation**; `useScrollOnNavigate` in `layout.tsx` handles
  `#hash` targets (e.g. `/#work`, `/#contact`) and scroll-to-top.
- **Nav items** can be internal (`to`) or external (`href`); the Arcade item is external.
- **Page titles** come from `useDocumentTitle`; the default is `name · role`.
- **SEO trade-off (accepted):** client-rendered SPA, so all routes share `index.html` meta.
- **Commits:** imperative subject, short body explaining why, and the trailer
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` when an agent wrote it.
  Pushing `main` deploys to production.
- **Dev servers:** the owner's machine struggles with lingering servers. Stop any dev server
  you start.

## History (why things are the way they are)

- **Sep 2026:** the site was Next.js 14 with a busy multi-section design (photo wall, animated
  background, icon-bar nav, fake blog and games), and the dev server was hanging the machine. It was rewritten on Vite (commit `613dcea`), then simplified to
  the current one-page design (`ca63349`). An 8-bit redesign was tried and rejected; it
  survives only as a local `git stash` ("8-bit redesign + games + visitor counter (pre-Vite)").
- **Project list cleanup:** removed three placeholder projects whose links were dead (a
  WhatsApp clone site, "GitHub User Search" subdomain, "Screen Recorder" repo). Fixed the
  mislabelled "Expense Tracker" (it was the GitHub user search app) and "Admin Panel" (it was
  the Electron screen recorder). Recovered the real `whatsapp-mern`, `admin-panel` and
  `expense-speech-app` repos from GitHub.
- **Arcade:** six games were built here, then moved to the separate arcade app so it can run
  on its own subdomain (possibly with ads, which must never go on the portfolio). Only Tic
  Tac Toe has been ported so far. The other five (Snake, Breakout, Memory Match, Puzzle
  Slider, Word Scramble) exist in this repo's history under `src/arcade/games/` (before
  commit `3889831`), ready to copy into the arcade repo.

## Open items

- Connect `arcade.aashishsinghal.com` in Vercel. Until then the Arcade links don't resolve.
- Port the remaining five games to the arcade repo.
- Writing: live since Sep 2026 with one post (`content/writing/next-to-vite.md`).
- Other repos the owner might list: `render-diff-react`, `watch2gather`.
