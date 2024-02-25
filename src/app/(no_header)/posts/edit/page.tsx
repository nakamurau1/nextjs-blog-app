import PostEditPage from '@/components/PostEditPage'
import { fetchPostById } from '@/app/_lib/data'

export default async function Page({
  searchParams
}: {
  searchParams?: { postId?: string }
}) {
  const postId = searchParams?.postId
  if (postId === undefined) {
    return <PostEditPage />
  }

  const post = await fetchPostById(postId ?? '')
  return <PostEditPage post={post} />
}
