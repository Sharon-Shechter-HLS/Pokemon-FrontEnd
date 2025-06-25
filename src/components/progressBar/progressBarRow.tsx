type ProgressBarRowProps = {
  value: number
  color?: "green" | "yellow" | "red" | "gray"
}

const colorMap = {
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
  gray: "bg-zinc-600",
}

export function ProgressBarRow({ value, color = "gray" }: ProgressBarRowProps) {
  return (
    <div className="h-3 w-full rounded-full bg-zinc-600 overflow-hidden">
      <div
        className={`h-full transition-all ${colorMap[color]}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
