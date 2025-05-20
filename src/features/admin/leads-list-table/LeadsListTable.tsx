"use client";
import { Dispatch, SetStateAction, useState, useMemo } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import { ILeadsListProps, ITableAction, leadsListColumn } from "@/constants";
import { ExportIcon } from "@/features";
import { ModalView } from "./components";
import { useAllLeadsListQuery } from "@/services";

interface LeadsListTableProps {
  setAddLeadModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export function LeadsListTable({ setAddLeadModalOpen }: LeadsListTableProps) {
  const { data } = useAllLeadsListQuery();

  const leadsList: ILeadsListProps[] = (data ?? []).map((lead) => ({
    id: lead.id,
    name: `${lead.first_name} ${lead.last_name}`,
    number: lead.phone,
    email: lead.email,
    businessName: lead.company,
    natureOfBusiness: lead.requirement,
    cityName: lead.location,
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
      },
      className: "text-blue-500",
    },
    {
      label: "View",
      onClick: (row) => setViewLead(row),
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: (row: ILeadsListProps) => {
        console.log("Delete clicked", row.id);
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
        <ModalView lead={viewLead} onClose={() => setViewLead(null)} />
      )}
    </div>
  );
}
