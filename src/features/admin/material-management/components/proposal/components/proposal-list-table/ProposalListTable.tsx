"use client";
// import React from "react";

// import { ITableColumn, ITableAction } from "@/constants";
// import { Table, Dropdown } from "@/components";
// import { IAllBoqList } from "@/services";

// interface ProposalListTableProps {
//   data: IAllBoqList[];
//   actions: ITableAction<IAllBoqList>[];
//   statusOptions: { label: string; value: string }[];
//   onStatusChange: (id: string, newStatus: string) => void;
//   isUpdatingStatus?: boolean;
// }

// export function ProposalListTable({
//   data,
//   actions,
//   statusOptions,
//   onStatusChange,
// }: ProposalListTableProps) {
//   const boqColumns: ITableColumn<IAllBoqList>[] = [
//     {
//       header: "STATUS",
//       accessor: "proposalStatus" as keyof IAllBoqList,
//       sortable: true,
//       headerClassName: "min-w-[10rem] ",
//       cell: ({ row }) => (
//         row.proposalStatus === "approved" ? (
//           <span className="text-green-500 font-semibold">Sales Order</span>
//         ) : row.proposalStatus === "rejected" ? (
//           <span className="text-red-500 font-semibold">Rejected</span>
//         ) : (
//           <Dropdown
//             options={statusOptions}
//             value={row.proposalStatus || ""}
//             onChange={(val) => onStatusChange(row.id, val)}
//             dropdownWidth="min-w-[8rem] "
//           />
//         )

//       ),
//     },
//     {
//       header: "REMARK",
//       accessor: "remark" as keyof IAllBoqList,
//       sortable: false,
//       headerClassName: "min-w-[15rem] ",
//       cell: ({ row }) => (
//         <div className="max-w-[200px]">
//           {row.remark ? (
//             <div className="text-sm  text-gray-700">
//               {row.remark.length > 50
//                 ? `${row.remark.substring(0, 50)}...`
//                 : row.remark
//               }
//             </div>
//           ) : (
//             <span className="text-gray-400">-</span>
//           )}
//         </div>
//       ),
//     },
//     {
//       header: "LEAD CODE",
//       accessor: "leadCode" as keyof IAllBoqList,
//       sortable: true,
//       headerClassName: "min-w-[10rem] ",
//       cell: ({ row }) => row.lead?.lead_code || "-",
//     },
//     {
//       header: "PROPOSAL CODE",
//       accessor: "proposalCode" as keyof IAllBoqList,
//       sortable: true,
//       headerClassName: "min-w-[10rem] ",
//       cell: ({ row }) => row.proposalCode || "-",
//     },
//     {
//       header: "BUSINESS NAME",
//       accessor: "businessName" as keyof IAllBoqList,
//       sortable: true,
//       headerClassName: "min-w-[12rem] ",
//       cell: ({ row }) => row.businessName || "-",
//     },
//     {
//       header: "CONTACT PERSON NAME",
//       accessor: "contactPersonName" as keyof IAllBoqList,
//       sortable: true,
//       headerClassName: "min-w-[12rem] ",
//       cell: ({ row }) =>
//         row.lead?.first_name && row.lead?.last_name
//           ? `${row.lead.first_name} ${row.lead.last_name}`
//           : "-",
//     },
//     {
//       header: "CONTACT ADDRESS",
//       accessor: "contactAddress" as keyof IAllBoqList,
//       sortable: true,
//       headerClassName: "min-w-[15rem] ",
//       cell: ({ row }) => row.contactAddress || row.lead?.location || "-",
//     }
//   ];

//   return (
//     <Table data={data} columns={boqColumns} pageSize={10} actions={actions} />
//   );
// }

import React from "react";

export const ProposalListTable = () => {
  return <>ProposalListTable</>;
};
