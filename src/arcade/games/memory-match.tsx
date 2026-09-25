import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

/* ------------------------------------------------------------------ */
/* Pixel icons (8x8 grids, one char per pixel, "." = transparent)      */
/* ------------------------------------------------------------------ */

// Recoloured to the site palette: golds, teals and neutrals.
const PALETTE: Record<string, string> = {
  r: "#c49d71", // gold
  w: "#ededed", // fg highlight
  y: "#e3c9a3", // light gold
  o: "#9a7650", // deep gold
  p: "#2dd4bf", // teal
  k: "#0a0a0a", // ink
  s: "#d4c7b6", // warm muted
  g: "#a3a3a3", // muted
  n: "#735a3f", // brown-gold
  c: "#5eead4", // light teal
  d: "#138b7d", // deep teal
  e: "#1fb3a1", // mid teal
  b: "#138b7d", // deep teal
  m: "#5eead4", // light teal
  l: "#2dd4bf", // teal
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
  const xs = [1.5, 9.25, 17, 24.75]
  return (
    <svg
      viewBox="0 0 32 20"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect width="32" height="20" fill="#0a0a0a" />
      {xs.map((x, i) => {
        const faceUp = i === 0 || i === 2
        return (
          <g key={x}>
            <rect
              x={x}
              y={4}
              width={5.75}
              height={11}
              rx={0.75}
              fill={faceUp ? "#141414" : "#1c1c1c"}
              stroke={faceUp ? "#2dd4bf" : "#262626"}
              strokeWidth={0.25}
            />
            {faceUp ? (
              <g fill="#c49d71" shapeRendering="crispEdges">
                <rect x={x + 1} y={7} width={1.5} height={1} />
                <rect x={x + 3.25} y={7} width={1.5} height={1} />
                <rect x={x + 1} y={8} width={3.75} height={2} />
                <rect x={x + 2} y={10} width={1.75} height={1} />
                <rect x={x + 1} y={8} width={1} height={1} fill="#ededed" />
              </g>
            ) : (
              <path
                d={`M${x + 2.875} 8.25 L${x + 4.125} 9.5 L${x + 2.875} 10.75 L${x + 1.625} 9.5 Z`}
                fill="#c49d71"
                opacity={0.8}
              />
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

function GameButton({
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
  const cls = primary
    ? "bg-gold font-medium text-bg hover:bg-gold/90"
    : pressed
      ? "border border-gold bg-gold-soft text-gold"
      : "border border-line text-fg hover:border-teal hover:text-teal"
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`rounded-lg px-4 py-2 text-sm transition-colors ${cls}`}
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
    <div className="mx-auto w-full max-w-lg font-sans text-fg">
      {/* HUD */}
      <div className="mb-4 grid grid-cols-3 divide-x divide-line rounded-xl border border-line bg-surface text-center">
        {[
          { label: "Moves", value: String(moves) },
          { label: "Time", value: formatTime(seconds) },
          { label: "Best", value: best[size] === null ? "--" : String(best[size]) },
        ].map((s) => (
          <div key={s.label} className="px-2 py-3">
            <div className="text-xs uppercase tracking-wider text-faint">{s.label}</div>
            <div className="mt-1 font-mono text-lg tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      <p
        role="status"
        aria-live="polite"
        className="mb-4 min-h-[1.5rem] text-center text-base text-muted"
      >
        {status}
      </p>

      {phase === "start" ? (
        <div className="flex flex-col items-center gap-6 rounded-xl border border-line bg-surface px-4 py-8 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Memory Match</h2>
          <div className="flex gap-2" aria-hidden="true">
            {[0, 2, 3, 7].map((i) => (
              <span
                key={i}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface-2"
              >
                <IconSvg icon={ICONS[i]} />
              </span>
            ))}
          </div>
          <fieldset className="flex flex-col items-center gap-2">
            <legend className="mb-2 text-xs uppercase tracking-wider text-faint">Board</legend>
            <div className="flex flex-wrap justify-center gap-3">
              <GameButton pressed={size === 4} onClick={() => setSize(4)}>
                4x4 Normal
              </GameButton>
              <GameButton pressed={size === 6} onClick={() => setSize(6)}>
                6x6 Hard
              </GameButton>
            </div>
          </fieldset>
          <GameButton primary onClick={() => start(size)}>
            <span className="motion-safe:animate-pulse">Press Start</span>
          </GameButton>
          <p className="text-sm text-muted">Flip two cards per move. Fewest moves wins.</p>
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
                  className="group aspect-square w-full rounded-lg [perspective:600px]"
                >
                  <span
                    className={`relative block h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d] motion-reduce:transition-none ${
                      shown ? "[transform:rotateY(180deg)]" : ""
                    }`}
                  >
                    {/* back */}
                    <span className="absolute inset-0 flex items-center justify-center rounded-lg border border-line bg-surface-2 transition-colors [backface-visibility:hidden] group-hover:border-faint">
                      <svg
                        viewBox="0 0 10 10"
                        aria-hidden="true"
                        className="h-1/4 w-1/4 text-gold/70 transition-colors group-hover:text-gold"
                        fill="currentColor"
                      >
                        <path d="M5 0 L10 5 L5 10 L0 5 Z" />
                      </svg>
                    </span>
                    {/* face */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center rounded-lg border bg-surface [backface-visibility:hidden] [transform:rotateY(180deg)] ${
                        card.matched ? "border-teal bg-teal-soft" : "border-line"
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
            <div className="mt-5 flex flex-col items-center gap-2 rounded-xl border border-line bg-surface px-4 py-6 text-center">
              <h3 className="text-lg font-semibold tracking-tight text-gold">All pairs found</h3>
              <p className="text-sm text-muted">
                <span className="font-mono tabular-nums text-fg">{moves}</span> moves ·{" "}
                <span className="font-mono tabular-nums text-fg">{formatTime(seconds)}</span>
                {newBest && <span className="text-teal"> · New best</span>}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <GameButton primary={phase === "won"} onClick={() => start(size)}>
              {phase === "won" ? "Play Again" : "Restart"}
            </GameButton>
            <GameButton onClick={backToMenu}>Menu</GameButton>
          </div>
        </>
      )}
    </div>
  )
}
