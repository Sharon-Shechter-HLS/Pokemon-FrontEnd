import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#3B5AA6] text-white hover:bg-[#293F74] active:bg-[#182442] disabled:bg-gray-200 disabled:text-gray-400",
        secondary:
          "border border-[#3B5AA6] text-[#3B5AA6] hover:bg-[#EBEFF6] active:bg-[#B1BDDB] disabled:text-gray-400 disabled:border-gray-300",
      },
      size: {
        sm: "h-[32px] px-4 py-2 text-sm",
        md: "h-[36px] px-4 py-2 text-base",
        lg: "h-[40px] px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)


type ButtonProps = {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  disabled?: boolean
}

function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button