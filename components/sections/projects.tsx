"use client"

import Tippy from "@tippyjs/react"
import Button from "@/components/button"
import links from "@/data/links"
import projectsList from "@/data/projects"
import { BiLinkExternal } from "react-icons/bi"
import { FaGithub } from "react-icons/fa"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/heading"
import { openURLInNewTab } from "@/lib/utils/sections"
import Image from "next/image"

const Projects = () => (
  <div id={Section.Projects}>
    {getSectionHeading(Section.Projects)}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projectsList.map((project) => (
        <div
          key={project.id}
          className="flex flex-col gap-2 w-full h-full bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          {/* Image container with fixed dimensions */}
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-col flex-1 p-4">
            <h4 className="text-lg font-bold line-clamp-1 mb-2">{project.name}</h4>

            <p className="prose prose-sm prose-neutral dark:prose-invert line-clamp-3 mb-3 flex-grow">
              {project.summary}
            </p>

            <div className="mt-auto">
              <p className="text-xs leading-relaxed font-bold overflow-x-auto hide-scrollbar whitespace-nowrap pb-2">
                {project.tags.map((tag) => `#${tag}`).join(" ")}
              </p>

              {project.link && (
                <div className="mt-2 flex gap-5">
                  {project.link.web && (
                    <Tippy content="Visit Website" placement="bottom">
                      <a
                        href={project.link.web}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                      >
                        <BiLinkExternal fontSize={18} />
                      </a>
                    </Tippy>
                  )}

                  {project.link.github && (
                    <Tippy content="Checkout Source Code" placement="bottom">
                      <a
                        href={project.link.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neutral-700 dark:text-neutral-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                      >
                        <FaGithub fontSize={18} />
                      </a>
                    </Tippy>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

    <Button icon={FaGithub} className="mt-8" onClick={() => openURLInNewTab(links.github)}>
      Projects on GitHub
    </Button>
  </div>
)

export default Projects

