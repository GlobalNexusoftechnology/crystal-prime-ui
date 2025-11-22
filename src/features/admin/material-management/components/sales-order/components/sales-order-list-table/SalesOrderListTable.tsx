"use client";
import React from "react";
import { ITableColumn } from "@/constants";
import { Table } from "@/components";
import { ISalesOrderList } from "@/services";

interface SalesOrderListTableProps {
  data: ISalesOrderList[];
  actions: {
    label: string;
    onClick: (salesOrder: ISalesOrderList) => void;
    className: string;
  }[];
}

export function SalesOrderListTable({
  data,
  actions,
}: SalesOrderListTableProps) {
  const salesOrderColumns: ITableColumn<ISalesOrderList>[] = [
    {
      header: "SALES ORDER NUMBER",
      accessor: "salesOrderNumber",
      sortable: true,
      headerClassName: "min-w-[12rem] ",
      cell: ({ row }) => row.salesOrderNumber || "-",
    },
    {
      header: "SALES ORDER DATE",
      accessor: "salesOrderDate",
      sortable: true,
      headerClassName: "min-w-[12rem] ",
      cell: ({ row }) =>
        row.salesOrderDate
          ? new Date(row.salesOrderDate).toLocaleDateString()
          : "-",
    },
    {
      header: "PURCHASE ORDER NUMBER",
      accessor: "purchaseOrderNumber",
      sortable: true,
      headerClassName: "min-w-[15rem] ",
      cell: ({ row }) => row.purchaseOrderNumber || "-",
    },
    {
      header: "PURCHASE ORDER DATE",
      accessor: "purchaseOrderDate",
      sortable: true,
      headerClassName: "min-w-[15rem] ",
      cell: ({ row }) =>
        row.purchaseOrderDate
          ? new Date(row.purchaseOrderDate).toLocaleDateString()
          : "-",
    },
    {
      header: "CONTACT PERSON NAME",
      accessor: "boqId",
      sortable: true,
      headerClassName: "min-w-[8rem] ",
      cell: ({ row }) => row.boq?.leadName || "-",
    },
    {
      header: "BUSINESS NAME",
      accessor: "boqId",
      sortable: false,
      headerClassName: "min-w-[12rem] ",
      cell: ({ row }) => row.boq?.businessName || "-",
    },
    {
      header: "CLIENT NAME",
      accessor: "client",
      sortable: true,
      headerClassName: "min-w-[12rem] ",
      cell: ({ row }) => row?.client?.name || "-",
    },
  ];

  return (
    <Table
      data={data}
      columns={salesOrderColumns}
      pageSize={10}
      actions={actions}
    />
  );
}
