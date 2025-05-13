import { ITableRowProps } from "@/constants";
import { FiMoreVertical } from "react-icons/fi";

export function TableRow<T extends { id: string | number }>({
  row,
  columns,
  actions = [],
  openActionId,
  setOpenActionId,
  index,
}: ITableRowProps<T> & {
  index: number,
  openActionId: string | number | null;
  setOpenActionId: (id: string | number | null) => void;
}) {
  const isOpen = openActionId === row.id;

  return (
    <tr className="border-t 2xl:border-[0.1vw] border-gray-200 hover:bg-gray-50 relative">
      <td className="p-3 2xl:p-[0.75vw] font-medium text-gray-700">{String(index + 1).padStart(3, "0")}</td>
      {columns.map((col) => (
        <td key={String(col.accessor)} className="p-3">
          {String(row[col.accessor])}
        </td>
      ))}

      {actions.length > 0 && (
        <td className="p-3 2xl:p-[0.75vw] relative">
          <button
            onClick={() =>
              setOpenActionId(isOpen ? null : (row.id as string | number))
            }
            className="p-1 2xl:p-[0.25vw] rounded hover:bg-gray-200"
          >
            <FiMoreVertical className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
          </button>

          {isOpen && (
            <div className="absolute right-[90%] top-[80%] bg-white shadow-lg rounded border z-10 w-32 2xl:w-[8vw]">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`block w-full px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left hover:bg-gray-100 ${
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
