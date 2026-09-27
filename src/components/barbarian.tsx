import { useEffect, useMemo, useRef, useState } from "react"

// The footer's pixel barbarian (BarbarianO_o was my gamer tag), hard at work on a laptop.
// Idle: types, blinks, the coffee steams and the screen light flickers on his face.
// Hover: he stops and follows the cursor with his eyes. Click: O_o, plus something to say.

// 40×30 pixel map. Eyes, brows and arms are drawn separately so they can move.
const ART = [
  "........n......................n........",
  "........nn....................nn........",
  ".........nn.......hhhh.......nn.........",
  "..........nn...HhhhhhhhhH...nn..........",
  "...........nnnHHHhhhhhHHHHnnn...........",
  "............nnHHHHHHHHHHHHnn............",
  "..............gggggggggggg..............",
  "..............ssssssssssss..............",
  "..............ssssssssssss..............",
  "..............ssssssSsssss..............",
  "...xxxw......bbssssssssssbb.............",
  "..Xxxxw......bbbbbBBBBbbbbb.............",
  "..Xxxxw......bbbbbbbbbbbbbb.............",
  "...xxxw...ffffbbbbbbbbbbbbffff..........",
  "......w..fffffFbbbbbbbbbbFfffff.........",
  "......w.fffffffFbbbbbbbbFfffffff........",
  "......w.sssffffFFbbbbbbFFffffsss........",
  ".....w.ssss.fffffFbbbbFfffff.ssss.......",
  ".....w.ssssLLLLLLLLLLLLLLLLLLssss.......",
  ".....w..sssLLLLLLLLLLLLLLLLLLsss........",
  ".....w...ssLLLLLLLLggLLLLLLLLss.........",
  ".....w....sLLLLLLLgLLgLLLLLLLs..........",
  ".....w.....LLLLLLgLLLLgLLLLLL...........",
  ".....w.....LLLLLgggLLgggLLLLL...mccm....",
  "....w......LLLLLLLLLLLLLLLLLL...mmmmm...",
  "....w......LLLLLLLLLLLLLLLLLL...mmmmm...",
  "....w.....llllllllllllllllllll..mmmm....",
  "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
  "dddddddddddddddddddddddddddddddddddddddd",
  "..dd................................dd..",
]

const COLORS: Record<string, string> = {
  n: "#e8dcc4", // horns
  h: "#b8bcc2", // helmet highlight
  H: "#80858c", // helmet
  g: "var(--color-gold)", // helmet band, logo on the lid
  s: "#e0a878", // skin
  S: "#b97f55", // skin shadow
  e: "#111111", // eyes
  b: "#9a5a2e", // beard
  B: "#5e3219", // beard shadow, brows
  f: "#5c4633", // fur
  F: "#7a5e45", // fur highlight
  L: "#2a2a2a", // laptop lid
  l: "#3d3d3d", // laptop base
  D: "#3a3a3a", // desk top
  d: "#1f1f1f", // desk
  m: "#d4d4d4", // mug
  c: "#5e3219", // coffee
  w: "#7a4b2a", // axe handle
  x: "#a3a3a3", // axe head
  X: "#e5e5e5", // axe edge, eye shine
}

type Pixel = [x: number, y: number, color: string]

const isArm = (x: number, y: number, c: string) => c === "s" && y >= 16 && (x <= 11 || x >= 28)

// Merge horizontal runs of one colour into single rects (a few hundred instead of ~700)
function toRects(pixels: Pixel[]) {
  const rows = new Map<number, Pixel[]>()
  for (const p of pixels) rows.set(p[1], [...(rows.get(p[1]) ?? []), p])
  const rects: Array<{ x: number; y: number; w: number; c: string }> = []
  for (const [y, row] of rows) {
    row.sort((a, b) => a[0] - b[0])
    for (const [x, , c] of row) {
      const last = rects.at(-1)
      if (last && last.y === y && last.c === c && last.x + last.w === x) last.w += 1
      else rects.push({ x, y, w: 1, c })
    }
  }
  return rects
}

