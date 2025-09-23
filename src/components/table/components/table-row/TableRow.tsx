import { ITableColumn, ITableRowProps } from "@/constants"; // Adjust path if needed
import { getInitials, getRandomColor } from "@/utils";
import { ActionDropdown } from "@/components/action-dropdown";

export function TableRow<
  T extends { id: string | number; assigned_to?: string }
>({
  row,
  columns,
  actions = [],
  index,
}: ITableRowProps<T> & {
  index: number;
}) {

  return (
    <tr className="border-t 2xl:border-[0.05vw] border-gray-200 hover:bg-gray-50 relative whitespace-nowrap">
      <td className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] font-medium text-gray-700 text-center border-r border-gray-200 capitalize">
        {String(index + 1).padStart(1, "0")}
      </td>
      {actions.length > 0 && (
        <td className="p-3 2xl:p-[0.75vw] relative text-center border-r border-gray-200 capitalize">
          <ActionDropdown
            options={actions.map(action => ({
              label: action.label,
              onClick: () => action.onClick(row),
              className: action.className
            }))}
            direction="bottom"
          />
        </td>
      )}
      {columns.length > 0 && columns.map((col, index) => (
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
  const isAssignedTo = col.accessor === "assigned_to";
  const isStatusColumn = col.accessor === "status_id" || col.accessor === "status";
  const isEmailColumn = col.accessor === "email";
  const isPhoneColumn = col.accessor === "clientNumber" || col.accessor === "phone" || col.accessor === "mobile" || col.accessor === "number" || col.accessor === "contact_number" || col.accessor === "other_contact";
  const isColorColumn = col.accessor === "color";
  const isPriorityColumn = col.accessor === "priority";
  const isTypeColumn = col.accessor === "type";
  const getStatusColor = (statusValue: string) => {
    const statusLower = statusValue.toLowerCase();
    switch (statusLower) {
      case "pending":
        return "#fbbf24"; // yellow
      case "in progress":
      case "in_progress":
        return "#3b82f6"; // blue
      case "completed":
        return "#10b981"; // green
      case "open":
        return "#f59e0b"; // amber
      case "closed":
        return "#6b7280"; // gray
      default:
        return "#888888"; // default gray
    }
  };
  
  const statusColor = isStatusColumn && typeof value === 'string' 
    ? getStatusColor(value) 
    : (row as { color?: string })?.color || '#888888';

  const getCellBackgroundColor = () => {
    if (isStatusColumn) {
      // Use the status_color from row data if available, otherwise fallback to calculated color
      return (row as { status_color?: string })?.status_color || getStatusColor(String(value));
    }
    if (isPriorityColumn && typeof value === 'string') {
      const priority = value.toLowerCase();
      switch (priority) {
        case 'high':
          return '#fef2f2'; // light red
        case 'medium':
          return '#fffbeb'; // light yellow
        case 'low':
          return '#f0fdf4'; // light green
        default:
          return 'transparent';
      }
    }
    if (isTypeColumn && typeof value === 'string') {
      return '#f8fafc'; // light gray
    }
    return 'transparent';
  };

  const renderEmailCell = (emailValue: unknown) => {
    if (emailValue === null || emailValue === undefined) {
      return <span className="text-gray-500 2xl:text-[0.9vw]">N/A</span>;
    }
    if (Array.isArray(emailValue)) {
      return (
        <div className="flex flex-col gap-1">
          {emailValue.length > 0 && emailValue.map((email, idx) => (
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
        {emails.length > 0 && emails.map((email, idx) => (
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

  const renderPhoneCell = (phoneValue: unknown) => {
    if (phoneValue === null || phoneValue === undefined) {
      return <span className="text-gray-500 2xl:text-[0.9vw]">N/A</span>;
    }
    if (Array.isArray(phoneValue)) {
      return (
        <div className="flex flex-col gap-1">
          {phoneValue.length > 0 && phoneValue.map((phone, idx) => (
            <a 
              key={idx}
              href={`tel:${String(phone)}`}
              className="text-[0.9rem] 2xl:text-[0.9vw] text-blue-600 hover:text-blue-800 hover:underline underline cursor-pointer transition-colors duration-200"
              style={{ textDecoration: 'underline' }}
            >
              {String(phone)}
            </a>
          ))}
        </div>
      );
    }
    
    const phones = String(phoneValue)
      .split(/,\s*/)  // Split by comma followed by optional whitespace
      .map(phone => phone.trim())
      .filter(Boolean);
      
    return (
      <div className="flex flex-col gap-1">
        {phones.length > 0 && phones.map((phone, idx) => (
          <a 
            key={idx}
            href={`tel:${phone}`}
            className="text-[0.9rem] 2xl:text-[0.9vw] text-blue-600 hover:text-blue-800 hover:underline underline cursor-pointer transition-colors duration-200"
            style={{ textDecoration: 'underline' }}
          >
            {phone}
          </a>
        ))}
      </div>
    );
  };

  return (
    <td
      key={index}
      className={`text-center p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] text-gray-700 border-r border-gray-200 ${
        isEmailColumn || isPhoneColumn ? '' : 'capitalize'
      }`}
      style={{ backgroundColor: getCellBackgroundColor() }}
    >
      {col.cell ? (
        col.cell({ row, value })
      ) : isAssignedTo ? (
        value && typeof value === "object" ? (
          (() => {
            const user = value as { first_name?: string; last_name?: string; email?: string };
            const firstName = (user.first_name || "").trim();
            const lastName = (user.last_name || "").trim();
            const fullName = [firstName, lastName].filter(Boolean).join(" ");
            if (!fullName) {
              return (
                <span className="text-gray-500 text-[0.9rem] 2xl:text-[0.9vw]">N/A</span>
              );
            }
            const avatarInitials = getInitials(fullName);
            const avatarColor = getRandomColor(fullName);
            return (
              <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                <p
                  className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full"
                  style={{ backgroundColor: avatarColor }}
                >
                  {avatarInitials}
                </p>
                <p className="px-3 py-1 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw]">
                  {fullName}
                </p>
              </div>
            );
          })()
        ) : value && typeof value === "string" ? (
          (() => {
            const text = String(value).trim();
            const lower = text.toLowerCase();
            const isInvalid = !text || lower === "undefined" || lower === "null" || lower === "undefined undefined";
            if (isInvalid) {
              return <span className="text-gray-900 text-[0.9rem] 2xl:text-[0.9vw]">N/A</span>;
            }
            const avatarInitials = getInitials(text);
            const avatarColor = getRandomColor(text);
            return (
              <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                <p
                  className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full"
                  style={{ backgroundColor: avatarColor }}
                >
                  {avatarInitials}
                </p>
                <p className="px-3 py-1 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw]">
                  {text}
                </p>
              </div>
            );
          })()
        ) : (
          <span className="text-gray-500 text-[0.9rem] 2xl:text-[0.9vw]">N/A</span>
        )
      ) : isStatusColumn && typeof value === "string" ? (
        <span
          className="inline-block px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-white text-[0.8rem] 2xl:text-[0.8vw] font-medium shadow-sm"
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
      ) : isPhoneColumn ? (
        renderPhoneCell(value)
      ) : value === null || value === undefined ? (
        <span className="text-gray-500 2xl:text:[0.9vw]">N/A</span>
      ) : (
        (value as React.ReactNode)
      )}
    </td>
  );
}
