'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { fetchUserByEmail, fetchUserById } from '@/app/lib/data'
import prismaClient from '@/app/lib/prismaClient'
import { isEmpty } from '@/app/lib/utils'

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

// 投稿の入力スキーマ
const PostFormSchema = z.object({
  id: z.string().nullable(),
  title: z
    .string()
    .min(1, { message: 'タイトルを入力してください' })
    .max(100, { message: 'タイトルは100文字以内にしてください' }),
  markdown: z.string().min(1, { message: '本文を入力してください' }).max(30000)
})

export type AuthInitState = {
  errors?: {
    id?: string[]
    email?: string[]
    name?: string[]
    profile_image?: string[]
  }
  message?: string | null
}

export type PostState = {
  errors?: {
    title?: string[]
    markdown?: string[]
  }
  message?: string | null
}

export const createUser = async (
  _prevState: AuthInitState,
  formData: FormData
): Promise<AuthInitState> => {
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
    await prismaClient.user.create({
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

export const upsertPost = async (_prevState: PostState, formData: FormData) => {
  const session = await auth()
  const sessionUser = session?.user
  if (!sessionUser) {
    return {
      errors: {},
      message: 'ログインしていません'
    }
  }
  const userByEmail = await fetchUserByEmail(sessionUser.email ?? '')
  if (!userByEmail) {
    return {
      errors: {},
      message: '投稿にはユーザー登録が必要です'
    }
  }

  const validateFields = PostFormSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    markdown: formData.get('markdown')
  })

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: ''
    }
  }

  const { id, title, markdown } = validateFields.data

  try {
    if (isEmpty(id) || id === null) {
      // Post作成
      await prismaClient.post.create({
        data: {
          title,
          content: markdown,
          published: false,
          user: {
            connect: {
              id: userByEmail.id
            }
          }
        }
      })
      revalidatePath('/posts/new')
    } else {
      // Post更新
      await prismaClient.post.update({
        where: {
          id,
          user_id: userByEmail.id
        },
        data: {
          title,
          content: markdown
        }
      })
      revalidatePath(`/posts/edit?postId=${id}`)
    }

    return {}
  } catch (error) {
    console.error(error)
    return {
      message: '保存に失敗しました'
    }
  }
}
