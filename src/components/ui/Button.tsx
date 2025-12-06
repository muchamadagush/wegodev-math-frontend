import { clsx } from 'clsx'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const base = 'inline-flex items-center justify-center font-medium rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors'
const variants: Record<string,string> = {
  default: 'bg-blue-600 hover:bg-blue-700 text-white',
  outline: 'border border-gray-300 hover:bg-gray-100',
  destructive: 'bg-red-600 hover:bg-red-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
}
const sizes: Record<string,string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}, ref) {
  return (
    <button
      ref={ref}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
})

export default Button
