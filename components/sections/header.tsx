"use client"

import Ingredients from "@/components/header/ingredients"
import PhotoWall from "@/components/header/photo-wall"
import Profiles from "@/components/header/profiles"
import NoSSR from "@/components/no-ssr"
import useWindowDimensions, { Breakpoints } from "@/hooks/use-window-dimensions"
import Image from "next/image"

const Header = () => {
  const { width } = useWindowDimensions()

  return (
    <div id="header" className="h-screen grid place-items-center place-content-center gap-4">
      {/* Photo Wall */}
      <NoSSR>
        <PhotoWall size={width > Breakpoints.sm ? 384 : 256} />
      </NoSSR>

      {/* Logo */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-T6mU9etqpR8S8mYW80UHVwxsbYabGW.png"
        width={485}
        height={128}
        alt="Aashish Singhal"
        priority
        className="object-contain"
      />

      {/* Text Version */}
      <h1 className="sr-only">
        Aashish Singhal - Resume on the Web
        <br />
        Designer, Developer, Photographer-ish, Wonderer
        <br />
        Bangalor, Jaipur &amp; Kota, India
      </h1>

      {/* Ingredients */}
      <Ingredients />

      {/* Social Profiles */}
      <Profiles />
    </div>
  )
}

export default Header

