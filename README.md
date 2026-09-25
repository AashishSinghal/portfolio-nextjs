# aashishsinghal.com

My portfolio: work, projects, and a small arcade of browser games.

Built with Vite, React 19, React Router and Tailwind CSS 4. Hosted on Vercel.

## Develop

```bash
pnpm install
pnpm dev       # http://localhost:5173
pnpm build     # type-check and build to dist/
pnpm lint
```

## Where things live

- `src/data/` – all content: profile and links, work history, projects. Edit these to update the site.
- `src/pages/` – routes: home, projects, project case study, arcade, game.
- `src/arcade/` – the games. Each is a self-contained file with a default game component and a `Preview` thumbnail, so they can move to their own app later.
- `api/visitor-count.ts` – Vercel function for the visit counter, backed by Upstash Redis.

### Case studies

Projects marked `featured: true` in `src/data/projects.ts` get a page at `/projects/<slug>`. Fill in `caseStudy.problem`, `caseStudy.built` and `caseStudy.challenges`; each section only shows once it has text.

## Environment variables

| Name                                   | Used for                                                                                                               |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `VITE_GA_MEASUREMENT_ID`               | Google Analytics (optional)                                                                                            |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Visit counter; added automatically by the Upstash integration on Vercel. The counter stays hidden until these are set. |

## License

MIT
