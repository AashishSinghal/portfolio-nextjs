"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ExampleClientComponent() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This is a client component that includes interactivity. It&apos;s hydrated on the client after the initial
        server render.
      </p>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => setCount(count - 1)}>
          -
        </Button>
        <span>{count}</span>
        <Button variant="outline" size="sm" onClick={() => setCount(count + 1)}>
          +
        </Button>
      </div>
    </div>
  )
}

