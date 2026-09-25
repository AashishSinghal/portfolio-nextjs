import { useCallback, useEffect, useRef, useState } from "react"

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

type Size = 3 | 4
type Phase = "start" | "playing" | "won"
type Best = { moves: number; ms: number }

const bestKey = (size: Size) => `arcade:puzzle-slider:best:${size}`

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readBest(size: Size): Best | null {
  try {
    const raw = window.localStorage.getItem(bestKey(size))
    if (!raw) return null
    const v = JSON.parse(raw) as Partial<Best>
    if (typeof v.moves === "number" && typeof v.ms === "number") return { moves: v.moves, ms: v.ms }
    return null
  } catch (_e) {
    return null
  }
}

function writeBest(size: Size, best: Best) {
  try {
    window.localStorage.setItem(bestKey(size), JSON.stringify(best))
  } catch (_e) {
    // storage unavailable - ignore
  }
}

const solved = (size: Size) => [...Array.from({ length: size * size - 1 }, (_, i) => i + 1), 0]

const isSolved = (tiles: number[]) =>
  tiles.every((t, i) => (i === tiles.length - 1 ? t === 0 : t === i + 1))

function neighbors(index: number, size: Size): number[] {
  const r = Math.floor(index / size)
  const c = index % size
  const out: number[] = []
  if (r > 0) out.push(index - size)
  if (r < size - 1) out.push(index + size)
  if (c > 0) out.push(index - 1)
  if (c < size - 1) out.push(index + 1)
  return out
}

// Shuffle by making random legal moves from the solved state, so the result is
// always solvable. Never immediately undo the previous move.
function shuffle(size: Size): number[] {
  const tiles = solved(size)
  const moves = size === 3 ? 80 : 240
  let gap = tiles.length - 1
  let prev = -1
  for (let i = 0; i < moves || isSolved(tiles); i++) {
    const options = neighbors(gap, size).filter((n) => n !== prev)
    const pick = options[Math.floor(Math.random() * options.length)]
    tiles[gap] = tiles[pick]
    tiles[pick] = 0
    prev = gap
    gap = pick
  }
  return tiles
}

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

// ---------------------------------------------------------------------------
// Game
// ---------------------------------------------------------------------------

