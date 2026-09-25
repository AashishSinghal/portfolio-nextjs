import { Link } from "react-router"
import type { Post } from "@/data/writing"
import { formatDate } from "@/data/writing"

export default function PostRow({ post }: { post: Post }) {
  return (
    <Link
      to={`/writing/${post.slug}`}
      className="group -mx-4 flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-surface sm:flex-row sm:items-baseline sm:gap-6"
    >
      <time
        dateTime={post.date}
        className="shrink-0 font-mono text-sm tabular-nums text-faint sm:w-16"
      >
        {formatDate(post.date, "short")}
      </time>
      <span>
        <span className="font-medium text-fg transition-colors group-hover:text-gold">
          {post.title}
        </span>
        {post.draft && (
          <span className="ml-2 rounded border border-line px-1.5 py-0.5 text-xs uppercase tracking-wider text-faint">
            Draft
          </span>
        )}
        <span className="mt-1 block text-muted">{post.summary}</span>
      </span>
    </Link>
  )
}
