"use client";
import React from "react";

import { ITableColumn, ITableAction } from "@/constants";
import { Table, Dropdown } from "@/components";
import { IAllBoqList } from "@/services";

interface BOQListTableProps {
  data: IAllBoqList[];
  actions: ITableAction<IAllBoqList>[];
  statusOptions: { label: string; value: string }[];
  onStatusChange: (id: string, newStatus: string) => void;
  isUpdatingStatus?: boolean;
}

export function BOQListTable({
  data,
  actions,
  statusOptions,
  onStatusChange,
}: BOQListTableProps) {
  const boqColumns: ITableColumn<IAllBoqList>[] = [
    {
      header: "STATUS",
      accessor: "status" as keyof IAllBoqList,
      sortable: true,
      headerClassName: "min-w-[10rem] ",
      cell: ({ row }) => (
        <Dropdown
          options={statusOptions}
          value={row.status || ""}
          onChange={(val) => onStatusChange(row.id, val)}
          dropdownWidth="min-w-[8rem] "
        />
      ),
    },
    {
      header: "LEAD CODE",
      accessor: "leadCode" as keyof IAllBoqList,
      sortable: true,
      headerClassName: "min-w-[10rem] ",
      cell: ({ row }) => row.lead?.lead_code || "-",
    },
    {
      header: "BUSINESS NAME",
      accessor: "businessName" as keyof IAllBoqList,
      sortable: true,
      headerClassName: "min-w-[12rem] ",
      cell: ({ row }) => row.businessName || "-",
    },
    {
      header: "CONTACT PERSON NAME",
      accessor: "contactPersonName" as keyof IAllBoqList,
      sortable: true,
      headerClassName: "min-w-[12rem] ",
      cell: ({ row }) =>
        row.lead?.first_name && row.lead?.last_name
          ? `${row.lead.first_name} ${row.lead.last_name}`
          : "-",
    },
    {
      header: "CONTACT ADDRESS",
      accessor: "contactAddress" as keyof IAllBoqList,
      sortable: true,
      headerClassName: "min-w-[15rem] ",
      cell: ({ row }) => row.contactAddress || row.lead?.location || "-",
    },
  ];

  return (
    <Table data={data} columns={boqColumns} pageSize={10} actions={actions} />
  );
}
