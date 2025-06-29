import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PaginationControl from "@/components/Pagination/Pagination"
import type { ReactNode } from "react"

export type Column<T> = {
  header: string
  accessor?: keyof T
  render?: (row: T) => ReactNode
  width?: string
  className?: string
}

export type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  caption?: string
  onRowClick?: (row: T) => void
  rowKey?: (row: T, index: number) => string | number
  rowsPerPageOptions?: number[]
  defaultRowsPerPage?: number
}

export default function  DataTable<T>({
  data,
  columns,
  caption,
  onRowClick,
  rowKey = (_, i) => i,
  rowsPerPageOptions = [5, 10, 20],
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const totalItems = data.length
  const from = (currentPage - 1) * rowsPerPage
  const to = Math.min(currentPage * rowsPerPage, totalItems)
  const pageSlice = data.slice(from, to)

  const getCellContent = (row: T, col: Column<T>): ReactNode => {
    if (col.render) return col.render(row)
    if (col.accessor) return String(row[col.accessor])
    return null
  }

  return (
    <div className="w-full max-w-[1376px] border rounded-[8px] overflow-hidden bg-white">
      <div className="overflow-x-auto h-full">
        <Table className="min-w-full">
          {caption && <TableCaption>{caption}</TableCaption>}

          <TableHeader>
            <TableRow className="h-[72px] border-b bg-[#EBEFF6]">
              {columns.map((col) => (
                <TableHead
                  key={col.header}
                  className={`px-4 py-4 ${col.width ?? ""}`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageSlice.length === 0 ? (
              <TableRow className="h-[72px] border-b bg-white">
                <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              pageSlice.map((row, index) => (
                <TableRow
                  key={rowKey(row, index)}
                  onClick={() => onRowClick?.(row)}
                  className="h-[72px] border-b bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col) => (
                    <TableCell
                      key={col.header}
                      className={`px-4 py-4 ${col.className ?? ""}`}
                    >
                      {getCellContent(row, col)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <PaginationControl
                  currentPage={currentPage}
                  totalItems={totalItems}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  onChangePage={setCurrentPage}
                  onChangeRowsPerPage={(newRows) => {
                    setRowsPerPage(newRows)
                    setCurrentPage(1)
                  }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
