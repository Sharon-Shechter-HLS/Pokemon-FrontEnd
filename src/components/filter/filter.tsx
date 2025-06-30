import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Calendar, X } from "lucide-react";
import { cn } from "@/lib/utils";

type FilterOption<T> = {
  label: string;
  value: T;
};

type FilterProps<T> = {
  disabled?: boolean;
  value?: T;
  onChange?: (value: T | undefined) => void;
  placeholder?: string;
  options: FilterOption<T>[];
  getKey: (value: T) => string;
  renderLabel?: (value: T) => string;
};

export function Filter<T>({
  disabled = false,
  value,
  onChange,
  placeholder = "Filter type",
  options,
  getKey,
  renderLabel,
}: FilterProps<T>) {
  const isFilled = value !== undefined;
  const selectedKey = isFilled ? getKey(value!) : "";

  const keyToValueMap = new Map(options.map((opt) => [getKey(opt.value), opt.value]));
  const keyToLabelMap = new Map(options.map((opt) => [getKey(opt.value), opt.label]));

  return (
    <div
      className={cn(
        "h-[38px] px-3 py-2 rounded-[8px] border text-sm flex items-center gap-4 min-w-[140px] w-fit max-w-full",
        disabled
          ? "border-muted bg-muted text-muted-foreground cursor-not-allowed"
          : isFilled
          ? "bg-primary-50 border-primary-300 text-primary-500"
          : "border-muted-foreground hover:border-border"
      )}
    >
      <Calendar
        className={cn(
          "w-4 h-4 shrink-0",
          disabled
            ? "text-muted-foreground"
            : isFilled
            ? "text-primary-500"
            : "text-muted-foreground"
        )}
      />

      <div className="flex-1 min-w-0">
        <Select
          disabled={disabled}
          value={selectedKey}
          onValueChange={(key) => {
            const selected = keyToValueMap.get(key);
            onChange?.(selected);
          }}
        >
          <SelectTrigger
            className={cn(
              "w-full border-none p-0 bg-transparent text-sm text-left",
              "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              disabled ? "cursor-not-allowed text-muted-foreground" : ""
            )}
          >
            <SelectValue
              placeholder={placeholder}
              children={
                isFilled
                  ? renderLabel?.(value!) ?? keyToLabelMap.get(selectedKey)
                  : undefined
              }
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={getKey(opt.value)} value={getKey(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isFilled && !disabled && (
        <button
          onClick={() => onChange?.(undefined)}
          className="text-primary-500 hover:text-primary-400 transition-colors"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
