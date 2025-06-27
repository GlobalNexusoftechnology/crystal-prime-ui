"use client";

import { useState, useEffect } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiMoreVertical,
  FiSave,
  FiX,
} from "react-icons/fi";
import { ActionDropdown } from "@/components";
import { IClientList } from "@/services/apis/clients/community-client/types";
import toast from "react-hot-toast";
import { useUpdateClientDetailMutation } from "@/services/apis/clients/community-client/query-hooks/useUpdateClientDetailMutation";
import { useDeleteClientDetailMutation } from "@/services/apis/clients/community-client/query-hooks/useDeleteClientDetailMutation";
import { clientContactDetailsColumns, clientListColumn } from "@/constants";

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
  actions: {
    label: string;
    onClick: (client: IClientList) => void;
    className?: string;
  }[];
  onEdit: (client: IClientList) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
}

export function CustomClientTable({
  data,
  actions,
  refetch,
}: CustomClientTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
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
  }, [data]);

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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-medium text-gray-500 uppercase">
              Actions
            </th>
            {clientListColumn.map((col) => (
              <th
                key={col.header}
                className={`px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-medium text-gray-500 uppercase ${col.headerClass}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, idx) => (
            <>
              <tr
                key={row.id}
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
                      options={actions.map((action) => ({
                        label: action.label,
                        onClick: () => action.onClick(row),
                        className: action.className,
                      }))}
                      icon={
                        <FiMoreVertical className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
                      }
                    />
                  </div>
                </td>
                {clientListColumn.map((col) => {
                  const value = row[col.accessor as keyof IClientList];
                  return (
                    <td
                      key={col.accessor}
                      className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-[0.9rem] 2xl:text-[0.9vw]"
                    >
                      {Array.isArray(value) ? value.length : value}
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
                    <h3 className="mb-4 2xl:mb-[1vw] 2xl:text-[1vw]">
                      Client Contact Details
                    </h3>
                    <table className="bg-white border rounded shadow-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-medium text-gray-500 uppercase">
                            Action
                          </th>
                          {clientContactDetailsColumns.map((col) => (
                            <th
                              key={col.header}
                              className={`px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left text-[0.9rem] 2xl:text-[0.9vw] font-medium text-gray-500 uppercase ${col.headerClass}`}
                            >
                              {col.header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {row.client_details?.map((contact) => {
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
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
