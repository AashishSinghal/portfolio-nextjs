import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { games, getGame } from "@/components/games/registry"
import { GameView } from "@/components/games/components"

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const game = getGame(params.slug)
  if (!game) return {}
  return {
    title: `${game.title} - Arcade - Aashish Singhal`,
    description: game.description,
  }
}

export default function GamePage({ params }: Props) {
  const game = getGame(params.slug)
  if (!game) notFound()

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
      <Link href="/games" className="font-pixel text-[10px] hover:text-pixel-accent">
        ◀ BACK TO ARCADE
      </Link>
      <h1 className="text-base sm:text-xl mt-6 mb-2 text-pixel-accent">{game.title}</h1>
      <p className="mb-8 opacity-80">Controls: {game.controls}</p>
      <GameView slug={game.slug} />
    </div>
  )
}
