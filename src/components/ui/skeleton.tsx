import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-primary-100 animate-breathing rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
