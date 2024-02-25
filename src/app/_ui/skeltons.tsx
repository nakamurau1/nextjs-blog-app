// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export const PostsSkeleton = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl p-2`}>
      {[...Array(5)].map((_, i) => (
        <article className="py-5 border-b border-gray-200" key={i}>
          <div className="flex">
            <div className="flex-1 overflow-hidden">
              <div className="flex">
                <span className="h-5 w-[300px] rounded-md bg-gray-200" />
              </div>
            </div>
            <div>
              <div className="h-9 w-9 p-2 flex items-center justify-center z-10 rounded-full bg-gray-200"></div>
            </div>
            <div className="ml-5">
              <div className="h-9 w-9 p-2 flex items-center justify-center z-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div className="flex items-center mt-2.5">
            <span className="h-4 w-[200px] rounded-md bg-gray-200" />
          </div>
        </article>
      ))}
    </div>
  )
}
