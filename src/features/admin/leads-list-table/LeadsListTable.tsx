"use client";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
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
  useDeleteLeadMutation,
  useLeadDetailQuery,
  useLeadDownloadTemplateExcelQuery,
} from "@/services";
import { downloadBlobFile, formatDate, IApiError } from "@/utils";
import { FiPlus } from "react-icons/fi";
import { ImDownload2 } from "react-icons/im";
import { usePermission } from "@/utils/hooks";

interface LeadsListTableProps {
  setAddLeadModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export function LeadsListTable({ setAddLeadModalOpen }: LeadsListTableProps) {
  const [leadId, setLeadId] = useState("");
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [viewLead, setViewLead] = useState<ILeadsListProps | null>(null);

  const { data: allLeadList, isLoading, leadsRefetch } = useAllLeadsListQuery();
  const { allStatusesData } = useAllStatusesQuery();
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
    const { data } = await onAllLeadDownloadExcel();
    if (data instanceof Blob) {
      await downloadBlobFile(data, `leads_${new Date().getTime()}.xlsx`);
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
    onSuccessCallback: (data: IDeleteLeadResponse) => {
      console.log("Lead deleted successfully", data);
      leadsRefetch();
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to delete lead:", err);
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

  const leadDetailModalData: ILeadsListDetailsProps = {
    id: leadDetailById?.id || "null",
    first_name: leadDetailById?.first_name || "null",
    last_name: leadDetailById?.last_name || "null",
    phone: leadDetailById?.phone || "null",
    other_contact: leadDetailById?.other_contact || "null",
    email: leadDetailById?.email || "null",
    company: leadDetailById?.company || "null",
    requirement: leadDetailById?.requirement || "null",
    location: leadDetailById?.location || "null",
    budget: leadDetailById?.budget || "null",
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

  const leadsList: ILeadsListProps[] = (allLeadList?.data?.list ?? []).map(
    (lead) => ({
      id: lead?.id || "N/A",
      first_name: lead?.first_name || "N/A",
      last_name: lead?.last_name || "N/A",
      phone: lead?.phone || "N/A",
      other_contact: lead?.other_contact || "N/A",
      email: lead?.email || "N/A",
      company: lead?.company || "N/A",
      location: lead?.location || "N/A",
      budget: lead?.budget || "N/A",
      requirement: lead?.requirement || "N/A",
      source_id: lead?.source?.name || "N/A",
      status_id: lead?.status?.name || "N/A",
      type_id: lead?.type?.name || "N/A",
      created_at: lead?.created_at || "N/A",
      updated_at: lead?.updated_at || "N/A",
      deleted_at: lead?.deleted_at || "N/A",
      assigned_to:
        `${lead?.assigned_to?.first_name} ${lead?.assigned_to?.last_name}` ||
        "Unassigned",
    })
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const statusOptions = [
    { label: "All Status", value: "All Status" },
    ...(allStatusesData?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || []),
  ];

  const handleChange = (val: string) => {
    setSelectedStatus(val);
  };

  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      const matchQuery =
        lead.id?.toLowerCase().includes(searchQuery) ||
        lead.first_name?.toLowerCase().includes(searchQuery) ||
        lead.last_name?.toLowerCase().includes(searchQuery) ||
        lead.phone?.toLowerCase().includes(searchQuery) ||
        lead.company?.toLowerCase().includes(searchQuery) ||
        lead.budget?.toLowerCase().includes(searchQuery) ||
        lead.requirement?.toLowerCase().includes(searchQuery) ||
        lead.email?.toLowerCase().includes(searchQuery) ||
        lead.location?.toLowerCase().includes(searchQuery) ||
        lead.type_id?.toLowerCase().includes(searchQuery) 


      const matchStatus =
        selectedStatus === "All Status" ||
        lead.status_id?.toLowerCase() ===
          allStatusesData
            ?.find((status) => status.id.toString() === selectedStatus)
            ?.name?.toLowerCase();

      return matchQuery && matchStatus;
    });
  }, [leadsList, searchQuery, selectedStatus, allStatusesData]);

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
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          {setAddLeadModalOpen &&
            (cavAddLeadManagement ? (
              <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
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
            ) : null)}
          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            onChange={handleChange}
            dropdownWidth="w-full md:w-fit"
          />
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

      {isLoading ? (
        <div className="text-center py-6 text-gray-500">Loading leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No leads found.</div>
      ) : (
        <Table
          data={filteredLeads}
          columns={leadsListColumn}
          actions={leadLeadManagementAction}
        />
      )}

      {/* Conditionally render modals only when data is loaded */}
      {viewLead && !isLeadDetailLoading && (
        <LeadDetailModal
          data={leadDetailModalData}
          lead={viewLead}
          onClose={() => setViewLead(null)}
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
