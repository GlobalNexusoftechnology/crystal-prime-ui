"use client";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import {
  ILeadsListDetailsProps,
  ILeadsListProps,
  ITableAction,
  leadsListColumn,
} from "@/constants";
import { ExportIcon } from "@/features";
import { EditLeadModal, LeadDetailModal } from "./components";
import {
  IDeleteLeadResponse,
  useAllLeadsListQuery,
  useAllStatusesQuery,
  useDeleteLeadMutation,
  useLeadDetailQuery,
} from "@/services";
import { IApiError } from "@/utils";

interface LeadsListTableProps {
  setAddLeadModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export function LeadsListTable({ setAddLeadModalOpen }: LeadsListTableProps) {
  const [leadId, setLeadId] = useState("");
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [viewLead, setViewLead] = useState<ILeadsListProps | null>(null);

  const { data, isLoading, leadsRefetch } = useAllLeadsListQuery();
  const { allStatusesData } = useAllStatusesQuery();
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
  }, [
    leadId,
    leadDetailById,
    isEditLeadModalOpen,
    viewLead,
    refetchLeadDetail,
  ]);

  const actions: ITableAction<ILeadsListProps>[] = [
    {
      label: "Edit",
      onClick: (row) => {
        setLeadId(row.id);
        setIsEditLeadModalOpen(true);
      },
      className: "text-primary",
    },
    {
      label: "View",
      onClick: (row) => {
        setLeadId(row.id);
        setViewLead(row);
      },
      className: "text-primary",
    },
    {
      label: "Delete",
      onClick: (row) => {
        onDeleteLead(row.id);
      },
      className: "text-primary",
    },
    {
      label: "Export As xlsx",
      onClick: (row) => {
        console.log("Export clicked", row.id);
      },
      className: "text-primary whitespace-nowrap",
    },
  ];

  const statusOptions =
    allStatusesData?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || [];

  const leadDetailModalData: ILeadsListDetailsProps = {
    id: leadDetailById?.id || "",
    first_name: leadDetailById?.first_name || "",
    last_name: leadDetailById?.last_name || "",
    phone: leadDetailById?.phone || "",
    email: leadDetailById?.email || "",
    company: leadDetailById?.company || "",
    requirement: leadDetailById?.requirement || "",
    location: leadDetailById?.location || "",
    budget: leadDetailById?.budget || "",
    status: leadDetailById?.status || {
      id: "",
      name: "",
      created_at: "",
      updated_at: "",
      deleted: false,
      deleted_at: null,
    },
    assignedTo: leadDetailById?.assigned_to || {
      id: "",
      first_name: "Unassigned",
      last_name: "Unassigned",
      email: "",
      phoneNumber: "",
      businessName: "",
      businessType: "",
      role: "",
      photo: "",
      address: "",
      city: "",
      country: "",
      registrationId: "",
      businessLicense: "",
      userType: "",
      username: "",
      isVendorApproved: false,
      provider: "",
      providerId: "",
      authToken: "",
      refreshToken: "",
      isSocialLogin: false,
      created_at: "",
      updated_at: "",
    },
    source: leadDetailById?.source || {
      id: "",
      name: "",
      created_at: "",
      updated_at: "",
      deleted: false,
      deleted_at: null,
    },
  };

  const leadsList: ILeadsListProps[] = (data ?? []).map((lead) => ({
    id: lead?.id || "",
    first_name: lead?.first_name || "",
    last_name: lead?.last_name || "",
    phone: lead?.phone || "",
    email: lead?.email || "",
    company: lead?.company || "",
    location: lead?.location || "",
    budget: lead?.budget || "",
    requirement: lead?.requirement || "",
    source_id: lead?.source?.name || "N/A",
    status_id: lead?.status?.name || "N/A",
    assigned_to: `${lead?.assigned_to?.first_name} ${lead?.assigned_to?.last_name}` || "Unassigned",
  }));

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

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
        lead.location?.toLowerCase().includes(searchQuery);
      return matchQuery;
    });
  }, [leadsList, searchQuery]);

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
          {setAddLeadModalOpen && (
            <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
              <Button
                title="Add Lead"
                variant="background-white"
                width="w-full md:w-fit"
                onClick={() => setAddLeadModalOpen(true)}
              />
              <Button
                title="Download Template"
                variant="background-white"
                width="w-full md:w-fit"
              />
            </div>
          )}
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
          actions={actions}
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
