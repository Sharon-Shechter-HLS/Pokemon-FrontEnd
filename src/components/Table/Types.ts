
export type Column<T> = {
  header: string
  key?: keyof T
  render?: (row: T) => React.ReactNode
  width?: string
  className?: string
}


export type PaginationState = {
  currentPage: number
  rowsPerPage: number
}