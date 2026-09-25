"use client"

import Ingredients from "@/components/header/ingredients"
import PhotoWall from "@/components/header/photo-wall"
import Profiles from "@/components/header/profiles"
import NoSSR from "@/components/no-ssr"
import useWindowDimensions, { Breakpoints } from "@/hooks/use-window-dimensions"

const Header = () => {
  const { width } = useWindowDimensions()

  return (
    <div id="header" className="h-screen grid place-items-center place-content-center gap-4">
      {/* Photo Wall */}
      <NoSSR>
        <PhotoWall size={width > Breakpoints.sm ? 384 : 256} />
      </NoSSR>

      {/* Name, set in pixel type with a hard offset shadow */}
      <p
        aria-hidden="true"
        className="font-pixel text-center text-2xl sm:text-4xl lg:text-5xl leading-tight mt-4 text-pixel-accent [text-shadow:4px_4px_0_hsl(var(--pixel-shadow))] sm:[text-shadow:6px_6px_0_hsl(var(--pixel-shadow))]"
      >
        AASHISH
        <br className="sm:hidden" /> SINGHAL
      </p>

      {/* Text Version */}
      <h1 className="sr-only">
        Aashish Singhal - Resume on the Web
        <br />
        Designer, Developer, Photographer-ish, Wonderer
        <br />
        Bangalore, Jaipur &amp; Kota, India
      </h1>

      {/* Ingredients */}
      <Ingredients />

      {/* Social Profiles */}
      <Profiles />
    </div>
  )
}

export default Header
