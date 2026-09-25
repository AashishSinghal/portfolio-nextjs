export type Difficulty = "easy" | "medium" | "hard"

export type GameMeta = {
  slug: string
  title: string
  description: string
  difficulty: Difficulty
  controls: string
}

// Each game lives in its own self-contained file under src/arcade/games/, exporting
// a default game component and a named `Preview` (static SVG thumbnail). Keeping
// them isolated means they can later move to a standalone arcade app unchanged.
export const games: GameMeta[] = [
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "X's and O's. Play a friend on the same device, or take on the CPU.",
    difficulty: "easy",
    controls: "Click or tap a square",
  },
  {
    slug: "memory-match",
    title: "Memory Match",
    description: "Flip the pixel cards and find every pair in as few moves as you can.",
    difficulty: "medium",
    controls: "Click or tap cards",
  },
  {
    slug: "snake",
    title: "Snake",
    description: "Eat, grow, and don't bite your own tail.",
    difficulty: "medium",
    controls: "Arrow keys / WASD, or swipe",
  },
  {
    slug: "puzzle-slider",
    title: "Puzzle Slider",
    description: "Slide the tiles back into order. The classic 15-puzzle.",
    difficulty: "hard",
    controls: "Click a tile next to the gap, or arrow keys",
  },
  {
    slug: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble dev and tech words before the timer runs out.",
    difficulty: "medium",
    controls: "Type your answer, Enter to submit",
  },
  {
    slug: "breakout",
    title: "Breakout",
    description: "Bounce the ball, smash the bricks, keep the paddle alive.",
    difficulty: "hard",
    controls: "Mouse / touch or ← → keys, Space to launch",
  },
]

export function getGame(slug: string) {
  return games.find((game) => game.slug === slug)
}
