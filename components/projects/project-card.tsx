"use client"

import type { Project } from "@/lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative h-48 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        {project.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-muted-foreground line-clamp-2">{project.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        {project.technologies.slice(0, 3).map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
        {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
      </CardFooter>
    </Card>
  )
}

