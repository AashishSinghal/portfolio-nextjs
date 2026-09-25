"use client"

import { useEffect, useReducer, useRef, type KeyboardEvent, type ReactNode } from "react"

/* ------------------------------------------------------------------ */
/* Types & constants                                                   */
/* ------------------------------------------------------------------ */

type Mark = "X" | "O"
type Cell = Mark | null
type Mode = "pvp" | "cpu"
type CpuLevel = "easy" | "hard"
type Phase = "start" | "playing" | "over"

const HUMAN: Mark = "X"
const CPU: Mark = "O"
const BEST_KEY = "pixel-games:tic-tac-toe:best-streak"
const CPU_DELAY = 420

const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const X_PIXELS = [
  "XX....XX",
  "XXX..XXX",
  ".XXXXXX.",
  "..XXXX..",
  "..XXXX..",
  ".XXXXXX.",
  "XXX..XXX",
  "XX....XX",
]

const O_PIXELS = [
  "..XXXX..",
  ".XXXXXX.",
  "XXX..XXX",
  "XX....XX",
  "XX....XX",
  "XXX..XXX",
  ".XXXXXX.",
  "..XXXX..",
]

/* ------------------------------------------------------------------ */
/* Storage helpers                                                     */
/* ------------------------------------------------------------------ */

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
    // storage unavailable (private mode, blocked) - ignore
  }
}

/* ------------------------------------------------------------------ */
/* Game logic                                                          */
/* ------------------------------------------------------------------ */

function findWinner(board: Cell[]): { winner: Mark; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line
    const v = board[a]
    if (v && v === board[b] && v === board[c]) return { winner: v, line }
  }
  return null
}

function emptyCells(board: Cell[]): number[] {
  const out: number[] = []
  board.forEach((c, i) => {
    if (!c) out.push(i)
  })
  return out
}

function other(mark: Mark): Mark {
  return mark === "X" ? "O" : "X"
}

// Classic minimax with depth so the CPU prefers quick wins and slow losses.
function minimax(board: Cell[], toMove: Mark, me: Mark, depth: number): number {
  const result = findWinner(board)
  if (result) return result.winner === me ? 10 - depth : depth - 10
  const moves = emptyCells(board)
  if (moves.length === 0) return 0

  let best = toMove === me ? -Infinity : Infinity
  for (const m of moves) {
    board[m] = toMove
    const score = minimax(board, other(toMove), me, depth + 1)
    board[m] = null
    best = toMove === me ? Math.max(best, score) : Math.min(best, score)
  }
  return best
}

function pickCpuMove(board: Cell[], level: CpuLevel): number {
  const moves = emptyCells(board)
  if (moves.length === 0) return -1
  if (level === "easy") return moves[Math.floor(Math.random() * moves.length)]

  const scratch = [...board]
  let bestScore = -Infinity
  let bestMoves: number[] = []
  for (const m of moves) {
    scratch[m] = CPU
    const score = minimax(scratch, HUMAN, CPU, 1)
    scratch[m] = null
    if (score > bestScore) {
      bestScore = score
      bestMoves = [m]
    } else if (score === bestScore) {
      bestMoves.push(m)
    }
  }
  // random among equally good moves keeps it from feeling robotic
  return bestMoves[Math.floor(Math.random() * bestMoves.length)]
}

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

type Scores = { X: number; O: number; draw: number }

type State = {
  phase: Phase
  mode: Mode
  level: CpuLevel
  board: Cell[]
  turn: Mark
  starter: Mark
  winner: Mark | "draw" | null
  line: number[] | null
  scores: Scores
  streak: number
  best: number
}

type Action =
  | { type: "setMode"; mode: Mode }
  | { type: "setLevel"; level: CpuLevel }
  | { type: "start" }
  | { type: "move"; index: number }
  | { type: "nextRound" }
  | { type: "menu" }
  | { type: "loadBest"; best: number }

const emptyBoard = (): Cell[] => Array(9).fill(null)
const zeroScores = (): Scores => ({ X: 0, O: 0, draw: 0 })

