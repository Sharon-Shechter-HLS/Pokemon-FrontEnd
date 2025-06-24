import { useState } from "react"
import Input from "../Input /Input"

export type DropdownProps<T> = {
  options: T[]
  getLabel: (option: T) => string
  getIcon?: (option: T) => string
  getValue?: (option: T) => string | number
  onSelect?: (option: T) => void
  placeholder?: string
}

export default function Dropdown<T>({
  options,
  getLabel,
  getIcon,
  getValue,
  onSelect,
  placeholder = "Select option",
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedOption, setSelectedOption] = useState<T | null>(null)

  const filteredOptions = options.filter((option) =>
    getLabel(option).toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (option: T) => {
    setSelectedOption(option)
    setSearch("")
    setIsOpen(false)
    onSelect?.(option)
  }

  return (
    <div className="relative inline-block">
      <button
        className="w-[195px] h-[40px] rounded-[8px] border border-[#3B5AA6] px-[8px] pr-[6px] py-[9px] text-left text-[#1c1e21] text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? getLabel(selectedOption) : placeholder}
      </button>

      {isOpen && (
        <div className="absolute top-[46px] z-10 w-[222px] h-[264px] rounded-[4px] bg-white p-[8px] shadow-md overflow-y-auto">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-[206px] h-[38px]"
          />

          <ul className="space-y-[4px]">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="flex items-center justify-between w-[206px] h-[42px] px-[8px] py-[8px] hover:bg-[#f5f5f5] rounded cursor-pointer overflow-hidden"
              >
                <div className="flex items-center gap-[8px] overflow-hidden">
                  {getIcon && (
                    <div className="w-[25px] h-[24px] rounded-full bg-[#EBEFF6]/60 flex items-center justify-center">
                      <img
                        src={getIcon(option)}
                        alt={getLabel(option)}
                        className="w-[20px] h-[20px] object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm text-[#1c1e21] truncate max-w-[100px]">
                    {getLabel(option)}
                  </span>
                </div>
                {getValue && (
                  <span className="text-sm text-[#1c1e21] font-medium">
                    {getValue(option)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
