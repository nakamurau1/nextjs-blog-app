import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        await new Promise(resolve => setTimeout(resolve, 5000))

        const email = 'hoge@sample.com'
        return credentials.email === email && credentials.password === '123456'
          ? { id: 'userId', email }
          : null
      }
    })
  ]
})
