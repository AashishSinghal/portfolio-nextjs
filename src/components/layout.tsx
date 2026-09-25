import { Suspense, useEffect } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router"
import { profile } from "@/data/profile"
import { cn } from "@/lib/utils"
import VisitorCount from "@/components/visitor-count"

const navItems = [
  { label: "Work", to: "/#work" },
  { label: "Projects", to: "/projects" },
  { label: "Arcade", to: "/arcade" },
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
      <nav className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-6 px-5">
        <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          {/* The logo sits in greyscale and fills with its gold on hover */}
          <img
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="size-8 grayscale transition-[filter] duration-300 group-hover:grayscale-0"
          />
          <span className="hidden font-medium tracking-tight transition-colors group-hover:text-gold sm:inline">
            {profile.name}
          </span>
        </Link>

        <ul className="flex items-center gap-1 text-sm sm:gap-2">
          {navItems.map((item) => {
            const [path, anchor] = item.to.split("#")
            const active = anchor
              ? pathname === path && hash === `#${anchor}`
              : pathname.startsWith(path)
            return (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  className={cn(
                    "rounded-md px-2 py-1.5 transition-colors sm:px-3",
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

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-5 py-10 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-5">
          <VisitorCount />
          <a
            href={profile.links.repository}
            target="_blank"
            rel="noreferrer"
            className="hover:text-teal"
          >
            Source on GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  useScrollOnNavigate()

  return (
    <div className="flex min-h-dvh flex-col">
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
