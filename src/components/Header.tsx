import NavBar from '@/components/Navbar'
import UserButton from '@/components/UserButton'

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <NavBar path="/" />
        <UserButton />
      </div>
    </header>
  )
}
