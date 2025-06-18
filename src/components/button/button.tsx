import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
        variants: {
      variant: {
        primary:
          "bg-[#3B5AA6] text-white hover:bg-[#324d91] active:bg-[#182442] disabled:bg-gray-200 disabled:text-gray-400",
        secondary:
          "border border-[#3B5AA6] text-[#3B5AA6] hover:bg-[#d8e0f0] active:bg-[#c0cbe3] disabled:text-gray-400 disabled:border-gray-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-[32px] px-4 py-[9px] text-sm",
        md: "h-[36px] px-4 py-[10px] text-base",
        lg: "h-[40px] px-4 py-[12px] text-lg",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
