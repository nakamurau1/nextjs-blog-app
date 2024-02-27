import { Button } from '@/components/Button'
import { signIn, signOut } from '@/auth'
import { MdLogout } from 'react-icons/md'

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider)
      }}
    >
      <Button type="submit" mode="primary" {...props}>
        Sign In
      </Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
      className="flex w-full items-center text-left justify-start"
    >
      <Button
        className="flex w-full text-left items-center"
        type="submit"
        {...props}
      >
        <MdLogout className="inline-flex" />
        <span className="flex-1 ml-2">Sign Out</span>
      </Button>
    </form>
  )
}
