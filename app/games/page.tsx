import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Placeholder games data
const games = [
  {
    id: "1",
    title: "Tic Tac Toe",
    description: "The classic game of X's and O's. Play against a friend on the same device.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "easy",
  },
  {
    id: "2",
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards. Find all pairs in the fewest moves possible.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
  },
  {
    id: "3",
    title: "Snake Game",
    description: "Control a snake to eat food and grow longer without hitting the walls or yourself.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
  },
  {
    id: "4",
    title: "Puzzle Slider",
    description: "Rearrange the tiles to complete the image. A classic sliding puzzle game.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "hard",
  },
  {
    id: "5",
    title: "Word Scramble",
    description: "Unscramble the letters to form words. Test your vocabulary and word recognition skills.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "medium",
  },
  {
    id: "6",
    title: "Breakout",
    description: "Break all the bricks with a bouncing ball. A classic arcade game reimagined for the web.",
    image: "/placeholder.svg?height=300&width=500",
    difficulty: "hard",
  },
]

export default function GamesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Games</h1>
      <p className="text-muted-foreground mb-8">
        Take a break and enjoy some fun web-based games. Click on any game to play.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`}>
            <Card className="overflow-hidden h-full cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                <Badge
                  className="absolute top-2 right-2"
                  variant={
                    game.difficulty === "easy" ? "default" : game.difficulty === "medium" ? "secondary" : "destructive"
                  }
                >
                  {game.difficulty}
                </Badge>
              </div>
              <CardHeader className="p-4">
                <CardTitle>{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground">{game.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Badge variant="outline">Play Now</Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

