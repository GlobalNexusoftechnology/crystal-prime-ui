import { useEffect, useRef } from "react";
import { ITableColumn, ITableRowProps } from "@/constants"; // Adjust path if needed
import { getInitials, getRandomColor, getColorForStatus } from "@/utils";
import { FiMoreVertical } from "react-icons/fi";

export function TableRow<
  T extends { id: string | number; assigned_to?: string }
>({
  row,
  columns,
  actions = [],
  openActionId,
  setOpenActionId,
  index,
}: ITableRowProps<T> & {
  index: number;
  openActionId: string | number | null;
  setOpenActionId: (id: string | number | null) => void;
}) {
  const isOpen = openActionId === row.id;

  const actionRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenActionId(null);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setOpenActionId]);

  return (
    <tr className="border-t 2xl:border-[0.1vw] border-gray-200 hover:bg-gray-50 relative">
      <td className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] font-medium text-gray-700">
        {String(index + 1).padStart(1, "0")}
      </td>

      {columns.map((col, index) => (
        <TableCell key={index} row={row} col={col} index={index} />
      ))}

      {actions.length > 0 && (
        <td className="p-3 2xl:p-[0.75vw] relative">
          <button
            ref={buttonRef}
            onClick={() => setOpenActionId(isOpen ? null : row.id)}
            className="p-1 2xl:p-[0.25vw] rounded hover:bg-gray-200"
          >
            <FiMoreVertical className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
          </button>

          {isOpen && (
            <div
              ref={actionRef}
              className={`right-[95%] top-[-40%] absolute bg-white shadow-lg z-50 rounded 2xl:rounded-[0.25vw] border 2xl:border-[0.1vw] w-fit min-w-[8rem] 2xl:min-w-[8vw]`}
            >
              {actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  className={`block w-full px-4 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] 2xl:px-[1vw] py-1 2xl:py-[0.25vw] text-left hover:bg-gray-100 ${
                    action.className || ""
                  }`}
                  onClick={() => {
                    setOpenActionId(null);
                    action.onClick(row);
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </td>
      )}
    </tr>
  );
}

type TableCellProps<T extends { id: string | number }> = {
  row: T;
  col: ITableColumn<T>;
  index: number;
};

export function TableCell<T extends { id: string | number }>({
  row,
  col,
  index,
}: TableCellProps<T>) {
  const value = row[col.accessor];
  const initials = getInitials(value as string);
  const isAssignedTo = col.accessor === "assigned_to";
  const isStatusColumn = col.accessor === "status_id";
  const randomColor = getRandomColor(value as string);
  const statusColor = getColorForStatus(value as string);

  return (
    <td
      key={index}
      className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] text-gray-700"
    >
      {isAssignedTo && typeof value === "string" ? (
        <div className="flex items-center gap-2">
          <p
            className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full"
            style={{ backgroundColor: randomColor }}
          >
            {initials}
          </p>
          <p className="px-3 py-1 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw]">
            {value}
          </p>
        </div>
      ) : isStatusColumn && typeof value === "string" ? (
        <span
          className="inline-block px-4 2xl:px-[1vw] py-1 2xl:py-[0.25vw] rounded-full text-white text-[0.8rem] 2xl:text-[0.8vw]"
          style={{ backgroundColor: statusColor }}
        >
          {value}
        </span>
      ) : col.cell ? (
        col.cell({ row, value })
      ) : (
        value as React.ReactNode
      )}
    </td>
  );
}
