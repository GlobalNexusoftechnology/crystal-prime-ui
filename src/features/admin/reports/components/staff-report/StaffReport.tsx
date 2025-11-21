import { useState, useEffect, useMemo } from "react";
import {
  useStaffPerformanceReportQuery,
  useAllUsersQuery,
  IUsersDetails,
  useStaffPerformanceReportExcelQuery,
} from "@/services";
import {
  FollowUpPerformance,
  MilestoneFileActivity,
  StaffInfoCard,
  StaffSearchFilter,
  TaskSummary,
} from "./components";
import { Button, Loading } from "@/components";
import { ImDownload2 } from "react-icons/im";

export function StaffReport() {
  const { allUsersData } = useAllUsersQuery();
  const staffList: IUsersDetails[] = useMemo(
    () => allUsersData?.data?.list || [],
    [allUsersData]
  );

  const [selectedStaff, setSelectedStaff] = useState("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  // Set default date range: 1st to last date of current month (local timezone)
  useEffect(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const formatDate = (date: Date): string => date.toLocaleDateString("en-CA");

    setFromDate(formatDate(firstDay));
    setToDate(formatDate(lastDay));
  }, []);

  useEffect(() => {
    if (staffList.length > 0 && !selectedStaff) {
      // Find the first user who is NOT admin
      const firstNonAdmin = staffList.find(
        (user) => user.role?.role?.toLowerCase() !== "admin"
      );
      if (firstNonAdmin) {
        setSelectedStaff(firstNonAdmin.id);
      }
      // If all are admin, do nothing
    }
  }, [staffList, selectedStaff]);

  const { staffPerformanceData, isLoading, error } =
    useStaffPerformanceReportQuery({
      userId: selectedStaff,
      startDate: fromDate,
      endDate: toDate,
    });
  const { onDownloadStaffPerformanceReportExcel } =
    useStaffPerformanceReportExcelQuery();

  const handleExport = () => {
    onDownloadStaffPerformanceReportExcel({
      fromDate,
      toDate,
      userId: selectedStaff,
    });
  };

  if (!fromDate || !toDate) return null;
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading report</div>;

  const data = staffPerformanceData?.data;

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl  font-medium mb-4 ">
          Staff Performance Report
        </h2>
        <Button
          type="button"
          variant="primary-outline-blue"
          width="w-full md:w-fit"
          onClick={handleExport}
          leftIcon={
            <ImDownload2
              className="w-5 h-5  "
              color="#221F21"
            />
          }
          tooltip="Download Excel"
        />
      </div>
      <StaffSearchFilter
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-gray-400 border-0 lg:border-r ">
          <StaffInfoCard staffInfo={data?.staffInfo} />
          <TaskSummary taskSummary={data?.taskSummary} />
        </div>
        <div className="flex flex-col">
          <MilestoneFileActivity
            milestoneFileActivity={data?.milestoneFileActivity}
          />
          <FollowUpPerformance
            followUpPerformance={data?.followUpPerformance}
          />
        </div>
      </div>
    </div>
  );
}
