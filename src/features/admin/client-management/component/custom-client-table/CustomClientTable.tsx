"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiSave,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import React from "react";

import { clientContactDetailsColumns, clientListColumn } from "@/constants";
import { ActionDropdown } from "@/components";
import { useUpdateClientDetailMutation, useDeleteClientDetailMutation, IClientList } from "@/services";
import { formatDateToDDMMYYYY } from "@/utils";
import { Pagination } from "@/components/table/components";

interface EditContactData {
  contact_person: string;
  designation: string;
  email: string;
  phone_numbers: string[];
  other_contact: string;
  client_contact: string;
  id?: string;
}

interface CustomClientTableProps {
  data: IClientList[];
  actions: (row: IClientList) => {
    label: string;
    onClick: (client: IClientList) => void;
    className?: string;
  }[];
  onEdit: (client: IClientList) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  paginationData?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  pageSize?: number;
}

export function CustomClientTable({
  data,
  actions,
  refetch,
  paginationData,
  onPageChange,
  pageSize = 10,
}: CustomClientTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editContact, setEditContact] = useState<{
    clientId: string;
    contactId: string;
  } | null>(null);
  const [editContactData, setEditContactData] = useState<EditContactData>({
    contact_person: "",
    designation: "",
    email: "",
    phone_numbers: ["", ""],
    other_contact: "",
    client_contact: "",
    id: "",
  });
  const [tableData, setTableData] = useState<IClientList[]>(data);

  const { onUpdateClientDetail, isPending: isUpdatePending } =
    useUpdateClientDetailMutation({
      onSuccessCallback: () => {
        toast.success("Contact updated successfully");
        setEditContact(null);
        refetch();
      },
      onErrorCallback: (err) => {
        toast.error(err.message);
      },
    });

  const { onDeleteClientDetail, isPending: isDeletePending } =
    useDeleteClientDetailMutation({
      onSuccessCallback: () => {
        toast.success("Contact deleted successfully");
        refetch();
      },
      onErrorCallback: (err) => {
        toast.error(err.message);
      },
    });

  useEffect(() => {
    setTableData(data);
    setCurrentPage(1); // Reset to first page when data changes
  }, [data]);

  // Pagination logic - use server-side pagination if available, otherwise client-side
  const paginatedData = useMemo(() => {
    if (paginationData) {
      // Server-side pagination - use data directly
      return tableData;
    } else {
      // Client-side pagination
      const start = (currentPage - 1) * pageSize;
      return tableData.slice(start, start + pageSize);
    }
  }, [tableData, currentPage, pageSize, paginationData]);

  const totalPages = paginationData ? paginationData.totalPages : Math.ceil(tableData.length / pageSize);

  // Use correct current page for Pagination
  const effectiveCurrentPage = paginationData ? paginationData.page : currentPage;

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      // Server-side pagination
      onPageChange(page);
    } else {
      // Client-side pagination
      setCurrentPage(page);
    }
    setExpandedRowId(null); // Close expanded rows when changing pages
    setEditContact(null); // Close edit mode when changing pages
  };

  const handleRowClick = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
    setEditContact(null);
  };

  const handleEditContact = (
    clientId: string,
    contact: NonNullable<IClientList["client_details"]>[number]
  ) => {
    setEditContact({ clientId, contactId: contact.id });
    setEditContactData({
      contact_person: contact.contact_person,
      designation: contact.designation,
      email: contact.email,
      phone_numbers: [
        contact.client_contact || "",
        contact.other_contact || "",
      ],
      other_contact: contact.other_contact,
      client_contact: contact.client_contact,
    });
  };

  const handleEditContactChange = (
    field: keyof EditContactData,
    value: string
  ) => {
    setEditContactData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditContactPhoneChange = (idx: number, value: string) => {
    setEditContactData((prev) => {
      const phone_numbers = [...prev.phone_numbers];
      phone_numbers[idx] = value;
      return { ...prev, phone_numbers };
    });
  };

  const handleSaveContact = (clientId: string, contactId: string) => {
    onUpdateClientDetail({
      id: contactId,
      payload: {
        ...editContactData,
        client_id: clientId,
        id: contactId,
      },
    });
  };

  const handleCancelEdit = () => {
    setEditContact(null);
  };

  const handleDeleteContact = (clientId: string, contactId: string) => {
    onDeleteClientDetail(contactId);
  };

  return (
    <div>
      <div className="overflow-x-auto border rounded-lg 2xl:rounded-[0.75vw]">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr className="bg-gray-200">
              <th className="px-4 2xl:px-[1vw] py-4 2xl:py-[1vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-semibold uppercase">
                Actions
              </th>
              {clientListColumn.length > 0 && clientListColumn.map((col) => (
                <th
                  key={col.header}
                  className={`px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-semibold uppercase ${col.headerClass}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length > 0 && paginatedData.map((row, idx) => (
              <React.Fragment key={row.id}>
                <tr
                  className={`hover:bg-blue-50 transition-colors duration-150 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]">
                    <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                      <button onClick={() => handleRowClick(row.id)}>
                        {expandedRowId === row.id ? (
                          <FiChevronUp className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
                        ) : (
                          <FiChevronDown className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
                        )}
                      </button>
                      <ActionDropdown
                        className=" w-[15rem] 2xl:w-[15vw]"
                        options={actions(row)?.map((action) => ({
                          label: action?.label,
                          onClick: () => action?.onClick(row),
                          className: action?.className,
                        }))}
                        icon={
                          <FiMoreVertical className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
                        }
                      />
                    </div>
                  </td>
                  {clientListColumn.length > 0 && clientListColumn.map((col) => {
                    const value = row[col.accessor as keyof IClientList];
                    return (
                      <td
                        key={col.accessor}
                        className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]"
                      >
                        {col.accessor === "created_at"
                          ? formatDateToDDMMYYYY(value as string)
                          : Array.isArray(value)
                          ? value.length
                          : typeof value === "object" && value !== null
                          ? JSON.stringify(value)
                          : value}
                      </td>
                    );
                  })}
                </tr>
                {expandedRowId === row.id && (
                  <tr key={`${row.id}-details`}>
                    <td
                      colSpan={clientListColumn.length + 1}
                      className="p-4 2xl:p-[1vw] bg-gray-50 rounded-b-lg 2xl:rounded-b-[0.75vw]"
                    >
                      <h3 className="mb-4 2xl:mb-[1vw] 2xl:text-[1vw] font-semibold">
                        Client Contact Details
                      </h3>
                      <table className="bg-white border rounded shadow-sm">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-semibold uppercase">
                              Action
                            </th>
                            {clientContactDetailsColumns.length > 0 && clientContactDetailsColumns.map((col) => (
                              <th
                                key={col.header}
                                className={`px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-semibold uppercase ${col.headerClass}`}
                              >
                                {col.header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {Array.isArray(row?.client_details) && row.client_details.length > 0 && row.client_details.map((contact) => {
                            const isEditing =
                              editContact &&
                              editContact.clientId === row.id &&
                              editContact.contactId === contact.id;
                            return (
                              <tr
                                key={`${row.id}-${contact.client_id}`}
                                className="hover:bg-blue-50 transition-colors duration-150"
                              >
                                <td>
                                  {isEditing ? (
                                    <div className="flex gap-2">
                                      <button
                                        className="text-green-600 hover:text-green-800 disabled:opacity-50"
                                        onClick={() =>
                                          handleSaveContact(row.id, contact.id)
                                        }
                                        disabled={isUpdatePending}
                                      >
                                        <FiSave />
                                      </button>
                                      <button
                                        className="text-gray-500 hover:text-gray-700"
                                        onClick={handleCancelEdit}
                                        disabled={isUpdatePending}
                                      >
                                        <FiX />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex justify-center">
                                      <ActionDropdown
                                        options={[
                                          {
                                            label: "Edit",
                                            onClick: () =>
                                              handleEditContact(row.id, contact),
                                          },
                                          {
                                            label: isDeletePending
                                              ? "Deleting..."
                                              : "Delete",
                                            onClick: isDeletePending
                                              ? () => {}
                                              : () =>
                                                  handleDeleteContact(
                                                    row.id,
                                                    contact.id
                                                  ),
                                            className: "text-red-500",
                                          },
                                        ]}
                                        icon={
                                          <FiMoreVertical className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
                                        }
                                      />
                                    </div>
                                  )}
                                </td>
                                {isEditing ? (
                                  <>
                                    <td>
                                      <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={editContactData.contact_person}
                                        onChange={(e) =>
                                          handleEditContactChange(
                                            "contact_person",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={editContactData.designation}
                                        onChange={(e) =>
                                          handleEditContactChange(
                                            "designation",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={
                                          editContactData.phone_numbers[0] || ""
                                        }
                                        onChange={(e) =>
                                          handleEditContactPhoneChange(
                                            0,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={
                                          editContactData.phone_numbers[1] || ""
                                        }
                                        onChange={(e) =>
                                          handleEditContactPhoneChange(
                                            1,
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        className="border rounded px-2 py-1 w-full"
                                        value={editContactData.email}
                                        onChange={(e) =>
                                          handleEditContactChange(
                                            "email",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]">
                                      {contact.contact_person}
                                    </td>
                                    <td className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]">
                                      {contact.designation}
                                    </td>
                                    <td className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]">
                                      {contact.client_contact}
                                    </td>
                                    <td className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]">
                                      {contact.other_contact}
                                    </td>
                                    <td className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]">
                                      {contact.email}
                                    </td>
                                  </>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
        <Pagination
          currentPage={effectiveCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
    </div>
  );
}
