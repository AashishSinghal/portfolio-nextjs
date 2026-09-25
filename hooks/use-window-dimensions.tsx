"use client"

import { useState, useEffect } from "react"

// Define breakpoints to match the original
export const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export default function useWindowDimensions() {
  // Start from the same defaults on server and client so hydration matches;
  // the effect below swaps in the real size right after mount
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowDimensions
}
