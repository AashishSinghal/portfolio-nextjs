"use client"

import Button from "@/components/button"
import links from "@/data/links"
import { MdStar } from "react-icons/md"
import { FiExternalLink } from "react-icons/fi"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/heading"

// Function to open URL in new tab
const openURLInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer")
}

const AboutRotW = () => (
  <div id={Section.AboutRotW}>
    {getSectionHeading(Section.AboutRotW)}

    <div className="w-full lg:w-3/4 max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
      <p>
        <strong>My Portfolio Website</strong> has been a project that I&apos;ve been focused on since the early 2019s. I
        didn&apos;t want my information to be displayed on just a sheet of paper that only HRs or Talent Scouts had the
        privilege of reading, I wanted it to showcase and make it accessible to everyone. And that&apos;s how this
        project was conceptualized.
      </p>

      <p>
        I constantly update it to match who I am, because just like this website, I don&apos;t have a static
        personality. I use the latest technologies and use this platform to challenge myself into learning new
        frameworks, new build tools, experiment with new design ideas while keeping the core principle of getting to
        know me as simple as possible.
      </p>

      <p>
        This version of the project was built using NextJS (React), Tailwind CSS for their utility-first classes and
        Vercel to host the site. I am turning this webiste into a PWA as well.
      </p>

      <Button
        icon={FiExternalLink}
        className="mt-8"
        onClick={() => openURLInNewTab("https://web.dev/progressive-web-apps/")}
      >
        Learn more about PWAs
      </Button>

      <p>
        I hope you loved the site as much as I enjoyed developing it and learning from it. If you did, please let me
        know using the contact form above, I would be ecstatic to hear from you.
      </p>

      <p>
        If you would like to peek around the code and see what makes this website tick, the complete source code can be
        found on GitHub. You can even edit it to make your own version of the site, as this project is copylefted under
        the permissive MIT License.
      </p>
    </div>

    <Button icon={MdStar} className="mt-8" onClick={() => openURLInNewTab(links.repository)}>
      Star this Project on GitHub
    </Button>
  </div>
)

export default AboutRotW

