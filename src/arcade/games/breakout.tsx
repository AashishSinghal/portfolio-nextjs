import { useCallback, useEffect, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"

// ---------------------------------------------------------------------------
// Config (all units are internal "pixels")
// ---------------------------------------------------------------------------

const W = 160
const H = 120
const COLS = 10
const BRICK_W = 14
const BRICK_H = 5
const GAP = 1
const OFFSET_X = Math.floor((W - (COLS * (BRICK_W + GAP) - GAP)) / 2)
const OFFSET_Y = 12
const PADDLE_W = 26
const PADDLE_H = 3
const PADDLE_Y = H - 10
const PADDLE_SPEED = 150 // px / s
const BALL = 3
const START_LIVES = 3
const BEST_KEY = "arcade:breakout:best"

// Top rows are worth more. A restrained palette built from gold, teal and greys.
const ROWS = [
  { color: "#d8bb94", shade: "#a8865f", points: 7 },
  { color: "#c49d71", shade: "#957450", points: 6 },
  { color: "#2dd4bf", shade: "#1f9e8e", points: 5 },
  { color: "#22a898", shade: "#177a6e", points: 3 },
  { color: "#a3a3a3", shade: "#737373", points: 2 },
  { color: "#737373", shade: "#525252", points: 1 },
]

const ballSpeed = (level: number) => Math.min(170, 78 + (level - 1) * 14)

// Dark-only palette, matching the site tokens
const PAL = { bg: "#0a0a0a", fg: "#ededed", dim: "#1c1c1c", accent: "#c49d71" }

type Phase = "start" | "serve" | "playing" | "paused" | "over"
type Brick = { x: number; y: number; row: number; alive: boolean }
type World = {
  paddleX: number
  ballX: number
  ballY: number
  vx: number
  vy: number
  bricks: Brick[]
  left: boolean
  right: boolean
  shake: number
}

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
    // storage unavailable - ignore
  }
}

function makeBricks(): Brick[] {
  const bricks: Brick[] = []
  ROWS.forEach((_, row) => {
    for (let c = 0; c < COLS; c++) {
      bricks.push({
        x: OFFSET_X + c * (BRICK_W + GAP),
        y: OFFSET_Y + row * (BRICK_H + GAP),
        row,
        alive: true,
      })
    }
  })
  return bricks
}

