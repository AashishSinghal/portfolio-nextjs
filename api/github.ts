import type { VercelRequest, VercelResponse } from "@vercel/node"

// Daily contribution counts for the home page graph, from github-contributions-api.jogruber.de,
// which reads the public profile calendar (no token needed; private work is included only if
// "private contributions" is switched on in the GitHub profile). The CDN caches it for an hour.

// Same account as `githubUser` in src/data/profile.ts
const githubUser = "AashishSinghal"

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }

async function getCalendar(): Promise<{ total: number; days: Day[] } | null> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`
  )
  if (!response.ok) return null
  const data = (await response.json()) as { total?: { lastYear?: number }; contributions?: Day[] }
  if (!Array.isArray(data.contributions) || typeof data.total?.lastYear !== "number") return null
  return { total: data.total.lastYear, days: data.contributions }
}

export default async function handler(_request: VercelRequest, response: VercelResponse) {
  try {
    const calendar = await getCalendar()
    if (!calendar) return response.status(502).json({ error: "Contributions unavailable" })

    response.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400")
    return response.status(200).json({ user: githubUser, ...calendar })
  } catch {
    return response.status(502).json({ error: "Contributions unavailable" })
  }
}
