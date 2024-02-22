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

const LinkItem = ({
  href,
  path,
  target,
  children,
  className
}: LinkItemProps) => {
  const active = href == path
  const inactiveColor = active
    ? 'text-gray-900'
    : 'text-gray-800 dark:text-white'

  return (
    <NextLink
      href={href}
      passHref
      scroll
      className={`py-2 px-4 rounded-lg ${inactiveColor} ${
        active ? 'bg-teal-500' : ''
      } ${className}`}
      target={target}
    >
      {children}
    </NextLink>
  )
}

interface NavbarProps {
  path: string
}

const Navbar = ({ path }: NavbarProps) => {
  return (
    <nav className="flex items-center space-x-2 lg:space-x-6">
      <div className="container mx-auto flex p-2 justify-between items-center max-w-screen-md">
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
