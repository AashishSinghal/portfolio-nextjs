import { Suspense, useEffect, type ReactNode } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router"
import { profile } from "@/data/profile"
import { posts } from "@/data/writing"
import { cn } from "@/lib/utils"
import VisitorCount from "@/components/visitor-count"
import LocalTime from "@/components/local-time"
import Barbarian from "@/components/barbarian"

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
          className="group flex shrink-0 items-center gap-3"
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
          <span className="hidden font-medium tracking-tight transition-colors group-hover:text-gold sm:inline">
            {profile.name}
          </span>
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

// Build facts shown in the footer's title block (set in vite.config.ts)
const build = { sha: __BUILD_SHA__, date: __BUILD_DATE__ }

function FooterCell({
  label,
  children,
  wide,
}: {
  label: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <div className={cn("bg-bg px-5 py-4", wide && "col-span-2")}>
      <dt className="font-mono text-[10px] tracking-[0.15em] text-faint uppercase">{label}</dt>
      <dd className="mt-1.5 font-mono text-sm text-muted">{children}</dd>
    </div>
  )
}

// Styled like the title block on a technical drawing, with the barbarian underneath
function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-4 text-sm">
          <span className="font-mono text-fg">aashishsinghal.com</span>
          <span className="text-faint">
            {profile.role}, {profile.location}
          </span>
        </div>
        <dl className="grid grid-cols-2 gap-px border-b border-line bg-line sm:grid-cols-4">
          <FooterCell label="Crafted by">
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="link">
              @AashishSinghal
            </a>
          </FooterCell>
          <FooterCell label="Build">
            {build.sha ? (
              <a
                href={`${profile.links.repository}/commit/${build.sha}`}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                {build.sha}
              </a>
            ) : (
              "local"
            )}
          </FooterCell>
          <FooterCell label="Date">{build.date}</FooterCell>
          <FooterCell label="Source">
            <a href={profile.links.repository} target="_blank" rel="noreferrer" className="link">
              GitHub
            </a>
          </FooterCell>
          <FooterCell label="Stack" wide>
            vite · react · tailwind
          </FooterCell>
          <FooterCell label="Hosted on">vercel</FooterCell>
          <FooterCell label="Local time">
            <LocalTime />
          </FooterCell>
        </dl>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-faint">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <VisitorCount />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-5 pt-14 pb-10">
        <Barbarian />
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
