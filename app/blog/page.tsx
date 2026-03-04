import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export const metadata = {
  title: "Blog | Aashish Singhal",
  description: "Technical blog posts.",
};

export default function BlogPage() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative z-[1]">
      <span className="section-label">Blog</span>
      <h1 className="section-title mt-1 text-3xl sm:text-4xl">Posts</h1>
      <ul className="mt-12 space-y-1">
        {posts.map((post, i) => (
          <li key={post.slug} className="animate-in-up" style={{ animationDelay: `${40 + i * 30}ms` }}>
            <Link
              href={`/blog/${post.slug}`}
              className="card-spine block py-5 transition-colors hover:bg-[var(--card)]/50"
            >
              <span className="font-bold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                {post.title}
              </span>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">{post.excerpt}</p>
              <p className="mt-1 text-xs text-[var(--border)]">{post.date} · {post.author}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
