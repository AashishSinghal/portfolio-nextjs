import { lazy, type ComponentType, type LazyExoticComponent } from "react"

type Lazy = LazyExoticComponent<ComponentType>

// Each game is its own chunk, fetched only when someone opens it
export const gameComponents: Record<string, Lazy> = {
  "tic-tac-toe": lazy(() => import("./games/tic-tac-toe")),
  "memory-match": lazy(() => import("./games/memory-match")),
  snake: lazy(() => import("./games/snake")),
  "puzzle-slider": lazy(() => import("./games/puzzle-slider")),
  "word-scramble": lazy(() => import("./games/word-scramble")),
  breakout: lazy(() => import("./games/breakout")),
}

export const gamePreviews: Record<string, Lazy> = {
  "tic-tac-toe": lazy(() => import("./games/tic-tac-toe").then((m) => ({ default: m.Preview }))),
  "memory-match": lazy(() => import("./games/memory-match").then((m) => ({ default: m.Preview }))),
  snake: lazy(() => import("./games/snake").then((m) => ({ default: m.Preview }))),
  "puzzle-slider": lazy(() =>
    import("./games/puzzle-slider").then((m) => ({ default: m.Preview }))
  ),
  "word-scramble": lazy(() =>
    import("./games/word-scramble").then((m) => ({ default: m.Preview }))
  ),
  breakout: lazy(() => import("./games/breakout").then((m) => ({ default: m.Preview }))),
}
