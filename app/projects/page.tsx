"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

// Import the Project type from lib/data
import type { Project } from "@/lib/data"
// Import the Project type from types/sections and rename it to avoid conflicts
import type { Project as SectionsProject } from "@/types/sections"

// Import projects from data/projects
import projectsList from "@/data/projects"

// Create an adapter function to convert from SectionsProject to Project
const adaptProject = (project: SectionsProject): Project => {
  return {
    id: project.id.toString(),
    title: project.name,
    description: project.summary,
    longDescription: project.summary, // Use summary as longDescription since it's not available
    image: project.image,
    technologies: project.tags,
    demoUrl: project.link.web,
    githubUrl: project.link.github,
    featured: false, // Default to false since it's not available in the original data
  }
}

// Convert the projects to the expected format
const projects: Project[] = projectsList ? projectsList.map(adaptProject) : []

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <p className="text-muted-foreground mb-8">
        Browse through my portfolio of projects. Click on any project to view more details.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openProjectModal(project)}
          >
            <div className="relative h-48 w-full">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              {Number.parseInt(project.id) <= 3 && <Badge className="absolute top-2 right-2">Featured</Badge>}
            </div>
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-muted-foreground line-clamp-2">{project.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
              {project.technologies?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
              {project.technologies && project.technologies.length > 3 && (
                <Badge variant="outline">+{project.technologies.length - 3}</Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedProject && (
        <Dialog open={isModalOpen} onOpenChange={closeProjectModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap gap-2 mt-2">
                {selectedProject.technologies?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </DialogDescription>
            </DialogHeader>

            <div className="relative h-64 sm:h-80 w-full my-4">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover rounded-md"
              />
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">{selectedProject.longDescription}</p>

              <div className="flex flex-wrap gap-4">
                {selectedProject.demoUrl && (
                  <Button asChild>
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}

                {selectedProject.githubUrl && (
                  <Button variant="outline" asChild>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