function Pixels({
  pixels,
  className,
  style,
}: {
  pixels: Pixel[]
  className?: string
  style?: React.CSSProperties
}) {
  const rects = useMemo(() => toRects(pixels), [pixels])
  return (
    <g className={className} style={style}>
      {rects.map((r) => (
        <rect key={`${r.x},${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={COLORS[r.c]} />
      ))}
    </g>
  )
}

const ALL = ART.flatMap((row, y) =>
  [...row].flatMap((c, x): Pixel[] => (c === "." ? [] : [[x, y, c]]))
)
const BODY = ALL.filter(([x, y, c]) => !isArm(x, y, c))
const LEFT_ARM = ALL.filter(([x, y, c]) => isArm(x, y, c) && x <= 11)
const RIGHT_ARM = ALL.filter(([x, y, c]) => isArm(x, y, c) && x >= 28)

const BROWS: Pixel[] = [15, 16, 17, 22, 23, 24].map((x) => [x, 7, "B"])
const EYES: Pixel[] = [16, 17, 22, 23].map((x) => [x, 8, "e"])
const BLINK: Pixel[] = [16, 17, 22, 23].map((x) => [x, 8, "S"])
// O_o: one wide-open eye, one small one
const SURPRISED: Pixel[] = [
  ...(
    [
      [15, 7],
      [16, 7],
      [17, 7],
      [15, 8],
      [17, 8],
      [15, 9],
      [16, 9],
      [17, 9],
    ] as const
  ).map(([x, y]): Pixel => [x, y, "e"]),
  [16, 8, "X"],
  [22, 9, "e"],
]
const STEAM: Pixel[][] = [
  [
    [33, 22, "X"],
    [34, 20, "X"],
  ],
  [
    [34, 22, "X"],
    [33, 21, "X"],
  ],
  [
    [33, 21, "X"],
    [34, 19, "X"],
  ],
]

const LINES = [
  "BarbarianO_o, at your service.",
  "O_o",
  "ship it.",
  "one more commit…",
  "FOR THE DEPLOY!",
  "who touched prod?",
  "it works on my machine",
]

export default function Barbarian({ className }: { className?: string }) {
  const [tick, setTick] = useState(0)
  const [blink, setBlink] = useState(false)
  const [hover, setHover] = useState(false)
  const [look, setLook] = useState(0)
  const [surprised, setSurprised] = useState(false)
  const [line, setLine] = useState<string | null>(null)
  const ref = useRef<SVGSVGElement>(null)
  const lineIndex = useRef(0)
  const timer = useRef(0)

  // Typing and steam run on one slow tick; blinking on its own random rhythm. Both pause when
  // the barbarian is off-screen, and don't run at all under reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let visible = false
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    if (ref.current) observer.observe(ref.current)
    const typing = window.setInterval(() => visible && setTick((t) => t + 1), 180)
    let blinkTimer = 0
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(
        () => {
          if (visible) {
            setBlink(true)
            window.setTimeout(() => setBlink(false), 140)
          }
          scheduleBlink()
        },
        2500 + Math.random() * 3000
      )
    }
    scheduleBlink()
    return () => {
      observer.disconnect()
      window.clearInterval(typing)
      window.clearTimeout(blinkTimer)
    }
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onMove = (event: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relative = (event.clientX - rect.left) / rect.width
    setLook(relative < 0.38 ? -1 : relative > 0.62 ? 1 : 0)
  }

  const poke = () => {
    setSurprised(true)
    setLine(LINES[lineIndex.current % LINES.length])
    lineIndex.current += 1
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setSurprised(false)
      setLine(null)
    }, 1600)
  }

  const typingNow = !hover && !surprised
  const leftUp = typingNow && tick % 2 === 0
  const rightUp = typingNow && tick % 2 === 1
  const bubble = line ?? (hover ? "hm?" : null)

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={poke}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => {
          setHover(false)
          setLook(0)
        }}
        onPointerMove={onMove}
        aria-label="Poke the barbarian (BarbarianO_o, my old gamer tag)"
        className="relative block w-full cursor-pointer rounded-md"
      >
        {bubble && (
          <span
            aria-live="polite"
            className="absolute -top-2 right-0 z-10 -translate-y-full whitespace-nowrap rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg"
          >
            {bubble}
          </span>
        )}
        <svg
          ref={ref}
          viewBox="0 0 40 30"
          className="h-auto w-full"
          shapeRendering="crispEdges"
          role="img"
          aria-label="A pixel-art barbarian in a horned helmet, typing on a laptop"
        >
          {/* Screen light spilling onto his face */}
          <ellipse
            cx="20"
            cy="12"
            rx="9"
            ry="7"
            fill="var(--color-teal)"
            className="barbarian-glow"
          />
          <Pixels pixels={LEFT_ARM} style={{ transform: `translateY(${leftUp ? -1 : 0}px)` }} />
          <Pixels pixels={RIGHT_ARM} style={{ transform: `translateY(${rightUp ? -1 : 0}px)` }} />
          <Pixels pixels={BODY} />
          {surprised ? (
            <Pixels pixels={SURPRISED} />
          ) : (
            <>
              <Pixels pixels={BROWS} />
              <Pixels
                pixels={blink ? BLINK : EYES}
                style={{ transform: `translateX(${look}px)` }}
              />
            </>
          )}
          <Pixels pixels={STEAM[tick % STEAM.length]} className="opacity-60" />
        </svg>
      </button>
    </figure>
  )
}
