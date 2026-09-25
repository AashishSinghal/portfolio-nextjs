import { useEffect } from "react"
import { profile } from "@/data/profile"

// Sets the tab title per page; without a title it falls back to the site default
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · ${profile.role}`
  }, [title])
}
