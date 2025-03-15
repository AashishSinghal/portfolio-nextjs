import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Placeholder blog data
// In a real implementation, this would be fetched from the data/blog directory
const blogPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and how to set up your first project.",
    date: "2023-05-15",
    author: "Jane Doe",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    slug: "understanding-react-hooks",
    title: "Understanding React Hooks",
    excerpt: "A comprehensive guide to React Hooks and how to use them effectively.",
    date: "2023-06-22",
    author: "John Smith",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["React", "Hooks", "JavaScript"],
  },
  {
    slug: "css-grid-vs-flexbox",
    title: "CSS Grid vs. Flexbox",
    excerpt: "A comparison of CSS Grid and Flexbox for layout design.",
    date: "2023-07-10",
    author: "Sarah Johnson",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["CSS", "Web Design", "Flexbox", "CSS Grid"],
  },
  {
    slug: "introduction-to-typescript",
    title: "Introduction to TypeScript",
    excerpt: "Learn the basics of TypeScript and how it improves JavaScript development.",
    date: "2023-08-05",
    author: "Michael Chen",
    coverImage: "/placeholder.svg?height=300&width=600",
    tags: ["TypeScript", "JavaScript", "Programming"],
  },
]

// Helper function to format dates
function formatDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export default function BlogPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <p className="text-muted-foreground mb-8">Read my latest thoughts on web development, design, and technology.</p>

      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="relative h-48 md:h-auto md:w-1/3">
                  <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <CardHeader>
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold">{post.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(post.date)} • {post.author}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

