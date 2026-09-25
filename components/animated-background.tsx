"use client"

import { useContext, useEffect, useRef } from "react"
import { ThemeContext } from "@/contexts/theme-provider"

// Size of one "pixel" in CSS px. The canvas is drawn at viewport / PIXEL and scaled
// back up with `image-rendering: pixelated`, which gives the hard 8-bit edges.
const PIXEL = 4
// Stepped, low frame rate on purpose: it reads as retro and keeps CPU use tiny
const FPS = 12

type Star = { x: number; y: number; depth: number; phase: number; color: string }
type Cloud = { x: number; y: number; w: number; speed: number }
type Meteor = { x: number; y: number; life: number }

const STAR_COLORS = ["#ffffff", "#9ff6ea", "#fde68a", "#c4b5fd"]

// Cloud silhouette as rows of [startColumn, length], scaled by the cloud width
const CLOUD_ROWS: Array<[number, number]> = [
  [4, 4],
  [2, 9],
  [0, 14],
  [1, 12],
]

function makeStars(w: number, h: number): Star[] {
  const count = Math.round((w * h) / 180)
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    depth: Math.random() < 0.8 ? 1 : 2,
    phase: Math.random() * Math.PI * 2,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  }))
}

function makeClouds(w: number, h: number): Cloud[] {
  const count = Math.max(3, Math.round(w / 60))
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h * 0.9,
    w: 1 + Math.floor(Math.random() * 3),
    speed: 0.05 + Math.random() * 0.1,
  }))
}

export default function AnimatedBackground() {
  const { isDarkMode } = useContext(ThemeContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0
    let h = 0
    let stars: Star[] = []
    let clouds: Cloud[] = []
    let meteor: Meteor | null = null
    let frame = 0
    let raf = 0
    let last = 0

    const resize = () => {
      w = Math.ceil(window.innerWidth / PIXEL)
      h = Math.ceil(window.innerHeight / PIXEL)
      canvas.width = w
      canvas.height = h
      stars = makeStars(w, h)
      clouds = makeClouds(w, h)
      draw()
    }

    const drawNight = () => {
      ctx.fillStyle = "#171717"
      ctx.fillRect(0, 0, w, h)

      // Faint pixel grid every 8 cells, like graph paper on a CRT
      ctx.fillStyle = "rgba(255,255,255,0.025)"
      for (let x = 0; x < w; x += 8) ctx.fillRect(x, 0, 1, h)
      for (let y = 0; y < h; y += 8) ctx.fillRect(0, y, w, 1)

      for (const star of stars) {
        // Stars drift left slowly, the near layer twice as fast
        const x = Math.floor((star.x - frame * 0.04 * star.depth + w) % w)
        const y = Math.floor(star.y)
        const twinkle = Math.sin(frame * 0.15 + star.phase)
        ctx.globalAlpha = twinkle > 0.6 ? 0.7 : twinkle > -0.2 ? 0.35 : 0.1
        ctx.fillStyle = star.color
        ctx.fillRect(x, y, 1, 1)
        // Bright near stars get a little plus-shaped sparkle
        if (star.depth === 2 && twinkle > 0.85) {
          ctx.globalAlpha = 0.35
          ctx.fillRect(x - 1, y, 1, 1)
          ctx.fillRect(x + 1, y, 1, 1)
          ctx.fillRect(x, y - 1, 1, 1)
          ctx.fillRect(x, y + 1, 1, 1)
        }
      }
      ctx.globalAlpha = 1

      // Occasional shooting star
      if (!meteor && Math.random() < 0.008) {
        meteor = { x: Math.random() * w * 0.8 + w * 0.2, y: Math.random() * h * 0.4, life: 14 }
      }
      if (meteor) {
        for (let i = 0; i < 6; i++) {
          ctx.globalAlpha = (1 - i / 6) * (meteor.life / 14)
          ctx.fillStyle = "#9ff6ea"
          ctx.fillRect(Math.floor(meteor.x + i), Math.floor(meteor.y - i), 1, 1)
        }
        ctx.globalAlpha = 1
        meteor.x -= 3
        meteor.y += 3
        meteor.life -= 1
        if (meteor.life <= 0) meteor = null
      }
    }

    const drawDay = () => {
      ctx.fillStyle = "#fafafa"
      ctx.fillRect(0, 0, w, h)

      // Dithered dots in a checker pattern
      ctx.fillStyle = "rgba(20,184,166,0.10)"
      for (let y = 0; y < h; y += 6) {
        for (let x = (y / 6) % 2 ? 3 : 0; x < w; x += 6) ctx.fillRect(x, y, 1, 1)
      }

      for (const cloud of clouds) {
        const x = Math.floor((cloud.x + frame * cloud.speed) % (w + 40)) - 40
        const y = Math.floor(cloud.y)
        ctx.fillStyle = "rgba(20,184,166,0.07)"
        CLOUD_ROWS.forEach(([start, length], row) => {
          ctx.fillRect(x + start * cloud.w, y + row * cloud.w, length * cloud.w, cloud.w)
        })
      }
    }

    const draw = () => (isDarkMode ? drawNight() : drawDay())

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop)
      if (document.hidden || time - last < 1000 / FPS) return
      last = time
      frame += 1
      draw()
    }

    resize()
    window.addEventListener("resize", resize)
    if (!reduceMotion) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
      style={{ imageRendering: "pixelated" }}
    />
  )
}
