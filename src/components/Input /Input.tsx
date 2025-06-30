import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

type InputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function Input({
  value,
  onChange,
  placeholder = "Search",
  disabled,
  className,
}: InputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929AA3] size-4 pointer-events-none" />

      {value && (
        <button
          type="button"
          onClick={() =>
            onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#929AA3] hover:text-[#6b7280] transition-colors"
        >
          <X className="size-4" />
        </button>
      )}

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full h-full text-sm text-[#1c1e21] rounded-[8px] border border-[#929AA3] bg-white",
          "pl-[32px] pr-[32px] py-[8px]",
          "hover:border-[#6b7280]",
          "focus:border-[#3B5AA6] focus:outline-none",
          "disabled:text-[#cbd5e1] disabled:bg-[#f9fafb] disabled:border-[#e5e7eb]",
        )}
      />
    </div>
  )
}

export default Input
