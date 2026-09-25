"use client"

import type { ComponentType } from "react"
import dynamic from "next/dynamic"

// Games touch window/canvas APIs, so they are client-only
export const gameComponents: Record<string, ComponentType> = {
  "tic-tac-toe": dynamic(() => import("./tic-tac-toe"), { ssr: false }),
  "memory-match": dynamic(() => import("./memory-match"), { ssr: false }),
  snake: dynamic(() => import("./snake"), { ssr: false }),
  "puzzle-slider": dynamic(() => import("./puzzle-slider"), { ssr: false }),
  "word-scramble": dynamic(() => import("./word-scramble"), { ssr: false }),
  breakout: dynamic(() => import("./breakout"), { ssr: false }),
}

export const gamePreviews: Record<string, ComponentType> = {
  "tic-tac-toe": dynamic(() => import("./tic-tac-toe").then((m) => m.Preview)),
  "memory-match": dynamic(() => import("./memory-match").then((m) => m.Preview)),
  snake: dynamic(() => import("./snake").then((m) => m.Preview)),
  "puzzle-slider": dynamic(() => import("./puzzle-slider").then((m) => m.Preview)),
  "word-scramble": dynamic(() => import("./word-scramble").then((m) => m.Preview)),
  breakout: dynamic(() => import("./breakout").then((m) => m.Preview)),
}

export function GameView({ slug }: { slug: string }) {
  const Game = gameComponents[slug]
  return Game ? <Game /> : null
}

export function GamePreview({ slug }: { slug: string }) {
  const Preview = gamePreviews[slug]
  return Preview ? <Preview /> : null
}
