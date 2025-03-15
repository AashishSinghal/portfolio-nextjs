import Ingredients from "./ingredients"
import PhotoWall from "./photo-wall"
import Profiles from "./profiles"

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center justify-center py-8 space-y-6">
      <div className="relative">
        <PhotoWall size={512} />
      </div>

      <div className="mt-8">
        <Ingredients />
      </div>

      <Profiles />
    </header>
  )
}

