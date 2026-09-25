import { useMemo } from "react"
import { Link, useParams } from "react-router"
import { marked } from "marked"
import { formatDate, getPost, posts } from "@/data/writing"
import { useDocumentTitle } from "@/lib/use-document-title"
import NotFound from "@/pages/not-found"

// Posts come from Markdown files committed to this repo, so the HTML is trusted
function renderMarkdown(source: string) {
  const html = marked.parse(source, { async: false, gfm: true })
  // Links out of the site open in a new tab
  return html.replace(/<a href="(https?:\/\/)/g, '<a target="_blank" rel="noreferrer" href="$1')
}

export default function PostPage() {
  const { slug = "" } = useParams()
  const post = getPost(slug)
  useDocumentTitle(post?.title)
  const html = useMemo(() => (post ? renderMarkdown(post.body) : ""), [post])

  if (!post) return <NotFound />

  // posts are newest first
  const index = posts.indexOf(post)
  const newer = posts[index - 1]
  const older = posts[index + 1]

  return (
    <article className="pb-20 pt-12">
      <Link to="/writing" className="text-sm text-muted transition-colors hover:text-teal">
        ← Writing
      </Link>

      <header className="mt-10 border-b border-line pb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">{post.summary}</p>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 font-mono text-sm tabular-nums text-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
          {post.draft && (
            <span className="rounded border border-gold/50 px-1.5 py-0.5 font-sans text-xs uppercase tracking-wider text-gold">
              Draft, only visible locally
            </span>
          )}
        </p>
      </header>

      <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: html }} />

      {(newer || older) && (
        <nav
          aria-label="More posts"
          className="mt-16 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2"
        >
          {older ? (
            <Link to={`/writing/${older.slug}`} className="group text-muted hover:text-fg">
              <span className="block text-faint">← Older</span>
              <span className="font-medium group-hover:text-gold">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              to={`/writing/${newer.slug}`}
              className="group text-muted hover:text-fg sm:text-right"
            >
              <span className="block text-faint">Newer →</span>
              <span className="font-medium group-hover:text-gold">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  )
}
