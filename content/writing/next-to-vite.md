---
title: Moving my portfolio from Next.js to Vite
date: 2026-09-25
summary: My portfolio's dev server was hanging my laptop, so I rewrote it on Vite and cut everything that wasn't earning its place.
---

My portfolio had been a Next.js app since 2019. Over the years it collected a photo wall, an animated background, a section-by-section icon bar, a placeholder blog and a page of games that couldn't be played. Then the dev server started hanging my laptop, and I decided to start over.

## Why it was slow

The site is a handful of pages with no server-side data. Next.js was doing a lot of work to support features I wasn't using:

- a 15-second compile before the homepage showed up in dev
- a dev server using about 900 MB of memory
- a 22 MB development bundle for a single page

None of that is Next.js's fault. It's a framework for apps that need server rendering, and mine didn't.

## The rewrite

Vite with React Router covers everything the site actually does. The port itself was mostly mechanical:

1. Replace `next/image` and `next/link` with a plain `<img>` and React Router's `<Link>`.
2. Move the one API route into a Vercel function in `api/`.
3. Load Google Analytics from a `VITE_` environment variable instead of a `NEXT_PUBLIC_` one.

The dev server now starts in about 300 ms:

```bash
$ pnpm dev

  VITE v8.3.1  ready in 332 ms

  ➜  Local:   http://localhost:5173/
```

| | Next.js 14 | Vite 8 |
| --- | --- | --- |
| Dev server ready | ~4 s | ~0.3 s |
| Homepage first load in dev | ~15 s compile | ~1 s |

## Cutting the rest

Speed was the reason to start, but the bigger change was deciding what the site is for. I tried an 8-bit redesign on the way, and it was fun for about an hour.

> A portfolio is read by people deciding whether to talk to you. Everything on it should help them decide.

Removing the extra sections and their dependencies took the production bundle from 646 KB to 262 KB. The site is now one page: what I do, where I've worked, a few projects with real write-ups, and a way to reach me. The games moved to their own home at [arcade.aashishsinghal.com](https://arcade.aashishsinghal.com), and this blog only exists because there's finally something to put in it.

![The old portfolio, with its photo wall and script logo](/meta-ss.png)

## What I'd tell myself

Pick the framework for the site you have, not the one you might build. And when you redesign, start by deleting things.
