import { unstable_noStore as noStore } from 'next/cache'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// メールアドレスをキーにしてUserを取得する
export const fetchUserByEmail = async (email: string) => {
  noStore()

  try {
    const user = await prisma.user.findFirst({
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
