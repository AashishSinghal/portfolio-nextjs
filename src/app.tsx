import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router"
import SlimNavigation from "@/components/navigation/slim-navigation"
import AnimatedBackground from "@/components/animated-background"
import ErrorBoundary from "@/pages/error"
import Loading from "@/pages/loading"
import Home from "@/pages/home"

// Secondary routes are split out so the home page loads only what it needs
const Projects = lazy(() => import("@/pages/projects"))
const Blog = lazy(() => import("@/pages/blog"))
const BlogPost = lazy(() => import("@/pages/blog-post"))
const Games = lazy(() => import("@/pages/games"))
const NotFound = lazy(() => import("@/pages/not-found"))

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <SlimNavigation />
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/games" element={<Games />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
