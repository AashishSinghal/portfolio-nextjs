import Image from "next/image"
import { BiLinkExternal } from "react-icons/bi"

type Dimensions = { width: number; height: number }

type Props = {
  src: string
  alt: string
  href?: string
  height?: number
  dimensions?: Dimensions
}

/**
 * ImageLink Component
 *
 * MODIFICATIONS:
 * 1. Updated from next/legacy/image to next/image
 * 2. Removed layout, objectFit props (deprecated in Next.js 13+)
 * 3. Updated styling to use modern Next.js Image component patterns
 * 4. Added proper fill and sizes attributes
 * 5. Added responsive handling for mobile devices
 *
 * This component displays an image that links to an external URL with a hover effect.
 */
const ImageLink = ({ src, alt, href = "#", height, dimensions }: Props) => (
  <div className="relative overflow-hidden shadow rounded group w-full">
    <a href={href} target="_blank" rel="noreferrer" className="flex w-full">
      {dimensions ? (
        <div className="relative border border-neutral-50/20 rounded shadow-lg w-full">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            style={{ objectFit: "cover" }}
            className="rounded w-full"
          />
        </div>
      ) : (
        <div
          style={{ height: height || 250 }}
          className="w-full relative border border-neutral-50/20 rounded shadow-lg overflow-hidden min-h-[200px]"
        >
          <Image
            src={src || "/placeholder.svg"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            alt={alt}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-neutral-900 text-white opacity-0 flex items-center justify-center transition group-hover:opacity-60">
        <BiLinkExternal fontSize={64} />
      </div>
    </a>
  </div>
)

export default ImageLink

