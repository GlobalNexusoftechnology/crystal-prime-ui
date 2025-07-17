import { useState } from "react";
import { DatePicker, Dropdown } from "@/components";
import { useAllClientQuery, useAllProjectsQuery } from "@/services";

export function ProjectSearchFilter() {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { allProjectsData } = useAllProjectsQuery();
  const { allClientData } = useAllClientQuery();

  const projectOptions = (allProjectsData || []).map((project) => ({
    label: project.name,
    value: project.id,
  }));

  const clientOptions = (allClientData || []).map((client) => ({
    label: client.name,
    value: client.id,
  }));

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw] mb-6 2xl:mb-[1vw]">
      <div>
        <Dropdown
          label="Project Title"
          options={projectOptions}
          value={selectedProject}
          onChange={setSelectedProject}
          dropdownWidth="w-full"
        />
      </div>
      <div>
        <Dropdown
          label="Client Name"
          options={clientOptions}
          value={selectedClient}
          onChange={setSelectedClient}
          dropdownWidth="w-full"
        />
      </div>
      <div>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          placeholder="Start Date"
        />
      </div>
      <div>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          placeholder="End Date"
        />
      </div>
    </form>
  );
}
