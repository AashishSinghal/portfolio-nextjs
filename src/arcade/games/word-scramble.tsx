import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"

/* ------------------------------------------------------------------ */
/* Word list                                                           */
/* ------------------------------------------------------------------ */

type Entry = { word: string; hint: string }

const WORDS: Entry[] = [
  { word: "react", hint: "UI library built around components and hooks" },
  { word: "python", hint: "Language named after a comedy troupe" },
  { word: "compiler", hint: "Turns source code into machine code" },
  { word: "variable", hint: "A named box that holds a value" },
  { word: "docker", hint: "Ships apps in containers" },
  { word: "pixel", hint: "The smallest dot on your screen" },
  { word: "function", hint: "Reusable block of code you call" },
  { word: "array", hint: "Ordered list of values" },
  { word: "object", hint: "Bag of key/value pairs" },
  { word: "string", hint: "A sequence of characters" },
  { word: "boolean", hint: "True or false" },
  { word: "integer", hint: "A whole number" },
  { word: "promise", hint: "A value that arrives later in JS" },
  { word: "async", hint: "Keyword paired with await" },
  { word: "server", hint: "Answers requests from clients" },
  { word: "client", hint: "The side that makes requests" },
  { word: "browser", hint: "Chrome, Firefox or Safari" },
  { word: "cookie", hint: "Small piece of data a site stores" },
  { word: "cache", hint: "Fast storage for repeated reads" },
  { word: "router", hint: "Decides which page or packet goes where" },
  { word: "github", hint: "Where the pull requests live" },
  { word: "commit", hint: "A snapshot in git history" },
  { word: "branch", hint: "A parallel line of development" },
  { word: "merge", hint: "Combine two branches" },
  { word: "rebase", hint: "Replay commits on a new base" },
  { word: "deploy", hint: "Ship it to production" },
  { word: "kernel", hint: "The core of an operating system" },
  { word: "linux", hint: "Penguin-powered OS" },
  { word: "terminal", hint: "Where you type shell commands" },
  { word: "script", hint: "A small program, often automated" },
  { word: "syntax", hint: "The grammar rules of a language" },
  { word: "debug", hint: "Hunt down and fix bugs" },
  { word: "binary", hint: "Ones and zeros" },
  { word: "network", hint: "Connected computers" },
  { word: "database", hint: "Organized store of data" },
  { word: "query", hint: "A question you ask a database" },
  { word: "schema", hint: "Blueprint of your data's shape" },
  { word: "index", hint: "Speeds up lookups in a table" },
  { word: "backend", hint: "Server-side part of an app" },
  { word: "frontend", hint: "The part users see and click" },
  { word: "javascript", hint: "The language of the web browser" },
  { word: "typescript", hint: "JavaScript with types" },
  { word: "node", hint: "Runs JavaScript outside the browser" },
  { word: "render", hint: "Draw the UI to the screen" },
  { word: "component", hint: "A reusable piece of UI" },
  { word: "state", hint: "Data that changes over time in an app" },
  { word: "hook", hint: "useState and useEffect are these" },
  { word: "props", hint: "Inputs passed to a React component" },
  { word: "layout", hint: "How elements are arranged on a page" },
  { word: "canvas", hint: "HTML element you draw on with JS" },
  { word: "vector", hint: "Graphics made of paths, not pixels" },
  { word: "sprite", hint: "A 2D image in a game" },
  { word: "shader", hint: "GPU program that colors pixels" },
  { word: "memory", hint: "RAM, where running programs live" },
  { word: "thread", hint: "A single line of execution" },
  { word: "socket", hint: "Endpoint for a network connection" },
  { word: "token", hint: "Proves who you are to an API" },
  { word: "lambda", hint: "Anonymous function, or a Greek letter" },
  { word: "recursion", hint: "A function that calls itself" },
  { word: "algorithm", hint: "Step-by-step recipe to solve a problem" },
  { word: "keyboard", hint: "You're probably typing on one" },
  { word: "monitor", hint: "The screen on your desk" },
]

/* ------------------------------------------------------------------ */
/* Constants & helpers                                                 */
/* ------------------------------------------------------------------ */

type Phase = "start" | "playing" | "over"

