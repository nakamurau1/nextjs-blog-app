import PostEditPage from '@/components/PostEditPage'
import { PostEditPageSkeleton } from '@/app/_ui/skeltons'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <Suspense fallback={<PostEditPageSkeleton />}>
      <PostEditPage />
    </Suspense>
  )
}
