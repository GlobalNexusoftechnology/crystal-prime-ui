import { DatePicker, Dropdown } from "@/components";

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
  setSelectedClient,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: ProjectSearchFilterProps) {
  const projectOptions = (projects || []).map((project) => ({
    label: project.name,
    value: project.id,
  }));

  const clientOptions = (clients || []).map((client) => ({
    label: client.name,
    value: client.id,
  }));

  // Filter client options to only show the relevant client when a project is selected
  const filteredClientOptions = selectedProject
    ? clientOptions.filter((client) => {
        // Find the selected project to get its client_id
        const project = projects.find((p) => p.id === selectedProject);
        return project && project.client_id
          ? client.value === project.client_id
          : true;
      })
    : clientOptions;

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 2xl:gap-[1vw] mb-6 2xl:mb-[1vw]">
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
          options={filteredClientOptions}
          value={selectedClient}
          onChange={setSelectedClient}
          dropdownWidth="w-full"
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
