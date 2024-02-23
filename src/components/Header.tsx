import NavBar from '@/components/Navbar'
import UserButton from '@/components/UserButton'
import { auth } from '@/auth'
import { Link } from '@/components/Link'

export default async function Header() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <div className=" flex-1">
          <NavBar path="/" />
        </div>
        <div className="flex items-center">
          <UserButton />
          {/* ログイン済みの場合のみPostボタンを表示する */}
          {isLoggedIn && (
            <Link href="/posts/new" mode="primary" className={'ml-8'}>
              投稿する
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
