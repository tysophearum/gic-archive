import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Skeleton
} from "@nextui-org/react";

const TableLoading = () => {
  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        topContent={
          <>
            <Skeleton className="w-56 rounded-lg">
              <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </>
        }
        bottomContent={
          <div className="flex">
            <Pagination
              shadow
              showControls />
            <label className="flex items-center text-default-400 text-small ml-3">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        }
      >
        <TableHeader columns="{columns}">
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-10 rounded-lg">
                <div className="h-full w-3/5 rounded-fiull bg-default-200"></div>
              </Skeleton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-10 rounded-lg">
                <div className="h-full w-3/5 rounded-fiull bg-default-200"></div>
              </Skeleton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-10 rounded-lg">
                <div className="h-full w-3/5 rounded-fiull bg-default-200"></div>
              </Skeleton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default TableLoading;