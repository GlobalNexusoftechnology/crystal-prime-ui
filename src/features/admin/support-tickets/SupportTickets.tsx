"use client";

import React, { useState } from "react";
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

  const {
    ticketsData: supportTickets,
    isLoading: supportTicketsLoading,
    isError: supportTicketsError,
    error: supportTicketsErrorObj,
    ticketsRefetch: refetchSupportTickets,
  } = useAllTicketsAcrossProjectsQuery({
    status: statusFilter,
    priority: priorityFilter,
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

  const supportTicketList: SupportTicketRow[] = (supportTickets || [])
    .filter((ticket) => {
      // Show completed tickets only to admin users (not clients)
      const userRole = activeSession?.user?.role?.role?.toLowerCase?.();
      if (userRole === "client") {
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
        remark: ticket?.remark || "-",
        image: ticket?.image_url || null,
        milestoneId: ticket?.milestone?.id || "",
        taskId: ticket?.task?.id || "",
      };
    });

  const supportTicketListColumn: ITableColumn<SupportTicketRow>[] = [
    {
      header: "STATUS",
      accessor: "status",
      cell: ({ row, value }) => (
        <div className="min-w-[9rem] 2xl:min-w-[9vw] flex justify-center">
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
            dropdownWidth="w-[10rem] 2xl:w-[10vw]"
          />
        </div>
      ),
    },
    {
      header: "ASSIGNED TO",
      accessor: "assignedTo",
      cell: ({ row, value }) => (
        <div className="min-w-[9rem] 2xl:min-w-[9vw] flex justify-center">
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
              dropdownWidth="w-[15rem] 2xl:w-[15vw]"
            />
          )}
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
            <div className="relative w-12 h-12 2xl:w-[3vw] 2xl:h-[3vw]">
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

  return (
    <div className="p-6 md:p-8 2xl:p-[2vw] bg-[#fafbfc] border 2xl:border-[0.05vw] border-gray-300 rounded-xl 2xl:rounded-[0.75vw] min-h-screen">
      <h1 className="text-xl 2xl:text-[1.25vw] 2xl:leading-[2vw] font-medium text-gray-900 mb-4 2xl:mb-[1vw]">
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
      />
    </div>
  );
}
