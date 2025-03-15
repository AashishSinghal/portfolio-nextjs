import { cn } from "@/lib/utils"
import Image from "next/image"

// Update photos array to use the actual images
const photos: string[] = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-wall-01.jpg-z9Kx9W3uIuV9snxblxBPo21rtk4R0h.jpeg", // Blue jacket photo
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-wall-02.jpg-MOAyx07gizLJ7enD08cfn8BytRuvC2.jpeg", // Red hoodie photo
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-wall-03.jpg-K7qpOQ20n0965wBFDLv43yEv8lvOgb.jpeg", // Green shirt photo
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-wall-04.jpg-DPT2OvoByS5dtEL2wPzUrW2XegATIf.jpeg", // White shirt selfie
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-wall-05.jpg-8JUvcxiPEhX0dXwgNMEZuDWftYKamo.jpeg", // Black and white profile
]

type Props = {
  size?: number
}

const PhotoWall = ({ size = 512 }: Props) => {
  return (
    <div className="flex gap-1" style={{ width: size, height: size }}>
      {photos.map((photo, index) => (
        <div
          key={photo}
          className={cn("relative transition-all duration-300 ease-in-out photo-item", {
            "rounded-l": index === 0,
            "rounded-r": index === photos.length - 1,
          })}
          style={{
            width: `${size / 4}px`,
            height: `${size}px`,
            animationDelay: `${index * 0.5 + 0.5}s`,
          }}
        >
          <Image
            priority
            src={photo || "/placeholder.svg"}
            fill
            style={{ objectFit: "cover" }}
            alt={`Profile Photo ${index + 1}`}
          />
        </div>
      ))}
    </div>
  )
}

export default PhotoWall

