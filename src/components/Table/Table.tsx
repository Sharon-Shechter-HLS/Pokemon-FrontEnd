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
import type { Column } from "@/components/Table/Types"
import type { ReactNode } from "react"
import type { PaginationState } from "@/components/Table/Types"

export type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[] 
  caption?: string
  onRowClick?: (row: T) => void
  rowKey?: (row: T, index: number) => string | number
  rowsPerPageOptions?: number[]
  defaultRowsPerPage?: number
  enablePagination?: boolean
  currentPage?: number // Add this property
  rowsPerPage?: number // Add this property
  onChangePage?: (page: number) => void // Add this property
  onChangeRowsPerPage?: (rowsPerPage: number) => void // Add this property
}

export default function DataTable<T>({
  data,
  columns,
  caption,
  onRowClick = undefined,
  rowKey = (_, i) => i,
  rowsPerPageOptions = [5, 10, 20],
  defaultRowsPerPage = 10,
  enablePagination = true
}: DataTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    rowsPerPage: defaultRowsPerPage,
  })

  const { currentPage, rowsPerPage } = pagination
  const totalItems = data.length
  const from = (currentPage - 1) * rowsPerPage
  const to = Math.min(currentPage * rowsPerPage, totalItems)
  const pageSlice = data.slice(from, to)

  const getCellContent = (row: T, col: Column<T>): ReactNode => {
    if (col.render) return col.render(row)
    if (col.key) return String((row as any)[col.key])
    return null
  }

  return (
    <div className="w-full max-w-[1376px] border rounded-[8px]">
      <Table className="min-w-full">
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow className="h-[72px] border-b bg-primary-50">
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
            <TableRow className="h-72px border-b bg-white">
              <TableCell colSpan={columns.length} className="text-center text-muted-foreground">
                No items found
              </TableCell>
            </TableRow>
          ) : (
            pageSlice.map((row, index) => (
              <TableRow
                key={rowKey(row, index)}
                onClick={() => onRowClick?.(row)}
                className="h-72px border-b bg-white cursor-pointer hover:bg-gray-50 transition-colors"
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
          {enablePagination && (
        <TableFooter className="bg-white">
          <TableRow>
            <TableCell colSpan={columns.length}>
              <PaginationControl
                currentPage={currentPage}
                totalItems={totalItems}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                onChangePage={(newPage) =>
                  setPagination((prev) => ({ ...prev, currentPage: newPage }))
                }
                onChangeRowsPerPage={(newRows) =>
                  setPagination({
                    currentPage: 1,
                    rowsPerPage: newRows,
                  })
                }
              />
            </TableCell>
          </TableRow>
        </TableFooter>
          )}
      </Table>
    </div>
  )
}
