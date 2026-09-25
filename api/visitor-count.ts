import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Redis } from "@upstash/redis"

const COUNTER_KEY = "portfolio:visits"
const COOKIE = "counted_visit"
// A browser is counted at most once a day, so reloads don't inflate the number
const COOKIE_MAX_AGE = 60 * 60 * 24

// The Vercel Marketplace Upstash integration injects KV_REST_API_*, a direct Upstash
// setup uses UPSTASH_REDIS_REST_*; accept either
function getRedis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? new Redis({ url, token }) : null
}

// GET returns the total; POST records this visit (once per browser per day) and
// returns the new total
export default async function handler(request: VercelRequest, response: VercelResponse) {
  const redis = getRedis()
  if (!redis) return response.status(503).json({ error: "Counter not configured" })

  try {
    const alreadyCounted = request.headers.cookie?.includes(`${COOKIE}=1`)

    if (request.method !== "POST" || alreadyCounted) {
      const count = (await redis.get<number>(COUNTER_KEY)) ?? 0
      return response.status(200).json({ count })
    }

    const count = await redis.incr(COUNTER_KEY)
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : ""
    response.setHeader(
      "Set-Cookie",
      `${COOKIE}=1; Max-Age=${COOKIE_MAX_AGE}; Path=/; HttpOnly; SameSite=Lax${secure}`
    )
    return response.status(200).json({ count })
  } catch (error) {
    console.error("Error updating visitor count:", error)
    return response.status(500).json({ error: "Failed to update visitor count" })
  }
}
