"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import CursorHighlightEffect from "@/components/cursor-highlight-effect"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CursorHighlightDemo() {
  const { theme, setTheme } = useTheme()
  const [radius, setRadius] = useState(150)
  const [lineSpacing, setLineSpacing] = useState(30)
  const [highlightIntensity, setHighlightIntensity] = useState(1.2) // Increased default intensity
  const [showControls, setShowControls] = useState(true)

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-4 flex items-center">
        <Link href="/" className="flex items-center text-sm hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
        <h1 className="text-2xl font-bold text-center flex-1">Cursor Highlight Effect Demo</h1>
        <Link href="/demo/cursor-highlight/integration-example" className="text-sm hover:underline">
          View Integration Example
        </Link>
      </div>

      {/* Controls panel */}
      <div
        className={`p-4 bg-background border-b transition-all duration-300 ${showControls ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="radius-slider">Highlight Radius: {radius}px</Label>
            <Slider
              id="radius-slider"
              min={50}
              max={300}
              step={10}
              value={[radius]}
              onValueChange={(value) => setRadius(value[0])}
            />
            <p className="text-xs text-muted-foreground">Controls how far from the cursor lines will highlight</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="spacing-slider">Line Spacing: {lineSpacing}px</Label>
            <Slider
              id="spacing-slider"
              min={10}
              max={100}
              step={5}
              value={[lineSpacing]}
              onValueChange={(value) => setLineSpacing(value[0])}
            />
            <p className="text-xs text-muted-foreground">Controls the density of the grid lines</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity-slider">Highlight Intensity: {highlightIntensity.toFixed(1)}</Label>
            <Slider
              id="intensity-slider"
              min={0.1}
              max={2}
              step={0.1}
              value={[highlightIntensity]}
              onValueChange={(value) => setHighlightIntensity(value[0])}
            />
            <p className="text-xs text-muted-foreground">Controls how pronounced the highlight effect is</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="theme-switch"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
            <Label htmlFor="theme-switch">Dark Mode</Label>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 z-10"
        onClick={() => setShowControls(!showControls)}
      >
        {showControls ? "Hide Controls" : "Show Controls"}
      </Button>

      {/* Main demo area */}
      <div className="flex-1 relative">
        <CursorHighlightEffect
          radius={radius}
          lineSpacing={lineSpacing}
          highlightIntensity={highlightIntensity}
          className="w-full h-full"
        />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="max-w-2xl text-center p-8 bg-background/80 backdrop-blur-sm rounded-lg pointer-events-auto">
            <h2 className="text-3xl font-bold mb-4">Move your cursor around</h2>
            <p className="text-lg text-muted-foreground mb-4">
              This demo showcases a dynamic line highlighting effect that responds to your cursor position. The lines
              within the specified radius of your cursor will highlight with a smooth transition.
            </p>
            <p className="text-sm text-muted-foreground">
              Notice how the lines remain stationary while only their color changes based on proximity to your cursor.
              The effect creates a subtle interactive experience without distracting from the content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

