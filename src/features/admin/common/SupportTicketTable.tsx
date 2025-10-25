import React from "react";
import { Table, Loading, SimpleDropdown } from "@/components";
import { ITableAction, ITableColumn } from "@/constants/table";

export interface SupportTicketRow {
  id: string | number;
  [key: string]: unknown;
}
interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface SupportTicketTableProps {
  supportTicketsLoading: boolean;
  supportTicketsError: boolean;
  supportTicketsErrorObj: unknown;
  supportTicketList: SupportTicketRow[];
  supportTicketListColumn: ITableColumn<SupportTicketRow>[];
  supportTicketListAction: ITableAction<SupportTicketRow>[];
  statusOptions: { label: string; value: string }[];
  statusFilter: string;
  handleStatusChange: (value: string) => void;
  priorityOptions: { label: string; value: string }[];
  priorityFilter: string;
  handlePriorityChange: (value: string) => void;
  onPageChange?: (page: number) => void;
  paginationData: PaginationData | undefined;
}

export const SupportTicketTable: React.FC<SupportTicketTableProps> = ({
  supportTicketsLoading,
  supportTicketsError,
  supportTicketsErrorObj,
  supportTicketList,
  supportTicketListColumn,
  supportTicketListAction,
  statusOptions,
  statusFilter,
  handleStatusChange,
  priorityOptions,
  priorityFilter,
  handlePriorityChange,
  onPageChange,
  paginationData,
}) => {
  if (supportTicketsLoading) return <Loading />;
  if (supportTicketsError)
    return (
      <div className="text-red-500">
        Error loading support tickets:{" "}
        {typeof supportTicketsErrorObj === "object" &&
        supportTicketsErrorObj &&
        "message" in supportTicketsErrorObj
          ? (supportTicketsErrorObj as { message: string }).message
          : "Unknown error"}
      </div>
    );
  return (
    <div className="p-4  flex flex-col gap-4 border  border-grey-300 rounded-xl ">
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <h1 className="text-[1.2rem]  font-medium">
          Support Tickets list
        </h1>
        <div className="flex items-center flex-wrap gap-4 ">
          <SimpleDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusChange}
            dropdownWidth="w-full md:w-fit"
          />
          <SimpleDropdown
            options={priorityOptions}
            value={priorityFilter}
            onChange={handlePriorityChange}
            dropdownWidth="w-full md:w-fit"
          />
        </div>
      </div>
      <Table
        data={supportTicketList}
        columns={supportTicketListColumn}
        actions={supportTicketListAction}
        onPageChange={onPageChange}
        paginationData={paginationData}
      />
    </div>
  );
};
