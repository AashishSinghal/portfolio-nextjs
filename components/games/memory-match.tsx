"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

/* ------------------------------------------------------------------ */
/* Pixel icons (8x8 grids, one char per pixel, "." = transparent)      */
/* ------------------------------------------------------------------ */

const PALETTE: Record<string, string> = {
  r: "#ef4444",
  w: "#f8fafc",
  y: "#facc15",
  o: "#f97316",
  p: "#a78bfa",
  k: "#0f172a",
  s: "#fcd9b6",
  g: "#cbd5e1",
  n: "#a16207",
  c: "#22d3ee",
  d: "#0e7490",
  e: "#22c55e",
  b: "#3b82f6",
  m: "#f472b6",
  l: "#a3e635",
}

type Icon = { name: string; rows: string[] }

const ICONS: Icon[] = [
  {
    name: "heart",
    rows: [
      "........",
      ".rr..rr.",
      "rwrrrrrr",
      "rrrrrrrr",
      "rrrrrrrr",
      ".rrrrrr.",
      "..rrrr..",
      "...rr...",
    ],
  },
  {
    name: "star",
    rows: [
      "...yy...",
      "...yy...",
      "yyyyyyyy",
      ".yyyyyy.",
      "..yyyy..",
      ".yyyyyy.",
      ".yy..yy.",
      "y......y",
    ],
  },
  {
    name: "ghost",
    rows: [
      "..pppp..",
      ".pppppp.",
      "pwkppwkp",
      "pwwppwwp",
      "pppppppp",
      "pppppppp",
      "pppppppp",
      "p.pp.pp.",
    ],
  },
  {
    name: "mushroom",
    rows: [
      "..rrrr..",
      ".rwwrrr.",
      "rwwrrwwr",
      "rrrrrwwr",
      ".rrrrrr.",
      "..sksk..",
      "..ssss..",
      "...ss...",
    ],
  },
  {
    name: "sword",
    rows: [
      "......ww",
      ".....wgw",
      "....wgw.",
      "...wgw..",
      ".y.gw...",
      "..yg....",
      ".ny.y...",
      "nn......",
    ],
  },
  {
    name: "coin",
    rows: [
      "..yyyy..",
      ".yoooyy.",
      "yoyyyoyy",
      "yoywyoyy",
      "yoywyoyy",
      "yoyyyoyy",
      ".yoooyy.",
      "..yyyy..",
    ],
  },
  {
    name: "key",
    rows: [
      "........",
      ".yyy....",
      "y...y...",
      "y...yyyy",
      "y...y.yy",
      ".yyy..y.",
      "........",
      "........",
    ],
  },
  {
    name: "gem",
    rows: [
      "........",
      "..cccc..",
      ".cwcccc.",
      "cwcccccd",
      ".cccccd.",
      "..cccd..",
      "...cd...",
      "........",
    ],
  },
  {
    name: "skull",
    rows: [
      ".wwwwww.",
      "wwwwwwww",
      "wkkwwkkw",
      "wkkwwkkw",
      "wwwkkwww",
      ".wwwwww.",
      "..w.w.w.",
      "..wwwww.",
    ],
  },
  {
    name: "potion",
    rows: [
      "...nn...",
      "...gg...",
      "...gg...",
      "..gggg..",
      ".geeeeg.",
      "geweeeeg",
      "geeeeeeg",
      ".gggggg.",
    ],
  },
  {
    name: "shield",
    rows: [
      "bbbbbbbb",
      "bbbyybbb",
      "bbbyybbb",
      "byyyyyyb",
      "bbbyybbb",
      ".bbyybb.",
      "..bbbb..",
      "...bb...",
    ],
  },
  {
    name: "apple",
    rows: [
      "....n...",
      "...nee..",
      ".rrnrrr.",
      "rwrrrrrr",
      "rrrrrrrr",
      "rrrrrrrr",
      ".rrrrrr.",
      "..rrrr..",
    ],
  },
  {
    name: "moon",
    rows: [
      "..yyy...",
      ".yy.....",
      "yy......",
      "yy......",
      "yy......",
      "yy.....y",
      ".yy..yy.",
      "..yyyy..",
    ],
  },
  {
    name: "bolt",
    rows: [
      "....yyy.",
      "...yyy..",
      "..yyy...",
      ".yyyyyy.",
      "...yyy..",
      "..yyy...",
      ".yy.....",
      "y.......",
    ],
  },
  {
    name: "flower",
    rows: [
      "...mm...",
      ".mmmmmm.",
      ".mmyymm.",
      ".mmyymm.",
      ".mmmmmm.",
      "...mm...",
      ".ee.e...",
      "...e....",
    ],
  },
  {
    name: "invader",
    rows: [
      ".l....l.",
      "..l..l..",
      ".llllll.",
      "ll.ll.ll",
      "llllllll",
      "l.llll.l",
      "l.l..l.l",
      "...ll...",
    ],
  },
  {
    name: "crown",
    rows: [
      "........",
      "y..yy..y",
      "yy.yy.yy",
      "yyyyyyyy",
      "yryyyyry",
      "yyyyyyyy",
      "yyyyyyyy",
      "........",
    ],
  },
  {
    name: "cherry",
    rows: [
      "....ee..",
      "...e.e..",
      "..e...e.",
      ".rr..rr.",
      "rwrrrwrr",
      "rrr.rrr.",
      ".r...r..",
      "........",
    ],
  },
]

