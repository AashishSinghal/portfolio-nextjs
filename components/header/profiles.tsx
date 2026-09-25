"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import links from "@/data/links"
import { FaGithubAlt, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"

type Profile = {
  title: string
  icon: React.ElementType
  link: string
  className: string
}

const profiles: Profile[] = [
  {
    title: "Instagram",
    icon: FaInstagram,
    link: links.instagram,
    className: "bg-[#e1306c]",
  },
  {
    title: "LinkedIn",
    icon: FaLinkedinIn,
    link: links.linkedin,
    className: "bg-[#2867b2]",
  },
  {
    title: "Twitter",
    icon: FaTwitter,
    link: links.twitter,
    className: "bg-[#1da1f2]",
  },
  {
    title: "GitHub",
    icon: FaGithubAlt,
    link: links.github,
    className: "bg-[#211f1f]",
  },
]

const Profiles = () => (
  <div className="mt-5 flex gap-5">
    {profiles.map(({ title, link, icon: Icon, className }, index) => (
      <div
        key={title}
        className="animate-fade-in"
        style={{ animationDelay: `${index * 0.2 + 3}s` }}
        title={title}
      >
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "grid place-items-center w-9 h-9 text-base text-white border-2 border-neutral-900 dark:border-neutral-100 shadow-pixel-sm transition-transform hover:-translate-y-0.5",
            className
          )}
        >
          <Icon />
          <span className="sr-only">{title}</span>
        </a>
      </div>
    ))}
  </div>
)

export default Profiles
