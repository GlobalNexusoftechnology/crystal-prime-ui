"use client";
import { useEffect, useState, useMemo } from "react";
import { Button, Dropdown, SearchBar, Table, DatePicker } from "@/components";
import {
  EAction,
  EModule,
  ILeadsListDetailsProps,
  ILeadsListProps,
  ITableAction,
  leadsListColumn,
} from "@/constants";
import { ExportIcon } from "@/features";
import { EditLeadModal, LeadDetailModal } from "./components";
import {
  IDeleteLeadResponse,
  useAllLeadDownloadExcelQuery,
  useAllLeadsListQuery,
  useAllStatusesQuery,
  useAllTypesQuery,
  useDeleteLeadMutation,
  useLeadDetailQuery,
  useLeadDownloadTemplateExcelQuery,
} from "@/services";
import { downloadBlobFile, formatDate, IApiError } from "@/utils";
import { FiPlus, FiX } from "react-icons/fi";
import { ImDownload2 } from "react-icons/im";
import { usePermission } from "@/utils/hooks";
import { useDebounce } from "@/utils/hooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface LeadsListTableProps {
  setAddLeadModalOpen: (arg0: boolean) => void;
}

export function LeadsListTable({ setAddLeadModalOpen }: LeadsListTableProps) {
  const queryClient = useQueryClient();
  const [leadId, setLeadId] = useState("");
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedType, setSelectedType] = useState("All Type");
  const [viewLead, setViewLead] = useState<ILeadsListProps | null>(null);
  const [followupFromDate, setFollowupFromDate] = useState("");
  const [followupToDate, setFollowupToDate] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState<
    "All" | "Daily" | "Weekly" | "Monthly"
  >("All");

  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {}, // not needed for this use case
  });

  const filters = useMemo(
    () => ({
      searchText: searchQuery,
      statusId: selectedStatus,
      typeId: selectedType,
      dateRange: dateRangeFilter,
      followupFrom: followupFromDate || undefined,
      followupTo: followupToDate || undefined,
    }),
    [
      searchQuery,
      selectedStatus,
      selectedType,
      dateRangeFilter,
      followupFromDate,
      followupToDate,
    ]
  );

  const {
    data: allLeadList,
    isLoading,
    isError,
    error,
  } = useAllLeadsListQuery(filters);
  const { allStatusesData } = useAllStatusesQuery();
  const { allTypesData } = useAllTypesQuery();
  const { onAllLeadDownloadExcel } = useAllLeadDownloadExcelQuery();

  const { onLeadDownloadTemplateExcel } = useLeadDownloadTemplateExcelQuery();

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
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err?.message);
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
        onDeleteLead(row.id);
      },
      className: "text-red-500",
    });
  }

  const leadsList: ILeadsListProps[] = (allLeadList?.data?.list ?? []).map(
    (lead) => {
      const status = allStatusesData?.find((s) => s.id === lead?.status?.id);
      return {
        id: lead?.id || "N/A",
        first_name: lead?.first_name || "N/A",
        last_name: lead?.last_name || "N/A",
        phone: lead?.phone || "N/A",
        other_contact: lead?.other_contact || "N/A",
        email: lead?.email
          ? String(lead.email)
              .split(/,\s*/)
              .map((email) => email.trim())
              .filter(Boolean)
          : [],
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

  const leadDetailModalData: ILeadsListDetailsProps = {
    id: leadDetailById?.id || "null",
    first_name: leadDetailById?.first_name || "null",
    last_name: leadDetailById?.last_name || "null",
    phone: leadDetailById?.phone || "null",
    other_contact: leadDetailById?.other_contact || "null",
    email: leadDetailById?.email ? [leadDetailById?.email] : [],
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
    ...(allStatusesData?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || []),
  ];

  const typeOptions = [
    { label: "All Type", value: "All Type" },
    ...(allTypesData?.map((type) => ({
      label: type?.name,
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

  if (isError) {
    return (
      <div className="text-center py-6 text-red-500">
        Error loading leads: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Leads List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[20vw]"
          />
          {cavAddLeadManagement && (
            <div className="w-full md:w-fit flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
              <Button
                title="Add Lead"
                variant="background-white"
                width="w-full md:w-fit"
                leftIcon={
                  <FiPlus className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
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
              <ImDownload2 className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
            }
            tooltip="Download Template"
          />
        </div>
      </div>
      <div className="flex justify-start items-end flex-wrap gap-4 2xl:gap-[1vw]">
        <div className="flex flex-col justify-start items-start">
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
                <FiX className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
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
    </div>
  );
}
