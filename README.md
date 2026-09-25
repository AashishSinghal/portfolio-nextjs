# aashishsinghal.com

My portfolio: work and projects. The games live separately at [arcade.aashishsinghal.com](https://arcade.aashishsinghal.com) ([repo](https://github.com/AashishSinghal/arcade)).

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
- `src/pages/` – routes: home, projects, project case study.
- `api/visitor-count.ts` – Vercel function for the visit counter, backed by Upstash Redis.

### Case studies

Projects marked `featured: true` in `src/data/projects.ts` get a page at `/projects/<slug>`. Fill in `caseStudy.problem`, `caseStudy.built` and `caseStudy.challenges`; each section only shows once it has text.

## Analytics and environment variables

Page analytics use Vercel Web Analytics (`inject()` in `src/main.tsx`); enable it in the Vercel project. No keys needed.


| Name                                   | Used for                                                                                                               |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Visit counters for the portfolio and the arcade (one Upstash Redis database, added by the Upstash integration). Hidden until set. |

## License

MIT
