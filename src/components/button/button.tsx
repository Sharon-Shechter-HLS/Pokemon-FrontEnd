import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define Tailwind utility classes for sizes
const sizeSmall = "h-[32px] px-3 py-1.5 text-sm";
const sizeMedium = "h-[36px] px-4 py-2 text-base";
const sizeLarge = "h-[40px] px-6 py-3 text-lg";

// Define variant styles using theme classes from App.css
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-300 text-white shadow-xs hover:bg-primary-400 active:bg-primary-500 disabled:bg-primary-50",
        secondary:
          "bg-primary-50 text-primary-500 shadow-xs hover:bg-primary-100 active:bg-primary-200 disabled:text-gray-400 disabled:bg-gray-100",
      },
      size: {
        sm: sizeSmall,
        md: sizeMedium,
        lg: sizeLarge,
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Button props type
type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

// Button component
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
