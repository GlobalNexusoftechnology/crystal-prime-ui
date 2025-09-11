import React, { useState, useMemo } from "react";
import { DatePicker, Button, Table, Loading, SearchBar, SimpleDropdown, Dropdown } from "@/components";
import { FiX, FiPlus } from "react-icons/fi";
import { ITableAction, ITableColumn } from "@/constants/table";
import { useDebounce } from "@/utils/hooks";

export interface TaskRow {
  id: string | number;
  title?: string;
  description?: string;
  status?: string;
  priority?: "Critical" | "High" | "Medium" | "Low";
  due_date?: string;
  assigned_to?: string;
  milestoneId?: string;
  projectId?: string;
  projectName?: string;
  milestoneName?: string;
  clientName?: string;
  clientNumber?: string;
  staffName?: string;
  created_at?: string;
  updated_at?: string;
  rawCreatedAt?: string;
  [key: string]: unknown;
}

interface TaskTableProps {
  userRole: string;
  tasksLoading: boolean;
  tasksError: boolean;
  tasksErrorObj: unknown;
  taskList: TaskRow[];
  taskListColumn: ITableColumn<TaskRow>[];
  taskListAction: ITableAction<TaskRow>[];
  onAddTask?: () => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasksLoading,
  tasksError,
  tasksErrorObj,
  taskList,
  taskListColumn,
  taskListAction,
  onAddTask,
}) => {
  // Internal state for search and filters
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [timePeriodFilter, setTimePeriodFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
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
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "Critical", value: "Critical" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const timePeriodOptions = [
    { label: "All Time", value: "" },
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  // Build staff options from taskList (unique by staffName)
  const staffOptions = useMemo(() => {
    const uniqueNames = Array.from(
      new Set(
        (taskList || [])
          .map((t) => t.staffName?.trim())
          .filter((name): name is string => Boolean(name && name.length > 0))
      )
    );
    return [{ label: "All Staff", value: "" }, ...uniqueNames.map((name) => ({ label: name, value: name }))];
  }, [taskList]);

  // Build project options from taskList (unique by projectName)
  const projectOptions = useMemo(() => {
    const uniqueProjects = Array.from(
      new Set(
        (taskList || [])
          .map((t) => t.projectName?.trim())
          .filter((name): name is string => Boolean(name && name.length > 0))
      )
    );
    return [{ label: "All Projects", value: "" }, ...uniqueProjects.map((name) => ({ label: name, value: name }))];
  }, [taskList]);

  // Filter handlers
  const handleSearch = (query: string) => {
    setSearchInput(query.toLowerCase());
  };

  const handleStatusChange = (value: string) => setStatusFilter(value);
  const handlePriorityChange = (value: string) => setPriorityFilter(value);
  const handleStaffChange = (value: string) => setStaffFilter(value);
  const handleTimePeriodChange = (value: string) => setTimePeriodFilter(value);
  const handleProjectChange = (value: string) => setProjectFilter(value);
  
  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
  };

  // Filter the data based on search and filters
  const filteredTaskList = useMemo(() => {
    return taskList.filter((task) => {
      // Search filter
      const searchMatch = !searchQuery || 
        task.title?.toLowerCase().includes(searchQuery) ||
        task.description?.toLowerCase().includes(searchQuery) ||
        task.projectName?.toLowerCase().includes(searchQuery) ||
        task.milestoneName?.toLowerCase().includes(searchQuery) ||
        task.clientName?.toLowerCase().includes(searchQuery) ||
        task.clientNumber?.toLowerCase().includes(searchQuery) ||
        task.staffName?.toLowerCase().includes(searchQuery);

      // Status filter
      const statusMatch = !statusFilter || task.status === statusFilter;

      // Priority filter
      const priorityMatch = !priorityFilter || task.priority === priorityFilter;

      // Staff filter (by staffName shown in table)
      const staffMatch = !staffFilter || task.staffName === staffFilter;

      // Project filter
      const projectMatch = !projectFilter || task.projectName === projectFilter;

      // Time period filter
      let timePeriodMatch = true;
      if (timePeriodFilter) {
        const taskDate = task.due_date || task.created_at;
        if (taskDate) {
          const taskDateObj = new Date(taskDate);
          const now = new Date();
          
          switch (timePeriodFilter) {
            case 'daily':
              timePeriodMatch = taskDateObj.toDateString() === now.toDateString();
              break;
            case 'weekly':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              timePeriodMatch = taskDateObj >= weekAgo;
              break;
            case 'monthly':
              const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
              timePeriodMatch = taskDateObj >= monthAgo;
              break;
            case 'yearly':
              const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
              timePeriodMatch = taskDateObj >= yearAgo;
              break;
            default:
              timePeriodMatch = true;
          }
        } else {
          timePeriodMatch = false;
        }
      }

      // Date filter
      let dateMatch = true;
      if (fromDate || toDate) {
        const taskDate = task.due_date || task.created_at;
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

      return searchMatch && statusMatch && priorityMatch && staffMatch && projectMatch && timePeriodMatch && dateMatch;
    });
  }, [taskList, searchQuery, statusFilter, priorityFilter, staffFilter, projectFilter, timePeriodFilter, fromDate, toDate]);

  if (tasksLoading) return <Loading />;
  if (tasksError)
    return (
      <div className="text-red-500">
        Error loading tasks:{" "}
        {typeof tasksErrorObj === "object" &&
        tasksErrorObj &&
        "message" in tasksErrorObj
          ? (tasksErrorObj as { message: string }).message
          : "Unknown error"}
      </div>
    );

  return (
    <div className="p-4 2xl:p-[1vw] border 2xl:border-[0.05vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] bg-gray-50">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h2 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Task List
        </h2>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[20vw]"
          />
          {onAddTask && (
            <Button
              title="Add Task"
              variant="primary"
              onClick={onAddTask}
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
        <SimpleDropdown
          options={statusOptions}
          value={statusFilter}
          onChange={handleStatusChange}
          dropdownWidth="w-full md:w-fit"
        />
        <SimpleDropdown
          options={priorityOptions}
          value={priorityFilter}
          onChange={handlePriorityChange}
          dropdownWidth="w-full md:w-fit"
        />
        <Dropdown
          options={staffOptions}
          value={staffFilter}
          onChange={handleStaffChange}
          dropdownWidth="w-full md:w-fit"
        />
        <SimpleDropdown
          options={timePeriodOptions}
          value={timePeriodFilter}
          onChange={handleTimePeriodChange}
          dropdownWidth="w-full md:w-[15rem] 2xl:w-[15vw]"
        />
        <Dropdown
          options={projectOptions}
          value={projectFilter}
          onChange={handleProjectChange}
          dropdownWidth="w-full md:w-[15rem] 2xl:w-[15vw]"
        />
      </div>
      <Table
        data={filteredTaskList}
        columns={taskListColumn}
        actions={taskListAction}
      />
    </div>
  );
};

export default TaskTable;
