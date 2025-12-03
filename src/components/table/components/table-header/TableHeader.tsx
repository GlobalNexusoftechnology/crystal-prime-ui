import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export function TableHeader<T>({ column, sortBy, sortOrder, onSort }: any) {
  const isSorted = sortBy === column.accessor;

  return (
    <th
      className={`text-center p-3  bg-gray-200 whitespace-nowrap border-r border-gray-300 ${
        column.sortable ? "cursor-pointer" : ""
      } ${column.headerClassName || ""}`}
      onClick={() => column.sortable && onSort(column?.accessor)}
    >
      <div className="flex justify-center items-center text-[0.9rem]   gap-4  whitespace-nowrap">
        <h1>{column.header}</h1>
        {column.sortable && (
          <div>
            {isSorted ? (
              sortOrder === "asc" ? (
                <IoIosArrowUp className="w-4 h-4  " />
              ) : (
                <IoIosArrowDown className="w-4 h-4  " />
              )
            ) : (
              <IoIosArrowDown className="w-4 h-4  " />
            )}
          </div>
        )}
      </div>
    </th>
  );
}
