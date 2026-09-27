import { Link } from "react-router"
import { profile } from "@/data/profile"
import { useDocumentTitle } from "@/lib/use-document-title"

export default function NotFound() {
  useDocumentTitle("Call dropped")

  return (
    <div className="grid min-h-[60vh] place-content-center gap-4 text-center">
      <p className="font-mono text-sm text-gold">404 · call dropped</p>
      <h1 className="text-2xl font-semibold tracking-tight">This page never connected.</h1>
      <p className="max-w-sm text-muted">
        The link may be old, or the page has moved. Head back, or play a game while you&apos;re
        here.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/projects" className="link">
          Projects
        </Link>
        <a href={profile.links.arcade} className="link">
          Arcade ↗
        </a>
      </div>
    </div>
  )
}
