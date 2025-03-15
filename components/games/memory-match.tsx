"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"

// Card symbols
const symbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

type CardType = {
  id: number
  symbol: string
  flipped: boolean
  matched: boolean
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create pairs of cards with symbols
    const cardPairs = [...symbols, ...symbols].map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false,
    }))

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setGameComplete(false)
  }

  const handleCardClick = (id: number) => {
    // Ignore if already flipped or matched
    if (cards[id].flipped || cards[id].matched || flippedCards.length >= 2) {
      return
    }

    // Flip the card
    const updatedCards = [...cards]
    updatedCards[id].flipped = true
    setCards(updatedCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)

      const [firstId, secondId] = newFlippedCards

      if (cards[firstId].symbol === cards[secondId].symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[firstId].matched = true
          matchedCards[secondId].matched = true
          setCards(matchedCards)
          setFlippedCards([])

          // Check if all cards are matched
          if (matchedCards.every((card) => card.matched)) {
            setGameComplete(true)
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })
          }
        }, 500)
      } else {
        // No match, flip back
        setTimeout(() => {
          const resetCards = [...cards]
          resetCards[firstId].flipped = false
          resetCards[secondId].flipped = false
          setCards(resetCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      <div className="flex justify-between w-full">
        <div className="text-lg font-medium">Moves: {moves}</div>
        <Button onClick={initializeGame} size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Restart
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`h-20 flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 ${
              card.flipped || card.matched ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            } ${card.matched ? "opacity-70" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.flipped || card.matched ? card.symbol : ""}
          </Card>
        ))}
      </div>

      {gameComplete && (
        <div className="text-center mt-4">
          <h3 className="text-xl font-bold mb-2">Congratulations! 🎉</h3>
          <p>You completed the game in {moves} moves!</p>
        </div>
      )}
    </div>
  )
}

