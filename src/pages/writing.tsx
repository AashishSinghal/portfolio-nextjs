import { posts } from "@/data/writing"
import PostRow from "@/components/post-row"
import { useDocumentTitle } from "@/lib/use-document-title"
import NotFound from "@/pages/not-found"

export default function Writing() {
  useDocumentTitle("Writing")

  if (posts.length === 0) return <NotFound />

  const years = [...new Set(posts.map((post) => post.date.slice(0, 4)))]

  return (
    <>
      <header className="pb-12 pt-20">
        <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
        <p className="mt-4 max-w-xl text-muted">
          Notes on what I&apos;m building and what I learn along the way.
        </p>
      </header>

      <div className="grid gap-12 pb-20">
        {years.map((year) => (
          <section key={year} className="border-t border-line pt-8">
            <h2 className="font-mono text-sm tabular-nums text-faint">{year}</h2>
            <ul className="mt-4 grid gap-1">
              {posts
                .filter((post) => post.date.startsWith(year))
                .map((post) => (
                  <li key={post.slug}>
                    <PostRow post={post} />
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}
