"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Table, ModalOverlay, Dropdown, DeleteModal } from "@/components";
import { Breadcrumb } from "../../../breadcrumb";
import {
  useAllTicketsQuery,
  useProjectDetailQuery,
  useDeleteTicketMutation,
} from "@/services";
import { buildIdToNameMapping, IApiError } from "@/utils";
import { formatDate } from "@/utils/helpers/formatDate";
import toast from "react-hot-toast";
import { GenerateTicketModal } from "../";
import { ITicketData } from "@/services/apis/clients/community-client/types";
import { ITableColumn, ITableAction } from "@/constants/table";

interface ShowAllTicketsProps {
  projectId: string;
}

export const ShowAllTickets: React.FC<ShowAllTicketsProps> = ({
  projectId,
}) => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [isGenerateTicketModalOpen, setIsGenerateTicketModalOpen] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedTicket, setSelectedTicket] = useState<ITicketData | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<ITicketData | null>(null);

  // Fetch project details
  const { projectDetailData: projectData, isLoading: projectLoading } =
    useProjectDetailQuery(projectId);

  // Fetch tickets for this project with filters
  const {
    ticketsData,
    isLoading: ticketsLoading,
    error,
    isError,
  } = useAllTicketsQuery(projectId, {
    status: statusFilter,
    priority: priorityFilter,
  });

  // Mutation hooks
  const { deleteTicket } = useDeleteTicketMutation({
    onSuccessCallback: () => {
      toast.success("Ticket deleted successfully");
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error?.message || "Failed to delete ticket");
    },
  });

  // Use API-filtered data directly
  const filteredTickets = ticketsData || [];

  // Handle error
  useEffect(() => {
    if (isError && error) {
      toast.error(error?.message || "Failed to fetch tickets");
    }
  }, [isError, error]);

  const handleBackToProjects = () => {
    router.push("/admin/my-projects");
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const handleEditTicket = (ticket: ITicketData) => {
    setSelectedTicket(ticket);
    setModalMode("edit");
    setIsGenerateTicketModalOpen(true);
  };

  const handleDeleteTicket = (ticket: ITicketData) => {
    setTicketToDelete(ticket);
    setShowDeleteModal(true);
  };

  const confirmDeleteTicket = () => {
    if (ticketToDelete) {
      deleteTicket(ticketToDelete.id);
      setShowDeleteModal(false);
      setTicketToDelete(null);
    }
  };

  // Filter options
  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Closed", value: "Closed" },
  ];
  
  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
  ];

  // Define the table data type
  type TicketTableData = {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    remark: string;
    image: React.ReactNode;
    created_at: string;
    updated_at: string;
  };

  // Table columns configuration
  const columns: ITableColumn<TicketTableData>[] = [
    {
      header: "IMAGE",
      accessor: "image",
      headerClassName: "min-w-[8rem] 2xl:min-w-[8vw]",
    },
    {
      header: "STATUS",
      accessor: "status",
      headerClassName: "min-w-[8rem] 2xl:min-w-[8vw]",
    },
    {
      header: "TITLE",
      accessor: "title",
      headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
    },
    {
      header: "DESCRIPTION",
      accessor: "description",
      headerClassName: "min-w-[15rem] 2xl:min-w-[15vw]",
    },
    {
      header: "PRIORITY",
      accessor: "priority",
      headerClassName: "min-w-[8rem] 2xl:min-w-[8vw]",
    },
    {
      header: "REMARK",
      accessor: "remark",
      headerClassName: "min-w-[12rem] 2xl:min-w-[12vw]",
    },
    {
      header: "CREATED",
      accessor: "created_at",
      headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    },
    {
      header: "UPDATED",
      accessor: "updated_at",
      headerClassName: "min-w-[10rem] 2xl:min-w-[10vw]",
    },
  ];

  // Table actions configuration
  const tableActions: ITableAction<TicketTableData>[] = [
    {
      label: "View",
      onClick: (row) => {
        const originalTicket = filteredTickets.find(
          (ticket) => ticket.id === row.id
        );
        if (originalTicket) {
          router.push(`/admin/my-projects/${originalTicket?.project?.id}/${originalTicket.id}`);
        }
      },
    },
    {
      label: "Edit",
      onClick: (row) => {
        const originalTicket = filteredTickets.find(
          (ticket) => ticket.id === row.id
        );
        if (originalTicket) {
          handleEditTicket(originalTicket);
        }
      },
    },
    {
      label: "Delete",
      onClick: (row) => {
        const originalTicket = filteredTickets.find(
          (ticket) => ticket.id === row.id
        );
        if (originalTicket) {
          handleDeleteTicket(originalTicket);
        }
      },
    },
  ];

  // Transform tickets data for table
  const tableData: TicketTableData[] = filteredTickets.map(
    (ticket: ITicketData) => ({
      id: ticket.id,
      title: ticket.title,
      description:
        ticket.description.length > 50
          ? `${ticket.description.substring(0, 50)}...`
          : ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      remark:
        ticket.remark.length > 30
          ? `${ticket.remark.substring(0, 30)}...`
          : ticket.remark,
      image: ticket.image_url ? (
        <div className="flex justify-center">
          <Image
            src={ticket.image_url}
            alt="Ticket attachment"
            width={60}
            height={60}
            className="w-15 h-15 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(ticket.image_url!)}
          />
        </div>
      ) : (
        <span className="text-gray-400 text-sm">No image</span>
      ),
      created_at: formatDate(ticket.created_at),
      updated_at: formatDate(ticket.updated_at),
    })
  );

  const safeProject = projectData
    ? {
        ...projectData,
        milestones: (projectData.milestones || []).map((m) => ({
          ...m,
          id: m.id || "",
          name: m.name || "",
          tasks: (m.tasks || []).map((t) => ({
            ...t,
            id: t.id || "",
            title: t.title || "",
          })),
        })),
      }
    : null;

  const idToName = buildIdToNameMapping(
    projectData?.client ? [projectData.client] : [],
    safeProject ? [safeProject] : []
  );

  if (projectLoading) {
    return (
      <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
        <Breadcrumb idToName={idToName} />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading project details...</div>
        </div>
      </section>
    );
  }

  if (!projectData) {
    return (
      <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
        <Breadcrumb />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Project not found.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb idToName={idToName} />

      {/* Header */}
      <div className="flex flex-wrap md:flex-row flex-col gap-4 2xl:gap-[1.5vw] justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl 2xl:text-[1.8vw] font-semibold">
            Tickets for: {projectData?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Total Tickets: {(ticketsData || []).length}
          </p>
        </div>
        <div className="flex gap-4 2xl:gap-[1vw]">
          <Button
            title="Back to Projects"
            variant="primary-outline"
            onClick={handleBackToProjects}
            width="w-full md:w-fit"
          />
          <Button
            title="Generate New Ticket"
            variant="primary"
            onClick={() => {
              setModalMode("create");
              setSelectedTicket(null);
              setIsGenerateTicketModalOpen(true);
            }}
            width="w-full md:w-fit"
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw] justify-between items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-3 2xl:gap-[0.75vw] w-full md:w-auto">
          <div className="w-full sm:w-48 2xl:w-[12vw]">
            <Dropdown
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
            />
          </div>
          <div className="w-full sm:w-48 2xl:w-[12vw]">
            <Dropdown
              options={priorityOptions}
              value={priorityFilter}
              onChange={(value) => setPriorityFilter(value)}
            />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      {ticketsLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin border-4 border-primary border-t-transparent rounded-full w-8 h-8"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">
            Failed to load tickets. Please try again.
          </p>
          <Button
            title="Retry"
            variant="primary-outline"
            onClick={() => window.location.reload()}
            width="w-32"
          />
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            {statusFilter || priorityFilter
              ? "No tickets found matching your filters."
              : "No tickets found for this project."}
          </p>
          { !statusFilter && !priorityFilter && (
            <Button
              title="Generate First Ticket"
              variant="primary"
              onClick={() => {
                setModalMode("create");
                setSelectedTicket(null);
                setIsGenerateTicketModalOpen(true);
              }}
              width="w-48"
            />
          )}
        </div>
      ) : (
        <div className="max-h-[60vh] overflow-y-auto">
          <Table data={tableData} columns={columns} actions={tableActions} />
        </div>
      )}

      {/* Generate/Edit Ticket Modal */}
      <GenerateTicketModal
        isOpen={isGenerateTicketModalOpen}
        onClose={() => {
          setIsGenerateTicketModalOpen(false);
          setSelectedTicket(null);
          setModalMode("create");
        }}
        projectId={projectId}
        projectName={projectData?.name || ""}
        mode={modalMode}
        ticket={selectedTicket}
      />

      {/* Image Popup Modal */}
      <ModalOverlay
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setSelectedImage(null);
        }}
        modalTitle="Ticket Image"
        modalClassName="w-full md:w-[80vw] 2xl:w-[80vw] max-w-4xl"
      >
        <div className="flex justify-center items-center p-4">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Ticket attachment"
              width={800}
              height={600}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          )}
        </div>
      </ModalOverlay>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setTicketToDelete(null);
        }}
        onConfirm={confirmDeleteTicket}
        isLoading={false}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket "
        itemName={ticketToDelete?.title}
      />
    </section>
  );
};
