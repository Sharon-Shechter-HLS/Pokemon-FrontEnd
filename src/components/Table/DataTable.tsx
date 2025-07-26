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

type Column<T> = {
  header: string;
  accessor: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
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

export function DataTable<T>({
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
            <TableHead key={index} className="px-4 text-left">
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No results
            </TableCell>
          </TableRow>
        ) : rowRenderer ? (
          data.map((item, index) => <React.Fragment key={index}>{rowRenderer(item)}</React.Fragment>)
        ) : (
          data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className="px-4">
                  {column.accessor(item)}so 
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