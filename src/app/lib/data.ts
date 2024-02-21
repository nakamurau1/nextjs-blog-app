import { unstable_noStore as noStore } from 'next/cache'
import prismaClient from '@/app/lib/prismaClient'

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
