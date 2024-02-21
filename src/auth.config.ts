import type { NextAuthConfig } from 'next-auth'
import { fetchUserByEmail } from '@/app/lib/data'

export const authConfig = {
  // pages: {
  //   newUser: '/auth/init'
  // },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (isLoggedIn) {
        // ログイン中の場合
        const dbUser = await fetchUserByEmail(auth?.user?.email ?? '')
        const isOnAuthInit = nextUrl.pathname.startsWith('/auth/init')
        if (dbUser) {
          // 登録済みの場合
          if (isOnAuthInit) {
            // ユーザー登録画面にはアクセスできない
            return Response.redirect(new URL('/', nextUrl))
          }
        } else {
          // 未登録の場合
          if (!isOnAuthInit) {
            // 初回登録の場合はユーザー登録画面にリダイレクト
            return Response.redirect(new URL('/auth/init', nextUrl))
          }
        }

        return true
      } else {
        // 未ログインの場合

        // dashboardはログインしていないとアクセスできない
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
        if (isOnDashboard) {
          return false
        }

        return true
      }
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig