import { fetchUserById, fetchPublishedPostsByUserId } from '@/app/_lib/data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import NextLink from 'next/link'
import { Suspense, HTMLAttributes } from 'react'
import { timeAgo } from '@/app/_lib/utils'
import { ProfileSkeleton } from '@/app/_ui/skeltons'

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await fetchUserById(params.userId)
  return (
    <div>
      <div className=" max-w-[960px] px-6">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile userId={params.userId} />
        </Suspense>
      </div>
      <div className=" min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <PostList userId={user?.id ?? ''} className="pt-5" />
        </Suspense>
      </div>
    </div>
  )
}

const Profile = async (props: { userId: string }) => {
  const user = await fetchUserById(props.userId)

  return (
    <>
      <div className="flex items-start py-12">
        <Avatar className="w-28 h-28">
          <AvatarImage src={user?.profile_image ?? ''} alt={user?.name ?? ''} />
          <AvatarFallback>{user?.email ?? ''}</AvatarFallback>
        </Avatar>
        <div className="flex-1 pl-7">
          <h1 className="flex text-2xl font-bold">{user?.name ?? ''}</h1>
        </div>
      </div>
    </>
  )
}

type PostListProps = HTMLAttributes<HTMLDivElement> & {
  userId: string
}

const PostList = async (props: PostListProps) => {
  const posts = await fetchPublishedPostsByUserId(props.userId)

  return (
    <div {...props}>
      {
        /* ここに記事の一覧を表示する */
        posts.map(post => {
          return (
            <article className="py-5 border-b border-gray-100" key={post.id}>
              <div className="flex">
                <div className="flex-1 text-xl font-bold overflow-hidden">
                  <NextLink
                    href={`/${props.userId}/posts/${post.id}`}
                    className="flex-1 text-xl font-bold overflow-hidden"
                  >
                    <div className="flex-1 text-xl font-bold overflow-hidden">
                      {post.title}
                    </div>
                  </NextLink>
                </div>
              </div>
              <div className="flex items-center mt-2.5">
                <time className="text-xs text-gray-500">
                  {timeAgo(post.updated_at)}
                </time>
              </div>
            </article>
          )
        })
      }
    </div>
  )
}
