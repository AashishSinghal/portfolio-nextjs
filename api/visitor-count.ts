import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Redis } from "@upstash/redis"

// One counter per site, all in one Redis database (key `<site>:visits`). Sites on their own
// subdomain call this endpoint cross-origin with ?site=<name>.
//
// To count a new project: add one line here (site name → the origins it's served from), then
// add the client component to the project. See the `site-visit-counter` skill in
// github.com/AashishSinghal/agent-skills.
const SITES: Record<string, string[]> = {
  portfolio: ["https://aashishsinghal.com", "https://www.aashishsinghal.com"],
  arcade: ["https://arcade.aashishsinghal.com"],
  "coupon-press": ["https://coupon-press.aashishsinghal.com"],
}

const ALLOWED_ORIGINS = new Set(Object.values(SITES).flat())

// The Vercel Marketplace Upstash integration injects KV_REST_API_*, a direct Upstash
// setup uses UPSTASH_REDIS_REST_*; accept either
function getRedis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? new Redis({ url, token }) : null
}

function allowCors(request: VercelRequest, response: VercelResponse) {
  const origin = request.headers.origin
  if (origin && (ALLOWED_ORIGINS.has(origin) || origin.startsWith("http://localhost:"))) {
    response.setHeader("Access-Control-Allow-Origin", origin)
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.setHeader("Vary", "Origin")
  }
}

// GET returns the site's total; POST records a visit and returns the new total.
// Browsers dedupe themselves (once per day, see the client), so the server just counts.
export default async function handler(request: VercelRequest, response: VercelResponse) {
  allowCors(request, response)
  if (request.method === "OPTIONS") return response.status(204).end()

  const site =
    new URL(request.url ?? "/", "http://localhost").searchParams.get("site") ?? "portfolio"
  if (!Object.hasOwn(SITES, site)) return response.status(400).json({ error: "Unknown site" })

  const redis = getRedis()
  if (!redis) return response.status(503).json({ error: "Counter not configured" })

  const key = `${site}:visits`
  try {
    const count =
      request.method === "POST" ? await redis.incr(key) : ((await redis.get<number>(key)) ?? 0)
    return response.status(200).json({ count })
  } catch (error) {
    console.error("Visitor count failed:", error)
    return response.status(500).json({ error: "Failed to read visitor count" })
  }
}
