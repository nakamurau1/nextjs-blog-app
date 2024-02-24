import React from 'react'
import { cn } from '@/app/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  mode?: 'primary'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, mode, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          mode === 'primary' &&
            `bg-blue-400 hover:bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-full
            disabled:opacity-70 disabled:cursor-auto disabled:hover:bg-blue-400`,
          className
        )}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
