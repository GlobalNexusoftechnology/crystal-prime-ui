import React from "react";
import { Dropdown, Table, Loading, SearchBar } from "@/components";
import { ITableAction } from "@/constants/table";

export interface SupportTicketRow {
  id: string | number;
  [key: string]: unknown;
}

interface SupportTicketTableProps {
  userRole: string;
  supportTicketsLoading: boolean;
  supportTicketsError: boolean;
  supportTicketsErrorObj: unknown;
  supportTicketList: SupportTicketRow[];
  supportTicketListColumn: { header: string; accessor: string }[];
  supportTicketListAction: ITableAction<SupportTicketRow>[];
  statusOptions: { label: string; value: string }[];
  statusFilter: string;
  handleStatusChange: (value: string) => void;
  priorityOptions: { label: string; value: string }[];
  priorityFilter: string;
  handlePriorityChange: (value: string) => void;
  handleSearch: (value: string) => void;
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
  handleSearch,
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
    <div className="p-4 2xl:p-[1vw] flex flex-col gap-4 border 2xl:border-[0.1vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Support Tickets
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          <Dropdown
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusChange}
            dropdownWidth="w-full md:w-fit"
          />
          <Dropdown
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

