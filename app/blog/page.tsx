import type { Metadata } from "next"
import Link from "next/link"
import links from "@/data/links"

export const metadata: Metadata = {
  title: "Blog - Aashish Singhal",
  description: "Notes on web development, design and technology. Coming soon.",
}

// No posts yet: an honest "coming soon" screen instead of sample articles
export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16 min-h-[70vh] grid place-items-center">
      <div className="pixel-box p-8 sm:p-12 max-w-xl text-center">
        <p className="font-pixel text-[10px] text-pixel-accent mb-6">WORLD 1-1</p>
        <h1 className="text-base sm:text-xl mb-6">BLOG LOADING...</h1>
        <p className="mb-8">
          I&apos;m writing the first posts on web development, design, and whatever I&apos;m
          building. Until then, you can follow along on{" "}
          <a href={links.github} target="_blank" rel="noreferrer" className="underline hover:text-pixel-accent">
            GitHub
          </a>{" "}
          or{" "}
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-pixel-accent">
            LinkedIn
          </a>
          .
        </p>
        <Link href="/games" className="font-pixel text-[10px] hover:text-pixel-accent">
          ▶ PLAY A GAME WHILE YOU WAIT
        </Link>
      </div>
    </div>
  )
}
