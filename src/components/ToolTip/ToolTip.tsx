import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ReactNode } from "react"
type DescriptionTooltipProps = {
  content: string
  children: ReactNode
}

export default function DescriptionTooltip({
  content,
  children,
}: DescriptionTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-md"
>
        {<p className="max-w-[300px] text-s">{content}</p>}
      </TooltipContent>
    </Tooltip>
  )
}
