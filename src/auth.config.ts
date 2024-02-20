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
        const user = await fetchUserByEmail(auth?.user?.email ?? '')
        const isOnAuthInit = nextUrl.pathname.startsWith('/auth/init')
        if (!user && !isOnAuthInit) {
          // 初回登録の場合はユーザー登録画面にリダイレクト
          return Response.redirect(new URL('/auth/init', nextUrl))
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
