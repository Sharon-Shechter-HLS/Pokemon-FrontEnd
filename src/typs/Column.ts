import type { ReactNode } from "react"
export type Column<T> = {
  header: string
  accessor?: keyof T
  render?: (row: T) => ReactNode
  width?: string
  className?: string
}