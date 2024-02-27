'use client'

import Logo from './Logo'
import NextLink from 'next/link'

interface LinkItemProps {
  href: string
  path?: string
  children: React.ReactNode
  target?: string
  className?: string
}

interface NavbarProps {
  path: string
}

const Navbar = ({ path }: NavbarProps) => {
  return (
    <nav className="flex items-center space-x-2 lg:space-x-6">
      <div className="container mx-auto flex py-2 px-0 justify-between items-center max-w-screen-md">
        <div className="flex items-center mr-5">
          <h1 className="text-lg font-semibold">
            <Logo />
          </h1>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
