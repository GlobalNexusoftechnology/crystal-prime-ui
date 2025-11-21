"use client";
import { Table } from "@/components";
import { useAllWorkRequestsQuery, IWorkRequest } from "@/services";
import { ITableColumn } from "@/constants/table";
import { WorkRequestStatusCell } from "./WorkRequestStatusCell";

export function WorkRequestsTable() {
  const { data, isLoading } = useAllWorkRequestsQuery();

  const columns: ITableColumn<IWorkRequest>[] = [
    {
      header: "STATUS",
      accessor: "status",
      cell: ({ row }) => <WorkRequestStatusCell row={row} />,
    },
    {
      header: "EMPLOYEE",
      accessor: "staff",
      cell: ({ row }: { row: IWorkRequest }) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {row?.staff?.first_name} {row?.staff?.last_name}
          </span>
          <span className="text-xs text-gray-500">{row?.staff?.employee_id}</span>
        </div>
      ),
    },
    {
      header: "DATE",
      accessor: "requestDate",
      cell: ({ row }: { row: IWorkRequest }) => (
        <span>{new Date(row.requestDate).toLocaleDateString()}</span>
      ),
    },
    {
      header: "TYPE",
      accessor: "requestDate",
      cell: ({ row }: { row: IWorkRequest }) => {
        const date = new Date(row.requestDate);
        const isSunday = date.getDay() === 0;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${isSunday
              ? "bg-purple-100 text-purple-700"
              : "bg-orange-100 text-orange-700"
              }`}
          >
            {isSunday ? "Weekend" : "Holiday"}
          </span>
        );
      },
    },
    {
      header: "REASON",
      accessor: "reason",
      cell: ({ row }: { row: IWorkRequest }) => (
        <span className="text-sm text-gray-600 max-w-[200px] truncate block" title={row.reason}>
          {row.reason}
        </span>
      ),
    },
    {
      header: "ADMIN REMARK",
      accessor: "adminRemark",
      cell: ({ row }) => row.adminRemark || "-",
    },
  ];

  if (isLoading) {
    return <div className="p-8 text-center">Loading requests...</div>;
  }

  return (
    <Table
      data={data?.data || []}
      columns={columns}
    />
  );
}
