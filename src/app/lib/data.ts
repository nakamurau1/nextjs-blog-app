import { unstable_noStore as noStore } from 'next/cache'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

// メールアドレスをキーにしてUserを取得する
export const fetchUserByEmail = async (email: string) => {
  noStore()

  try {
    const user = await prisma.user.findUnique({
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
    const user = await prisma.user.findUnique({
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
