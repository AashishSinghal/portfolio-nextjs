import { Suspense, useEffect } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router"
import { profile } from "@/data/profile"
import { posts } from "@/data/writing"
import { cn } from "@/lib/utils"
import VisitorCount from "@/components/visitor-count"
import Barbarian from "@/components/barbarian"
import AnimeQuote from "@/components/anime-quote"

// `href` items leave the site (the arcade lives on its own subdomain)
const navItems: Array<{ label: string; to?: string; href?: string }> = [
  { label: "Work", to: "/#work" },
  { label: "Projects", to: "/projects" },
  // Writing appears only once there's at least one (visible) post
  ...(posts.length > 0 ? [{ label: "Writing", to: "/writing" }] : []),
  { label: "Arcade", href: profile.links.arcade },
  { label: "Contact", to: "/#contact" },
]

// React Router doesn't scroll on navigation: go to the #hash target if there is
// one, otherwise back to the top of the new page
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

function Nav() {
  const { pathname, hash } = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-2 px-4 min-[360px]:gap-3 sm:gap-6 sm:px-5">
        <Link
          to="/"
          className="group flex shrink-0 items-center"
          aria-label={`${profile.name}, home`}
        >
          {/* The logo sits in greyscale and fills with its gold on hover */}
          <img
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="size-7 grayscale min-[360px]:size-8 transition-[filter] duration-300 group-hover:grayscale-0"
          />
        </Link>

        <ul className="flex items-center text-[13px] sm:gap-2 sm:text-sm">
          {navItems.map((item) => {
            if (item.href) {
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="rounded-md px-1 py-1.5 min-[360px]:px-1.5 text-muted transition-colors hover:text-fg sm:px-3"
                  >
                    {item.label}
                  </a>
                </li>
              )
            }

            const [path, anchor] = item.to!.split("#")
            const active = anchor
              ? pathname === path && hash === `#${anchor}`
              : pathname.startsWith(path)
            return (
              <li key={item.label}>
                <NavLink
                  to={item.to!}
                  className={cn(
                    "rounded-md px-1 py-1.5 min-[360px]:px-1.5 transition-colors sm:px-3",
                    active ? "text-gold" : "text-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

// An anime quote, then the note and visitor number, with the barbarian in the corner
function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-3xl px-5">
        <div className="py-20 sm:py-28">
          <AnimeQuote />
        </div>
        <div className="flex items-end justify-between gap-6 pb-6">
          <div className="grid gap-1 font-mono text-sm text-faint">
            {/* The whole line turns gold on hover, heart included */}
            <p className="flex items-center gap-1.5 transition-colors hover:text-gold">
              Made with
              <svg
                viewBox="0 0 24 24"
                aria-label="love"
                role="img"
                className="size-3.5 fill-current"
              >
                <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.1 5.3 3 1.7-1.9 3.2-3 5.3-3 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21Z" />
              </svg>
              by Aashish
            </p>
            <VisitorCount />
          </div>
          {/* The barbarian at his laptop in the corner, in a soft pool of light */}
          <div className="relative shrink-0">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.06),transparent)]"
            />
            <Barbarian className="relative w-28 sm:w-40" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  useScrollOnNavigate()

  return (
    <div className="relative flex min-h-dvh flex-col">
      {/* The column's vertical rails, full height behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-1/2 hidden w-full max-w-3xl -translate-x-1/2 border-x border-line md:block"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-gold focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-5">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
