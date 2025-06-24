import { useState } from "react"
import Input from  "../Input /Input"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type Option = {
  name: string
  image: string
  value: number
}

type Props = {
  options: Option[]
  label?: string
  placeholder?: string
}

export default function PokemonDropdown({ options, label = "Open drop down", placeholder = "Input content" }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Option | null>(null)

  const filtered = options.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative w-[293px]">
      {/* Label */}
      <label className="block mb-1 text-sm font-medium text-[#1C1E21]">
        {label}
      </label>

      {/* Selector */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full h-[38px] px-3 py-2 text-sm border rounded-[8px] text-left flex items-center justify-between",
          "border-[#929AA3] text-[#1C1E21]",
          "hover:border-[#6b7280] focus:outline-none focus:border-[#3B5AA6]"
        )}
      >
        {selected ? selected.name : placeholder}
        <ChevronDown className="ml-2 size-4 text-[#929AA3]" />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-md rounded-[8px] z-10 p-3">
          {/* Search */}
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />

          {/* Option List */}
          <ul className="mt-2 max-h-[200px] overflow-y-auto">
            {filtered.length === 0 && (
              <li className="text-sm text-muted-foreground px-2 py-1">No results</li>
            )}
            {filtered.map((option) => (
              <li
                key={option.name + option.value}
                onClick={() => {
                  setSelected(option)
                  setIsOpen(false)
                }}
                className="flex items-center justify-between px-2 py-2 text-sm hover:bg-[#f5f5f5] rounded cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <img src={option.image} alt={option.name} className="w-6 h-6 rounded-full" />
                  <span>{option.name}</span>
                </div>
                <span className="text-xs text-[#1C1E21] font-medium">{option.value}px</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
