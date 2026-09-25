import type { CSSProperties, ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string
  width?: number
  height?: number
  // Mirrors next/image's `fill`: stretch to cover the positioned parent
  fill?: boolean
  // Mirrors next/image's `priority`: load eagerly instead of lazily
  priority?: boolean
  quality?: number
}

// Drop-in replacement for next/image used by the ported components: a plain <img>
// with lazy loading, async decoding and the `fill` / `priority` conveniences
export default function Image({
  fill,
  priority,
  quality: _quality,
  className,
  style,
  alt,
  ...props
}: Props) {
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
    : undefined

  return (
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={cn(className)}
      style={{ ...fillStyle, ...style }}
      {...props}
    />
  )
}
