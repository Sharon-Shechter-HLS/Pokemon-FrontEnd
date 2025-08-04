import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { NoResults } from "../../assets/NoResults";

type Column<T> = {
  header: string;
  accessor: (item: T) => React.ReactNode;
  width?: string; 
};

type DataTableProps<T extends { id: string | number }> = {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  page: number;
  pageSize: number;
  total: number;
  rowRenderer?: (item: T) => React.ReactNode;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  rowsPerPageOptions?: number[];
};

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  page,
  pageSize,
  total,
  rowRenderer,
  onPageChange,
  onPageSizeChange,
  rowsPerPageOptions = [5, 10, 20],
}: DataTableProps<T>) {
  return (
    <Table className="rounded-md overflow-hidden border border-gray-200">
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              key={index}
              className="px-4 text-left font-bold"
              style={{
                width: column.width,
                paddingLeft: column.header === "Pokemon Name" ? "75px" : undefined,
              }}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: pageSize }).map((_, index) => (
            <TableRow key={index}>
              {/* Skeleton for Pokemon Name */}
              <TableCell className="px-4 text-left text-lg flex items-center justify-begin gap-4" style={{ width: "200px" }}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-5 w-5" />
                </div>
              </TableCell>

              {/* Skeleton for ID */}
              <TableCell className="px-4 text-left" style={{ width: "100px" }}>
                <Skeleton className="h-4 w-[50px]" />
              </TableCell>

              {/* Skeleton for Description */}
              <TableCell className="px-4 max-w-[544px] truncate whitespace-nowrap overflow-hidden text-left">
                <Skeleton className="h-4 w-[300px]" />
              </TableCell>

              {/* Skeleton for Power Level */}
              <TableCell className="px-4 text-left" style={{ width: "150px" }}>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>

              {/* Skeleton for HP */}
              <TableCell className="px-4 text-left" style={{ width: "150px" }}>
                <Skeleton className="h-4 w-[80px]" />
              </TableCell>
            </TableRow>
          ))
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              <NoResults message="No Pokemons were found" />
            </TableCell>
          </TableRow>
        ) : rowRenderer ? (
          data.map((item) => (
            <React.Fragment key={item.id}>{rowRenderer(item)}</React.Fragment>
          ))
        ) : (
          data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className="px-4"
                  style={{ width: column.width }} 
                >
                  {column.accessor(item)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Table>
  );
}