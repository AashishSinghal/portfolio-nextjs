"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Player = "X" | "O" | null

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<Player>(null)
  const [isDraw, setIsDraw] = useState<boolean>(false)

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setIsDraw(false)
  }

  useEffect(() => {
    const calculateWinner = (squares: Player[]): Player => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]
        }
      }
      return null
    }

    const winner = calculateWinner(board)
    if (winner) {
      setWinner(winner)
    } else if (!board.includes(null)) {
      setIsDraw(true)
    }
  }, [board])

  const renderSquare = (index: number) => (
    <Button
      variant="outline"
      className="h-20 w-20 text-2xl font-bold"
      onClick={() => handleClick(index)}
      disabled={!!board[index] || !!winner || isDraw}
    >
      {board[index]}
    </Button>
  )

  const status = winner ? `Winner: ${winner}` : isDraw ? "Game ended in a draw" : `Next player: ${isXNext ? "X" : "O"}`

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">
      {(winner || isDraw) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Game Over</AlertTitle>
          <AlertDescription>{winner ? `Player ${winner} wins!` : "The game ended in a draw."}</AlertDescription>
        </Alert>
      )}

      <div className="text-lg font-medium">{status}</div>

      <div className="grid grid-cols-3 gap-2">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <Button onClick={resetGame} className="mt-4">
        <RefreshCw className="mr-2 h-4 w-4" />
        Restart Game
      </Button>
    </div>
  )
}

