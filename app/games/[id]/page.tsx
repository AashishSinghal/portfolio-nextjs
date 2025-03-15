"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { notFound } from "next/navigation"

// Placeholder games data
const games = [
  {
    id: "1",
    title: "Tic Tac Toe",
    description: "The classic game of X's and O's. Play against a friend on the same device.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "easy",
    gameUrl: "https://example.com/games/tic-tac-toe",
  },
  {
    id: "2",
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards. Find all pairs in the fewest moves possible.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
    gameUrl: "https://example.com/games/memory-match",
  },
  {
    id: "3",
    title: "Snake Game",
    description: "Control a snake to eat food and grow longer without hitting the walls or yourself.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
    gameUrl: "https://example.com/games/snake",
  },
  {
    id: "4",
    title: "Puzzle Slider",
    description: "Rearrange the tiles to complete the image. A classic sliding puzzle game.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "hard",
    gameUrl: "https://example.com/games/puzzle-slider",
  },
  {
    id: "5",
    title: "Word Scramble",
    description: "Unscramble the letters to form words. Test your vocabulary and word recognition skills.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
    gameUrl: "https://example.com/games/word-scramble",
  },
  {
    id: "6",
    title: "Breakout",
    description: "Break all the bricks with a bouncing ball. A classic arcade game reimagined for the web.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "hard",
    gameUrl: "https://example.com/games/breakout",
  },
]

export default function GamePage({ params }) {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading the game data
    const foundGame = games.find((g) => g.id === params.id)

    if (foundGame) {
      setGame(foundGame)
    }

    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-center h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!game) {
    notFound()
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Link href="/games" className="flex items-center text-sm hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Games
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{game.title}</h1>
          <Badge
            variant={
              game.difficulty === "easy" ? "default" : game.difficulty === "medium" ? "secondary" : "destructive"
            }
          >
            {game.difficulty}
          </Badge>
        </div>
      </div>

      <p className="text-muted-foreground mb-8">{game.description}</p>

      <div className="bg-muted rounded-lg p-4 min-h-[500px] flex flex-col items-center justify-center">
        <p className="text-center mb-6">
          This is a placeholder for the game content. In a real implementation, the game would be embedded here.
        </p>

        <Button asChild>
          <a href={game.gameUrl} target="_blank" rel="noopener noreferrer">
            Play {game.title} in a New Tab
          </a>
        </Button>
      </div>
    </div>
  )
}

