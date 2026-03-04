import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import MDXContent from "@/components/MDXContent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog | Aashish Singhal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const code = typeof post.body === "object" && "code" in post.body ? (post.body as { code: string }).code : "";

  return (
    <div className="relative z-[1] py-8">
      <Link href="/blog" className="link-underline text-sm text-[var(--primary)]">
        ← Blog
      </Link>
      <article className="animate-in-up mt-8">
        <h1
          className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">{post.date} · {post.author}</p>
        <div className="mt-10">
          <MDXContent code={code} />
        </div>
      </article>
    </div>
  );
}
