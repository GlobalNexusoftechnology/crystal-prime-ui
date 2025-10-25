import { DatePicker, Dropdown, InputField } from "@/components";

interface ProjectSearchFilterProps {
  projects: { id: string; name: string; client_id: string }[];
  clients: { id: string; name: string }[];
  selectedProject: string;
  setSelectedProject: (id: string) => void;
  selectedClient: string;
  setSelectedClient: (id: string) => void;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
}

export function ProjectSearchFilter({
  projects,
  clients,
  selectedProject,
  setSelectedProject,
  selectedClient,
  // setSelectedClient,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: ProjectSearchFilterProps) {
  const projectOptions = (projects || [])?.map((project) => ({
    label: project.name,
    value: project.id,
  }));

  // const clientOptions = (clients || [])?.map((client) => ({
  //   label: client.name,
  //   value: client.id,
  // }));

  // Determine client name (read-only) based on selected project or selected client
  const selectedProjectClientId = projects.find((p) => p.id === selectedProject)?.client_id;
  const clientIdToShow = selectedProjectClientId || selectedClient;
  const clientNameToShow = clients.find((c) => c.id === clientIdToShow)?.name || "";

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4  mb-6 ">
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
        <InputField
          label="Client Name"
          value={clientNameToShow}
          placeholder="Client Name"
          disabled
          readOnly
        />
      </div>
      <div>
        <DatePicker
          label="Start Date"
          value={fromDate}
          onChange={setFromDate}
          placeholder="Start Date"
          maxDate={toDate}
        />
      </div>
      <div>
        <DatePicker
          label="End Date"
          value={toDate}
          onChange={setToDate}
          placeholder="End Date"
          minDate={fromDate}
        />
      </div>
    </form>
  );
}
