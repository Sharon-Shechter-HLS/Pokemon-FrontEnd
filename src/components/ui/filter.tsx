import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropDown";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FiX } from "react-icons/fi";

type FilterOption = {
  label: React.ReactNode;
  value: string;
};

type FilterProps = {
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean; 
  className?: string; 
};

export function Filter({
  options = [],
  value,
  onChange,
  label = "Filter",
  icon,
  disabled = false, 
  className,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const safeOptions = Array.isArray(options) ? options : [];
  const selected = safeOptions.find((opt) => opt.value === value);

  const isSelected = !!selected;
  const buttonClass = isSelected
    ? "bg-[var(--color-primary-50)] text-[var(--color-primary-300)]"
    : "";

  return (
    <DropdownMenu open={isOpen && !disabled} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="h-9" asChild>
        <Button
          className={`${buttonClass} relative ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${className}`}
          disabled={disabled} 
        >
          <span className="flex items-center pointer-events-none">
            {icon}
            {selected ? selected.label : label}
            {isSelected && !disabled && ( 
              <span
                className="ml-2 cursor-pointer pointer-events-auto"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChange(null);
                }}
                title="Clear filter"
                tabIndex={0}
                role="button"
                aria-label="Clear filter"
              >
                <FiX size={16} /> 
              </span>
            )}
            {isOpen ? (
              <ChevronUp size={16} className="ml-2" />
            ) : (
              <ChevronDown size={16} className="ml-2" />
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      {!disabled && ( 
        <DropdownMenuContent>
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {safeOptions.map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              onSelect={() => onChange(opt.value)}
              className={value === opt.value ? "font-bold" : ""}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}