import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

type PaginationProps = {
  currentPage: number
  totalItems: number
  rowsPerPage?: number 
  rowsPerPageOptions?: number[] 
  onChangePage?: (newPage: number) => void 
  onChangeRowsPerPage?: (newRows: number) => void 
}

export default function PaginationControl({
  currentPage,
  totalItems,
  rowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 20],
  onChangePage = () => {},
  onChangeRowsPerPage = () => {},
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const from = (currentPage - 1) * rowsPerPage + 1
  const to = Math.min(currentPage * rowsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 text-[12px]">
      {/* Left: Rows per page dropdown */}
      <div className="flex items-center gap-2">
        <span>Rows per page:</span>
        <select
          className="rounded px-2 py-1 bg-white text-[#1A1A1A] text-[12px]"
          value={rowsPerPage}
          onChange={(e) => {
            onChangeRowsPerPage?.(Number(e.target.value))
            onChangePage?.(1)
          }}
        >
          {rowsPerPageOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Right: Page info + arrows */}
      <div className="flex items-center gap-1">
        <span>{`${from}–${to} of ${totalItems} items`}</span>
        <Pagination className="m-0">
          <PaginationContent className="w-[68px] h-[24px] gap-[2px]">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onChangePage?.(Math.max(1, currentPage - 1))
                }}
                className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onChangePage?.(Math.min(totalPages, currentPage + 1))
                }}
                className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
