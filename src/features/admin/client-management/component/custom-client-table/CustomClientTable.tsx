"use client";

import { useState } from "react";
import { IClientList } from "@/services/apis/clients/community-client/types";
import { FiChevronDown, FiChevronUp, FiMoreVertical } from "react-icons/fi";
import { ActionDropdown } from "@/components";

interface CustomClientTableProps {
  data: IClientList[];
  actions: {
    label: string;
    onClick: (client: IClientList) => void;
    className?: string;
  }[];
  onEdit: (client: IClientList) => void;
  onDelete: (id: string) => void;
}

export function CustomClientTable({ data, actions, onDelete }: CustomClientTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const clientListColumn = [
    { header: "CUSTOMER NAME", accessor: "name" },
    { header: "COMPANY NAME", accessor: "company_name" },
    { header: "CONTACT PERSON", accessor: "contact_person" },
    { header: "PHONE NUMBER", accessor: "contact_number" },
    { header: "CONTACT EMAIL", accessor: "email" },
    { header: "WEBSITE URL", accessor: "website" },
    { header: "ADDRESS", accessor: "address" },
    { header: "CREATED AT", accessor: "created_at" },
  ];

  const clientContactDetailsColumns = [
    { header: "CONTACT NAME" },
    { header: "DESIGNATION" },
    { header: "CONTACT NUMBER" },
    { header: "OTHER CONTACT" },
    { header: "EMAIL" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
            {clientListColumn.map((col) => (
              <th key={col.header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <>
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}>
                      {expandedRowId === row.id ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    <ActionDropdown
                      options={actions.map((action) => ({
                        label: action.label,
                        onClick: () => action.onClick(row),
                        className: action.className,
                      }))}
                      icon={<FiMoreVertical />}
                    />
                  </div>
                </td>
                {clientListColumn.map((col) => {
                  const value = row[col.accessor as keyof IClientList];
                  return (
                    <td key={col.accessor} className="px-6 py-4 text-sm text-gray-900">
                      {Array.isArray(value) ? value.length : value}
                    </td>
                  );
                })}
              </tr>
              {expandedRowId === row.id && (
                <tr key={`${row.id}-details`}>
                  <td colSpan={clientListColumn.length + 1} className="p-4 bg-gray-50">
                    <h3 className="mb-4">Client Contact Details</h3>
                    <table className="bg-white border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                          {clientContactDetailsColumns.map((col) => (
                            <th key={col.header} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {col.header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {row.client_details?.map((contactResp) => {
                          const contact = contactResp;
                          return (
                            <tr key={contact?.client_id}>
                              <td>
                                <ActionDropdown
                                  options={[
                                    { label: "Edit", onClick: () => {/* handle edit */} },
                                    { label: "Delete", onClick: () => onDelete(contact?.client_id), className: "text-red-500" },
                                  ]}
                                  icon={<FiMoreVertical />}
                                />
                              </td>
                              <td>{contact?.contact_person}</td>
                              <td>{contact?.designation}</td>
                              <td>{contact?.client_contact}</td>
                              <td>{contact?.other_contact}</td>
                              <td>{contact?.email}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
