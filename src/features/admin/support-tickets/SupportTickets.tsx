"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  SupportTicketTable,
  type SupportTicketRow,
} from "@/features/admin/common/SupportTicketTable";
import type { ITableAction, ITableColumn } from "@/constants";
import { Dropdown, SimpleDropdown } from "@/components";
import {
  useAllTicketsAcrossProjectsQuery,
  useUpdateTicketStatusMutation,
  useUpdateTicketMutation,
  useAllUsersQuery,
} from "@/services";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/";
import { useAuthStore } from "@/services";

export function SupportTickets() {
  const router = useRouter();
  const { activeSession } = useAuthStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const currentUserId = activeSession?.user?.id;
  const userRole = activeSession?.user?.role?.role?.toLowerCase?.();

  // Check if user is client
  const isClient = userRole === "client";

  const {
    ticketsData: supportTickets,
    isLoading: supportTicketsLoading,
    isError: supportTicketsError,
    error: supportTicketsErrorObj,
    ticketsRefetch: refetchSupportTickets,
  } = useAllTicketsAcrossProjectsQuery({
    status: statusFilter,
    priority: priorityFilter,
    userId: currentUserId,
    page: currentPage,
  });

  const { updateTicketStatus } = useUpdateTicketStatusMutation({
    onSuccessCallback: () => {
      toast.success("Ticket status updated");
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Failed to update status");
    },
  });
  const { updateTicket, isPending: isUpdatingTicket } = useUpdateTicketMutation(
    {
      onSuccessCallback: () => {
        toast.success("Ticket assignment updated");
        // Ensure fresh data after assignment changes
        refetchSupportTickets();
      },
      onErrorCallback: (err) => {
        toast.error(err?.message || "Failed to update assignment");
      },
    }
  );
  const { allUsersData: usersData, isLoading: isLoadingUsers } =
    useAllUsersQuery();
  const userOptions = React.useMemo(() => {
    if (!usersData?.data?.list) return [];
    return usersData.data.list.map((user) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user.id,
    }));
  }, [usersData]);

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Open", value: "open" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
  ];

  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
  ];

  const supportTicketList: SupportTicketRow[] = (
    supportTickets?.data.list || []
  )
    .filter((ticket) => {
      // Show completed tickets only to admin users (not clients)
      if (isClient) {
        return ticket.status !== "completed";
      }
      // Admin users can see all tickets including completed ones
      return true;
    })
    .map((ticket) => {
      const validPriority = ["high", "medium", "low"].includes(
        ticket.priority ?? ""
      );
      return {
        id: ticket?.id,
        title: ticket?.title,
        description: ticket?.description || "-",
        status: ticket?.status || "-",
        priority: validPriority
          ? (ticket?.priority as "high" | "medium" | "low")
          : "medium",
        assignedTo: ticket?.assigned_to || null,
        projectId: ticket?.project?.id || "",
        projectName: ticket?.project?.name || "-",
        createdBy: ticket?.created_by || "-",
        createdAt: ticket?.created_at ? formatDate(ticket.created_at) : "-",
        updatedAt: ticket?.updated_at ? formatDate(ticket.updated_at) : "-",
        taskName: ticket?.task?.title || "-",
        // remark: ticket?.remark || "-",
        image: ticket?.image_url || null,
        milestoneId: ticket?.milestone?.id || "",
        taskId: ticket?.task?.id || "",
      };
    });

  // Conditionally define columns based on user role
  const supportTicketListColumn: ITableColumn<SupportTicketRow>[] = useMemo(() => {
    const baseColumns: ITableColumn<SupportTicketRow>[] = [
      {
        header: "STATUS",
        accessor: "status",
        cell: ({ row, value }) => (
          <div className="min-w-[9rem]  flex justify-center">
            <SimpleDropdown
              options={[
                { label: "Open", value: "open" },
                { label: "In Progress", value: "in_progress" },
                { label: "Completed", value: "completed" },
              ]}
              value={String((value as string) ?? "")}
              onChange={(val) =>
                updateTicketStatus({ id: String(row.id), status: val })
              }
              dropdownWidth="w-[10rem] "
            />
          </div>
        ),
      },
      {
        header: "IMAGE",
        accessor: "image",
        cell: ({ value }) => {
          const img = (value as string) ?? null;
          if (!img) {
            return <span className="text-gray-400 text-xs">No image</span>;
          }
          return (
            <div className="flex items-center justify-center">
              <div className="relative w-12 h-12  ">
                <Image
                  src={img}
                  alt="Ticket attachment"
                  fill
                  className="object-cover rounded-lg"
                  unoptimized
                />
              </div>
            </div>
          );
        },
      },
      { header: "PRIORITY", accessor: "priority" },
      { header: "TITLE", accessor: "title" },
      { header: "PROJECT", accessor: "projectName" },
      { header: "CREATED AT", accessor: "createdAt" },
    ];

    // Add "Assigned To" column only for non-client users
    if (!isClient) {
      const assignedToColumn: ITableColumn<SupportTicketRow> = {
        header: "ASSIGNED TO",
        accessor: "assignedTo",
        cell: ({ row, value }) => (
          <div className="min-w-[9rem]  flex justify-center">
            {isLoadingUsers ? (
              <span className="text-gray-400 text-sm">Loading...</span>
            ) : isUpdatingTicket ? (
              <span className="text-blue-500 text-sm">Updating...</span>
            ) : (
              <Dropdown
                options={userOptions}
                value={value ? String(value) : ""}
                onChange={(val) => {
                  const apiPayload = { assigned_to: val === "" ? null : val };
                  const requestPayload = {
                    id: String(row.id),
                    payload: apiPayload,
                  };
                  updateTicket(requestPayload);
                }}
                dropdownWidth="w-[15rem] "
              />
            )}
          </div>
        ),
      };

      // Insert "Assigned To" column after "STATUS" column
      baseColumns.splice(1, 0, assignedToColumn);
    }

    return baseColumns;
  }, [isClient, isLoadingUsers, isUpdatingTicket, userOptions, updateTicketStatus, updateTicket]);

  const supportTicketListAction: ITableAction<SupportTicketRow>[] = [
    {
      label: "View",
      onClick: (row: SupportTicketRow) => {
        const hasTicketRoute = Boolean(
          row.projectId && row.milestoneId && row.id
        );
        if (hasTicketRoute) {
          router.push(
            `/admin/project-management/${row.projectId}/${row.milestoneId}/tickets/${row.id}`
          );
        } else if (row.projectId) {
          router.push(`/admin/project-management/${row.projectId}`);
        }
      },
      className: "text-blue-500 whitespace-nowrap",
    },
  ];

  const paginationData = supportTickets?.data?.pagination;

  return (
    <div className="p-6 md:p-8  bg-[#fafbfc] border  border-gray-300 rounded-xl  min-h-screen">
      <h1 className="text-xl   font-medium text-gray-900 mb-4 ">
        Support Tickets
      </h1>
      <SupportTicketTable
        supportTicketsLoading={supportTicketsLoading}
        supportTicketsError={!!supportTicketsError}
        supportTicketsErrorObj={supportTicketsErrorObj}
        supportTicketList={supportTicketList}
        supportTicketListColumn={supportTicketListColumn}
        supportTicketListAction={supportTicketListAction}
        statusOptions={statusOptions}
        statusFilter={statusFilter}
        handleStatusChange={setStatusFilter}
        priorityOptions={priorityOptions}
        priorityFilter={priorityFilter}
        handlePriorityChange={setPriorityFilter}
        onPageChange={setCurrentPage}
        paginationData={paginationData}
      />
    </div>
  );
}