import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterProps {
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  options: string[]
}

export function Filter({
  disabled = false,
  value,
  onChange,
  placeholder = "Filter type",
  options,
}: FilterProps) {
  const isFilled = !!value

  return (
    <div
  className={cn(
            // Fixed height, padding, border
            "h-[38px] px-3 py-2 rounded-[8px] border text-sm flex items-center gap-4",
            // Default width, but flexible with long content
            "min-w-[140px] w-fit max-w-full",
            disabled
            ? "border-[#d1d5db] bg-[#f9fafb] text-[#9ca3af] cursor-not-allowed"
            : isFilled
            ? "bg-[#EBEFF6] border-[#3B5AA6] text-[#3B5AA6]"
            : "border-[#9ca3af] hover:border-[#6b7280]"
        )}
        >

      <Calendar
        className={cn(
            "w-4 h-4 shrink-0",
            disabled ? "text-[#d1d5db]" : isFilled ? "text-[#3B5AA6]" : "text-[#6b7280]"
        )}
        />

        <div className="flex-1 min-w-[0]">
        <Select
            disabled={disabled}
            value={value}
            onValueChange={(val) => onChange?.(val)}
        >
            <SelectTrigger
            className={cn(
                "w-full border-none p-0 bg-transparent text-sm text-left",
                "focus:outline-none focus:ring-0 focus:ring-offset-0",
                disabled ? "cursor-not-allowed text-[#9ca3af]" : ""
            )}
            >
            <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
            {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                {opt}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>
        </div>


      {isFilled && !disabled && (
        <button 
        onClick={() => onChange?.("")}         
        className="text-[#3B5AA6] hover:text-[#324d91] transition-colors"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
