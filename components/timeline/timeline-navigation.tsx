"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type TimelineNavigationProps = {
  currentIndex: number
  totalItems: number
  onPrevious: () => void
  onNext: () => void
  isMobile: boolean
}

export function TimelineNavigation({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  isMobile,
}: TimelineNavigationProps) {
  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < totalItems - 1

  return (
    <div className={cn("flex items-center gap-4 mt-2", isMobile ? "justify-between" : "justify-start ml-8")}>
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Previous item"
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <span className="text-sm text-muted-foreground">
        {currentIndex + 1} / {totalItems}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next item"
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

