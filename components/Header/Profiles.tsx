"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import links from "@/lib/links"
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
  <div className="h-[22px] mt-5 flex gap-8">
    {profiles.map(({ title, link, icon: Icon, className }, index) => (
      <div
        key={title}
        className={cn("p-1 text-sm text-white rounded-full", "animate-fade-in", className)}
        style={{ animationDelay: `${index * 0.5 + 6}s` }}
        title={title} // Native HTML tooltip instead of Tippy
      >
        <a href={link} target="_blank" rel="noreferrer">
          <Icon />
          <span className="sr-only">{title}</span>
        </a>
      </div>
    ))}
  </div>
)

export default Profiles

