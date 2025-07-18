import { useEffect, useRef } from "react";
import { ITableColumn, ITableRowProps } from "@/constants"; // Adjust path if needed
import { getInitials, getRandomColor } from "@/utils";
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
    <tr className="border-t 2xl:border-[0.1vw] border-gray-200 hover:bg-gray-50 relative whitespace-nowrap">
      <td className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] font-medium text-gray-700">
        {String(index + 1).padStart(1, "0")}
      </td>
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
              className={`left-[45%] top-[50%] translate-y-[-70%]  absolute bg-white shadow-lg z-50 rounded 2xl:rounded-[0.25vw] border 2xl:border-[0.1vw] w-fit min-w-[8rem] 2xl:min-w-[8vw]`}
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
      {columns.map((col, index) => (
        <TableCell key={index} row={row} col={col} index={index} />
      ))}
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
  const initials = typeof value === 'string' ? getInitials(value) : '';
  const isAssignedTo = col.accessor === "assigned_to";
  const isStatusColumn = col.accessor === "status_id";
  const isEmailColumn = col.accessor === "email";
  const isColorColumn = col.accessor === "color";
  const randomColor = typeof value === 'string' ? getRandomColor(value) : '#000000';
  const statusColor = isStatusColumn && (row as { color?: string })?.color ? String((row as { color?: string }).color) : '#888888';

  const renderEmailCell = (emailValue: unknown) => {
    if (Array.isArray(emailValue)) {
      return (
        <div className="flex flex-col gap-1">
          {emailValue.map((email, idx) => (
            <a 
              key={idx}
              href={`mailto:${String(email)}`}
              className="text-[0.9rem] 2xl:text-[0.9vw]"
            >
              {String(email)}
            </a>
          ))}
        </div>
      );
    }
    
    const emails = String(emailValue)
      .split(/,\s*/)  // Split by comma followed by optional whitespace
      .map(email => email.trim())
      .filter(Boolean);
      
    return (
      <div className="flex flex-col gap-1">
        {emails.map((email, idx) => (
          <a 
            key={idx}
            href={`mailto:${email}`}
            className="text-[0.9rem] 2xl:text-[0.9vw]"
          >
            {email}
          </a>
        ))}
      </div>
    );
  };

  return (
    <td
      key={index}
      className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] text-gray-700"
    >
      {col.cell ? (
        col.cell({ row, value })
      ) : isAssignedTo && typeof value === "string" ? (
        <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
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
      ) : isColorColumn ? (
        value ? (
          <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
            <span
              className="inline-block w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] rounded-full border border-gray-300"
              style={{ backgroundColor: String(value) }}
            />
            <span className="text-xs 2xl:text-[0.8vw]">{String(value)}</span>
          </div>
        ) : (
          <span className="text-gray-400 2xl:text-[1vw]">-</span>
        )
      ) : isEmailColumn ? (
        renderEmailCell(value)
      ) : (
        (value as React.ReactNode)
      )}
    </td>
  );
}
