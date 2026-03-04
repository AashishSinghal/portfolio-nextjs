"use client"

import { useEffect, useState } from "react"
import { Users } from "lucide-react"

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch("/api/visitor-count")
        if (!response.ok) {
          throw new Error("Failed to fetch visitor count")
        }
        const data = await response.json()
        setVisitorCount(data.count)
      } catch (error) {
        console.error("Error fetching visitor count:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVisitorCount()

    // Refresh count every 5 minutes
    const interval = setInterval(fetchVisitorCount, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>Loading...</span>
      </div>
    )
  }

  if (visitorCount === null) {
    return null
  }

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{visitorCount.toLocaleString()} visitors</span>
    </div>
  )
}