export default function PuzzleSlider() {
  const rootRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number | null>(null)
  const phaseRef = useRef<Phase>("start")

  const [size, setSize] = useState<Size>(4)
  const [tiles, setTiles] = useState<number[]>(() => solved(4))
  const [phase, setPhaseState] = useState<Phase>("start")
  const [moves, setMoves] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [best, setBest] = useState<Best | null>(null)
  const [newBest, setNewBest] = useState(false)
  const [status, setStatus] = useState("Puzzle slider. Choose a size and press start.")

  const setPhase = useCallback((p: Phase) => {
    phaseRef.current = p
    setPhaseState(p)
  }, [])

  useEffect(() => {
    setBest(readBest(size))
  }, [size])

  // Timer: starts on the first move, stops on win
  useEffect(() => {
    if (phase !== "playing" || moves === 0) return
    const id = window.setInterval(() => {
      if (startTimeRef.current !== null) setElapsed(Date.now() - startTimeRef.current)
    }, 250)
    return () => window.clearInterval(id)
  }, [phase, moves])

  const start = useCallback(
    (nextSize: Size = size) => {
      setSize(nextSize)
      setTiles(shuffle(nextSize))
      setMoves(0)
      setElapsed(0)
      setNewBest(false)
      startTimeRef.current = null
      setPhase("playing")
      setStatus(
        `New ${nextSize} by ${nextSize} puzzle. Click a tile next to the gap, or use arrow keys.`
      )
      rootRef.current?.focus({ preventScroll: true })
    },
    [size, setPhase]
  )

  const chooseSize = (s: Size) => {
    if (s === size && phase === "start") return
    setSize(s)
    setTiles(solved(s))
    setMoves(0)
    setElapsed(0)
    startTimeRef.current = null
    setPhase("start")
    setStatus(`${s} by ${s} selected. Press start.`)
  }

  const moveIndex = useCallback(
    (index: number) => {
      if (phaseRef.current !== "playing") return
      const gap = tiles.indexOf(0)
      if (!neighbors(gap, size).includes(index)) return
      const next = tiles.slice()
      const tile = next[index]
      next[gap] = tile
      next[index] = 0
      const now = Date.now()
      if (startTimeRef.current === null) startTimeRef.current = now
      const nextMoves = moves + 1
      setTiles(next)
      setMoves(nextMoves)

      if (isSolved(next)) {
        const ms = now - startTimeRef.current
        setElapsed(ms)
        const record: Best = { moves: nextMoves, ms }
        const isBest = !best || nextMoves < best.moves || (nextMoves === best.moves && ms < best.ms)
        if (isBest) {
          setBest(record)
          writeBest(size, record)
        }
        setNewBest(isBest)
        setPhase("won")
        setStatus(`Solved in ${nextMoves} moves, ${formatTime(ms)}.${isBest ? " New best!" : ""}`)
        rootRef.current?.focus({ preventScroll: true })
      } else {
        setStatus(`Moved tile ${tile}. ${nextMoves} ${nextMoves === 1 ? "move" : "moves"}.`)
      }
    },
    [tiles, size, moves, best, setPhase]
  )

  // Arrow keys / WASD slide a tile INTO the gap (ArrowUp moves the tile below the gap up)
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
      if (phaseRef.current !== "playing") {
        const focused = !!rootRef.current && rootRef.current === document.activeElement
        if (focused && (k === " " || k === "enter")) {
          e.preventDefault()
          start()
        }
        return
      }
      const gap = tiles.indexOf(0)
      const r = Math.floor(gap / size)
      const c = gap % size
      let from: number
      if (k === "arrowup" || k === "w") from = r < size - 1 ? gap + size : -1
      else if (k === "arrowdown" || k === "s") from = r > 0 ? gap - size : -1
      else if (k === "arrowleft" || k === "a") from = c < size - 1 ? gap + 1 : -1
      else if (k === "arrowright" || k === "d") from = c > 0 ? gap - 1 : -1
      else return
      e.preventDefault()
      if (from >= 0) moveIndex(from)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [tiles, size, moveIndex, start])

  const gap = tiles.indexOf(0)
  const movable = new Set(neighbors(gap, size))
  const pct = 100 / size
  const bestText = best ? `${best.moves} / ${formatTime(best.ms)}` : "--"

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      aria-label="Puzzle slider game"
      className="mx-auto w-full max-w-[480px] rounded-xl font-sans outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-2" role="group" aria-label="Board size">
          {([3, 4] as Size[]).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => chooseSize(s)}
              className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                size === s
                  ? "border-gold bg-gold font-medium text-bg"
                  : "border-line text-fg hover:border-teal hover:text-teal"
              }`}
            >
              {s}×{s}
              {s === 3 ? " easy" : ""}
            </button>
          ))}
        </div>
        {phase === "playing" && (
          <button
            type="button"
            onClick={() => start()}
            className="rounded-lg border border-line px-3 py-1.5 text-xs text-fg transition-colors hover:border-teal hover:text-teal"
          >
            Reshuffle
          </button>
        )}
      </div>

      <div className="mb-3 flex flex-wrap justify-between gap-2">
        <span className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-wider text-faint">Moves</span>
          <span className="font-mono text-sm tabular-nums text-fg">{moves}</span>
        </span>
        <span className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-wider text-faint">Time</span>
          <span className="font-mono text-sm tabular-nums text-fg">{formatTime(elapsed)}</span>
        </span>
        <span className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-wider text-faint">Best</span>
          <span className="font-mono text-sm tabular-nums text-gold">{bestText}</span>
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-line bg-surface p-1.5 sm:p-2">
        <div
          role="group"
          aria-label={`${size} by ${size} sliding puzzle`}
          className="relative aspect-square w-full rounded-lg bg-bg"
        >
          {tiles.map((value, index) => {
            if (value === 0) return null
            const r = Math.floor(index / size)
            const c = index % size
            const inPlace = value === index + 1
            const canMove = phase === "playing" && movable.has(index)
            return (
              <button
                key={value}
                type="button"
                onClick={() => moveIndex(index)}
                aria-label={`Tile ${value}, row ${r + 1}, column ${c + 1}${canMove ? ", can move" : ""}`}
                aria-disabled={!canMove}
                tabIndex={phase === "playing" ? 0 : -1}
                className="group absolute left-0 top-0 p-[3px] outline-none motion-safe:transition-transform motion-safe:duration-100 motion-safe:ease-linear sm:p-1"
                style={{
                  width: `${pct}%`,
                  height: `${pct}%`,
                  transform: `translate(${c * 100}%, ${r * 100}%)`,
                }}
              >
                <span
                  className={`flex h-full w-full items-center justify-center rounded-lg border font-mono font-medium tabular-nums transition-colors group-focus-visible:ring-2 group-focus-visible:ring-teal ${
                    size === 3 ? "text-xl sm:text-2xl" : "text-base sm:text-xl"
                  } ${
                    inPlace
                      ? "border-gold/40 bg-gold-soft text-gold"
                      : "border-line bg-surface-2 text-fg"
                  } ${canMove ? "cursor-pointer group-hover:border-teal" : "cursor-default"}`}
                >
                  {value}
                </span>
              </button>
            )
          })}
        </div>

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/85 p-4 text-center text-fg backdrop-blur-[2px]">
            {phase === "start" ? (
              <>
                <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Puzzle slider</h2>
                <p className="text-sm text-muted">
                  Slide the tiles back into order, 1 to {size * size - 1}.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold tracking-tight text-gold sm:text-xl">
                  Solved
                </h2>
                <p className="text-sm text-muted">
                  <span className="font-mono tabular-nums text-fg">{moves}</span> moves ·{" "}
                  <span className="font-mono tabular-nums text-fg">{formatTime(elapsed)}</span>
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
              onClick={() => start()}
              className="mt-1 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-gold/90"
            >
              {phase === "start" ? (
                <span className="motion-safe:animate-pulse">Press start</span>
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
        Click or tap a tile next to the gap. Arrow keys / WASD slide a tile into the gap. Tiles
        light up when they&apos;re in the right spot.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Preview thumbnail
// ---------------------------------------------------------------------------

export function Preview() {
  // 4x4 board, one gap, a few tiles "in place" (accent)
  const accent = new Set([0, 1, 2, 4, 5])
  const gapAt = 10
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
      <rect x="6" y="0" width="19" height="19" fill="#262626" />
      <rect x="7" y="1" width="17" height="17" fill="#141414" />
      {Array.from({ length: 16 }, (_, i) => {
        if (i === gapAt) return null
        const r = Math.floor(i / 4)
        const c = i % 4
        const inPlace = accent.has(i)
        return (
          <g key={i}>
            <rect
              x={8 + c * 4}
              y={2 + r * 4}
              width="3"
              height="3"
              fill={inPlace ? "#c49d71" : "#1c1c1c"}
            />
            <rect
              x={9 + c * 4}
              y={3 + r * 4}
              width="1"
              height="1"
              fill={inPlace ? "#0a0a0a" : "#737373"}
            />
          </g>
        )
      })}
    </svg>
  )
}
