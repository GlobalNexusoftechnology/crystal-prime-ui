import { ITableRowProps } from "@/constants"; // Adjust this path if needed
import { getStatusBadge } from "@/utils";     // Utility function for status badge color
import { FiMoreVertical } from "react-icons/fi";

export function TableRow<T extends { id: string | number; status?: string }>(
  {
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
  }
) {
  const isOpen = openActionId === row.id;
  const statusClass = row.status ? getStatusBadge(row.status) : "";

  return (
    <tr className="border-t 2xl:border-[0.1vw] border-gray-200 hover:bg-gray-50 relative">
      <td className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] font-medium text-gray-700">
        {String(index + 1).padStart(3, "0")}
      </td>
      {columns.map((col, index) => (
        <td key={index} className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] text-gray-700">
          {col.accessor === "status_id" && row.status ? (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
              {row.status}
            </span>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (row as any)[col.accessor]
          )}
        </td>
      ))}

      {actions.length > 0 && (
        <td className="p-3 2xl:p-[0.75vw] relative">
          <button
            onClick={() =>
              setOpenActionId(isOpen ? null : row.id)
            }
            className="p-1 2xl:p-[0.25vw] rounded hover:bg-gray-200"
          >
            <FiMoreVertical className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
          </button>

          {isOpen && (
            <div className="absolute right-[60%] top-[70%] bg-white shadow-lg z-50 rounded 2xl:rounded-[0.25vw] border 2xl:border-[0.1vw] w-32 2xl:w-[10vw]">
              {actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  className={`block w-full px-4 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left hover:bg-gray-100 ${action.className || ""}`}
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
