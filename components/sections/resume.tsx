"use client"

import Button from "@/components/button"
import ImageLink from "@/components/image-link"
import links from "@/data/links"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/heading"

const openURLInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer")
}

const Resume = () => (
  <div id={Section.Resume}>
    {getSectionHeading(Section.Resume)}

    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="w-full flex-1">
        <ImageLink height={300} href={links.resume} src="/images/resume/cover.png" alt="Aashish Singhal's Resume" />
      </div>

      <div className="flex flex-col items-start gap-8 flex-[2]">
        <div className="max-w-full prose prose-lg md:prose-2xl prose-neutral dark:prose-invert">
          <h4>
            To those HRs out there who need a more organized and minimal version of my information, you can download the
            trusted PDF version here:
          </h4>
        </div>

        <div>
          <Button onClick={() => openURLInNewTab(links.resume)}>Download Resume</Button>
        </div>
      </div>
    </div>
  </div>
)

export default Resume