const ROUND_SECONDS = 60
const SKIP_PENALTY = 5
const HINT_COST = 5
const BEST_KEY = "pixel-games:word-scramble:best"

function readBest(): number {
  try {
    const raw = window.localStorage.getItem(BEST_KEY)
    const n = raw ? parseInt(raw, 10) : 0
    return Number.isFinite(n) && n > 0 ? n : 0
  } catch (_e) {
    return 0
  }
}

function writeBest(value: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(value))
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

// Shuffle letters, guaranteeing the result differs from the answer.
function scramble(word: string, avoid?: string): string {
  const letters = word.split("")
  if (new Set(letters).size < 2) return word
  for (let attempt = 0; attempt < 50; attempt++) {
    const s = shuffle(letters).join("")
    if (s !== word && s !== avoid) return s
  }
  // deterministic fallback: rotate by one (always differs when letters aren't all equal)
  let rotated = word.slice(1) + word[0]
  let n = 1
  while (rotated === word && n < word.length) {
    n += 1
    rotated = word.slice(n) + word.slice(0, n)
  }
  return rotated
}

// Base points: 10 per letter, plus a bonus that grows with the streak.
function pointsFor(word: string, streak: number) {
  return word.length * 10 + Math.min(streak, 10) * 5
}

function GameButton({
  onClick,
  children,
  primary = false,
  type = "button",
  disabled = false,
}: {
  onClick?: () => void
  children: ReactNode
  primary?: boolean
  type?: "button" | "submit"
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        primary
          ? "bg-gold font-medium text-bg hover:bg-gold/90"
          : "border border-line text-fg hover:border-teal hover:text-teal disabled:hover:border-line disabled:hover:text-fg"
      }`}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Preview                                                             */
/* ------------------------------------------------------------------ */

export function Preview() {
  const letters = ["D", "O", "C", "E"]
  return (
    <svg
      viewBox="0 0 32 20"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect width="32" height="20" fill="#0a0a0a" />
      {letters.map((ch, i) => {
        const x = 3 + i * 7
        const y = i % 2 === 0 ? 3 : 5
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={5}
              height={7}
              rx={0.75}
              fill={i === 0 ? "#c49d7126" : "#1c1c1c"}
              stroke={i === 0 ? "#c49d71" : "#262626"}
              strokeWidth={0.25}
            />
            <text
              x={x + 2.5}
              y={y + 5}
              textAnchor="middle"
              fontFamily="ui-monospace, Menlo, monospace"
              fontSize={4}
              fontWeight={600}
              fill={i === 0 ? "#c49d71" : "#ededed"}
            >
              {ch}
            </text>
          </g>
        )
      })}
      {/* timer bar */}
      <rect x={2} y={16} width={28} height={1.5} rx={0.75} fill="#1c1c1c" />
      <rect x={2} y={16} width={18} height={1.5} rx={0.75} fill="#c49d71" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Game                                                                */
/* ------------------------------------------------------------------ */

export default function WordScramble() {
  const [phase, setPhase] = useState<Phase>("start")
  const [deck, setDeck] = useState<Entry[]>([])
  const [index, setIndex] = useState(0)
  const [scrambled, setScrambled] = useState("")
  const [guess, setGuess] = useState("")
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [solved, setSolved] = useState(0)
  const [hintUsed, setHintUsed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [best, setBest] = useState(0)
  const [newBest, setNewBest] = useState(false)
  const [status, setStatus] = useState("Press start to play.")
  const [shake, setShake] = useState(false)

  const endAtRef = useRef(0)
  const shakeRef = useRef<number | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const scoreRef = useRef(0)

  const current = deck[index]

  useEffect(() => {
    setBest(readBest())
  }, [])

  useEffect(() => {
    scoreRef.current = score
  }, [score])

  // clean up shake timeout on unmount
  useEffect(
    () => () => {
      if (shakeRef.current !== null) window.clearTimeout(shakeRef.current)
    },
    []
  )

  const finish = useCallback(() => {
    setPhase("over")
    const final = scoreRef.current
    const prev = readBest()
    const isBest = final > prev
    if (isBest) {
      writeBest(final)
      setBest(final)
    }
    setNewBest(isBest && final > 0)
    setStatus(`Time's up! Final score ${final}.${isBest && final > 0 ? " New best!" : ""}`)
  }, [])

  // round timer
  useEffect(() => {
    if (phase !== "playing") return
    const id = window.setInterval(() => {
      const left = Math.max(0, Math.ceil((endAtRef.current - Date.now()) / 1000))
      setTimeLeft(left)
      if (left <= 0) {
        window.clearInterval(id)
        finish()
      }
    }, 200)
    return () => window.clearInterval(id)
  }, [phase, finish])

  // keep focus on the input while playing
  useEffect(() => {
    if (phase === "playing") inputRef.current?.focus()
  }, [phase, index])

  const loadWord = (d: Entry[], i: number) => {
    // wrap around by reshuffling if the player burns through every word
    let nextDeck = d
    let nextIndex = i
    if (i >= d.length) {
      nextDeck = shuffle(WORDS)
      nextIndex = 0
      setDeck(nextDeck)
    }
    setIndex(nextIndex)
    setScrambled(scramble(nextDeck[nextIndex].word))
    setGuess("")
    setHintUsed(false)
  }

  const start = () => {
    const d = shuffle(WORDS)
    setDeck(d)
    setScore(0)
    scoreRef.current = 0
    setStreak(0)
    setSolved(0)
    setNewBest(false)
    setTimeLeft(ROUND_SECONDS)
    endAtRef.current = Date.now() + ROUND_SECONDS * 1000
    loadWord(d, 0)
    setPhase("playing")
    setStatus("Unscramble the word!")
  }

  const triggerShake = () => {
    setShake(true)
    if (shakeRef.current !== null) window.clearTimeout(shakeRef.current)
    shakeRef.current = window.setTimeout(() => {
      setShake(false)
      shakeRef.current = null
    }, 350)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (phase !== "playing" || !current) return
    const answer = guess.trim().toLowerCase()
    if (!answer) return
    if (answer === current.word) {
      const nextStreak = streak + 1
      const pts = pointsFor(current.word, streak)
      setScore((s) => s + pts)
      setStreak(nextStreak)
      setSolved((n) => n + 1)
      setStatus(`Correct! ${current.word.toUpperCase()} +${pts}. Streak ${nextStreak}.`)
      loadWord(deck, index + 1)
    } else {
      setStreak(0)
      setStatus(`Nope, "${answer.toUpperCase()}" isn't it. Try again.`)
      triggerShake()
    }
  }

  const skip = () => {
    if (phase !== "playing" || !current) return
    setScore((s) => Math.max(0, s - SKIP_PENALTY))
    setStreak(0)
    setStatus(`Skipped. It was ${current.word.toUpperCase()}. -${SKIP_PENALTY}`)
    loadWord(deck, index + 1)
  }

  const hint = () => {
    if (phase !== "playing" || !current || hintUsed) return
    setHintUsed(true)
    setScore((s) => Math.max(0, s - HINT_COST))
    const first = current.word[0]
    setStatus(`Hint: starts with ${first.toUpperCase()}. -${HINT_COST}`)
    // pre-fill first letter if the input doesn't already start with it
    setGuess((g) => (g.toLowerCase().startsWith(first) ? g : first + g))
    inputRef.current?.focus()
  }

  const reshuffle = () => {
    if (!current) return
    setScrambled((s) => scramble(current.word, s))
  }

  const timerPct = (timeLeft / ROUND_SECONDS) * 100
  const lowTime = timeLeft <= 10

  return (
    <div className="mx-auto w-full max-w-xl font-sans text-fg">
      {/* HUD */}
      <div className="mb-3 grid grid-cols-4 divide-x divide-line rounded-xl border border-line bg-surface text-center">
        {[
          { label: "Score", value: String(score) },
          { label: "Time", value: String(timeLeft) },
          { label: "Streak", value: String(streak) },
          { label: "Best", value: String(best) },
        ].map((s) => (
          <div key={s.label} className="px-2 py-3">
            <div className="text-xs uppercase tracking-wider text-faint">{s.label}</div>
            <div
              className={`mt-1 font-mono text-lg tabular-nums ${
                s.label === "Time" && lowTime && phase === "playing" ? "text-red-400" : ""
              }`}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* timer bar */}
      <div
        className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-label="Time remaining"
        aria-valuemin={0}
        aria-valuemax={ROUND_SECONDS}
        aria-valuenow={timeLeft}
      >
        <div
          className={`h-full rounded-full transition-[width,background-color] duration-200 ease-linear motion-reduce:transition-none ${
            lowTime ? "bg-red-500" : "bg-gold"
          }`}
          style={{ width: `${timerPct}%` }}
        />
      </div>

      <p
        role="status"
        aria-live="polite"
        className="mb-4 min-h-[1.5rem] text-center text-base text-muted"
      >
        {status}
      </p>

      {phase === "start" && (
        <div className="flex flex-col items-center gap-6 rounded-xl border border-line bg-surface px-4 py-8 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Word Scramble</h2>
          <div className="flex gap-1.5" aria-hidden="true">
            {"SCRAMBLE".split("").map((ch, i) => (
              <span
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface-2 font-mono text-sm font-semibold text-fg sm:h-9 sm:w-9"
              >
                {ch}
              </span>
            ))}
          </div>
          <ul className="space-y-1 text-sm text-muted">
            <li>{ROUND_SECONDS} seconds. Solve as many as you can.</li>
            <li>Longer words and streaks score more.</li>
            <li>
              Hint -{HINT_COST} · Skip -{SKIP_PENALTY} · wrong guess breaks your streak
            </li>
          </ul>
          <GameButton primary onClick={start}>
            <span className="motion-safe:animate-pulse">Press Start</span>
          </GameButton>
        </div>
      )}

      {phase === "playing" && current && (
        <div className="rounded-xl border border-line bg-surface px-3 py-6 sm:px-6">
          <p className="sr-only">
            Scrambled letters: {scrambled.toUpperCase().split("").join(" ")}
          </p>
          <div
            aria-hidden="true"
            className={`mb-4 flex flex-wrap justify-center gap-1 sm:gap-1.5 ${
              shake ? "motion-safe:animate-[ws-shake_0.35s_ease-in-out]" : ""
            }`}
          >
            {scrambled.split("").map((ch, i) => {
              const isHint = hintUsed && ch === current.word[0] && scrambled.indexOf(ch) === i
              return (
                <span
                  key={`${scrambled}-${i}`}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border font-mono text-base font-semibold uppercase sm:h-11 sm:w-11 sm:text-lg ${
                    isHint
                      ? "border-gold bg-gold-soft text-gold"
                      : "border-line bg-surface-2 text-fg"
                  }`}
                >
                  {ch}
                </span>
              )
            })}
          </div>

          <p className="mb-5 text-center text-sm text-muted">{current.hint}</p>

          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="ws-guess" className="sr-only">
              Your answer
            </label>
            <input
              id="ws-guess"
              ref={inputRef}
              value={guess}
              onChange={(e) => setGuess(e.target.value.replace(/\s+/g, ""))}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              maxLength={current.word.length + 4}
              placeholder="type answer"
              className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2 font-mono text-sm uppercase tracking-widest text-fg transition-colors placeholder:normal-case placeholder:tracking-normal placeholder:text-faint focus:border-teal focus:outline-none"
            />
            <GameButton type="submit" primary>
              Enter
            </GameButton>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            <GameButton onClick={hint} disabled={hintUsed}>
              Hint -{HINT_COST}
            </GameButton>
            <GameButton onClick={reshuffle}>Shuffle</GameButton>
            <GameButton onClick={skip}>Skip -{SKIP_PENALTY}</GameButton>
          </div>
        </div>
      )}

      {phase === "over" && (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface px-4 py-8 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Game over</h2>
          <p className="text-sm text-muted">
            Score <span className="font-mono text-2xl tabular-nums text-gold">{score}</span>
          </p>
          {newBest && <p className="text-xs uppercase tracking-wider text-teal">New best</p>}
          <p className="mb-2 text-sm text-muted">
            {solved} {solved === 1 ? "word" : "words"} solved
            {current ? ` · last word: ${current.word.toUpperCase()}` : ""}
          </p>
          <GameButton primary onClick={start}>
            Play Again
          </GameButton>
        </div>
      )}

      {/* local keyframes so the component stays self-contained */}
      <style>{`@keyframes ws-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
    </div>
  )
}
