"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { TouchEvent as ReactTouchEvent } from "react"

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const COLS = 20
const ROWS = 14
const CELL = 8
const W = COLS * CELL
const H = ROWS * CELL
const START_LEN = 3
const BEST_KEY = "arcade:snake:best"

type Point = { x: number; y: number }
type Phase = "start" | "playing" | "paused" | "over"
type DirName = "up" | "down" | "left" | "right"

const DIRS: Record<DirName, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

const KEY_DIRS: Record<string, DirName> = {
  arrowup: "up",
  w: "up",
  arrowdown: "down",
  s: "down",
  arrowleft: "left",
  a: "left",
  arrowright: "right",
  d: "right",
}

type Palette = {
  bg: string
  grid: string
  body: string
  head: string
  food: string
  eye: string
  dead: string
}

const LIGHT: Palette = {
  bg: "#e9ebe0",
  grid: "#dde0d1",
  body: "#0f766e",
  head: "#134e4a",
  food: "#dc2626",
  eye: "#e9ebe0",
  dead: "#78716c",
}

const DARK: Palette = {
  bg: "#0b100e",
  grid: "#131c19",
  body: "#2dd4bf",
  head: "#99f6e4",
  food: "#f43f5e",
  eye: "#0b100e",
  dead: "#57534e",
}

// Speed rises as the snake grows: 150ms per step down to a 55ms floor
const tickMs = (length: number) => Math.max(55, 150 - (length - START_LEN) * 4)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readBest(): number {
  try {
    const v = Number(window.localStorage.getItem(BEST_KEY))
    return Number.isFinite(v) && v > 0 ? v : 0
  } catch (_e) {
    return 0
  }
}

function writeBest(v: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(v))
  } catch (_e) {
    // storage unavailable (private mode etc.) - ignore
  }
}

function useIsDark() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const el = document.documentElement
    const read = () => setDark(el.classList.contains("dark"))
    read()
    const obs = new MutationObserver(read)
    obs.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])
  return dark
}

function useMedia(query: string) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const read = () => setMatch(mq.matches)
    read()
    mq.addEventListener("change", read)
    return () => mq.removeEventListener("change", read)
  }, [query])
  return match
}

type World = {
  snake: Point[]
  dir: Point
  queue: Point[]
  food: Point
  dead: boolean
}

function randomFood(snake: Point[]): Point {
  const free: Point[] = []
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!snake.some((p) => p.x === x && p.y === y)) free.push({ x, y })
    }
  }
  return free.length ? free[Math.floor(Math.random() * free.length)] : { x: -1, y: -1 }
}

function newWorld(): World {
  const cy = Math.floor(ROWS / 2)
  const cx = Math.floor(COLS / 2)
  const snake = Array.from({ length: START_LEN }, (_, i) => ({ x: cx - i, y: cy }))
  return { snake, dir: DIRS.right, queue: [], food: randomFood(snake), dead: false }
}

// ---------------------------------------------------------------------------
// Game
// ---------------------------------------------------------------------------

