import { lazy } from "react"
import { Route, Routes } from "react-router"
import Layout from "@/components/layout"
import Home from "@/pages/home"

// Secondary routes are split out so the home page loads only what it needs
const Projects = lazy(() => import("@/pages/projects"))
const Project = lazy(() => import("@/pages/project"))
const Writing = lazy(() => import("@/pages/writing"))
const Post = lazy(() => import("@/pages/post"))
const NotFound = lazy(() => import("@/pages/not-found"))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<Project />} />
        <Route path="writing" element={<Writing />} />
        <Route path="writing/:slug" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
