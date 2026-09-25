import { NextResponse, type NextRequest } from "next/server"
import { Redis } from "@upstash/redis"

const COUNTER_KEY = "portfolio:visits"
const COOKIE = "counted_visit"
// A browser is counted at most once per day, so reloads don't inflate the number
const COOKIE_MAX_AGE = 60 * 60 * 24

// The Vercel Marketplace Upstash integration injects KV_REST_API_*, a direct Upstash
// setup uses UPSTASH_REDIS_REST_*; accept either.
function getRedis() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? new Redis({ url, token }) : null
}

export const dynamic = "force-dynamic"

export async function GET() {
  const redis = getRedis()
  if (!redis) return NextResponse.json({ error: "Counter not configured" }, { status: 503 })

  const count = (await redis.get<number>(COUNTER_KEY)) ?? 0
  return NextResponse.json({ count })
}

// Records a visit (once per browser per day) and returns the current total
export async function POST(request: NextRequest) {
  const redis = getRedis()
  if (!redis) return NextResponse.json({ error: "Counter not configured" }, { status: 503 })

  try {
    if (request.cookies.has(COOKIE)) {
      const count = (await redis.get<number>(COUNTER_KEY)) ?? 0
      return NextResponse.json({ count })
    }

    const count = await redis.incr(COUNTER_KEY)
    const response = NextResponse.json({ count })
    response.cookies.set(COOKIE, "1", {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    return response
  } catch (error) {
    console.error("Error updating visitor count:", error)
    return NextResponse.json({ error: "Failed to update visitor count" }, { status: 500 })
  }
}
