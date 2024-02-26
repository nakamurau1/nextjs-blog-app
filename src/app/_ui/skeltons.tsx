import { FaPenFancy, FaPlay, FaCheck } from 'react-icons/fa6'
import { GoArrowLeft } from 'react-icons/go'
import { cn } from '@/app/_lib/utils'

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

export const PostEditPageSkeleton = () => {
  return (
    <div>
      <header className="sticky top-0 border-b border-solid border-gray-100 z-50">
        <div className="flex items-center justify-between h-16 px-10">
          <GoArrowLeft className=" text-gray-500 text-2xl" />
          <div className="flex items-center">
            <div>
              <span className="inline-flex justify-center items-center ml-3 bg-gray-200 rounded-full w-[106px] h-[36px]" />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-auto w-full max-w-4xl px-4 py-2 mx-auto">
        <div className="flex flex-col justify-center p-6">
          <span className="mb-5 h-9 w-[400px] bg-gray-200" />
          <div className="flex w-full">
            <div className="flex-1 w-full min-h-[800px] rounded-lg border-none outline-0 resize-none p-5 bg-gray-200 relative" />
            <div className="max-w-20 min-w-20 ml-5">
              <div
                className="w-[76px] h-[36px] inline-flex rounded-full bg-gray-200 shadow-md p-1 relative
              before:z-0 before:absolute before:w-9 before:rounded-full before:top-1 before:bottom-1  before:transition before:duration-200"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
