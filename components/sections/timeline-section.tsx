"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Calendar, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export type TimelineItem = {
  id: number
  logo: string
  title: string
  subtitle: string
  period: { start: string; end: string }
  location: string
  description: string
  tags?: string[]
  link?: string
  achievements?: string[]
}

type TimelineSectionProps = {
  title: string
  items: TimelineItem[]
  icon?: React.ReactNode
}

export default function TimelineSection({ title, items, icon }: TimelineSectionProps) {
  const [activeItem, setActiveItem] = useState<number>(0)
  const [isExpanded, setIsExpanded] = useState(true)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (!timelineRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current
    setCanScrollLeft(scrollLeft > 5) // Small threshold to detect scrolling
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // Small threshold to detect end of scroll
  }

  useEffect(() => {
    checkScrollability()

    // Add event listener to the timeline ref for scroll events
    const timelineElement = timelineRef.current
    if (timelineElement) {
      timelineElement.addEventListener("scroll", checkScrollability)
    }

    window.addEventListener("resize", checkScrollability)

    return () => {
      if (timelineElement) {
        timelineElement.removeEventListener("scroll", checkScrollability)
      }
      window.removeEventListener("resize", checkScrollability)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!timelineRef.current) return;

    if (activeItem < items.length - 1 && direction === "right") {
      setActiveItem((prev) => prev + 1)
    }

    if (activeItem > 0 && direction === "left") {
      setActiveItem((prev) => prev - 1)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            // disabled={!canScrollLeft}
            className="hidden md:flex h-8 w-8" // Ensure proper sizing
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            // disabled={!canScrollRight}
            className="hidden md:flex h-8 w-8" // Ensure proper sizing
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        {/* Timeline track */}
        <div
          ref={timelineRef}
          className="flex overflow-x-auto pb-4 hide-scrollbar gap-4 relative pt-6" // Added padding-top
          onScroll={checkScrollability}
        >
          <div className="absolute top-[80px] left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 z-0" />{" "}
          {/* Adjusted position */}
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "relative min-w-[180px] flex-shrink-0 cursor-pointer z-10",
                activeItem === index ? "flex-grow" : "",
              )}
            >
              <div
                className={cn(
                  "flex flex-col items-center transition-all duration-300 pt-6", // Added padding-top to prevent cut-off
                  activeItem === index ? "scale-110" : "opacity-70 hover:opacity-100",
                )}
                onClick={() => {
                  setActiveItem(index)
                  setIsExpanded(true)
                }}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-lg border-2 bg-white dark:bg-neutral-900 flex items-center justify-center relative z-10 transition-all duration-300", // Changed to rounded-lg and increased size
                    activeItem === index
                      ? "border-teal-500 dark:border-teal-400 shadow-lg"
                      : "border-neutral-300 dark:border-neutral-700",
                  )}
                >
                  <div className="relative w-12 h-12">
                    {" "}
                    {/* Increased logo size */}
                    <Image src={item.logo || "/placeholder.svg"} alt={item.title} fill className="object-contain p-1" />
                  </div>
                </div>

                <div className="mt-2 text-center">
                  <h3
                    className={cn(
                      "font-medium text-sm transition-all duration-300",
                      activeItem === index ? "text-teal-600 dark:text-teal-400" : "",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {item.period.start} - {item.period.end}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2">
                    {" "}
                    {/* Increased size and changed to rectangle */}
                    <Image
                      src={items[activeItem].logo || "/placeholder.svg"}
                      alt={items[activeItem].title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{items[activeItem].title}</h3>
                        <p className="text-lg text-neutral-700 dark:text-neutral-300">{items[activeItem].subtitle}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(false)}
                        className="self-end md:self-auto"
                      >
                        Close
                      </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {items[activeItem].period.start} - {items[activeItem].period.end}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{items[activeItem].location}</span>
                      </div>
                      {items[activeItem].link && (
                        <a
                          href={items[activeItem].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Website</span>
                        </a>
                      )}
                    </div>

                    <div className="mt-4">
                      <p className="text-neutral-700 dark:text-neutral-300">{items[activeItem].description}</p>

                      {items[activeItem].achievements && items[activeItem].achievements.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {items[activeItem].achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {items[activeItem].tags && items[activeItem].tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {items[activeItem].tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

