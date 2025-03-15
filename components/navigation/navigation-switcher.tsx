"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, AlignJustify, ArrowUp, ArrowDown, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ModernNavigation from "./modern-navigation"

type NavigationVariant = "sidebar" | "topbar" | "bottombar" | "floating"

export default function NavigationSwitcher() {
  const [variant, setVariant] = useState<NavigationVariant>("sidebar")

  // Load preference from localStorage if available
  useEffect(() => {
    const savedVariant = localStorage.getItem("navigationVariant") as NavigationVariant | null
    if (savedVariant) {
      setVariant(savedVariant)
    }
  }, [])

  // Save preference to localStorage
  const changeVariant = (newVariant: NavigationVariant) => {
    setVariant(newVariant)
    localStorage.setItem("navigationVariant", newVariant)
  }

  return (
    <>
      {/* Navigation component with selected variant */}
      <ModernNavigation variant={variant} />

      {/* Navigation switcher button */}
      <div
        className={cn(
          "fixed z-[60] transition-all duration-300",
          variant === "bottombar" ? "bottom-20 right-4" : "bottom-4 right-4",
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full shadow-md bg-white dark:bg-neutral-900"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeVariant("sidebar")}>
              <AlignJustify className="mr-2 h-4 w-4" />
              <span>Sidebar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeVariant("topbar")}>
              <ArrowUp className="mr-2 h-4 w-4" />
              <span>Top Bar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeVariant("bottombar")}>
              <ArrowDown className="mr-2 h-4 w-4" />
              <span>Bottom Bar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeVariant("floating")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Floating</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

