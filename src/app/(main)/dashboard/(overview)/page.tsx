import { FaPenFancy, FaPlay } from 'react-icons/fa6'
import { fetchSessionUserPosts } from '@/app/lib/data'
import { timeAgo } from '@/app/lib/utils'
import NextLink from 'next/link'

export default async function Page() {
  const posts = await fetchSessionUserPosts()

  return (
    <div className="space-y-2">
      <h1 className=" text-2xl font-bold">記事の一覧</h1>
      <div className="pt-5">
        {
          /* ここに記事の一覧を表示する */
          posts.map(post => {
            return (
              <article className="py-5 border-b border-gray-200" key={post.id}>
                <div className="flex">
                  <NextLink
                    href={`/posts/edit?postId=${post.id}`}
                    className="flex-1 text-xl font-bold overflow-hidden"
                  >
                    <div className="flex-1 text-xl font-bold overflow-hidden">
                      {post.title}
                    </div>
                  </NextLink>
                  <div>
                    <NextLink
                      aria-label="編集する"
                      className="h-9 w-9   p-2 flex items-center justify-center z-10 rounded-full text-gray-400 bg-gray-100 hover:bg-blue-50 hover:text-blue-500"
                      href={`/posts/edit?postId=${post.id}`}
                    >
                      <FaPenFancy width={21} height={21} />
                    </NextLink>
                  </div>
                </div>
                <div className="flex items-center mt-2.5">
                  {post.published ? (
                    <span className="inline-flex text-blue-400 border-blue-400 text-xs px-1 rounded-sm border mr-2">
                      公開中
                    </span>
                  ) : (
                    <span className="inline-flex text-gray-400 border-gray-300 text-xs px-1 rounded-sm border mr-2">
                      下書き
                    </span>
                  )}
                  <time className="text-xs text-gray-500">
                    {timeAgo(post.updated_at)}最終更新・
                    {post.content.length}文字
                  </time>
                </div>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}
