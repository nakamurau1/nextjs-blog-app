import { auth } from '@/auth'
import { unstable_noStore as noStore } from 'next/cache'
import prismaClient from '@/app/_lib/prismaClient'

// メールアドレスをキーにしてUserを取得する
export const fetchUserByEmail = async (email: string) => {
  noStore()

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email
      }
    })

    return user
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch user.')
  }
}

// PrismaでidをキーにしてUserを取得する
export const fetchUserById = async (id: string) => {
  noStore()

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    })

    return user
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch user.')
  }
}

// ログイン中のユーザー（セッションから取得）の記事の一覧を取得する
export const fetchSessionUserPosts = async () => {
  noStore()

  const session = await auth()
  const sessionUser = session?.user
  if (!sessionUser) {
    throw new Error('Failed to fetch session user.')
  }

  const dbUser = await fetchUserByEmail(sessionUser.email ?? '')
  if (!dbUser) {
    throw new Error('Failed to fetch user.')
  }

  try {
    const posts = await prismaClient.post.findMany({
      where: {
        user_id: dbUser.id
      },
      orderBy: {
        updated_at: 'desc'
      }
    })

    return posts
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch posts.')
  }
}

// Postを取得する
export const fetchPostById = async (id: string) => {
  noStore()

  const session = await auth()
  const sessionUser = session?.user
  if (!sessionUser) {
    throw new Error('Failed to fetch session user.')
  }

  const dbUser = await fetchUserByEmail(sessionUser.email ?? '')
  if (!dbUser) {
    throw new Error('Failed to fetch user.')
  }

  try {
    const post = await prismaClient.post.findUnique({
      where: {
        id,
        user_id: dbUser.id
      }
    })

    return post
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch post.')
  }
}

// UserIdをキーにしてPostを取得する
export const fetchPublishedPostsByUserId = async (userId: string) => {
  noStore()

  try {
    const posts = await prismaClient.post.findMany({
      where: {
        user_id: userId,
        published: true
      },
      orderBy: {
        updated_at: 'desc'
      }
    })

    return posts
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch posts.')
  }
}

// UserIdとPostIdをキーにして公開済みのPostを取得する
export const fetchPublishedPostByUserIdAndPostId = async (
  userId: string,
  postId: string
) => {
  noStore()

  try {
    const post = await prismaClient.post.findUnique({
      where: {
        id: postId,
        user_id: userId,
        published: true
      }
    })

    return post
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch post.')
  }
}
