"use client";

import { ITableProps } from "@/constants";
import { useState, useMemo } from "react";
import { Pagination, TableHeader, TableRow } from "./components";

export function Table<T extends { id: string | number }>({
  data,
  columns,
  pageSize = 10,
  actions,
}: ITableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [openActionId, setOpenActionId] = useState<string | number | null>(
    null
  );

  const handleSort = (accessor: keyof T) => {
    if (sortBy === accessor) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(accessor);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortBy, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="p-4 2xl:p-[1vw]">
      <div className="overflow-auto border bg-white 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
        <table className="w-full text-sm 2xl:text-[0.875vw] text-left border-gray-200">
          <thead className="text-gray-700">
            <tr>
              <th className="min-w-[5rem] p-3 2xl:p-[0.75vw] text-left 2xl:text-[1vw]">
                Sr No
              </th>
              {columns.map((col) => (
                <TableHeader
                  key={String(col.accessor)}
                  column={col}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              ))}
              <th className="min-w-[6rem] p-3 2xl:p-[0.75vw] text-left 2xl:text-[1vw]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <TableRow
                key={idx}
                row={row}
                columns={columns}
                actions={actions}
                index={idx}
                openActionId={openActionId}
                setOpenActionId={setOpenActionId}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / pageSize)}
        onPageChange={(page) => {
          setOpenActionId(null); 
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
