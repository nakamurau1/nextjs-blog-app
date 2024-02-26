import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import {
  fetchUserById,
  fetchPublishedPostByUserIdAndPostId
} from '@/app/_lib/data'
import { formatDate } from '@/app/_lib/utils'
import MarkdownView from './_components/MarkdownView'

export default async function Page({
  params
}: {
  params: { userId: string; postId: string }
}) {
  const user = await fetchUserById(params.userId)
  const post = await fetchPublishedPostByUserIdAndPostId(
    params.userId,
    params.postId
  )

  return (
    <main className="flex-auto w-full">
      <article>
        {/* Profile */}
        <aside className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-center sm:max-w-[800px] mx-auto">
            <div className="flex items-center py-2 pl-5">
              <Avatar className="w-9 h-9">
                <AvatarImage
                  src={user?.profile_image ?? ''}
                  alt={user?.name ?? ''}
                />
                <AvatarFallback>{user?.email ?? ''}</AvatarFallback>
              </Avatar>
              <div className="flex-1 ml-3">
                <h1 className="flex text-sm font-semibold">
                  {user?.name ?? ''}
                </h1>
              </div>
            </div>
            <div className="flex-1" />
          </div>
        </aside>
        {/* Post Title */}
        <div className="py-12 text-center">
          <div className="max-w-[1200px] px-5">
            <h1 className="inline-block max-w-[780px] text-left font-bold text-xl">
              {post?.title}
            </h1>
            <div className="flex items-center justify-center mt-5 text-sm text-left">
              <span className=" text-gray-400">
                {formatDate(post?.created_at)}
              </span>
            </div>
          </div>
        </div>
        {/* Post Content */}
        <div className="flex items-center justify-center sm:max-w-[800px] mx-auto">
          <section className="w-full">
            <div className="py-9 bg-white">
              <MarkdownView markdown={post?.content ?? ''} />
            </div>
          </section>
        </div>
      </article>
    </main>
  )
}
