import { Button } from '@/components/Button'
import { signIn, signOut } from '@/auth'

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
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        {...props}
      >
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
      className="w-full"
    >
      <Button className="w-full p-0" type="submit" {...props}>
        Sign Out
      </Button>
    </form>
  )
}
