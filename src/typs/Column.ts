import type { ReactNode } from "react"

export type Column<T> = {
  header: string
  key?: keyof T       
  render?: (row: T) => ReactNode
  width?: string
  className?: string
}
