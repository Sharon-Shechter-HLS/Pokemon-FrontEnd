import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

function Input({
  value,
  onChange,
  placeholder = "Search",
  disabled,
  className,
}: InputProps) {
  return (
    <div className={cn("relative w-[293px] h-[38px]", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4 pointer-events-none" />

      {value && (
        <button
          type="button"
          onClick={() =>
            onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
          }
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
          "w-full h-full pl-10 pr-10 py-2 text-sm rounded-[8px] border outline-none transition-all",
          "bg-background text-foreground border-input",
          "hover:border-border focus:border-primary-300",
          "disabled:text-muted-foreground disabled:bg-muted disabled:border-muted"
        )}
      />
    </div>
  );
}

export default Input;
