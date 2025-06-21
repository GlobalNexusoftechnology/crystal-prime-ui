"use client";

import { useState, useEffect } from "react";
import { IClientListProps, ITableAction } from "@/constants";
import { FiChevronDown, FiChevronUp, FiMoreVertical, FiSave, FiX } from "react-icons/fi";
import { ActionDropdown } from "@/components";

// Define the structure for a client's contact details.
export interface IClientContact {
  id: string;
  name: string;
  designation: string;
  email: string;
  contact_numbers: { type: string; number: string }[];
}

// Type for editing contact inline
interface EditContactData {
  name: string;
  designation: string;
  email: string;
  phone_numbers: string[];
}

// Extend the client list properties to include an array of contacts.
export interface IExtendedClientListProps extends IClientListProps {
  contacts?: IClientContact[];
}

interface CustomClientTableProps {
  data: IExtendedClientListProps[];
  actions: ITableAction<IClientListProps>[];
  onEdit: (client: IClientListProps) => void;
  onDelete: (id: string) => void;
}

export function CustomClientTable({
  data,
  actions,
}: CustomClientTableProps) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [editContact, setEditContact] = useState<{ clientId: string; contactId: string } | null>(null);
  const [editContactData, setEditContactData] = useState<EditContactData>({ name: '', designation: '', email: '', phone_numbers: ['', ''] });
  const [tableData, setTableData] = useState<IExtendedClientListProps[]>(data);

  // Keep tableData in sync with prop changes
  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleRowClick = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
    setEditContact(null);
  };

  const handleEditContact = (clientId: string, contact: IClientContact) => {
    setEditContact({ clientId, contactId: contact.id });
    setEditContactData({
      name: contact.name,
      designation: contact.designation,
      email: contact.email,
      phone_numbers: [
        contact.contact_numbers.find((cn) => cn.type === 'primary')?.number || '',
        contact.contact_numbers.find((cn) => cn.type === 'other')?.number || '',
      ],
    });
  };

  const handleEditContactChange = (field: keyof EditContactData, value: string) => {
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
    setTableData((prev) =>
      prev.map((client) => {
        if (client.id !== clientId) return client;
        return {
          ...client,
          contacts: client.contacts?.map((c) =>
            c.id === contactId
              ? {
                  ...c,
                  name: editContactData.name,
                  designation: editContactData.designation,
                  email: editContactData.email,
                  contact_numbers: editContactData.phone_numbers.map((num, idx) => ({
                    type: idx === 0 ? 'primary' : 'other',
                    number: num,
                  })),
                }
              : c
          ),
        };
      })
    );
    setEditContact(null);
  };

  const handleCancelEdit = () => {
    setEditContact(null);
  };

  const handleDeleteContact = (clientId: string, contactId: string) => {
    setTableData((prev) =>
      prev.map((client) => {
        if (client.id !== clientId) return client;
        return {
          ...client,
          contacts: client.contacts?.filter((c) => c.id !== contactId),
        };
      })
    );
  };

  const clientListColumn = [
    { header: "CUSTOMER NAME", accessor: "name", headerClass: "min-w-[10rem] 2xl:min-w-[20vw]" },
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
            <th className="px-6 py-3 text-left text-xs 2xl:text-[0.9vw] min-w-[10rem] 2xl:min-w-[10vw] font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
            {clientListColumn.map((col) => (
              <th
                key={col.header}
                className="px-6 py-3 text-left text-xs 2xl:text-[0.9vw] min-w-[12rem] 2xl:min-w-[12vw] font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row) => (
            <>
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] text-sm 2xl:text-[0.9vw] whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleRowClick(row.id)}>
                      {expandedRowId === row.id ? (
                        <FiChevronUp className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
                      ) : (
                        <FiChevronDown className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
                      )}
                    </button>
                    <ActionDropdown
                      options={actions.map((action) => ({
                        label: action.label,
                        onClick: () => action.onClick(row),
                        className: action.className,
                      }))}
                      icon={
                        <FiMoreVertical className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
                      }
                    />
                  </div>
                </td>
                {clientListColumn.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw] 2xl:text-[0.9vw] whitespace-nowrap text-sm text-gray-900"
                  >
                    {row[col.accessor as keyof IClientListProps]}
                  </td>
                ))}
              </tr>
              {expandedRowId === row.id && (
                <tr>
                  <td
                    colSpan={clientListColumn.length + 2}
                    className="p-4 2xl:p-[1vw] bg-gray-50"
                  >
                    <h3 className="2xl:text-[1vw] mb-4 2xl:mb-[1vw]">
                      Client Contact Details
                    </h3>
                    <table className="bg-white border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs 2xl:text-[0.9vw] min-w-[10rem] 2xl:min-w-[10vw] font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                          {clientContactDetailsColumns.map((col) => (
                            <th
                              key={col.header}
                              className="px-4 py-2 text-left text-xs 2xl:text-[0.9vw] min-w-[10rem] 2xl:min-w-[10vw] font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {col.header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {row.contacts?.map((contact) => {
                          const isEditing =
                            editContact &&
                            editContact.clientId === row.id &&
                            editContact.contactId === contact.id;
                          return (
                            <tr key={contact.id}>
                              <td className="px-4 py-2">
                                {isEditing ? (
                                  <div className="flex gap-2">
                                    <button
                                      className="text-green-600 hover:text-green-800"
                                      onClick={() => handleSaveContact(row.id, contact.id)}
                                    >
                                      <FiSave />
                                    </button>
                                    <button
                                      className="text-gray-500 hover:text-gray-700"
                                      onClick={handleCancelEdit}
                                    >
                                      <FiX />
                                    </button>
                                  </div>
                                ) : (
                                  <ActionDropdown
                                    options={[
                                      {
                                        label: "Edit",
                                        onClick: () => handleEditContact(row.id, contact),
                                      },
                                      {
                                        label: "Delete",
                                        onClick: () => handleDeleteContact(row.id, contact.id),
                                        className: "text-red-500",
                                      },
                                    ]}
                                    icon={
                                      <FiMoreVertical className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
                                    }
                                  />
                                )}
                              </td>
                              {isEditing ? (
                                <>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">
                                    <input
                                      className="border rounded px-2 py-1 w-full"
                                      value={editContactData.name}
                                      onChange={(e) => handleEditContactChange("name", e.target.value)}
                                    />
                                  </td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">
                                    <input
                                      className="border rounded px-2 py-1 w-full"
                                      value={editContactData.designation}
                                      onChange={(e) => handleEditContactChange("designation", e.target.value)}
                                    />
                                  </td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">
                                    <input
                                      className="border rounded px-2 py-1 w-full"
                                      value={editContactData.phone_numbers[0] || ""}
                                      onChange={(e) => handleEditContactPhoneChange(0, e.target.value)}
                                    />
                                  </td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">
                                    <input
                                      className="border rounded px-2 py-1 w-full"
                                      value={editContactData.phone_numbers[1] || ""}
                                      onChange={(e) => handleEditContactPhoneChange(1, e.target.value)}
                                    />
                                  </td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">
                                    <input
                                      className="border rounded px-2 py-1 w-full"
                                      value={editContactData.email}
                                      onChange={(e) => handleEditContactChange("email", e.target.value)}
                                    />
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">{contact.name}</td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">{contact.designation}</td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">
                                    {contact.contact_numbers.find((c) => c.type === "primary")?.number}
                                  </td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">
                                    {contact.contact_numbers.find((c) => c.type === "other")?.number}
                                  </td>
                                  <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.9vw]">{contact.email}</td>
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
