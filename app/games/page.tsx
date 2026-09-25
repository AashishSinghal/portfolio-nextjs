import type { Metadata } from "next"
import Link from "next/link"
import { games } from "@/components/games/registry"
import { GamePreview } from "@/components/games/components"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Arcade - Aashish Singhal",
  description: "Six small 8-bit games you can play right in the browser.",
}

const difficultyColor = {
  easy: "bg-emerald-400 text-neutral-900",
  medium: "bg-amber-400 text-neutral-900",
  hard: "bg-rose-500 text-neutral-50",
} as const

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-lg sm:text-2xl mb-4 text-pixel-accent">ARCADE</h1>
      <p className="mb-10 max-w-2xl">
        Take a break. Everything here runs in your browser, and your best scores are saved on this
        device. <span className="pixel-cursor">Insert coin</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => {
          return (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="pixel-box pixel-box-hover flex flex-col focus-visible:outline focus-visible:outline-4 focus-visible:outline-pixel-accent"
            >
              <div className="relative aspect-video border-b-4 border-neutral-900 dark:border-neutral-100 bg-neutral-900">
                <GamePreview slug={game.slug} />
                <span
                  className={cn(
                    "absolute top-2 right-2 font-pixel text-[8px] px-2 py-1 uppercase",
                    difficultyColor[game.difficulty]
                  )}
                >
                  {game.difficulty}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1">
                <h2 className="text-xs sm:text-sm">{game.title}</h2>
                <p className="leading-tight flex-1">{game.description}</p>
                <span className="font-pixel text-[10px] text-pixel-accent">▶ PLAY</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
