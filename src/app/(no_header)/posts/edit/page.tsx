import PostEditPage from '@/components/PostEditPage'
import { fetchPostById } from '@/app/_lib/data'
import { Suspense } from 'react'
import { PostEditPageSkeleton } from '@/app/_ui/skeltons'

export default async function Page({
  searchParams
}: {
  searchParams?: { postId?: string }
}) {
  const postId = searchParams?.postId
  if (postId === undefined) {
    return <PostEditPage />
  }

  return (
    <Suspense fallback={<PostEditPageSkeleton />}>
      <PostEditPageWrapper postId={postId} />
    </Suspense>
  )
}

const PostEditPageWrapper = async ({ postId }: { postId: string }) => {
  const post = await fetchPostById(postId ?? '')

  return <PostEditPage post={post} />
}
