'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { fetchUserByEmail, fetchUserById } from '@/app/lib/data'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

// 初回登録の入力スキーマ
const UserFormSchema = z.object({
  id: z
    .string()
    .min(1, { message: 'IDを入力してください' })
    .max(20, { message: 'IDは20文字以内である必要があります' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'IDは英数字のみ使用できます' }),
  email: z
    .string()
    .email({ message: '有効なメールアドレスを入力してください' }),
  // 名前は30文字以内
  name: z
    .string()
    .min(1, { message: '表示名を入力してください' })
    .max(30, { message: '表示名は30文字以内である必要があります' }),
  profile_image: z.string()
})

export type State = {
  errors?: {
    id?: string[]
    email?: string[]
    name?: string[]
    profile_image?: string[]
  }
  message?: string | null
}

export const createUser = async (
  _prevState: State,
  formData: FormData
): Promise<State> => {
  const session = await auth()
  const sessionUser = session?.user
  if (!sessionUser) {
    return {
      errors: {},
      message: 'ログインしていません'
    }
  }

  const userByEmail = await fetchUserByEmail(sessionUser.email ?? '')
  if (userByEmail) {
    return {
      errors: {},
      message: '既に登録済みです'
    }
  }

  const validateFields = UserFormSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: sessionUser.email,
    profile_image: sessionUser?.image
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: ''
    }
  }

  const { id, name, email, profile_image } = validateFields.data

  const userById = await fetchUserById(id)
  if (userById) {
    return {
      errors: {
        id: ['このIDは既に使用されています']
      },
      message: ''
    }
  }

  try {
    // User作成
    await prisma.user.create({
      data: {
        id,
        name,
        email,
        profile_image
      }
    })
  } catch (error) {
    return {
      message: 'ユーザーの作成に失敗しました'
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
