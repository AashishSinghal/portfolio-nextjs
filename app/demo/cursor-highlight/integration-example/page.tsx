"use client"

import CursorHighlightContainer from "@/components/cursor-highlight-container"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function IntegrationExample() {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <Link href="/demo/cursor-highlight" className="flex items-center text-sm hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Demo
        </Link>
      </div>

      <CursorHighlightContainer
        radius={150}
        lineSpacing={40}
        highlightIntensity={1.5} // Increased for better visibility
      >
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-6">Integration Example</h1>

          <p className="text-lg mb-4">
            This page demonstrates how the cursor highlight effect can be integrated with actual content. Move your
            cursor around to see the effect while interacting with the page content.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-card p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Feature One</h2>
              <p>
                This is an example of how the cursor highlight effect works with cards and other UI elements. The effect
                adds a subtle layer of interactivity without interfering with the content.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Feature Two</h2>
              <p>
                The cursor highlight effect can be customized with different colors, intensities, and line spacings to
                match the design language of your application.
              </p>
            </div>
          </div>

          <div className="bg-muted p-8 rounded-lg my-8">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="mb-4">
              The effect creates a grid of horizontal and vertical lines that respond to the cursor's position. Lines
              within the specified radius of the cursor are highlighted with a smooth transition.
            </p>
            <p>The component is optimized for performance using techniques like:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Throttling mouse move events to reduce calculations</li>
              <li>Using CSS transitions for smooth animations</li>
              <li>Calculating line positions only when necessary</li>
              <li>Using useMemo to prevent unnecessary recalculations</li>
            </ul>
          </div>

          <div className="text-center my-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Use in Your Project</h2>
            <p className="text-lg">
              The cursor highlight effect is available as a reusable component that can be easily integrated into any
              part of your application. Simply wrap your content with the CursorHighlightContainer.
            </p>
          </div>
        </div>
      </CursorHighlightContainer>
    </div>
  )
}

