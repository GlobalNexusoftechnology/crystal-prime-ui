import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { ITableHeaderProps } from "@/constants";

export function TableHeader<T>({
  column,
  sortBy,
  sortOrder,
  onSort,
}: ITableHeaderProps<T>) {
  const isSorted = sortBy === column.accessor;

  return (
    <th
      className={`p-3 2xl:p-[0.75vw] ${column.sortable ? "cursor-pointer" : ""} ${column.headerClassName || ""}`}
      onClick={() => column.sortable && onSort(column?.accessor)}
    >
      <div className="flex items-center text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] gap-4 2xl:gap-[1vw]">
        <h1>{column.header}</h1>
        <div>
          {column.sortable &&
            (isSorted ? (
              sortOrder === "asc" ? (
                <IoIosArrowUp className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
              ) : (
                <IoIosArrowDown className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
              )
            ) : (
              <IoIosArrowDown className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
            ))}
        </div>
      </div>
    </th>
  );
}
