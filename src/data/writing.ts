export type Post = {
  slug: string
  title: string
  // ISO date, e.g. 2026-09-25
  date: string
  summary: string
  draft: boolean
  readingMinutes: number
  body: string
}

// Posts are Markdown files in content/writing/; the filename is the slug.
// Each starts with a frontmatter block:
//
//   ---
//   title: Moving my portfolio from Next.js to Vite
//   date: 2026-09-25
//   summary: One line shown in lists and link previews.
//   draft: true        (optional; drafts show in `pnpm dev` only)
//   ---
const files = import.meta.glob<string>("/content/writing/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
})

function parse(path: string, raw: string): Post {
  const slug = path.split("/").pop()!.replace(/\.md$/, "")
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) throw new Error(`${path}: missing frontmatter`)

  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^(\w+):\s*(.*)$/.exec(line)
    if (field) meta[field[1]] = field[2].trim().replace(/^["']|["']$/g, "")
  }
  for (const key of ["title", "date", "summary"]) {
    if (!meta[key]) throw new Error(`${path}: frontmatter is missing "${key}"`)
  }

  const body = match[2].trim()
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: meta.title,
    date: meta.date,
    summary: meta.summary,
    draft: meta.draft === "true",
    readingMinutes: Math.max(1, Math.round(words / 220)),
    body,
  }
}

// Newest first; drafts are only included while developing locally
export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .filter((post) => import.meta.env.DEV || !post.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

// "25 September 2026" on the post, "Sep 25" in lists
export function formatDate(date: string, style: "long" | "short" = "long") {
  const value = new Date(`${date}T00:00:00`)
  return style === "long"
    ? value.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : value.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
