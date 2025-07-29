import { useState, useEffect } from "react";
import {
  useProjectPerformanceReportExcelQuery,
  useProjectPerformanceReportQuery,
} from "@/services";
import { useAllProjectsQuery } from "@/services";
import { useAllClientQuery } from "@/services";
import {
  BasicProjectInfo,
  CostBudgetAnalysisMetric,
  DocumentSummaryTable,
  FollowUpCommunicationMatrix,
  MilestoneSummaryTable,
  ProjectSearchFilter,
  ResourceUtilizationTable,
  TaskMetricsChart,
  TimelineAnalysis,
} from "./components";
import { Button, Loading } from "@/components";
import {
  defaultBasicProjectInfo,
  defaultCostBudgetAnalysis,
  defaultDocumentSummary,
  defaultFollowUpMatrix,
  defaultMilestoneSummary,
  defaultResourceUtilization,
  defaultTaskMetrics,
  defaultTimelineAnalysis,
} from "@/constants";
import { ImDownload2 } from "react-icons/im";

export function ProjectReport() {
  const { allProjectsData } = useAllProjectsQuery();
  const { allClientData } = useAllClientQuery();
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Set default date range: 1st to last date of current month
  useEffect(() => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const formatDate = (date: Date) => date.toLocaleDateString("en-CA");
    setFromDate(formatDate(first));
    setToDate(formatDate(last));
  }, []);

  // Set default selected project and client to the first project when data loads
  useEffect(() => {
    if (
      allProjectsData &&
      allProjectsData.length > 0 &&
      allClientData?.data?.list &&
      allClientData.data.list.length > 0 &&
      !selectedProject &&
      !selectedClient
    ) {
      const firstProject = allProjectsData[0];
      setSelectedProject(firstProject.id);
      setSelectedClient(firstProject.client?.id || "");
    }
  }, [allProjectsData, allClientData, selectedProject, selectedClient]);

  // Update selectedClient when selectedProject changes
  useEffect(() => {
    if (selectedProject && allProjectsData && allProjectsData.length > 0) {
      const project = allProjectsData.find((p) => p.id === selectedProject);
      if (
        project &&
        project.client?.id &&
        selectedClient !== project.client.id
      ) {
        setSelectedClient(project.client.id);
      }
    }
  }, [selectedProject, allProjectsData, selectedClient]);

  const { projectPerformanceData, isLoading, error } =
    useProjectPerformanceReportQuery({
      projectId: selectedProject,
      clientId: selectedClient,
      fromDate,
      toDate,
    });

  const { onDownloadProjectPerformanceReportExcel } =
    useProjectPerformanceReportExcelQuery();

  const handleExport = () => {
    onDownloadProjectPerformanceReportExcel({
      projectId: selectedProject,
      clientId: selectedClient,
      fromDate,
      toDate,
    });
  };

  if (!fromDate || !toDate || !allClientData) return null;

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading report</div>;

  const data = projectPerformanceData?.data;

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Project Performance Report
        </h2>
        <Button
          type="button"
          variant="primary-outline-blue"
          width="w-full md:w-fit"
          onClick={handleExport}
          leftIcon={
            <ImDownload2
              className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]"
              color="#034A9F"
            />
          }
          tooltip="Download Excel"
        />
      </div>
      <ProjectSearchFilter
        projects={(allProjectsData || [])?.map((p) => ({
          id: p.id,
          name: p.name,
          client_id: p.client?.id || "",
        }))}
        clients={allClientData?.data?.list || []}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-r 2xl:border-r-[0.1vw]">
          <BasicProjectInfo
            data={data?.basicProjectInfo ?? defaultBasicProjectInfo}
          />
          <DocumentSummaryTable
            data={data?.documentSummary ?? defaultDocumentSummary}
          />
          <FollowUpCommunicationMatrix
            data={data?.followUpMatrix ?? defaultFollowUpMatrix}
          />
        </div>
        <div className="flex flex-col">
          <CostBudgetAnalysisMetric
            data={data?.costBudgetAnalysis ?? defaultCostBudgetAnalysis}
          />
          <TaskMetricsChart data={data?.taskMetrics ?? defaultTaskMetrics} />
          <TimelineAnalysis
            data={data?.timelineAnalysis ?? defaultTimelineAnalysis}
          />
        </div>
      </div>
      <MilestoneSummaryTable
        data={data?.milestoneSummary ?? defaultMilestoneSummary}
      />
      <ResourceUtilizationTable
        data={data?.resourceUtilization ?? defaultResourceUtilization}
      />
    </div>
  );
}
