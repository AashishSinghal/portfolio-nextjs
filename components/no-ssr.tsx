"use client"

import type React from "react"

import { useEffect, useState } from "react"

/**
 * NoSSR Component
 *
 * MODIFICATIONS:
 * 1. Reimplemented using useState and useEffect instead of next/dynamic
 * 2. Added "use client" directive for client-side rendering
 * 3. Simplified implementation for Next.js 15 compatibility
 * 4. Added proper typing for children
 *
 * This component prevents its children from rendering during SSR,
 * only rendering them on the client side after hydration.
 */
export default function NoSSR({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <>{children}</> : null
}

