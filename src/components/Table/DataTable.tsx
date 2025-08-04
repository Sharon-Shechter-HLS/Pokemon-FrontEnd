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
  const isPaginationDisabled = data.length === 0 || total === 0;

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
            <TableRow key={index} style={{ height: "48px" }}>
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className="px-4 text-left"
                  style={{ width: column.width }}
                >
                  <Skeleton
                    className={
                      colIndex === 0
                        ? "h-12 w-12 rounded-full flex items-center gap-4"
                        : colIndex === 2
                        ? "h-4 w-[300px] truncate whitespace-nowrap overflow-hidden"
                        : "h-4 w-full"
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : data.length === 0 ? (
          <TableRow
            style={{
              height: `calc(var(--row-height, 48px) * ${pageSize})`,
              backgroundColor: "white",
            }}
          >
            <TableCell
              colSpan={columns.length}
              className="text-center"
              style={{
                backgroundColor: "white",
              }}
            >
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
        page={isPaginationDisabled ? 0 : page}
        pageSize={pageSize}
        total={isPaginationDisabled ? 0 : total}
        onPageChange={isPaginationDisabled ? undefined : onPageChange}
        onPageSizeChange={isPaginationDisabled ? undefined : onPageSizeChange}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Table>
  );
}