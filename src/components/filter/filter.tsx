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
  onClear?: () => void
  onChange?: (value: string) => void
}

export function Filter({
  disabled = false,
  value,
  onClear,
  onChange,
}: FilterProps) {
  const isFilled = !!value

  return (
    <div
      className={cn(
        "w-[140px] h-[38px] px-3 py-2 rounded-[8px] border text-sm flex items-center gap-4",
        disabled
          ? "border-[#d1d5db] bg-[#f9fafb] text-[#9ca3af] cursor-not-allowed"
          : isFilled
          ? "bg-[#EBEFF6] border-[#3B5AA6] text-[#3B5AA6]"
          : "border-[#9ca3af] hover:border-[#6b7280]"
      )}
    >
      <Calendar
        className={cn(
          "size-4",
          disabled ? "text-[#d1d5db]" : isFilled ? "text-[#3B5AA6]" : "text-[#6b7280]"
        )}
      />

      <Select
        disabled={disabled}
        value={value}
        onValueChange={(val) => onChange?.(val)}
      >
        <SelectTrigger
          className={cn(
            "h-full border-none p-0 bg-transparent text-sm text-left flex-1",
            "focus:ring-0 focus:ring-offset-0",
            disabled ? "cursor-not-allowed text-[#9ca3af]" : ""
          )}
        >
          <SelectValue placeholder="Filter type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="type">Type</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>

      {isFilled && !disabled && (
        <button
          onClick={onClear}
          className="text-[#3B5AA6] hover:text-[#324d91] transition-colors"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
