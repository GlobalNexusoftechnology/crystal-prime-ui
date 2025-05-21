"use client";
import { Dispatch, SetStateAction, useState, useMemo } from "react";
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
  useDeleteLeadMutation,
  useLeadDetailQuery,
} from "@/services";
import { IApiError } from "@/utils";

interface LeadsListTableProps {
  setAddLeadModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export function LeadsListTable({ setAddLeadModalOpen }: LeadsListTableProps) {
  const [leadId, setLeadId] = useState("");
  const { data, leadsRefetch } = useAllLeadsListQuery();
  const [ isEditLeadModalOpen, setIsEditLeadModalOpen ] = useState(false);
  const { leadDetailById, leadDetail } = useLeadDetailQuery(leadId);
  const { onDeleteLead } = useDeleteLeadMutation({
    onSuccessCallback: (data: IDeleteLeadResponse) => {
      console.log("Lead created successfully", data);
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create lead:", err);
    },
  });

  const leadDetailModalData: ILeadsListDetailsProps = {
    id: leadDetailById?.id || "",
    name: `${leadDetailById?.first_name || ""} ${
      leadDetailById?.last_name || ""
    }`,
    number: leadDetailById?.phone || "",
    email: leadDetailById?.email || "",
    businessName: leadDetailById?.company || "",
    natureOfBusiness: leadDetailById?.requirement || "",
    cityName: leadDetailById?.location || "",
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
      businessName: "",
      created_at: "",
      updated_at: "",
      name: "",
      email: "",
      phoneNumber: "",
      businessType: "",
      userType: "",
      city: "",
      country: "",
      address: "",
      registrationId: "",
      businessLicense: "",
      username: "",
      role: "",
      photo: "",
      isVendorApproved: false,
      provider: "",
      providerId: "",
      authToken: "",
      refreshToken: "",
      isSocialLogin: false,
    },
  };

  const leadsList: ILeadsListProps[] = (data ?? []).map((lead) => ({
    id: lead.id,
    name: `${lead.first_name} ${lead.last_name}`,
    number: lead.phone,
    email: lead.email,
    businessName: lead.company,
    natureOfBusiness: lead.requirement,
    cityName: lead.location,
    status: lead.status?.name ?? "Unknown",
    assignedTo: lead.assigned_to?.name ?? "Unassigned",
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [viewLead, setViewLead] = useState<ILeadsListProps | null>(null);
  const statusOptions = ["All Status", "New", "Contacted", "Qualified", "Lost"];

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleChange = (val: string) => {
    setSelectedStatus(val);
  };

  const actions: ITableAction<ILeadsListProps>[] = [
    {
      label: "Edit",
      onClick: (row: ILeadsListProps) => {
        console.log("Edit clicked", row.id);
        setIsEditLeadModalOpen(true)
      },
      className: "text-blue-500",
    },
    {
      label: "View",
      onClick: (row) => {
        leadDetail();
        setLeadId(row.id);
        setViewLead(row);
      },
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: (row: ILeadsListProps) => {
        onDeleteLead(row.id);
        leadsRefetch();
      },
      className: "text-blue-500",
    },
    {
      label: "Explore As xlsx",
      onClick: (row: ILeadsListProps) => {
        console.log("Explore As xlsx clicked", row.id);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
  ];

  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      const matchQuery =
        lead.name.toLowerCase().includes(searchQuery) ||
        lead.email.toLowerCase().includes(searchQuery) ||
        lead.number.toLowerCase().includes(searchQuery) ||
        lead.businessName.toLowerCase().includes(searchQuery) ||
        lead.natureOfBusiness.toLowerCase().includes(searchQuery) ||
        lead.cityName.toLowerCase().includes(searchQuery);

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
            <Button
              title="Add Lead"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => setAddLeadModalOpen(true)}
            />
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

      <Table data={filteredLeads} columns={leadsListColumn} actions={actions} />

      {viewLead && (
        <LeadDetailModal
          data={leadDetailModalData}
          lead={viewLead}
          onClose={() => setViewLead(null)}
        />
      )}
      {isEditLeadModalOpen && (
        <EditLeadModal setIsEditLeadModalOpen={setIsEditLeadModalOpen} />
      )}
    </div>
  );
}
