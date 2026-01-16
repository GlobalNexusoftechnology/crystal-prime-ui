/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import {
  Button,
  DatePicker,
  DeleteModal,
  Dropdown,
  SearchBar,
  SendProposalModal,
  SimpleDropdown,
  Table,
} from "@/components";
import {
  EAction,
  EModule,
  ILeadsListDetailsProps,
  ILeadsListProps,
  ITableAction,
  leadsListColumn,
} from "@/constants";
import { ExportIcon } from "@/features";
import {
  IDeleteLeadResponse,
  useAllDropdownDataQuery,
  useAllLeadDownloadExcelQuery,
  useAllLeadsListQuery,
  useAuthStore,
  useDeleteLeadMutation,
  useLeadDetailQuery,
  useLeadDownloadTemplateExcelQuery,
  useSendProposalMutation,
} from "@/services";
import { downloadBlobFile, formatDate, IApiError } from "@/utils";
import { useDebounce, usePermission } from "@/utils/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiPlus, FiX } from "react-icons/fi";
import { ImDownload2 } from "react-icons/im";
import { EditLeadModal, LeadDetailModal } from "./components";

interface LeadsListTableProps {
  setAddLeadModalOpen: (arg0: boolean) => void;
}

type ProductRow = {
  id: string;
  materialId: string;
  name: string;
  salePrice: string; // keep string in UI, convert below
  productSize: string; // keep string in UI, convert below
  totalPrice: string; // keep string in UI, convert below
  count: string;
  state?: string;
};


