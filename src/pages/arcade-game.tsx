import { Suspense } from "react"
import { Link, useParams } from "react-router"
import { getGame } from "@/arcade/registry"
import { gameComponents } from "@/arcade/loaders"
import NotFound from "@/pages/not-found"
import { useDocumentTitle } from "@/lib/use-document-title"

export default function ArcadeGame() {
  const { slug = "" } = useParams()
  const game = getGame(slug)
  const Game = gameComponents[slug]
  useDocumentTitle(game ? `${game.title} · Arcade` : undefined)

  if (!game || !Game) return <NotFound />

  return (
    <div className="pb-20 pt-12">
      <Link to="/arcade" className="text-sm text-muted transition-colors hover:text-teal">
        ← Arcade
      </Link>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight">{game.title}</h1>
      <p className="mt-2 text-sm text-faint">{game.controls}</p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Loading…</p>}>
          <Game />
        </Suspense>
      </div>
    </div>
  )
}