const initialState: State = {
  phase: "start",
  mode: "cpu",
  level: "hard",
  board: emptyBoard(),
  turn: "X",
  starter: "X",
  winner: null,
  line: null,
  scores: zeroScores(),
  streak: 0,
  best: 0,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setMode":
      return { ...state, mode: action.mode }
    case "setLevel":
      return { ...state, level: action.level }
    case "loadBest":
      return { ...state, best: Math.max(state.best, action.best) }
    case "start":
      return {
        ...state,
        phase: "playing",
        board: emptyBoard(),
        turn: "X",
        starter: "X",
        winner: null,
        line: null,
        scores: zeroScores(),
        streak: 0,
      }
    case "menu":
      return { ...state, phase: "start", board: emptyBoard(), winner: null, line: null }
    case "nextRound": {
      // alternate who goes first each round
      const starter = other(state.starter)
      return {
        ...state,
        phase: "playing",
        board: emptyBoard(),
        starter,
        turn: starter,
        winner: null,
        line: null,
      }
    }
    case "move": {
      if (state.phase !== "playing" || state.board[action.index]) return state
      const board = [...state.board]
      board[action.index] = state.turn
      const result = findWinner(board)
      const full = emptyCells(board).length === 0
      if (!result && !full) return { ...state, board, turn: other(state.turn) }

      const scores = { ...state.scores }
      let { streak, best } = state
      if (result) {
        scores[result.winner] += 1
        if (state.mode === "cpu") {
          if (result.winner === HUMAN) {
            streak += 1
            best = Math.max(best, streak)
          } else {
            streak = 0
          }
        }
      } else {
        scores.draw += 1
      }
      return {
        ...state,
        board,
        phase: "over",
        winner: result ? result.winner : "draw",
        line: result ? result.line : null,
        scores,
        streak,
        best,
      }
    }
    default:
      return state
  }
}

/* ------------------------------------------------------------------ */
/* Pixel art                                                           */
/* ------------------------------------------------------------------ */

function PixelGrid({ rows, x = 0, y = 0 }: { rows: string[]; x?: number; y?: number }) {
  return (
    <>
      {rows.flatMap((row, r) =>
        row
          .split("")
          .map((ch, c) =>
            ch === "." ? null : <rect key={`${r}-${c}`} x={x + c} y={y + r} width={1} height={1} />
          )
      )}
    </>
  )
}

function MarkIcon({ mark }: { mark: Mark }) {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`h-3/5 w-3/5 ${mark === "X" ? "text-rose-500" : "text-pixel-accent"}`}
      fill="currentColor"
    >
      <PixelGrid rows={mark === "X" ? X_PIXELS : O_PIXELS} />
    </svg>
  )
}

export function Preview() {
  // 32x20 thumbnail: a board with a winning diagonal
  const cells: { x: number; y: number; mark: Mark | null; win?: boolean }[] = [
    { x: 7, y: 1, mark: "X", win: true },
    { x: 13, y: 1, mark: "O" },
    { x: 19, y: 1, mark: null },
    { x: 7, y: 7, mark: null },
    { x: 13, y: 7, mark: "X", win: true },
    { x: 19, y: 7, mark: "O" },
    { x: 7, y: 13, mark: "O" },
    { x: 13, y: 13, mark: null },
    { x: 19, y: 13, mark: "X", win: true },
  ]
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
      <g fill="#e2e8f0">
        <rect x="12" y="1" width="1" height="17" />
        <rect x="18" y="1" width="1" height="17" />
        <rect x="7" y="6" width="17" height="1" />
        <rect x="7" y="12" width="17" height="1" />
      </g>
      {cells.map((cell) => (
        <g key={`${cell.x}-${cell.y}`}>
          {cell.win && <rect x={cell.x} y={cell.y} width={5} height={5} fill="#115e59" />}
          {cell.mark && (
            <g fill={cell.mark === "X" ? "#f43f5e" : "#2dd4bf"}>
              <PixelGrid
                rows={cell.mark === "X" ? ["X.X", ".X.", "X.X"] : ["XXX", "X.X", "XXX"]}
                x={cell.x + 1}
                y={cell.y + 1}
              />
            </g>
          )}
        </g>
      ))}
      <rect x="26" y="16" width="2" height="2" fill="#2dd4bf" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* UI bits                                                             */
/* ------------------------------------------------------------------ */

function ToggleButton({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`border-4 border-neutral-900 px-3 py-2 font-pixel text-[10px] uppercase transition-colors dark:border-neutral-100 sm:text-xs ${
        active
          ? "bg-pixel-accent text-neutral-950"
          : "bg-neutral-50 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
      }`}
    >
      {children}
    </button>
  )
}

function PrimaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pixel-box pixel-box-hover bg-pixel-accent px-4 py-3 font-pixel text-xs uppercase text-neutral-950 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pixel-accent dark:bg-pixel-accent sm:text-sm"
    >
      {children}
    </button>
  )
}

function SecondaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pixel-box pixel-box-hover px-4 py-3 font-pixel text-[10px] uppercase text-neutral-900 dark:text-neutral-100 sm:text-xs"
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Game                                                                */
/* ------------------------------------------------------------------ */

export default function TicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const cellRefs = useRef<(HTMLButtonElement | null)[]>([])
  const { phase, mode, level, board, turn, winner, line, scores, streak, best } = state

  const cpuTurn = mode === "cpu" && turn === CPU && phase === "playing"

  // load best streak once
  useEffect(() => {
    dispatch({ type: "loadBest", best: readBest() })
  }, [])

  // persist best streak when it grows
  useEffect(() => {
    if (best > 0) writeBest(best)
  }, [best])

  // CPU move (timeout cleaned up on unmount / state change)
  useEffect(() => {
    if (!cpuTurn) return
    const t = window.setTimeout(() => {
      const move = pickCpuMove(board, level)
      if (move >= 0) dispatch({ type: "move", index: move })
    }, CPU_DELAY)
    return () => window.clearTimeout(t)
  }, [cpuTurn, board, level])

  const nameOf = (m: Mark) =>
    mode === "cpu" ? (m === HUMAN ? "You" : "CPU") : m === "X" ? "Player 1" : "Player 2"

  let status = ""
  if (phase === "start") status = "Press start to play."
  else if (phase === "playing")
    status = cpuTurn ? "CPU is thinking..." : `${nameOf(turn)} (${turn}) to move.`
  else if (winner === "draw") status = "It's a draw!"
  else if (winner)
    status =
      mode === "cpu"
        ? winner === HUMAN
          ? "You win!"
          : "CPU wins!"
        : `${nameOf(winner)} (${winner}) wins!`

  const handleGridKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = cellRefs.current.findIndex((el) => el === document.activeElement)
    if (idx < 0) return
    let next = idx
    if (e.key === "ArrowRight") next = idx % 3 === 2 ? idx - 2 : idx + 1
    else if (e.key === "ArrowLeft") next = idx % 3 === 0 ? idx + 2 : idx - 1
    else if (e.key === "ArrowDown") next = (idx + 3) % 9
    else if (e.key === "ArrowUp") next = (idx + 6) % 9
    else return
    e.preventDefault()
    cellRefs.current[next]?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-md text-neutral-900 dark:text-neutral-100">
      {/* Scoreboard */}
      <div className="pixel-box mb-4 grid grid-cols-3 text-center">
        {(
          [
            { key: "X", label: nameOf("X"), value: scores.X, color: "text-rose-500" },
            { key: "draw", label: "Draws", value: scores.draw, color: "" },
            { key: "O", label: nameOf("O"), value: scores.O, color: "text-pixel-accent" },
          ] as const
        ).map((s, i) => (
          <div
            key={s.key}
            className={`px-1 py-2 ${i < 2 ? "border-r-4 border-neutral-900 dark:border-neutral-100" : ""}`}
          >
            <div className={`font-pixel text-[8px] uppercase sm:text-[10px] ${s.color}`}>
              {s.label}
            </div>
            <div className="mt-1 font-pixel text-sm sm:text-base">{s.value}</div>
          </div>
        ))}
      </div>

      {mode === "cpu" && (
        <p className="mb-3 text-center font-pixel text-[10px] uppercase text-neutral-600 dark:text-neutral-400">
          Streak {streak} · Best {best}
        </p>
      )}

      <p
        aria-live="polite"
        role="status"
        className="mb-3 min-h-[1.5rem] text-center font-retro text-2xl"
      >
        {status}
      </p>

      {phase === "start" ? (
        <div className="pixel-box flex flex-col items-center gap-5 px-4 py-8 text-center">
          <h2 className="font-pixel text-base uppercase sm:text-lg">Tic Tac Toe</h2>
          <div className="flex gap-3" aria-hidden="true">
            <span className="flex h-12 w-12 items-center justify-center">
              <MarkIcon mark="X" />
            </span>
            <span className="flex h-12 w-12 items-center justify-center">
              <MarkIcon mark="O" />
            </span>
          </div>

          <fieldset className="flex flex-col items-center gap-2">
            <legend className="mb-2 font-pixel text-[10px] uppercase">Mode</legend>
            <div className="flex flex-wrap justify-center gap-2">
              <ToggleButton
                active={mode === "pvp"}
                onClick={() => dispatch({ type: "setMode", mode: "pvp" })}
              >
                2 Players
              </ToggleButton>
              <ToggleButton
                active={mode === "cpu"}
                onClick={() => dispatch({ type: "setMode", mode: "cpu" })}
              >
                Vs CPU
              </ToggleButton>
            </div>
          </fieldset>

          {mode === "cpu" && (
            <fieldset className="flex flex-col items-center gap-2">
              <legend className="mb-2 font-pixel text-[10px] uppercase">CPU</legend>
              <div className="flex flex-wrap justify-center gap-2">
                <ToggleButton
                  active={level === "easy"}
                  onClick={() => dispatch({ type: "setLevel", level: "easy" })}
                >
                  Easy
                </ToggleButton>
                <ToggleButton
                  active={level === "hard"}
                  onClick={() => dispatch({ type: "setLevel", level: "hard" })}
                >
                  Hard
                </ToggleButton>
              </div>
            </fieldset>
          )}

          <PrimaryButton onClick={() => dispatch({ type: "start" })}>
            <span className="pixel-cursor">Press Start</span>
          </PrimaryButton>
          <p className="font-retro text-lg text-neutral-600 dark:text-neutral-400">
            {mode === "cpu"
              ? level === "hard"
                ? "Hard CPU never loses. Can you force a draw?"
                : "Easy CPU plays at random."
              : "Pass the device between turns."}
          </p>
        </div>
      ) : (
        <>
          <div
            role="group"
            aria-label="Tic tac toe board"
            onKeyDown={handleGridKey}
            className="pixel-box mx-auto grid aspect-square w-full max-w-[22rem] grid-cols-3 gap-1 bg-neutral-900 p-1 dark:bg-neutral-100"
          >
            {board.map((cell, i) => {
              const inLine = line?.includes(i) ?? false
              const disabled = phase !== "playing" || cell !== null || cpuTurn
              const row = Math.floor(i / 3) + 1
              const col = (i % 3) + 1
              return (
                <button
                  key={i}
                  ref={(el) => {
                    cellRefs.current[i] = el
                  }}
                  type="button"
                  aria-label={`Row ${row}, column ${col}: ${cell ?? "empty"}${inLine ? ", winning line" : ""}`}
                  aria-disabled={disabled}
                  onClick={() => {
                    if (!disabled) dispatch({ type: "move", index: i })
                  }}
                  className={`flex items-center justify-center transition-colors focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-pixel-accent ${
                    inLine
                      ? "bg-pixel-accent/40 motion-safe:animate-pulse dark:bg-pixel-accent/30"
                      : "bg-neutral-50 dark:bg-neutral-900"
                  } ${!disabled ? "cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800" : "cursor-default"}`}
                >
                  {cell && <MarkIcon mark={cell} />}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {phase === "over" ? (
              <PrimaryButton onClick={() => dispatch({ type: "nextRound" })}>
                Play Again
              </PrimaryButton>
            ) : (
              <SecondaryButton onClick={() => dispatch({ type: "nextRound" })}>
                Restart
              </SecondaryButton>
            )}
            <SecondaryButton onClick={() => dispatch({ type: "menu" })}>Menu</SecondaryButton>
          </div>
          {phase === "over" && (
            <p className="mt-3 text-center font-retro text-lg text-neutral-600 dark:text-neutral-400">
              {state.starter === "X" ? nameOf("O") : nameOf("X")} starts next round.
            </p>
          )}
        </>
      )}
    </div>
  )
}