function PixelIcon({ rows, x = 0, y = 0 }: { rows: string[]; x?: number; y?: number }) {
  return (
    <>
      {rows.flatMap((row, r) =>
        row
          .split("")
          .map((ch, c) =>
            ch === "." ? null : (
              <rect key={`${r}-${c}`} x={x + c} y={y + r} width={1} height={1} fill={PALETTE[ch]} />
            )
          )
      )}
    </>
  )
}

function IconSvg({ icon }: { icon: Icon }) {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="h-[70%] w-[70%]"
    >
      <PixelIcon rows={icon.rows} />
    </svg>
  )
}

export function Preview() {
  // 32x20 thumbnail: 4 cards, two face up showing a matching heart
  const xs = [1, 9, 17, 25]
  return (
    <svg
      viewBox="0 0 32 20"
      width="100%"
      height="100%"
      shapeRendering="crispEdges"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect width="32" height="20" fill="#0f172a" />
      {xs.map((x, i) => {
        const faceUp = i === 0 || i === 2
        return (
          <g key={x}>
            <rect x={x + 1} y={5} width={6} height={11} fill="#020617" />
            <rect x={x} y={4} width={6} height={11} fill={faceUp ? "#334155" : "#2dd4bf"} />
            {faceUp ? (
              <g fill="#ef4444">
                <rect x={x + 1} y={7} width={1} height={1} />
                <rect x={x + 4} y={7} width={1} height={1} />
                <rect x={x + 1} y={8} width={4} height={2} />
                <rect x={x + 2} y={10} width={2} height={1} />
                <rect x={x + 1} y={8} width={1} height={1} fill="#f8fafc" />
              </g>
            ) : (
              <g fill="#0f766e">
                <rect x={x + 2} y={7} width={2} height={1} />
                <rect x={x + 1} y={9} width={4} height={1} />
                <rect x={x + 2} y={11} width={2} height={1} />
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

type Size = 4 | 6
type Phase = "start" | "playing" | "won"
type Card = { key: number; icon: number; faceUp: boolean; matched: boolean }

const FLIP_BACK_MS = 800
const bestKey = (size: Size) => `pixel-games:memory-match:best-${size}`

function readBest(size: Size): number | null {
  try {
    const raw = window.localStorage.getItem(bestKey(size))
    if (!raw) return null
    const n = parseInt(raw, 10)
    return Number.isFinite(n) && n > 0 ? n : null
  } catch (_e) {
    return null
  }
}

function writeBest(size: Size, moves: number) {
  try {
    window.localStorage.setItem(bestKey(size), String(moves))
  } catch (_e) {
    // storage unavailable - ignore
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeDeck(size: Size): Card[] {
  const pairs = (size * size) / 2
  const icons = shuffle(ICONS.map((_, i) => i)).slice(0, pairs)
  return shuffle([...icons, ...icons]).map((icon, key) => ({
    key,
    icon,
    faceUp: false,
    matched: false,
  }))
}

function formatTime(total: number) {
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

function PixelButton({
  onClick,
  children,
  primary = false,
  pressed,
}: {
  onClick: () => void
  children: ReactNode
  primary?: boolean
  pressed?: boolean
}) {
  const active = primary || pressed
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`pixel-box pixel-box-hover px-4 py-3 font-pixel text-[10px] uppercase sm:text-xs ${
        active
          ? "bg-pixel-accent text-neutral-950 dark:bg-pixel-accent"
          : "text-neutral-900 dark:text-neutral-100"
      }`}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Game                                                                */
/* ------------------------------------------------------------------ */

export default function MemoryMatch() {
  const [phase, setPhase] = useState<Phase>("start")
  const [size, setSize] = useState<Size>(4)
  const [cards, setCards] = useState<Card[]>(() => makeDeck(4))
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [best, setBest] = useState<Record<Size, number | null>>({ 4: null, 6: null })
  const [newBest, setNewBest] = useState(false)
  const [status, setStatus] = useState("Press start to play.")

  const flipBackRef = useRef<number | null>(null)
  const startRef = useRef(0)

  const clearFlipBack = () => {
    if (flipBackRef.current !== null) {
      window.clearTimeout(flipBackRef.current)
      flipBackRef.current = null
    }
  }

  // load persisted bests
  useEffect(() => {
    setBest({ 4: readBest(4), 6: readBest(6) })
  }, [])

  // cleanup pending timeout on unmount
  useEffect(() => clearFlipBack, [])

  // timer
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      setSeconds(Math.floor((Date.now() - startRef.current) / 1000))
    }, 250)
    return () => window.clearInterval(id)
  }, [running])

  const start = useCallback((nextSize: Size) => {
    clearFlipBack()
    setSize(nextSize)
    setCards(makeDeck(nextSize))
    setSelected([])
    setMoves(0)
    setSeconds(0)
    setRunning(false)
    setNewBest(false)
    setPhase("playing")
    setStatus(`Find all ${(nextSize * nextSize) / 2} pairs.`)
  }, [])

  const pairsTotal = (size * size) / 2
  const pairsFound = cards.filter((c) => c.matched).length / 2
  const locked = selected.length >= 2

  const flip = (index: number) => {
    const card = cards[index]
    if (phase !== "playing" || locked || card.faceUp || card.matched) return

    if (!running && moves === 0 && selected.length === 0) {
      startRef.current = Date.now()
      setRunning(true)
    }

    const nextCards = cards.map((c, i) => (i === index ? { ...c, faceUp: true } : c))
    const nextSelected = [...selected, index]

    if (nextSelected.length < 2) {
      setCards(nextCards)
      setSelected(nextSelected)
      setStatus(`Flipped ${ICONS[card.icon].name}.`)
      return
    }

    const [a, b] = nextSelected
    const nextMoves = moves + 1
    setMoves(nextMoves)

    if (nextCards[a].icon === nextCards[b].icon) {
      const matchedCards = nextCards.map((c, i) =>
        i === a || i === b ? { ...c, matched: true } : c
      )
      setCards(matchedCards)
      setSelected([])
      const found = matchedCards.filter((c) => c.matched).length / 2
      if (found === pairsTotal) {
        const finalSeconds = Math.floor((Date.now() - startRef.current) / 1000)
        setSeconds(finalSeconds)
        setRunning(false)
        setPhase("won")
        const prev = best[size]
        const isBest = prev === null || nextMoves < prev
        if (isBest) {
          writeBest(size, nextMoves)
          setBest((b) => ({ ...b, [size]: nextMoves }))
        }
        setNewBest(isBest)
        setStatus(
          `You win! ${nextMoves} moves in ${formatTime(finalSeconds)}.${isBest ? " New best!" : ""}`
        )
      } else {
        setStatus(`Match: ${ICONS[card.icon].name}! ${found} of ${pairsTotal} pairs.`)
      }
      return
    }

    setCards(nextCards)
    setSelected(nextSelected)
    setStatus(`No match: ${ICONS[nextCards[a].icon].name} and ${ICONS[card.icon].name}.`)
    clearFlipBack()
    flipBackRef.current = window.setTimeout(() => {
      flipBackRef.current = null
      setCards((cs) => cs.map((c, i) => (i === a || i === b ? { ...c, faceUp: false } : c)))
      setSelected([])
    }, FLIP_BACK_MS)
  }

  const backToMenu = () => {
    clearFlipBack()
    setRunning(false)
    setSelected([])
    setPhase("start")
    setStatus("Press start to play.")
  }

  return (
    <div className="mx-auto w-full max-w-lg text-neutral-900 dark:text-neutral-100">
      {/* HUD */}
      <div className="pixel-box mb-4 grid grid-cols-3 text-center">
        {[
          { label: "Moves", value: String(moves) },
          { label: "Time", value: formatTime(seconds) },
          { label: "Best", value: best[size] === null ? "--" : String(best[size]) },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`px-1 py-2 ${i < 2 ? "border-r-4 border-neutral-900 dark:border-neutral-100" : ""}`}
          >
            <div className="font-pixel text-[8px] uppercase text-neutral-600 dark:text-neutral-400 sm:text-[10px]">
              {s.label}
            </div>
            <div className="mt-1 font-pixel text-xs sm:text-sm">{s.value}</div>
          </div>
        ))}
      </div>

      <p
        role="status"
        aria-live="polite"
        className="mb-3 min-h-[1.5rem] text-center font-retro text-xl sm:text-2xl"
      >
        {status}
      </p>

      {phase === "start" ? (
        <div className="pixel-box flex flex-col items-center gap-5 px-4 py-8 text-center">
          <h2 className="font-pixel text-base uppercase sm:text-lg">Memory Match</h2>
          <div className="flex gap-2" aria-hidden="true">
            {[0, 2, 3, 7].map((i) => (
              <span
                key={i}
                className="flex h-11 w-11 items-center justify-center border-4 border-neutral-900 bg-slate-800 dark:border-neutral-100"
              >
                <IconSvg icon={ICONS[i]} />
              </span>
            ))}
          </div>
          <fieldset className="flex flex-col items-center gap-2">
            <legend className="mb-2 font-pixel text-[10px] uppercase">Board</legend>
            <div className="flex flex-wrap justify-center gap-3">
              <PixelButton pressed={size === 4} onClick={() => setSize(4)}>
                4x4 Normal
              </PixelButton>
              <PixelButton pressed={size === 6} onClick={() => setSize(6)}>
                6x6 Hard
              </PixelButton>
            </div>
          </fieldset>
          <PixelButton primary onClick={() => start(size)}>
            <span className="pixel-cursor">Press Start</span>
          </PixelButton>
          <p className="font-retro text-lg text-neutral-600 dark:text-neutral-400">
            Flip two cards per move. Fewest moves wins.
          </p>
        </div>
      ) : (
        <>
          <div
            role="group"
            aria-label={`Memory board, ${pairsFound} of ${pairsTotal} pairs found`}
            className={`mx-auto grid w-full gap-1.5 sm:gap-2 ${
              size === 4 ? "max-w-[26rem] grid-cols-4" : "max-w-[30rem] grid-cols-6"
            }`}
          >
            {cards.map((card, i) => {
              const shown = card.faceUp || card.matched
              const icon = ICONS[card.icon]
              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => flip(i)}
                  aria-label={`Card ${i + 1}: ${shown ? icon.name : "face down"}${
                    card.matched ? ", matched" : ""
                  }`}
                  aria-disabled={shown || locked || phase !== "playing"}
                  className="group aspect-square w-full [perspective:600px] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pixel-accent"
                >
                  <span
                    className={`relative block h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
                      shown ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* back */}
                    <span className="absolute inset-0 flex items-center justify-center border-[3px] border-neutral-900 bg-pixel-accent shadow-[3px_3px_0_0_hsl(var(--pixel-shadow))] [backface-visibility:hidden] group-hover:brightness-110 dark:border-neutral-100 sm:border-4">
                      <svg
                        viewBox="0 0 5 5"
                        shapeRendering="crispEdges"
                        aria-hidden="true"
                        className="h-2/5 w-2/5 text-teal-900"
                        fill="currentColor"
                      >
                        <rect x="2" y="0" width="1" height="1" />
                        <rect x="1" y="1" width="3" height="1" />
                        <rect x="0" y="2" width="5" height="1" />
                        <rect x="1" y="3" width="3" height="1" />
                        <rect x="2" y="4" width="1" height="1" />
                      </svg>
                    </span>
                    {/* face */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center border-[3px] bg-slate-800 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:border-4 ${
                        card.matched
                          ? "border-pixel-accent opacity-80"
                          : "border-neutral-900 dark:border-neutral-100"
                      }`}
                    >
                      <IconSvg icon={icon} />
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {phase === "won" && (
            <div className="pixel-box mt-5 flex flex-col items-center gap-3 px-4 py-6 text-center">
              <h3 className="font-pixel text-sm uppercase text-pixel-accent sm:text-base">
                Stage Clear!
              </h3>
              <p className="font-retro text-xl">
                {moves} moves · {formatTime(seconds)}
                {newBest ? " · NEW BEST!" : ""}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <PixelButton primary={phase === "won"} onClick={() => start(size)}>
              {phase === "won" ? "Play Again" : "Restart"}
            </PixelButton>
            <PixelButton onClick={backToMenu}>Menu</PixelButton>
          </div>
        </>
      )}
    </div>
  )
}
