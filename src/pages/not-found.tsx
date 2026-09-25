import { Link } from "react-router"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-24 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="underline hover:text-teal-400">
        Back to home
      </Link>
    </div>
  )
}
