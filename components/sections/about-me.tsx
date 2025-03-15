"use client"

import Image from "next/image"
import { Section } from "@/types/sections"
import { getSectionHeading } from "@/lib/utils/heading"
import useWindowDimensions, { Breakpoints } from "@/hooks/use-window-dimensions"

const AboutMe = () => {
  const { width } = useWindowDimensions()
  const isMobile = width < Breakpoints.md

  return (
    <div id={Section.AboutMe}>
      {getSectionHeading(Section.AboutMe)}

      <div className="grid md:grid-cols-4 gap-12">
        {!isMobile && (
          <div className="relative col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/selfie-boy-4aL5DATguBsEde4m2k6tpW9UvUy6nq.svg"
              fill
              alt="Selfie Boy"
              className="object-contain"
            />
          </div>
        )}

        <div
          className={`${isMobile ? "col-span-4" : "col-span-3"} max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert`}
        >
          <p>Hey there!</p>

          <p>
            I&apos;m aashish singhal, and as you might have already read, I&apos;m a designer, developer, sometimes a
            Photographer and a Wonderer. This website was made to showcase all of what I can do and plan to do.
          </p>

          <p>
            I got into design because I used to sketch and draw as a kid, and used to create handi-crafts in school. So
            I started to learn digital design and illustration to broaden my capabilities.
          </p>

          <p>
            I got into development because computers have always fascinated me.<code>int i = 10;</code> creates an
            integer of value 10? LIKE, WOW! But seriously, just seeing code getting converted to things we use
            regularly, like Facebook or Amazon, was no less than magic to me and that&apos;s where my quest to invent
            began.
          </p>

          <p>
            I created this website so I could showcase all this and through this process, make it easier for you to
            connect with me. If you like what you see, head over to the <a href="#contact">contact section</a> below and
            send me a text. I would love to hear from you!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutMe

