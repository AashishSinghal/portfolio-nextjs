"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, MapPin, Calendar, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/hooks/use-mobile" // Import useMediaQuery

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
  const isMobile = useMediaQuery("(max-width: 768px)") // Check if screen is mobile

  const navigate = (direction: "left" | "right") => {
    if (direction === "right" && activeItem < items.length - 1) {
      setActiveItem((prev) => prev + 1)
    }

    if (direction === "left" && activeItem > 0) {
      setActiveItem((prev) => prev - 1)
    }
  }

  // Navigation buttons should be visible on all screen sizes
  const navigationButtons = (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate("left")}
        disabled={activeItem === 0}
        className="h-8 w-8"
        aria-label="Previous item"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate("right")}
        disabled={activeItem === items.length - 1}
        className="h-8 w-8"
        aria-label="Next item"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )

  // Mobile timeline view - only shows active item
  const mobileTimelineView = (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={items[activeItem].id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center pb-4"
        >
          <div className="w-20 h-20 rounded-lg border-2 bg-white dark:bg-neutral-900 flex items-center justify-center relative z-10 border-teal-500 dark:border-teal-400 shadow-lg">
            <div className="relative w-16 h-16">
              <Image
                src={items[activeItem].logo || "/placeholder.svg"}
                alt={items[activeItem].title}
                fill
                className="object-contain p-1"
              />
            </div>
          </div>
          <div className="mt-2 text-center">
            <h3 className="font-medium text-sm text-teal-600 dark:text-teal-400">{items[activeItem].title}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {items[activeItem].period.start} - {items[activeItem].period.end}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-2 flex justify-center items-center gap-4">
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {activeItem + 1} of {items.length}
        </span>
      </div>
    </div>
  )

  // Desktop timeline view - shows all items with scrolling
  const desktopTimelineView = (
    <div className="relative">
      {/* Timeline track */}
      <div
        ref={timelineRef}
        className="flex overflow-x-auto pb-4 hide-scrollbar gap-4 relative pt-6"
      >
        <div className="absolute top-[80px] left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 z-0" />
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
                "flex flex-col items-center transition-all duration-300 pt-6",
                activeItem === index ? "scale-110" : "opacity-70 hover:opacity-100",
              )}
              onClick={() => {
                setActiveItem(index)
                setIsExpanded(true)
              }}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-lg border-2 bg-white dark:bg-neutral-900 flex items-center justify-center relative z-10 transition-all duration-300",
                  activeItem === index
                    ? "border-teal-500 dark:border-teal-400 shadow-lg"
                    : "border-neutral-300 dark:border-neutral-700",
                )}
              >
                <div className="relative w-12 h-12">
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
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {/* Navigation buttons visible on all screen sizes now */}
        {navigationButtons}
      </div>

      {/* Conditional rendering based on screen size */}
      {isMobile ? mobileTimelineView : desktopTimelineView}

      {/* Detail card - same for both views */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-md overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-2 mx-auto md:mx-0">
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
                      <h3 className="text-xl font-bold text-center md:text-left">{items[activeItem].title}</h3>
                      <p className="text-lg text-neutral-700 dark:text-neutral-300 text-center md:text-left">
                        {items[activeItem].subtitle}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="self-center md:self-auto"
                    >
                      Close
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-3 text-sm text-neutral-500 dark:text-neutral-400 justify-center md:justify-start">
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
                      <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
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
  )
}

