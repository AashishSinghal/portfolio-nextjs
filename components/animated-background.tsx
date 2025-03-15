"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Only show the background after component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add subtle mouse movement effect
  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      // Calculate mouse position relative to the window
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mounted])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base grid pattern */}
      <div
        className={cn("absolute inset-0 opacity-[0.03]", isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light")}
      />

      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          isDark
            ? "bg-transparent" // No gradient in dark mode
            : "bg-gradient-radial from-transparent to-background", // Keep gradient only in light mode
        )}
        style={{
          // Subtle shift based on mouse position
          transform: `translate(${(mousePosition.x - 0.5) * -10}px, ${(mousePosition.y - 0.5) * -10}px)`,
          transition: "transform 1s ease-out",
        }}
      />

      {/* Dynamic geometric patterns */}
      <div className="absolute inset-0">
        {/* Diagonal lines that move slowly */}
        <div
          className={cn(
            "absolute inset-0 animate-slide-diagonal",
            isDark ? "opacity-[0.07]" : "opacity-[0.04]", // Increased opacity in dark mode
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              ${isDark ? "#ffffff" : "#000000"} 0px,
              ${isDark ? "#ffffff" : "#000000"} 1px,
              transparent 1px,
              transparent 30px
            )`,
            // Subtle shift based on mouse position
            transform: `translate(${(mousePosition.x - 0.5) * 5}px, ${(mousePosition.y - 0.5) * 5}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />

        {/* Horizontal lines that move vertically */}
        <div
          className={cn(
            "absolute inset-0 animate-slide-vertical",
            isDark ? "opacity-[0.06]" : "opacity-[0.03]", // Increased opacity in dark mode
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              ${isDark ? "#ffffff" : "#000000"} 0px,
              ${isDark ? "#ffffff" : "#000000"} 1px,
              transparent 1px,
              transparent 50px
            )`,
            // Subtle shift based on mouse position
            transform: `translateY(${(mousePosition.y - 0.5) * 8}px)`,
            transition: "transform 0.8s ease-out",
          }}
        />

        {/* Vertical lines that move horizontally */}
        <div
          className={cn(
            "absolute inset-0 animate-slide-horizontal",
            isDark ? "opacity-[0.06]" : "opacity-[0.03]", // Increased opacity in dark mode
          )}
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              ${isDark ? "#ffffff" : "#000000"} 0px,
              ${isDark ? "#ffffff" : "#000000"} 1px,
              transparent 1px,
              transparent 50px
            )`,
            // Subtle shift based on mouse position
            transform: `translateX(${(mousePosition.x - 0.5) * 8}px)`,
            transition: "transform 0.8s ease-out",
          }}
        />
      </div>

      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        {/* Triangles */}
        {Array.from({ length: 3 }).map((_, i) => {
          const size = Math.random() * 100 + 50
          return (
            <div
              key={`triangle-${i}`}
              className={cn("absolute opacity-[0.04] animate-float", isDark ? "border-white" : "border-black")}
              style={{
                width: 0,
                height: 0,
                borderLeft: `${size / 2}px solid transparent`,
                borderRight: `${size / 2}px solid transparent`,
                borderBottom: `${size}px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${Math.random() * 20 + 30}s`,
                // Subtle shift based on mouse position
                transform: `translate(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px)`,
                transition: "transform 1s ease-out",
              }}
            />
          )
        })}

        {/* Squares that rotate slowly */}
        {Array.from({ length: 3 }).map((_, i) => {
          const size = Math.random() * 100 + 50
          return (
            <div
              key={`square-${i}`}
              className={cn("absolute opacity-[0.03] animate-rotate-slow", isDark ? "border-white" : "border-black")}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 4}s`,
                animationDuration: `${Math.random() * 40 + 60}s`,
                // Subtle shift based on mouse position
                transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px) rotate(${i * 45}deg)`,
                transition: "transform 1.2s ease-out",
              }}
            />
          )
        })}

        {/* Hexagons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`hexagon-${i}`}
            className={cn("absolute opacity-[0.04] animate-float-rotate", isDark ? "bg-white/5" : "bg-black/5")}
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 5}s`,
              animationDuration: `${Math.random() * 30 + 40}s`,
              // Subtle shift based on mouse position
              transform: `translate(${(mousePosition.x - 0.5) * 25}px, ${(mousePosition.y - 0.5) * 25}px) rotate(${i * 30}deg)`,
              transition: "transform 1.5s ease-out",
            }}
          />
        ))}
      </div>

      {/* Subtle wave pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] animate-wave"
        style={{
          // Subtle shift based on mouse position
          transform: `translate(${(mousePosition.x - 0.5) * -15}px, ${(mousePosition.y - 0.5) * -15}px)`,
          transition: "transform 1.2s ease-out",
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path
                d="M0,100 C40,80 60,120 100,100 C140,80 160,120 200,100 C240,80 260,120 300,100 C340,80 360,120 400,100"
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                strokeWidth="1"
              />
              <path
                d="M0,150 C40,130 60,170 100,150 C140,130 160,170 200,150 C240,130 260,170 300,150 C340,130 360,170 400,150"
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                strokeWidth="1"
              />
              <path
                d="M0,50 C40,30 60,70 100,50 C140,30 160,70 200,50 C240,30 260,70 300,50 C340,30 360,70 400,50"
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" />
        </svg>
      </div>

      {/* Subtle dot grid that pulses */}
      <div
        className={cn(
          "absolute inset-0 animate-pulse-slow",
          isDark ? "opacity-[0.05]" : "opacity-[0.03]", // Increased opacity in dark mode
        )}
        style={{
          // Subtle shift based on mouse position
          transform: `translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px)`,
          transition: "transform 1s ease-out",
        }}
      >
        <div className={cn("h-full w-full", isDark ? "bg-dot-pattern-dark" : "bg-dot-pattern-light")} />
      </div>
    </div>
  )
}

