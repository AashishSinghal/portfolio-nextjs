"use client"

import type React from "react"

import { useState, useEffect } from "react"
import CursorHighlightEffect from "@/components/cursor-highlight-effect"

interface CursorHighlightContainerProps {
  children: React.ReactNode
  radius?: number
  lineSpacing?: number
  highlightColor?: string
  lineColor?: string
  highlightIntensity?: number
  className?: string
}

export default function CursorHighlightContainer({
  children,
  radius = 150,
  lineSpacing = 30,
  highlightColor,
  lineColor,
  highlightIntensity = 1,
  className,
}: CursorHighlightContainerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>

  return (
    <div className="relative">
      {/* The highlight effect - positioned behind content */}
      <div className="absolute inset-0 -z-10">
        <CursorHighlightEffect
          radius={radius}
          lineSpacing={lineSpacing}
          highlightColor={highlightColor}
          lineColor={lineColor}
          highlightIntensity={highlightIntensity}
          className={className}
        />
      </div>

      {/* The actual content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