export function LeadsListTable({ setAddLeadModalOpen }: LeadsListTableProps) {
  const queryClient = useQueryClient();
  const [leadId, setLeadId] = useState("");
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedType, setSelectedType] = useState("All Type");
  const [selectedAssignedTo, setSelectedAssignedTo] = useState("All Assigned To");
  const [viewLead, setViewLead] = useState<ILeadsListProps | null>(null);
  const [followupFromDate, setFollowupFromDate] = useState("");
  const [followupToDate, setFollowupToDate] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState<
    "All" | "Daily" | "Weekly" | "Monthly"
  >("All");
  const [selectedAssignedToId, setSelectedAssignedToId] = useState<string | undefined>(undefined);
  const [pendingStatusName, setPendingStatusName] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSendProposalModalOpen, setIsSendProposalModalOpen] = useState(false);
  const [selectedLeadForProposal, setSelectedLeadForProposal] = useState<ILeadsListProps | null>(null);
  const { mutate: sendProposal, isPending: isSendingProposal } = useSendProposalMutation();


  // Send Proposal Handler
  // const handleSendProposal = async (proposalData: { proposalDate: string; proposalNumber: string; proposalText: string }) => {
  //   try {
  //     if (!selectedLeadForProposal?.id) {
  //       toast.error("No lead selected for proposal.");
  //       return;
  //     }

  //     await sendProposal({
  //       id: selectedLeadForProposal.id,
  //       payload: proposalData,
  //     });

  //     toast.success("Proposal sent successfully!");
  //     setIsSendProposalModalOpen(false);
  //     setSelectedLeadForProposal(null);
  //   } catch (error) {
  //     console.error("Proposal send failed:", error);
  //     toast.error("Failed to send proposal.");
  //   }
  // };



  const handleSendProposal = async (
    proposalData: {
      proposalDate: string; proposalNumber: string; proposalText: string, productsText?: string,
    },
    productRows: ProductRow[],
    
    subtotal?: any,
    taxPercent?: any,
    finalAmount?: any
  ) => {
    try {
      if (!selectedLeadForProposal?.id) {
        toast.error("No lead selected for proposal.");
        return;
      }

      // Filter only rows where a material was selected
      const selectedProducts = (productRows ?? []).filter((r) => !!r.materialId);

      if (selectedProducts.length === 0) {
        toast.error("Please add at least one product and select an item.");
        return;
      }

      // Build products payload — convert salePrice to number where possible
      const productsPayload = selectedProducts.map((p) => {
        // try to convert salePrice to a number, fallback to 0
        const parsedPrice = Number(String(p.salePrice).replace(/[^0-9.-]+/g, ""));
        const parsedProductSize = Number(String(p.productSize).replace(/[^0-9.-]+/g, ""));
        const parsedTotalPrice = Number(String(p.totalPrice).replace(/[^0-9.-]+/g, ""));
        return {
          materialId: p.materialId,
          name: p.name,
          salePrice: Number.isFinite(parsedPrice) ? parsedPrice : 0,
          productSize: Number.isFinite(parsedProductSize) ? parsedProductSize : 0,
          totalPrice: Number.isFinite(parsedTotalPrice) ? parsedTotalPrice : 0,
          count: p.count ?? "0",
          state: p.state ?? ""
          // add other fields if your API expects them, e.g. quantity
          // quantity: p.quantity ?? 1,
        };
      });

      // Final payload structure (adjust if your API expects different keys)
      const payload = {
        ...proposalData,
        // productsText: proposalData.products,
        subtotal: subtotal,
        taxPercent: taxPercent,
        finalAmount: finalAmount,
        products: productsPayload,
      };
      console.log("payload", payload);

      await sendProposal({
        id: selectedLeadForProposal.id,
        payload,
      });

      toast.success("Proposal sent successfully!");
      setIsSendProposalModalOpen(false);
      setSelectedLeadForProposal(null);
    } catch (error) {
      console.error("Proposal send failed:", error);
      toast.error("Failed to send proposal.");
    }
  };


  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => { }, // not needed for this use case
  });

  const filters = useMemo(
    () => ({
      searchText: searchQuery,
      statusId:
        selectedStatus && selectedStatus !== "All Status"
          ? selectedStatus
          : undefined,
      typeId:
        selectedType && selectedType !== "All Type" ? selectedType : undefined,
      dateRange: dateRangeFilter,
      followupFrom: followupFromDate || undefined,
      followupTo: followupToDate || undefined,
      assignedToId: selectedAssignedToId || undefined,
      assignedTo: selectedAssignedTo && selectedAssignedTo !== "All Assigned To" ? selectedAssignedTo : undefined,
      page: currentPage,
    }),
    [searchQuery, selectedStatus, selectedType, dateRangeFilter, followupFromDate, followupToDate, selectedAssignedToId, selectedAssignedTo, currentPage]
  );

  const { activeSession } = useAuthStore();

  // React to card clicks from LeadManagement cards
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ card?: string }>).detail;
      const card = (detail?.card || "").toLowerCase();
      if (card.includes("business")) {
        // Defer until statuses arrive if needed
        setPendingStatusName("business done");
        // clear other filters
        setDateRangeFilter("All");
        setFollowupFromDate("");
        setFollowupToDate("");
        setSelectedAssignedToId(undefined);
      } else if (card.includes("followup")) {
        // Filter by today's followups (due_date) not created_at
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const isoDate = `${yyyy}-${mm}-${dd}`;
        setFollowupFromDate(isoDate);
        setFollowupToDate(isoDate);
        setDateRangeFilter("All");
        setSelectedStatus("All Status");
        setSelectedAssignedToId(undefined);
      } else if (card.includes("assigned")) {
        // Filter by current user assignments
        const uid = activeSession?.user?.id;
        setSelectedAssignedToId(uid || undefined);
        setSelectedStatus("All Status");
        setDateRangeFilter("All");
        setFollowupFromDate("");
        setFollowupToDate("");
      } else if (card.includes("total")) {
        setSelectedStatus("All Status");
        setSelectedType("All Type");
        setSelectedAssignedTo("All Assigned To");
        setDateRangeFilter("All");
        setFollowupFromDate("");
        setFollowupToDate("");
        setSelectedAssignedToId(undefined);
      }
      setCurrentPage(1);
    };
    window.addEventListener("lead-cards-filter", handler as EventListener);
    return () =>
      window.removeEventListener("lead-cards-filter", handler as EventListener);
  }, [activeSession?.user?.id]);

  // Resolve pending business done once statuses are loaded
  const { allTypesData, allUsersData, allStatusesData } = useAllDropdownDataQuery()
  useEffect(() => {
    if (!pendingStatusName) return;
    const list = allStatusesData?.data?.list || [];
    if (!list || list.length === 0) return;
    const target = list.find((s: { id?: string; name?: string }) => (s?.name || "").toLowerCase().includes("business"));
    if (target?.id) {
      setSelectedStatus(String(target.id));
      setPendingStatusName(null);
    }
  }, [pendingStatusName, allStatusesData]);

  const {
    data: allLeadList,
    isLoading,
    isError,
    error,
  } = useAllLeadsListQuery(filters);
  // moved above for dependency usage

  const { onAllLeadDownloadExcel } = useAllLeadDownloadExcelQuery();
  const { onLeadDownloadTemplateExcel } = useLeadDownloadTemplateExcelQuery();

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedStatus,
    selectedType,
    dateRangeFilter,
    followupFromDate,
    followupToDate,
  ]);

  const { hasPermission } = usePermission();
  const cavAddLeadManagement = hasPermission(
    EModule.LEAD_MANAGEMENT,
    EAction.ADD
  );
  const cavViewLeadManagement = hasPermission(
    EModule.LEAD_MANAGEMENT,
    EAction.VIEW
  );
  const cavEditLeadManagement = hasPermission(
    EModule.LEAD_MANAGEMENT,
    EAction.EDIT
  );
  const cavDeleteLeadManagement = hasPermission(
    EModule.LEAD_MANAGEMENT,
    EAction.DELETE
  );

  const handleLeadDownloadExcel = async () => {
    const filters = {
      searchText: searchQuery,
      statusId: selectedStatus,
      typeId: selectedType,
      dateRange: dateRangeFilter,
      followupFrom: followupFromDate
        ? new Date(followupFromDate).toISOString()
        : undefined,
      followupTo: followupToDate
        ? new Date(followupToDate).toISOString()
        : undefined,
    };
    const blob = await onAllLeadDownloadExcel(filters);
    if (blob instanceof Blob) {
      await downloadBlobFile(blob, `leads_data.xlsx`);
    }
  };

  const handleLeadDownloadTemplateExcel = async () => {
    const { data } = await onLeadDownloadTemplateExcel();
    if (data instanceof Blob) {
      await downloadBlobFile(data, `upload_lead_template.xlsx`);
    }
  };

  const {
    leadDetailById,
    isLoading: isLeadDetailLoading,
    leadDetail: refetchLeadDetail,
  } = useLeadDetailQuery(leadId);

  const { onDeleteLead } = useDeleteLeadMutation({
    onSuccessCallback: (response: IDeleteLeadResponse) => {
      queryClient.invalidateQueries({ queryKey: ["leads-list-query-key"] });
      toast.success(response?.message);
      setShowDeleteModal(false);
      setDeleteId(null);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err?.message);
      setShowDeleteModal(false);
      setDeleteId(null);
    },
  });

  // Fetch lead details on view/edit open
  useEffect(() => {
    if (leadId) refetchLeadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leadId, leadDetailById, isEditLeadModalOpen, viewLead]);

  const leadLeadManagementAction: ITableAction<ILeadsListProps>[] = [];

  if (cavViewLeadManagement) {
    leadLeadManagementAction.push({
      label: "View",
      onClick: (row: ILeadsListProps) => {
        setLeadId(row.id);
        setViewLead(row);
      },
      className: "text-blue-500",
    });
  }
  if (cavEditLeadManagement) {
    leadLeadManagementAction.push({
      label: "Edit",
      onClick: (row: ILeadsListProps) => {
        setLeadId(row.id);
        setIsEditLeadModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (cavDeleteLeadManagement) {
    leadLeadManagementAction.push({
      label: "Delete",
      onClick: (row: ILeadsListProps) => {
        setDeleteId(row.id);
        setShowDeleteModal(true);
      },
      className: "text-red-500",
    });
  }

  // Add Send Proposal action
  leadLeadManagementAction.push({
    label: "Create Proposal",
    onClick: (row) => {
      setSelectedLeadForProposal(row);
      setIsSendProposalModalOpen(true);
    },
    className: "text-green-600",
  });

  const leadsList: ILeadsListProps[] = (allLeadList?.data?.list ?? []).map(
    (lead) => {
      const status = allStatusesData?.data?.list?.find(
        (s) => s.id === lead?.status?.id
      );
      return {
        id: lead?.id || "N/A",
        first_name: lead?.first_name || "N/A",
        last_name: lead?.last_name || "N/A",
        phone: lead?.phone || "N/A",
        other_contact: lead?.other_contact || "N/A",
        email: lead?.email || "N/A",
        company: lead?.company || "N/A",
        location: lead?.location || "N/A",
        budget: lead?.budget || "N/A",
        possibility_of_conversion: lead?.possibility_of_conversion ?? null,
        requirement: lead?.requirement || "N/A",
        source_id: lead?.source?.name || "N/A",
        status_id: status?.name || "N/A",
        status_color: status?.color || "#888888",
        type_id: lead?.type?.name || "N/A",
        created_at: lead?.created_at || "N/A",
        updated_at: lead?.updated_at || "N/A",
        deleted_at: lead?.deleted_at || "N/A",
        assigned_to:
          `${lead?.assigned_to?.first_name} ${lead?.assigned_to?.last_name}` ||
          "Unassigned",
      };
    }
  );

  // Extract pagination data
  const paginationData = allLeadList?.data?.pagination;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const leadDetailModalData: ILeadsListDetailsProps = {
    id: leadDetailById?.id || "null",
    first_name: leadDetailById?.first_name || "null",
    last_name: leadDetailById?.last_name || "null",
    phone: leadDetailById?.phone || "null",
    other_contact: leadDetailById?.other_contact || "null",
    email: leadDetailById?.email || "",
    company: leadDetailById?.company || "null",
    requirement: leadDetailById?.requirement || "null",
    location: leadDetailById?.location || "null",
    budget: leadDetailById?.budget || "null",
    possibility_of_conversion:
      leadDetailById?.possibility_of_conversion ?? null,
    status: leadDetailById?.status || {
      id: leadDetailById?.status?.id || "null",
      name: leadDetailById?.status?.name || "null",
      created_at: leadDetailById?.status?.created_at || "null",
      updated_at: leadDetailById?.status?.updated_at || "null",
      deleted: leadDetailById?.status?.deleted || false,
      deleted_at: leadDetailById?.deleted_at || "null",
    },
    created_at: leadDetailById?.created_at || "null",
    updated_at: leadDetailById?.updated_at || "null",
    created_by: leadDetailById?.created_by || "null",
    updated_by: leadDetailById?.updated_by || "null",
    deleted_at: leadDetailById?.deleted_at || "null",
    assignedTo: leadDetailById?.assigned_to || {
      id: leadDetailById?.assigned_to?.id || "",
      employee_id: leadDetailById?.assigned_to?.employee_id || "",
      first_name: leadDetailById?.assigned_to?.first_name || "",
      last_name: leadDetailById?.assigned_to?.last_name || "",
      number: leadDetailById?.assigned_to?.number || "",
      email: leadDetailById?.assigned_to?.email || "",
      role: leadDetailById?.assigned_to?.role || "",
      dob: leadDetailById?.assigned_to?.dob || "",
      role_id: leadDetailById?.assigned_to?.role_id || "",
      created_at:
        formatDate(`${leadDetailById?.assigned_to?.created_at}`) || "",
      updated_at:
        formatDate(`${leadDetailById?.assigned_to?.updated_at}`) || "",
    },
    source: leadDetailById?.source || {
      id: leadDetailById?.source?.id || "null",
      name: leadDetailById?.source?.name || "null",
      created_at: leadDetailById?.source?.created_at || "null",
      updated_at: leadDetailById?.source?.updated_at || "null",
      deleted: leadDetailById?.source?.deleted || false,
      deleted_at: leadDetailById?.source?.deleted_at || "null",
    },
    type: leadDetailById?.type || {
      id: leadDetailById?.type?.id || "null",
      name: leadDetailById?.type?.name || "null",
      created_at: leadDetailById?.type?.created_at || "null",
      updated_at: leadDetailById?.type?.updated_at || "null",
      deleted: leadDetailById?.type?.deleted || false,
      deleted_at: leadDetailById?.type?.deleted_at || "null",
    },
  };

  const handleSearch = (query: string) => {
    setSearchInput(query.toLowerCase());
  };

  const statusOptions = [
    { label: "All Status", value: "All Status" },
    ...(allStatusesData?.data?.list?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || []),
  ];

  const typeOptions = [
    { label: "All Type", value: "All Type" },
    ...(allTypesData?.data?.list?.map((type) => ({
      label: type?.name,
      value: type?.id.toString(),
    })) || []),
  ];

  const assignedToOptions = [
    { label: "All Assigned To", value: "All Assigned To" },
    ...(allUsersData?.data?.list?.map((type) => ({
      label: `${type?.first_name} ${type.last_name}`,
      value: type?.id.toString(),
    })) || []),
  ];

  const dateRangeOptions = [
    { label: "All", value: "All" },
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
  ];

  const handleStatusChange = (val: string) => {
    setSelectedStatus(val);
  };

  const handleTypeChange = (val: string) => {
    setSelectedType(val);
  };

  const handleAssignedToChange = (val: string) => {
    setSelectedAssignedTo(val);
  };

  const handleDateRangeChange = (val: string) => {
    setDateRangeFilter(val as "All" | "Daily" | "Weekly" | "Monthly");
  };

  const handleClearFollowupDates = () => {
    setFollowupFromDate("");
    setFollowupToDate("");
  };

  const handleFollowupFromDateChange = (date: string) => {
    if (followupToDate && new Date(date) > new Date(followupToDate)) {
      return;
    }
    setFollowupFromDate(date);
  };

  const handleFollowupToDateChange = (date: string) => {
    if (followupFromDate && new Date(date) < new Date(followupFromDate)) {
      return;
    }
    setFollowupToDate(date);
  };

  const leadNameToDelete = deleteId
    ? (() => {
      const lead = leadsList.find((l) => l.id === deleteId);
      return lead ? `${lead.first_name} ${lead.last_name}` : "";
    })()
    : "";

  if (isError) {
    return (
      <div className="text-center py-6 text-red-500">
        Error loading leads: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6  bg-customGray mx-4  p-4  border  rounded-xl ">
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <h1 className="text-[1.2rem]  font-medium">
          Leads List
        </h1>
        <div className="flex items-center flex-wrap gap-4 ">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[20vw]"
          />
          {cavAddLeadManagement && (
            <div className="w-full md:w-fit flex items-center flex-wrap gap-4 ">
              <Button
                title="Add Lead"
                variant="background-white"
                width="w-full md:w-fit"
                leftIcon={
                  <FiPlus className="w-5 h-5  " />
                }
                onClick={() => setAddLeadModalOpen(true)}
              />
            </div>
          )}
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
            onClick={handleLeadDownloadExcel}
          />
          <Button
            variant="background-white"
            width="w-full md:w-fit"
            onClick={handleLeadDownloadTemplateExcel}
            leftIcon={
              <ImDownload2 className="w-5 h-5  " />
            }
            tooltip="Download Template"
          />
        </div>
      </div>
      <div className="flex justify-start items-end flex-wrap gap-4 ">
        <div className="w-full md:w-fit flex flex-col justify-start items-start">
          <DatePicker
            label="Follow Up From"
            value={followupFromDate}
            onChange={handleFollowupFromDateChange}
            datePickerWidth="w-full md:w-fit"
          />
        </div>
        <DatePicker
          label="Follow Up To"
          minDate={followupFromDate}
          value={followupToDate}
          onChange={handleFollowupToDateChange}
          datePickerWidth="w-full md:w-fit"
        />
        {(followupFromDate || followupToDate) && (
          <div>
            <Button
              variant="background-white"
              width="w-full md:w-fit"
              onClick={handleClearFollowupDates}
              leftIcon={
                <FiX className="w-5 h-5  " />
              }
              tooltip="Clear Dates"
            />
          </div>
        )}
        <Dropdown
          options={statusOptions}
          value={selectedStatus}
          onChange={handleStatusChange}
          dropdownWidth="w-full md:w-fit"
        />
        <Dropdown
          options={typeOptions}
          value={selectedType}
          onChange={handleTypeChange}
          dropdownWidth="w-full md:w-fit"
        />
        <Dropdown
          options={assignedToOptions}
          value={selectedAssignedTo}
          onChange={handleAssignedToChange}
          dropdownWidth="w-full md:w-fit"
        />
        <SimpleDropdown
          options={dateRangeOptions}
          value={dateRangeFilter}
          onChange={handleDateRangeChange}
          dropdownWidth="w-full md:w-fit"
        />
      </div>
      {isLoading ? (
        <div className="text-center py-6 text-gray-500">Loading leads...</div>
      ) : leadsList.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No leads found.</div>
      ) : (
        <Table
          data={leadsList}
          columns={leadsListColumn}
          actions={leadLeadManagementAction}
          paginationData={paginationData}
          onPageChange={handlePageChange}
        />
      )}

      {/* Conditionally render modals only when data is loaded */}
      {viewLead && (
        <LeadDetailModal
          onClose={() => setViewLead(null)}
          data={leadDetailModalData}
          lead={viewLead}
        />
      )}
      {leadDetailById && isEditLeadModalOpen && !isLeadDetailLoading && (
        <EditLeadModal
          setIsEditLeadModalOpen={setIsEditLeadModalOpen}
          lead={leadDetailById}
        />
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) onDeleteLead(deleteId);
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        isLoading={false}
        title="Delete Lead"
        message="Are you sure you want to delete this lead "
        itemName={leadNameToDelete}
      />

      <SendProposalModal
        isOpen={isSendProposalModalOpen}
        onClose={() => {
          setIsSendProposalModalOpen(false);
          setSelectedLeadForProposal(null);
        }}
        onSubmit={handleSendProposal}
        initialValues={{
          proposalDate: new Date().toISOString().split("T")[0],
          proposalNumber: "",
          proposalText: "",
          productsText: "",
        }}
        isPending={isSendingProposal}
      />
    </div>
  );
}