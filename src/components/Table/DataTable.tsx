import React from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table"

type Column<T> = {
  header: string
  key?: keyof T
  render?: (row: T) => React.ReactNode
  className?: string
}

type GenericTableProps<T> = {
  columns: Column<T>[]
  rows: T[]
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  rowsPerPageOptions?: number[]
  loading?: boolean
}

export function DataTable<T>({
  columns,
  rows,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  rowsPerPageOptions = [5, 10, 20],
  loading = false,
}: GenericTableProps<T>) {
  return (
    <Table className="rounded-md overflow-hidden border border-gray-200">
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.header} className={`px-4 ${col.className || ""}`}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No items found
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.header} className={`px-4 ${col.className || ""}`}>
                  {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "N/A")}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
      {total > 0 && (
        <TableFooter
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      )}
    </Table>
  )
}