export default function Snake() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldRef = useRef<World>(newWorld())
  const phaseRef = useRef<Phase>("start")
  const bestRef = useRef(0)
  const paletteRef = useRef<Palette>(LIGHT)
  const touchRef = useRef<{ x: number; y: number } | null>(null)

  const [phase, setPhaseState] = useState<Phase>("start")
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const [status, setStatus] = useState("Snake. Press start to play.")

  const dark = useIsDark()
  const coarse = useMedia("(pointer: coarse)")
  const small = useMedia("(max-width: 767px)")
  const showPad = coarse || small

  const setPhase = useCallback((p: Phase) => {
    phaseRef.current = p
    setPhaseState(p)
  }, [])

  useEffect(() => {
    const b = readBest()
    bestRef.current = b
    setBest(b)
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const pal = paletteRef.current
    const w = worldRef.current

    ctx.fillStyle = pal.bg
    ctx.fillRect(0, 0, W, H)

    // checkerboard grid
    ctx.fillStyle = pal.grid
    for (let y = 0; y < ROWS; y++) {
      for (let x = y % 2; x < COLS; x += 2) {
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL)
      }
    }

    // food: a little pixel apple
    if (w.food.x >= 0) {
      const fx = w.food.x * CELL
      const fy = w.food.y * CELL
      ctx.fillStyle = pal.food
      ctx.fillRect(fx + 2, fy + 2, 4, 5)
      ctx.fillRect(fx + 1, fy + 3, 6, 3)
      ctx.fillStyle = pal.body
      ctx.fillRect(fx + 4, fy + 1, 2, 1)
    }

    // snake
    w.snake.forEach((p, i) => {
      ctx.fillStyle = w.dead ? pal.dead : i === 0 ? pal.head : pal.body
      ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2)
      // join segments so the body reads as one piece
      const next = w.snake[i + 1]
      if (next) {
        const minX = Math.min(p.x, next.x)
        const minY = Math.min(p.y, next.y)
        if (p.x !== next.x) ctx.fillRect(minX * CELL + CELL - 1, p.y * CELL + 1, 2, CELL - 2)
        else ctx.fillRect(p.x * CELL + 1, minY * CELL + CELL - 1, CELL - 2, 2)
      }
    })

    // eyes
    const head = w.snake[0]
    if (head) {
      ctx.fillStyle = pal.eye
      const hx = head.x * CELL
      const hy = head.y * CELL
      if (w.dir.x !== 0) {
        const ex = w.dir.x > 0 ? hx + 5 : hx + 2
        ctx.fillRect(ex, hy + 2, 1, 1)
        ctx.fillRect(ex, hy + 5, 1, 1)
      } else {
        const ey = w.dir.y > 0 ? hy + 5 : hy + 2
        ctx.fillRect(hx + 2, ey, 1, 1)
        ctx.fillRect(hx + 5, ey, 1, 1)
      }
    }
  }, [])

  useEffect(() => {
    paletteRef.current = dark ? DARK : LIGHT
    draw()
  }, [dark, draw])

  const endGame = useCallback(() => {
    const w = worldRef.current
    w.dead = true
    const final = (w.snake.length - START_LEN) * 10
    const isBest = final > bestRef.current
    if (isBest) {
      bestRef.current = final
      setBest(final)
      writeBest(final)
    }
    setNewBest(isBest)
    setPhase("over")
    setStatus(`Game over. Score ${final}.${isBest ? " New best score!" : ""}`)
    draw()
    rootRef.current?.focus({ preventScroll: true })
  }, [draw, setPhase])

  // Advance one step. Returns false if the snake died.
  const step = useCallback((): boolean => {
    const w = worldRef.current
    const nextDir = w.queue.shift()
    if (nextDir) w.dir = nextDir
    const head = { x: w.snake[0].x + w.dir.x, y: w.snake[0].y + w.dir.y }
    if (head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS) return false
    const eating = head.x === w.food.x && head.y === w.food.y
    // the tail moves out of the way unless we're growing this step
    const body = eating ? w.snake : w.snake.slice(0, -1)
    if (body.some((p) => p.x === head.x && p.y === head.y)) return false
    w.snake.unshift(head)
    if (eating) {
      setScore((w.snake.length - START_LEN) * 10)
      w.food = randomFood(w.snake)
      if (w.food.x < 0) return false // board full - you win, game ends
    } else {
      w.snake.pop()
    }
    return true
  }, [])

  // Main loop
  useEffect(() => {
    if (phase !== "playing") {
      draw()
      return
    }
    let raf = 0
    let last = performance.now()
    let acc = 0
    const frame = (t: number) => {
      acc += t - last
      last = t
      const interval = tickMs(worldRef.current.snake.length)
      if (acc > 500) acc = interval // tab was hidden; don't fast-forward
      while (acc >= interval) {
        acc -= interval
        if (!step()) {
          endGame()
          return
        }
      }
      draw()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [phase, draw, step, endGame])

  const start = useCallback(() => {
    worldRef.current = newWorld()
    setScore(0)
    setNewBest(false)
    setPhase("playing")
    setStatus("Game started.")
    rootRef.current?.focus({ preventScroll: true })
  }, [setPhase])

  const togglePause = useCallback(() => {
    if (phaseRef.current === "playing") {
      setPhase("paused")
      setStatus("Paused.")
    } else if (phaseRef.current === "paused") {
      setPhase("playing")
      setStatus("Resumed.")
    }
  }, [setPhase])

  const turn = useCallback((name: DirName) => {
    if (phaseRef.current !== "playing") return
    const w = worldRef.current
    const nd = DIRS[name]
    const lastDir = w.queue.length ? w.queue[w.queue.length - 1] : w.dir
    if (nd.x === -lastDir.x && nd.y === -lastDir.y) return
    if (nd.x === lastDir.x && nd.y === lastDir.y) return
    if (w.queue.length < 3) w.queue.push(nd)
  }, [])

  // Keyboard: only swallow keys while a game is running (or the game has focus)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      )
        return
      const k = e.key.toLowerCase()
      const p = phaseRef.current
      const dir = KEY_DIRS[k]
      if (p === "playing" || p === "paused") {
        if (dir) {
          e.preventDefault()
          turn(dir)
        } else if (k === " " || k === "p" || k === "escape") {
          e.preventDefault()
          togglePause()
        }
        return
      }
      const focused = !!rootRef.current && rootRef.current === document.activeElement
      if (focused && (k === " " || k === "enter")) {
        e.preventDefault()
        start()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [turn, togglePause, start])

  // Auto-pause when the tab/window loses focus
  useEffect(() => {
    const pause = () => {
      if (phaseRef.current === "playing") {
        setPhase("paused")
        setStatus("Paused.")
      }
    }
    const onVis = () => {
      if (document.hidden) pause()
    }
    window.addEventListener("blur", pause)
    document.addEventListener("visibilitychange", onVis)
    return () => {
      window.removeEventListener("blur", pause)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [setPhase])

  const onTouchStart = (e: ReactTouchEvent) => {
    const t = e.touches[0]
    if (t) touchRef.current = { x: t.clientX, y: t.clientY }
  }
  const onTouchEnd = (e: ReactTouchEvent) => {
    const s = touchRef.current
    const t = e.changedTouches[0]
    touchRef.current = null
    if (!s || !t) return
    const dx = t.clientX - s.x
    const dy = t.clientY - s.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return
    if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? "right" : "left")
    else turn(dy > 0 ? "down" : "up")
  }

  const padButton = (name: DirName, label: string, glyph: string, cls: string) => (
    <button
      type="button"
      aria-label={label}
      className={`${cls} flex h-14 w-14 items-center justify-center border-4 border-neutral-900 bg-neutral-100 font-pixel text-sm text-neutral-900 shadow-pixel-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-100 dark:bg-neutral-800 dark:text-neutral-100`}
      onPointerDown={(e) => {
        e.preventDefault()
        turn(name)
      }}
      onClick={(e) => {
        // keyboard activation (pointer already handled on pointerdown)
        if (e.detail === 0) turn(name)
      }}
    >
      {glyph}
    </button>
  )

  const playing = phase === "playing" || phase === "paused"

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      aria-label="Snake game"
      className="mx-auto w-full max-w-[640px] outline-none focus-visible:ring-4 focus-visible:ring-pixel-accent focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-pixel text-[10px] sm:text-xs">
        <div className="flex gap-4">
          <span>
            SCORE <span className="text-pixel-accent">{score}</span>
          </span>
          <span>
            BEST <span className="text-pixel-accent">{best}</span>
          </span>
        </div>
        {playing && (
          <button
            type="button"
            onClick={togglePause}
            className="border-2 border-neutral-900 bg-neutral-100 px-2 py-1 font-pixel text-[10px] shadow-pixel-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-100 dark:bg-neutral-800"
          >
            {phase === "paused" ? "RESUME" : "PAUSE"}
          </button>
        )}
      </div>

      <div
        className="pixel-box relative overflow-hidden p-0"
        style={{ touchAction: phase === "playing" ? "none" : "manipulation" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          role="img"
          aria-label={`Snake board, ${COLS} by ${ROWS} grid. Score ${score}.`}
          className="block h-auto w-full"
          style={{ imageRendering: "pixelated" }}
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-50/80 p-4 text-center text-neutral-900 dark:bg-neutral-950/80 dark:text-neutral-100">
            {phase === "start" && (
              <>
                <h2 className="font-pixel text-sm sm:text-base">SNAKE</h2>
                <p className="font-retro text-lg leading-tight sm:text-xl">
                  Eat, grow, don&apos;t bite yourself.
                </p>
              </>
            )}
            {phase === "paused" && <h2 className="font-pixel text-sm sm:text-base">PAUSED</h2>}
            {phase === "over" && (
              <>
                <h2 className="font-pixel text-sm text-red-600 dark:text-red-400 sm:text-base">
                  GAME OVER
                </h2>
                <p className="font-pixel text-[10px] sm:text-xs">
                  SCORE {score}
                  {newBest && <span className="block pt-2 text-pixel-accent">NEW BEST!</span>}
                </p>
              </>
            )}
            <button
              type="button"
              onClick={phase === "paused" ? togglePause : start}
              className="border-4 border-neutral-900 bg-pixel-accent px-4 py-2 font-pixel text-[10px] text-neutral-950 shadow-pixel-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-100 sm:text-xs"
            >
              <span className="motion-safe:animate-[pixel-blink_1s_steps(1)_infinite]">
                {phase === "start" ? "PRESS START" : phase === "paused" ? "RESUME" : "PLAY AGAIN"}
              </span>
            </button>
          </div>
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {status}
      </div>

      {showPad && (
        <div className="mx-auto mt-4 grid w-max grid-cols-3 grid-rows-3 gap-1">
          {padButton("up", "Up", "▲", "col-start-2 row-start-1")}
          {padButton("left", "Left", "◀", "col-start-1 row-start-2")}
          {padButton("right", "Right", "▶", "col-start-3 row-start-2")}
          {padButton("down", "Down", "▼", "col-start-2 row-start-3")}
        </div>
      )}

      <p className="mt-3 font-retro text-lg leading-tight text-neutral-600 dark:text-neutral-400">
        Arrow keys / WASD to steer, Space or P to pause. On touch: swipe the board or use the pad.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Preview thumbnail
// ---------------------------------------------------------------------------

export function Preview() {
  const body: [number, number][] = [
    [6, 13],
    [7, 13],
    [8, 13],
    [9, 13],
    [10, 13],
    [11, 13],
    [12, 13],
    [12, 12],
    [12, 11],
    [12, 10],
    [12, 9],
    [13, 9],
    [14, 9],
    [15, 9],
    [16, 9],
    [17, 9],
    [18, 9],
    [18, 8],
    [18, 7],
    [19, 7],
    [20, 7],
  ]
  return (
    <svg
      viewBox="0 0 32 20"
      width="100%"
      height="100%"
      shapeRendering="crispEdges"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="32" height="20" fill="#0b100e" />
      {Array.from({ length: 20 }, (_, y) =>
        Array.from({ length: 16 }, (_, i) => (
          <rect key={`${y}-${i}`} x={i * 2 + (y % 2)} y={y} width="1" height="1" fill="#131c19" />
        ))
      )}
      {body.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill="#2dd4bf" />
      ))}
      <rect x="21" y="7" width="1" height="1" fill="#99f6e4" />
      <rect x="25" y="6" width="2" height="2" fill="#f43f5e" />
      <rect x="26" y="5" width="1" height="1" fill="#2dd4bf" />
    </svg>
  )
}
