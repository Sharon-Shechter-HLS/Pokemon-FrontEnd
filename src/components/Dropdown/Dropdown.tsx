import { useState } from "react"
import Input from "../Input /Input"

type DropdownOption<T> = {
  label: string
  value: T
  icon?: string
}

type DropdownProps<T> = {
  options: DropdownOption<T>[]
  value?: T
  onChange: (value: T) => void
  placeholder?: string
}

  export default function Dropdown<T>({
  options,
  value,
  onChange,
  placeholder = "Select option",
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative inline-block">
      <button
        className="w-[195px] h-[40px] rounded-[8px] border border-[#3B5AA6] px-[8px] pr-[6px] py-[9px] text-left text-[#1c1e21] text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}
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
                onClick={() => {
                  setSearch("")
                  setIsOpen(false)
                  onChange(option.value)
                }}
                className="flex items-center justify-between w-[206px] h-[42px] px-[8px] py-[8px] hover:bg-[#f5f5f5] rounded cursor-pointer overflow-hidden"
              >
                <div className="flex items-center gap-[8px] overflow-hidden">
                  {option.icon && (
                    <div className="w-[25px] h-[24px] rounded-full bg-[#EBEFF6]/60 flex items-center justify-center">
                      <img
                        src={option.icon}
                        alt={option.label}
                        className="w-[20px] h-[20px] object-contain"
                      />
                    </div>
                  )}
                  <span className="text-sm text-[#1c1e21] truncate max-w-[100px]">
                    {option.label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
