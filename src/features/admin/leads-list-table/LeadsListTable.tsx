"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Dropdown, SearchBar, Table } from "@/components";
import { actions, ILeadsListProps, leadsListColumn } from "@/constants";
import { ExportIcon } from "@/features";
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

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusOptions = ["All Status", "New", "Contacted", "Qualified", "Lost"];

  const handleChange = (val: string) => {
    setSelectedStatus(val);
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Leads List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={(query) => console.log("Searching:", query)}
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
      <Table data={leadsList} columns={leadsListColumn} actions={actions} />
    </div>
  );
}
