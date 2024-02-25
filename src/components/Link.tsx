import NextLink from 'next/link'
import React from 'react'
import { cn } from '@/app/_lib/utils'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
  href: string
  mode?: 'primary'
}

export const Link = React.forwardRef<HTMLAnchorElement, Props>(
  ({ children, href, mode, className, ...rest }, ref) => {
    return (
      <NextLink
        href={href}
        ref={ref}
        className={cn(
          mode === 'primary' &&
            'bg-blue-400 hover:bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full',
          className
        )}
        {...rest}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'
