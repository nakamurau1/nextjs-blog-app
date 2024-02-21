import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import { User, Post } from './definition'

// メールアドレスをキーにしてUserを取得する
export const fetchUserByEmail = async (email: string) => {
  noStore()

  try {
    const data = await sql<User>`SELECT * FROM users WHERE email = ${email}`

    const user = data.rows.map(user => ({
      ...user
    }))

    return user[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoice.')
  }
}

// idをキーにしてUserを取得する
export const fetchUserById = async (id: string) => {
  noStore()

  try {
    const data = await sql<User>`SELECT * FROM users WHERE id = ${id}`

    const user = data.rows.map(user => ({
      ...user
    }))

    return user[0]
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoice.')
  }
}
