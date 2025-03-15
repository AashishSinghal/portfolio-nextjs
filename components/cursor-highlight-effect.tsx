"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface CursorHighlightEffectProps {
  radius?: number
  lineSpacing?: number
  lineColor?: string
  highlightColor?: string
  highlightIntensity?: number
  className?: string
}

// Enhanced color calculation function that increases intensity in dark mode:
function calculateColor(
  baseColor: string,
  highlightColor: string,
  distance: number,
  radius: number,
  intensity: number,
  isDark = false,
): string {
  // If outside radius, return base color
  if (distance > radius) return baseColor

  // Calculate opacity based on distance (closer = more intense)
  // Increase intensity by 20% in dark mode for better visibility
  const adjustedIntensity = isDark ? intensity * 1.2 : intensity
  const opacity = (1 - distance / radius) * adjustedIntensity

  // Clamp opacity between 0 and 1
  const clampedOpacity = Math.min(1, Math.max(0, opacity))

  // Use the highlight color with calculated opacity
  return highlightColor.replace(/[\d.]+\)$/, `${clampedOpacity})`)
}

export default function CursorHighlightEffect({
  radius = 150,
  lineSpacing = 30,
  lineColor,
  highlightColor,
  highlightIntensity = 1,
  className,
}: CursorHighlightEffectProps) {
  const { resolvedTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)

  // Default colors based on theme - using simpler RGBA format
  const isDark = resolvedTheme === "dark"
  const defaultLineColor = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)" // Increased opacity for dark mode
  const defaultHighlightColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.6)" // Increased brightness for dark mode

  const actualLineColor = lineColor || defaultLineColor
  const actualHighlightColor = highlightColor || defaultHighlightColor

  // Calculate lines based on container dimensions and line spacing - only when dimensions change
  const lines = useMemo(() => {
    if (!dimensions.width || !dimensions.height) {
      return { horizontal: [], vertical: [] }
    }

    const horizontalLines = []
    const verticalLines = []

    for (let y = 0; y <= dimensions.height; y += lineSpacing) {
      horizontalLines.push(y)
    }

    for (let x = 0; x <= dimensions.width; x += lineSpacing) {
      verticalLines.push(x)
    }

    return { horizontal: horizontalLines, vertical: verticalLines }
  }, [dimensions.width, dimensions.height, lineSpacing])

  // Update dimensions on mount and resize
  useEffect(() => {
    if (!containerRef.current || !mounted) return

    const updateDimensions = () => {
      if (!containerRef.current) return

      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [mounted])

  // Track mouse position with throttling for performance
  useEffect(() => {
    if (!mounted) return

    let timeoutId: NodeJS.Timeout | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (timeoutId) return

      timeoutId = setTimeout(() => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Only update if mouse is inside container
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          setMousePosition({ x, y })
        } else {
          // Move far away when mouse leaves container
          setMousePosition({ x: -1000, y: -1000 })
        }

        timeoutId = null
      }, 10) // 10ms throttle
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleMouseMove)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [mounted])

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Horizontal lines */}
      {lines.horizontal.map((y, index) => {
        // Calculate distance from mouse to line
        const distance = Math.abs(mousePosition.y - y)
        const isHighlighted = distance <= radius

        // Calculate color using enhanced function with dark mode parameter
        const color = calculateColor(
          actualLineColor,
          actualHighlightColor,
          distance,
          radius,
          highlightIntensity,
          isDark,
        )

        return (
          <div
            key={`h-${index}`}
            className="absolute w-full h-px transition-colors duration-300"
            style={{
              top: `${y}px`,
              backgroundColor: color,
              zIndex: isHighlighted ? 1 : 0,
              // Add enhanced glow effect for better visibility in dark mode
              boxShadow: isHighlighted
                ? isDark
                  ? `0 0 6px ${color}` // Stronger glow in dark mode
                  : `0 0 4px ${color}`
                : "none",
            }}
          />
        )
      })}

      {/* Vertical lines */}
      {lines.vertical.map((x, index) => {
        // Calculate distance from mouse to line
        const distance = Math.abs(mousePosition.x - x)
        const isHighlighted = distance <= radius

        // Calculate color using enhanced function with dark mode parameter
        const color = calculateColor(
          actualLineColor,
          actualHighlightColor,
          distance,
          radius,
          highlightIntensity,
          isDark,
        )

        return (
          <div
            key={`v-${index}`}
            className="absolute h-full w-px transition-colors duration-300"
            style={{
              left: `${x}px`,
              backgroundColor: color,
              zIndex: isHighlighted ? 1 : 0,
              // Add enhanced glow effect for better visibility in dark mode
              boxShadow: isHighlighted
                ? isDark
                  ? `0 0 6px ${color}` // Stronger glow in dark mode
                  : `0 0 4px ${color}`
                : "none",
            }}
          />
        )
      })}

      {/* Enhanced cursor highlight circle with better visibility */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-300"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: mousePosition.x - radius,
          top: mousePosition.y - radius,
          background: `radial-gradient(circle, ${actualHighlightColor.replace(/[\d.]+\)$/, "0.15)")} 0%, transparent 70%)`,
          opacity: 0.7,
        }}
      />
    </div>
  )
}

