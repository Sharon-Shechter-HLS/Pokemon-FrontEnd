import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-[293px] h-[38px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929AA3] text-sm pointer-events-none">
          🔍
        </span>
        <input
          ref={ref}
          className={cn(
            "w-full h-full pl-10 pr-20 py-2 text-sm text-[#1c1e21] rounded-[8px] border border-[#929AA3] outline-none transition-all",
            "hover:border-[#6b7280]",
            "focus:border-[#3B5AA6]",
            "disabled:text-[#cbd5e1] disabled:bg-[#f9fafb] disabled:border-[#e5e7eb]",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
