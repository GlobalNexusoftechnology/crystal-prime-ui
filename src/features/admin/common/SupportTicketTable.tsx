import React from "react";
import { Table, Loading, SimpleDropdown } from "@/components";
import { ITableAction, ITableColumn } from "@/constants/table";

export interface SupportTicketRow {
  id: string | number;
  [key: string]: unknown;
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
    <div className="p-4 2xl:p-[1vw] flex flex-col gap-4 border 2xl:border-[0.05vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Support Tickets list
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
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
      />
    </div>
  );
};

