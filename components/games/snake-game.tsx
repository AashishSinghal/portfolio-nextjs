"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Play, Pause } from "lucide-react"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SPEED = 150

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 5, y: 5 })
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(INITIAL_SPEED)

  const directionRef = useRef(direction)
  const gameOverRef = useRef(gameOver)
  const isPausedRef = useRef(isPaused)

  // Update refs when state changes
  useEffect(() => {
    directionRef.current = direction
    gameOverRef.current = gameOver
    isPausedRef.current = isPaused
  }, [direction, gameOver, isPaused])

  // Generate random food position
  const generateFood = useCallback((): Position => {
    const x = Math.floor(Math.random() * GRID_SIZE)
    const y = Math.floor(Math.random() * GRID_SIZE)
    return { x, y }
  }, [])

  // Initialize game
  const initGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }])
    setFood(generateFood())
    setDirection("RIGHT")
    setGameOver(false)
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setIsPaused(false)
  }, [generateFood])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverRef.current) return

      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") {
            setDirection("UP")
          }
          break
        case "ArrowDown":
          if (directionRef.current !== "UP") {
            setDirection("DOWN")
          }
          break
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") {
            setDirection("LEFT")
          }
          break
        case "ArrowRight":
          if (directionRef.current !== "LEFT") {
            setDirection("RIGHT")
          }
          break
        case " ":
          setIsPaused(!isPausedRef.current)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Game loop
  useEffect(() => {
    if (!canvasRef.current) return

    const moveSnake = () => {
      if (gameOverRef.current || isPausedRef.current) return

      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] }

        // Move head based on direction
        switch (directionRef.current) {
          case "UP":
            head.y -= 1
            break
          case "DOWN":
            head.y += 1
            break
          case "LEFT":
            head.x -= 1
            break
          case "RIGHT":
            head.x += 1
            break
        }

        // Check for collisions
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE ||
          prevSnake.some((segment, i) => i !== 0 && segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true)
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]

        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 1)
          setFood(generateFood())

          // Increase speed every 5 points
          if ((score + 1) % 5 === 0 && speed > 50) {
            setSpeed((prev) => prev - 10)
          }
        } else {
          // Remove tail if no food was eaten
          newSnake.pop()
        }

        return newSnake
      })
    }

    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [food, generateFood, score, speed])

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw snake
    ctx.fillStyle = "#10b981" // Green color
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    })

    // Draw food
    ctx.fillStyle = "#ef4444" // Red color
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

    // Draw grid (optional)
    ctx.strokeStyle = "#e5e7eb30"
    for (let i = 0; i < GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }
  }, [snake, food])

  // Initialize game on mount
  useEffect(() => {
    initGame()
  }, [initGame])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-between w-full max-w-md">
        <div className="text-lg font-medium">Score: {score}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setIsPaused(!isPaused)} disabled={gameOver}>
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={initGame}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative border border-border rounded-md overflow-hidden">
        <canvas ref={canvasRef} width={GRID_SIZE * CELL_SIZE} height={GRID_SIZE * CELL_SIZE} className="bg-muted" />

        {gameOver && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-2">Game Over!</h3>
            <p className="mb-4">Your score: {score}</p>
            <Button onClick={initGame}>Play Again</Button>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <p>Use arrow keys to move the snake. Press space to pause/resume.</p>
      </div>
    </div>
  )
}