function newWorld(): World {
  return {
    paddleX: (W - PADDLE_W) / 2,
    ballX: W / 2 - BALL / 2,
    ballY: PADDLE_Y - BALL,
    vx: 0,
    vy: 0,
    bricks: makeBricks(),
    left: false,
    right: false,
    shake: 0,
  }
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

// ---------------------------------------------------------------------------
// Game
// ---------------------------------------------------------------------------

export default function Breakout() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldRef = useRef<World>(newWorld())
  const phaseRef = useRef<Phase>("start")
  const scoreRef = useRef(0)
  const livesRef = useRef(START_LIVES)
  const levelRef = useRef(1)
  const bestRef = useRef(0)
  const reducedRef = useRef(false)

  const [phase, setPhaseState] = useState<Phase>("start")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(START_LIVES)
  const [level, setLevel] = useState(1)
  const [best, setBest] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const [status, setStatus] = useState("Breakout. Press start to play.")

  const setPhase = useCallback((p: Phase) => {
    phaseRef.current = p
    setPhaseState(p)
  }, [])

  useEffect(() => {
    const b = readBest()
    bestRef.current = b
    setBest(b)
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const read = () => {
      reducedRef.current = mq.matches
    }
    read()
    mq.addEventListener("change", read)
    return () => mq.removeEventListener("change", read)
  }, [])

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    const pal = PAL
    const w = worldRef.current

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.fillStyle = pal.bg
    ctx.fillRect(0, 0, W, H)

    if (w.shake > 0) {
      ctx.translate(Math.round(Math.random() * 4 - 2), Math.round(Math.random() * 4 - 2))
    }

    // dotted side rails
    ctx.fillStyle = pal.dim
    for (let y = 0; y < H; y += 4) {
      ctx.fillRect(0, y, 1, 2)
      ctx.fillRect(W - 1, y, 1, 2)
    }

    for (const b of w.bricks) {
      if (!b.alive) continue
      const r = ROWS[b.row]
      ctx.fillStyle = r.color
      ctx.fillRect(b.x, b.y, BRICK_W, BRICK_H)
      ctx.fillStyle = r.shade
      ctx.fillRect(b.x, b.y + BRICK_H - 1, BRICK_W, 1)
      ctx.fillRect(b.x + BRICK_W - 1, b.y, 1, BRICK_H)
    }

    // paddle with notched ends
    const px = Math.round(w.paddleX)
    ctx.fillStyle = pal.fg
    ctx.fillRect(px + 1, PADDLE_Y, PADDLE_W - 2, PADDLE_H)
    ctx.fillRect(px, PADDLE_Y + 1, PADDLE_W, PADDLE_H - 1)
    ctx.fillStyle = pal.accent
    ctx.fillRect(px + 3, PADDLE_Y + 1, PADDLE_W - 6, 1)

    // ball
    ctx.fillStyle = pal.fg
    ctx.fillRect(Math.round(w.ballX), Math.round(w.ballY), BALL, BALL)
  }, [])

  const finish = useCallback(() => {
    const final = scoreRef.current
    const isBest = final > bestRef.current
    if (isBest) {
      bestRef.current = final
      setBest(final)
      writeBest(final)
    }
    setNewBest(isBest)
    setPhase("over")
    setStatus(`Game over. Score ${final}, level ${levelRef.current}.${isBest ? " New best!" : ""}`)
    rootRef.current?.focus({ preventScroll: true })
  }, [setPhase])

  const launch = useCallback(() => {
    if (phaseRef.current !== "serve") return
    const w = worldRef.current
    const speed = ballSpeed(levelRef.current)
    const angle = ((Math.random() * 50 - 25) * Math.PI) / 180
    w.vx = speed * Math.sin(angle)
    w.vy = -speed * Math.cos(angle)
    setPhase("playing")
  }, [setPhase])

  const loseLife = useCallback(() => {
    const w = worldRef.current
    livesRef.current -= 1
    setLives(livesRef.current)
    if (livesRef.current <= 0) {
      w.shake = 0
      finish()
      return
    }
    if (!reducedRef.current) w.shake = 0.25
    setPhase("serve")
    setStatus(`Ball lost. ${livesRef.current} ${livesRef.current === 1 ? "life" : "lives"} left.`)
  }, [finish, setPhase])

  const nextLevel = useCallback(() => {
    levelRef.current += 1
    setLevel(levelRef.current)
    const w = worldRef.current
    w.bricks = makeBricks()
    setPhase("serve")
    setStatus(`Level cleared! Level ${levelRef.current}. Ball speed up.`)
  }, [setPhase])

  // Physics step. Moves the ball in <=1px sub-steps so it never tunnels through bricks.
  const update = useCallback(
    (dt: number) => {
      const w = worldRef.current
      if (w.shake > 0) w.shake = Math.max(0, w.shake - dt)
      if (w.left) w.paddleX -= PADDLE_SPEED * dt
      if (w.right) w.paddleX += PADDLE_SPEED * dt
      w.paddleX = clamp(w.paddleX, 0, W - PADDLE_W)

      if (phaseRef.current === "serve") {
        w.ballX = w.paddleX + PADDLE_W / 2 - BALL / 2
        w.ballY = PADDLE_Y - BALL
        return
      }
      if (phaseRef.current !== "playing") return

      const speed = Math.hypot(w.vx, w.vy)
      const steps = Math.max(1, Math.ceil(speed * dt))
      const sub = dt / steps
      for (let i = 0; i < steps; i++) {
        const prevX = w.ballX
        const prevY = w.ballY
        w.ballX += w.vx * sub
        w.ballY += w.vy * sub

        // walls
        if (w.ballX < 1) {
          w.ballX = 1
          w.vx = Math.abs(w.vx)
        } else if (w.ballX + BALL > W - 1) {
          w.ballX = W - 1 - BALL
          w.vx = -Math.abs(w.vx)
        }
        if (w.ballY < 0) {
          w.ballY = 0
          w.vy = Math.abs(w.vy)
        }

        // paddle: angle depends on where the ball lands
        if (
          w.vy > 0 &&
          w.ballY + BALL >= PADDLE_Y &&
          prevY + BALL <= PADDLE_Y + 1 &&
          w.ballX + BALL >= w.paddleX &&
          w.ballX <= w.paddleX + PADDLE_W
        ) {
          const hit = clamp(
            (w.ballX + BALL / 2 - (w.paddleX + PADDLE_W / 2)) / (PADDLE_W / 2),
            -1,
            1
          )
          const angle = (hit * 60 * Math.PI) / 180
          w.vx = speed * Math.sin(angle)
          w.vy = -speed * Math.cos(angle)
          w.ballY = PADDLE_Y - BALL
        }

        // bricks (one per sub-step)
        for (const b of w.bricks) {
          if (!b.alive) continue
          if (
            w.ballX + BALL > b.x &&
            w.ballX < b.x + BRICK_W &&
            w.ballY + BALL > b.y &&
            w.ballY < b.y + BRICK_H
          ) {
            b.alive = false
            scoreRef.current += ROWS[b.row].points * levelRef.current
            setScore(scoreRef.current)
            const wasOverlappingX = prevX + BALL > b.x && prevX < b.x + BRICK_W
            if (wasOverlappingX) {
              w.vy = -w.vy
              w.ballY = prevY
            } else {
              w.vx = -w.vx
              w.ballX = prevX
            }
            break
          }
        }

        if (!w.bricks.some((b) => b.alive)) {
          nextLevel()
          return
        }

        if (w.ballY > H) {
          loseLife()
          return
        }
      }
    },
    [loseLife, nextLevel]
  )

  // Main loop runs while serving or playing; also for a trailing shake
  useEffect(() => {
    if (phase !== "playing" && phase !== "serve") {
      draw()
      return
    }
    let raf = 0
    let last = performance.now()
    const frame = (t: number) => {
      const dt = Math.min(1 / 30, (t - last) / 1000)
      last = t
      update(dt)
      draw()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [phase, draw, update])

  const start = useCallback(() => {
    worldRef.current = newWorld()
    scoreRef.current = 0
    livesRef.current = START_LIVES
    levelRef.current = 1
    setScore(0)
    setLives(START_LIVES)
    setLevel(1)
    setNewBest(false)
    setPhase("serve")
    setStatus("Game started. Press Space or tap to launch the ball.")
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

  // Keyboard
  useEffect(() => {
    const isLeft = (k: string) => k === "arrowleft" || k === "a"
    const isRight = (k: string) => k === "arrowright" || k === "d"
    const onDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      )
        return
      const k = e.key.toLowerCase()
      const p = phaseRef.current
      const w = worldRef.current
      if (p === "serve" || p === "playing" || p === "paused") {
        if (isLeft(k)) {
          e.preventDefault()
          w.left = true
        } else if (isRight(k)) {
          e.preventDefault()
          w.right = true
        } else if (k === " ") {
          e.preventDefault()
          if (p === "serve") launch()
          else if (p === "paused") togglePause()
        } else if (k === "p" || k === "escape") {
          e.preventDefault()
          togglePause()
        } else if (k === "arrowup" || k === "arrowdown") {
          e.preventDefault()
        }
        return
      }
      const focused = !!rootRef.current && rootRef.current === document.activeElement
      if (focused && (k === " " || k === "enter")) {
        e.preventDefault()
        start()
      }
    }
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      const w = worldRef.current
      if (isLeft(k)) w.left = false
      if (isRight(k)) w.right = false
    }
    const pause = () => {
      worldRef.current.left = false
      worldRef.current.right = false
      if (phaseRef.current === "playing") {
        setPhase("paused")
        setStatus("Paused.")
      }
    }
    const onVis = () => {
      if (document.hidden) pause()
    }
    window.addEventListener("keydown", onDown)
    window.addEventListener("keyup", onUp)
    window.addEventListener("blur", pause)
    document.addEventListener("visibilitychange", onVis)
    return () => {
      window.removeEventListener("keydown", onDown)
      window.removeEventListener("keyup", onUp)
      window.removeEventListener("blur", pause)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [launch, togglePause, start, setPhase])

  // Pointer (mouse + touch): paddle follows the pointer
  const movePaddle = (e: ReactPointerEvent) => {
    const p = phaseRef.current
    if (p !== "serve" && p !== "playing") return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * W
    worldRef.current.paddleX = clamp(x - PADDLE_W / 2, 0, W - PADDLE_W)
  }

  const active = phase === "serve" || phase === "playing"

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      aria-label="Breakout game"
      className="mx-auto w-full max-w-[640px] rounded-xl font-sans outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider text-faint">Score</span>
            <span className="font-mono text-sm tabular-nums text-fg">{score}</span>
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider text-faint">Level</span>
            <span className="font-mono text-sm tabular-nums text-fg">{level}</span>
          </span>
          <span className="flex items-center gap-2" aria-label={`${lives} lives`}>
            <span aria-hidden="true" className="text-xs uppercase tracking-wider text-faint">
              Lives
            </span>
            <span className="flex items-center gap-1">
              {Array.from({ length: START_LIVES }, (_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`inline-block h-2 w-2 rounded-full ${i < lives ? "bg-gold" : "bg-line"}`}
                />
              ))}
            </span>
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-wider text-faint">Best</span>
            <span className="font-mono text-sm tabular-nums text-gold">{best}</span>
          </span>
        </div>
        {(phase === "playing" || phase === "paused") && (
          <button
            type="button"
            onClick={togglePause}
            className="rounded-lg border border-line px-3 py-1.5 text-xs text-fg transition-colors hover:border-teal hover:text-teal"
          >
            {phase === "paused" ? "Resume" : "Pause"}
          </button>
        )}
      </div>

      <div
        className="relative overflow-hidden rounded-xl border border-line bg-surface"
        style={{ touchAction: active ? "none" : "manipulation", cursor: active ? "none" : "auto" }}
        onPointerMove={movePaddle}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return
          movePaddle(e)
          if (phaseRef.current === "serve") launch()
        }}
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          role="img"
          aria-label={`Breakout playfield. Level ${level}, score ${score}, ${lives} lives.`}
          className="block h-auto w-full"
          style={{ imageRendering: "pixelated" }}
        />

        {phase === "serve" && (
          <p className="pointer-events-none absolute inset-x-0 bottom-[18%] text-center text-xs uppercase tracking-wider text-muted">
            <span className="motion-safe:animate-pulse">Space / tap to launch</span>
          </p>
        )}

        {(phase === "start" || phase === "paused" || phase === "over") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/80 p-4 text-center text-fg backdrop-blur-[2px]">
            {phase === "start" && (
              <>
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Breakout</h2>
                <p className="text-sm text-muted">Smash every brick. Keep the ball alive.</p>
              </>
            )}
            {phase === "paused" && (
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Paused</h2>
            )}
            {phase === "over" && (
              <>
                <h2 className="text-lg font-semibold tracking-tight text-red-400 sm:text-xl">
                  Game over
                </h2>
                <p className="text-sm text-muted">
                  Score <span className="font-mono tabular-nums text-fg">{score}</span> · Level{" "}
                  <span className="font-mono tabular-nums text-fg">{level}</span>
                  {newBest && (
                    <span className="mt-1 block text-xs uppercase tracking-wider text-gold">
                      New best
                    </span>
                  )}
                </p>
              </>
            )}
            <button
              type="button"
              onClick={phase === "paused" ? togglePause : start}
              className="mt-1 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-gold/90"
            >
              {phase === "start" ? (
                <span className="motion-safe:animate-pulse">Press start</span>
              ) : phase === "paused" ? (
                "Resume"
              ) : (
                "Play again"
              )}
            </button>
          </div>
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {status}
      </div>

      <p className="mt-3 text-sm text-faint">
        Move with the mouse, drag on touch, or ← → / A D. Space or tap to launch, P to pause. Top
        rows score more; clearing a level speeds the ball up.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Preview thumbnail
// ---------------------------------------------------------------------------

export function Preview() {
  const missing = new Set(["1-3", "1-4", "2-4", "0-7", "3-1", "3-2"])
  return (
    <svg
      viewBox="0 0 32 20"
      width="100%"
      height="100%"
      shapeRendering="crispEdges"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="32" height="20" fill="#0a0a0a" />
      {ROWS.slice(0, 4).map((r, row) =>
        Array.from({ length: 8 }, (_, c) =>
          missing.has(`${row}-${c}`) ? null : (
            <rect
              key={`${row}-${c}`}
              x={1 + c * 4}
              y={2 + row * 2}
              width="3"
              height="1"
              fill={r.color}
            />
          )
        )
      )}
      <rect x="18" y="13" width="1" height="1" fill="#ededed" />
      <rect x="13" y="17" width="7" height="1" fill="#ededed" />
    </svg>
  )
}
