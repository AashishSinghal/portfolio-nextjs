import { Skeleton } from "@/components/ui/skeleton"

const HeaderLoading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-8 space-y-6">
      <Skeleton className="h-[512px] w-[512px] rounded-md" />
      <Skeleton className="h-[115px] w-[400px] rounded-md" />
      <Skeleton className="h-[22px] w-[300px] rounded-md" />
    </div>
  )
}

export default HeaderLoading

