import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { auth } from '@/auth'
import { fetchUserByEmail } from '@/app/_lib/data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/DropDownMenu'
import { SignIn, SignOut } from '@/components/AuthComponents'
import Link from 'next/link'

export default async function UserButton() {
  const session = await auth()
  if (!session?.user) return <SignIn />

  const userByEmail = await fetchUserByEmail(session.user.email ?? '')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            {session.user.image && (
              <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ''}
              />
            )}
            <AvatarFallback>{session.user.email}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <Link href={`/${userByEmail?.id}`}>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/dashboard" className="w-full text-center">
            ダッシュボード
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
