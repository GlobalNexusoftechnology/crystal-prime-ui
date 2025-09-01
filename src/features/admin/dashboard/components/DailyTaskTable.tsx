import React, { useState, useMemo } from "react";
import { Dropdown, DatePicker, Button, Table, Loading, SearchBar } from "@/components";
import { FiX, FiPlus } from "react-icons/fi";
import { ITableAction, ITableColumn } from "@/constants/table";
import { useDebounce } from "@/utils/hooks";

export interface DailyTaskRow {
  id: string | number;
  name?: string;
  description?: string;
  status?: string;
  due?: string;
  priority?: string;
  projectId?: string;
  milestoneId?: string;
  taskId?: string;
  projectName?: string;
  clientName?: string;
  clientNumber?: string;
  staffName?: string;
  created_at?: string;
  [key: string]: unknown;
}

interface DailyTaskTableProps {
  userRole: string;
  dailyTasksLoading: boolean;
  dailyTasksError: boolean;
  dailyTasksErrorObj: unknown;
  dailyTaskList: DailyTaskRow[];
  dailyTaskListColumn: ITableColumn<DailyTaskRow>[];
  dailyTaskListAction: ITableAction<DailyTaskRow>[];
  onAddDailyTask?: () => void;
}

const DailyTaskTable: React.FC<DailyTaskTableProps> = ({
  // userRole,
  dailyTasksLoading,
  dailyTasksError,
  dailyTasksErrorObj,
  dailyTaskList,
  dailyTaskListColumn,
  dailyTaskListAction,
  onAddDailyTask,
}) => {
  // Internal state for search and filters
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Debounced search
  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  // Filter options
  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  // Filter handlers
  const handleSearch = (query: string) => {
    setSearchInput(query.toLowerCase());
  };

  const handleStatusChange = (value: string) => setStatusFilter(value);
  const handlePriorityChange = (value: string) => setPriorityFilter(value);
  
  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
  };

  // Filter the data based on search and filters
  const filteredDailyTaskList = useMemo(() => {
    return dailyTaskList.filter((task) => {
      // Search filter
      const searchMatch = !searchQuery || 
        task.name?.toLowerCase().includes(searchQuery) ||
        task.description?.toLowerCase().includes(searchQuery) ||
        task.projectName?.toLowerCase().includes(searchQuery) ||
        task.clientName?.toLowerCase().includes(searchQuery) ||
        task.staffName?.toLowerCase().includes(searchQuery);

      // Status filter
      const statusMatch = !statusFilter || task.status === statusFilter;

      // Priority filter
      const priorityMatch = !priorityFilter || task.priority === priorityFilter;

      // Date filter
      let dateMatch = true;
      if (fromDate || toDate) {
        const taskDate = task.due || task.created_at;
        if (taskDate) {
          const taskDateObj = new Date(taskDate);
          if (fromDate) {
            const fromDateObj = new Date(fromDate);
            dateMatch = dateMatch && taskDateObj >= fromDateObj;
          }
          if (toDate) {
            const toDateObj = new Date(toDate);
            dateMatch = dateMatch && taskDateObj <= toDateObj;
          }
        } else {
          dateMatch = false;
        }
      }

      return searchMatch && statusMatch && priorityMatch && dateMatch;
    });
  }, [dailyTaskList, searchQuery, statusFilter, priorityFilter, fromDate, toDate]);
  // if (userRole.toLowerCase() === "admin") return null;
  if (dailyTasksLoading) return <Loading />;
  if (dailyTasksError)
    return (
      <div className="text-red-500">
        Error loading daily tasks:{" "}
        {typeof dailyTasksErrorObj === "object" &&
        dailyTasksErrorObj &&
        "message" in dailyTasksErrorObj
          ? (dailyTasksErrorObj as { message: string }).message
          : "Unknown error"}
      </div>
    );
  return (
    <div className="p-4 2xl:p-[1vw] border 2xl:border-[0.05vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Daily Task List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          {onAddDailyTask && (
            <Button
              title="Add Daily Task"
              variant="primary"
              onClick={onAddDailyTask}
              width="w-auto"
              leftIcon={<FiPlus className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw] mt-[1px] 2xl:mt-[0.1vw]" />}
            />
          )}
        </div>
      </div>
      <div className="flex justify-start items-end flex-wrap gap-4 2xl:gap-[1vw] my-4 2xl:my-[1vw]">
        <div className="flex flex-col justify-start items-start w-full min-w-[12rem] md:w-[15vw]">
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={setFromDate}
            placeholder="From Date"
            datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
        </div>
        <DatePicker
          label="To Date"
          value={toDate}
          onChange={setToDate}
          placeholder="To Date"
          datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
        />
        {(fromDate || toDate) && (
          <div>
            <Button
              variant="background-white"
              width="w-full md:w-fit"
              onClick={handleClearDates}
              leftIcon={
                <FiX className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              }
              tooltip="Clear Dates"
            />
          </div>
        )}
        <Dropdown
            options={statusOptions}
            value={statusFilter}
            onChange={handleStatusChange}
            dropdownWidth="w-full md:w-fit"
          />
          <Dropdown
            options={priorityOptions}
            value={priorityFilter}
            onChange={handlePriorityChange}
            dropdownWidth="w-full md:w-fit"
          />
      </div>
      <Table
        data={filteredDailyTaskList}
        columns={dailyTaskListColumn}
        actions={dailyTaskListAction}
      />
    </div>
  );
};

export default DailyTaskTable;
