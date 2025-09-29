import React, { useState, useMemo, useEffect } from "react";
import {
  DatePicker,
  Button,
  Table,
  Loading,
  SearchBar,
  SimpleDropdown,
  Dropdown,
} from "@/components";
import { FiX, FiPlus } from "react-icons/fi";
import { ITableAction, ITableColumn } from "@/constants/table";
import { useDebounce } from "@/utils/hooks";
import { useAuthStore } from "@/services";

export interface TaskRow {
  id: string | number;
  title?: string;
  description?: string;
  status?: string;
  priority?: "Critical" | "High" | "Medium" | "Low";
  due_date?: string;
  rawDueDate?: string;
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
  currentUserName?: string;
  currentUserId?: string;
  tasksLoading: boolean;
  tasksError: boolean;
  tasksErrorObj: unknown;
  taskList: TaskRow[];
  taskListColumn: ITableColumn<TaskRow>[];
  taskListAction: ITableAction<TaskRow>[];
  onAddTask?: () => void;
  // Optional preset filter controls from parent
  presetFilter?: "none" | "dueToday" | "followups";
  presetTrigger?: number; // change to re-apply preset
  includeTaskIds?: Set<string>; // include these even if other filters would exclude
}

const TaskTable: React.FC<TaskTableProps> = ({
  // currentUserName,
  currentUserId,
  tasksLoading,
  tasksError,
  tasksErrorObj,
  taskList,
  taskListColumn,
  taskListAction,
  onAddTask,
  presetFilter = "none",
  presetTrigger = 0,
  includeTaskIds,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [timePeriodFilter, setTimePeriodFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dueFromDate, setDueFromDate] = useState("");
  const [dueToDate, setDueToDate] = useState("");
  
  // Force reset mechanism for date pickers
  const [datePickerResetKey, setDatePickerResetKey] = useState(0);
  const { activeSession } = useAuthStore();
  const userRole = (activeSession?.user?.role.role ?? "").toLowerCase();
  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  // Apply preset filters pushed from parent
  useEffect(() => {
    if (presetFilter === "dueToday") {
      // For dueToday preset, use client followup due dates instead of task due dates
      // Clear all filters and rely on includeTaskIds for filtering
      setSearchInput("");
      setStatusFilter("");
      setPriorityFilter("");
      setStaffFilter("");
      setTimePeriodFilter("");
      setProjectFilter("");
      setFromDate("");
      setToDate("");
      setDueFromDate("");
      setDueToDate("");
    } else if (presetFilter === "followups") {
      // For followups preset, only clear non-date filters
      // Keep date filters unchanged
      setSearchInput("");
      setStatusFilter("");
      setPriorityFilter("");
      setStaffFilter("");
      setTimePeriodFilter("");
      setProjectFilter("");
      // Don't clear date filters for followups preset
    } else if (presetFilter === "none") {
      // Clear all filters when preset is none
      setSearchInput("");
      setStatusFilter("");
      setPriorityFilter("");
      setStaffFilter("");
      setTimePeriodFilter("");
      setProjectFilter("");
      setFromDate("");
      setToDate("");
      setDueFromDate("");
      setDueToDate("");
      
      // Force reset of date pickers
      setDatePickerResetKey(prev => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetFilter, presetTrigger]);

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Approval", value: "Approval" },
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
    { label: "Yesterday", value: "yesterday" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  // Staff dropdown options (only admin gets "All Staff")
  const staffOptions = useMemo(() => {
    const uniqueNames = Array.from(
      new Set(
        (taskList || [])
          .map((t) => t.staffName?.trim())
          .filter((name): name is string => Boolean(name && name.length > 0))
      )
    );
    const options = uniqueNames.map((name) => ({ label: name, value: name }));

    return (userRole ?? "").toLowerCase() === "admin"
      ? [{ label: "All Staff", value: "" }, ...options]
      : options;
  }, [taskList, userRole]);

  const projectOptions = useMemo(() => {
    const uniqueProjects = Array.from(
      new Set(
        (taskList || [])
          .map((t) => t.projectName?.trim())
          .filter((name): name is string => Boolean(name && name.length > 0))
      )
    );
    return [
      { label: "All Projects", value: "" },
      ...uniqueProjects.map((name) => ({ label: name, value: name })),
    ];
  }, [taskList]);

  const handleSearch = (query: string) => {
    setSearchInput(query.toLowerCase());
  };

  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
  };

  const handleClearDueDates = () => {
    setDueFromDate("");
    setDueToDate("");
  };

  const handleClearAllFilters = () => {
    setSearchInput("");
    setStatusFilter("");
    setPriorityFilter("");
    setStaffFilter("");
    setTimePeriodFilter("");
    setProjectFilter("");
    setFromDate("");
    setToDate("");
    setDueFromDate("");
    setDueToDate("");
  };

  // Filter tasks
  const filteredTaskList = useMemo(() => {
    return taskList.filter((task) => {
      // Restrict non-admins strictly to their own tasks
      if (userRole !== "admin" && task.assigned_to !== currentUserId) {
        return false;
      }

      // When preset is 'followups' or 'dueToday', strictly show only tasks included in includeTaskIds
      if (presetFilter === "followups" || presetFilter === "dueToday") {
        // If we have an include set, use it as the sole criterion (after role guard)
        if (includeTaskIds && includeTaskIds.size > 0) {
          return includeTaskIds.has(String(task.id));
        }
        // If no followup ids available, show nothing (after role guard)
        return false;
      }

      const searchMatch =
        !searchQuery ||
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.milestoneName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.clientNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.staffName?.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch = !statusFilter || task.status === statusFilter;
      const priorityMatch = !priorityFilter || task.priority === priorityFilter;
      const staffMatch = !staffFilter || task.staffName === staffFilter;
      const projectMatch = !projectFilter || task.projectName === projectFilter;

      // Time period filter
      let timePeriodMatch = true;
      if (timePeriodFilter && task.created_at) {
        const taskDateObj = new Date(task.created_at);
        const now = new Date();
        const taskDateStart = new Date(
          taskDateObj.getFullYear(),
          taskDateObj.getMonth(),
          taskDateObj.getDate()
        );
        const nowStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        switch (timePeriodFilter) {
          case "daily":
            timePeriodMatch = taskDateStart.getTime() === nowStart.getTime();
            break;
          case "yesterday": {
            const yesterdayStart = new Date(
              nowStart.getTime() - 24 * 60 * 60 * 1000
            );
            timePeriodMatch =
              taskDateStart.getTime() === yesterdayStart.getTime();
            break;
          }
          case "weekly":
            timePeriodMatch =
              taskDateStart >=
              new Date(nowStart.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "monthly":
            timePeriodMatch =
              taskDateStart >=
              new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            break;
          case "yearly":
            timePeriodMatch =
              taskDateStart >=
              new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            break;
          default:
            timePeriodMatch = true;
        }
      }

      // Created date filter
      let dateMatch = true;
      if ((fromDate || toDate) && task.created_at) {
        const taskDateObj = new Date(task.created_at);
        const taskDateStart = new Date(
          taskDateObj.getFullYear(),
          taskDateObj.getMonth(),
          taskDateObj.getDate()
        );

        if (fromDate) {
          const fromDateObj = new Date(fromDate);
          dateMatch =
            dateMatch &&
            taskDateStart >=
              new Date(
                fromDateObj.getFullYear(),
                fromDateObj.getMonth(),
                fromDateObj.getDate()
              );
        }
        if (toDate) {
          const toDateObj = new Date(toDate);
          dateMatch =
            dateMatch &&
            taskDateStart <=
              new Date(
                toDateObj.getFullYear(),
                toDateObj.getMonth(),
                toDateObj.getDate()
              );
        }
      }

      // Due date filter
      let dueDateMatch = true;
      if ((dueFromDate || dueToDate) && (task.rawDueDate || task.due_date)) {
        const sourceDate = task.rawDueDate || task.due_date!;
        const dueDateObj = new Date(sourceDate);
        const dueDateStart = new Date(
          dueDateObj.getFullYear(),
          dueDateObj.getMonth(),
          dueDateObj.getDate()
        );

        if (dueFromDate) {
          const fromDateObj = new Date(dueFromDate);
          dueDateMatch =
            dueDateMatch &&
            dueDateStart >=
              new Date(
                fromDateObj.getFullYear(),
                fromDateObj.getMonth(),
                fromDateObj.getDate()
              );
        }
        if (dueToDate) {
          const toDateObj = new Date(dueToDate);
          dueDateMatch =
            dueDateMatch &&
            dueDateStart <=
              new Date(
                toDateObj.getFullYear(),
                toDateObj.getMonth(),
                toDateObj.getDate()
              );
        }
      }

      const baseMatch = (
        searchMatch &&
        statusMatch &&
        priorityMatch &&
        staffMatch &&
        projectMatch &&
        timePeriodMatch &&
        dateMatch &&
        dueDateMatch
      );

      return baseMatch;
    });
  }, [
    taskList,
    searchQuery,
    statusFilter,
    priorityFilter,
    staffFilter,
    projectFilter,
    timePeriodFilter,
    fromDate,
    toDate,
    dueFromDate,
    dueToDate,
    userRole,
    currentUserId,
    includeTaskIds,
    presetFilter,
  ]);

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
              width="w-full md:w-fit"
              leftIcon={
                <FiPlus className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw] mt-[1px] 2xl:mt-[0.1vw]" />
              }
            />
          )}
        </div>
      </div>

      <div className="flex justify-start items-end flex-wrap gap-4 2xl:gap-[1vw] my-4 2xl:my-[1vw]">
        <DatePicker
          key={`from-date-${presetFilter}-${presetTrigger}${presetFilter === "followups" ? "" : `-${datePickerResetKey}`}`}
          label="From Date"
          value={fromDate}
          onChange={setFromDate}
          placeholder="From Date"
          datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
        />
        <DatePicker
          key={`to-date-${presetFilter}-${presetTrigger}${presetFilter === "followups" ? "" : `-${datePickerResetKey}`}`}
          label="To Date"
          value={toDate}
          onChange={setToDate}
          placeholder="To Date"
          datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
        />
        {(fromDate || toDate) && (
          <Button
            variant="background-white"
            width="w-full md:w-fit"
            onClick={handleClearDates}
            leftIcon={<FiX className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />}
            tooltip="Clear Dates"
          />
        )}
        <DatePicker
          key={`due-from-${presetFilter}-${presetTrigger}${presetFilter === "followups" ? "" : `-${datePickerResetKey}`}`}
          label="Due From"
          value={dueFromDate}
          onChange={setDueFromDate}
          placeholder="Due From"
          datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
        />
        <DatePicker
          key={`due-to-${presetFilter}-${presetTrigger}${presetFilter === "followups" ? "" : `-${datePickerResetKey}`}`}
          label="Due To"
          value={dueToDate}
          onChange={setDueToDate}
          placeholder="Due To"
          datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
        />
        {(dueFromDate || dueToDate) && (
          <Button
            variant="background-white"
            width="w-full md:w-fit"
            onClick={handleClearDueDates}
            leftIcon={<FiX className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />}
            tooltip="Clear Due Dates"
          />
        )}
        <SimpleDropdown
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
        />
        <SimpleDropdown
          options={priorityOptions}
          value={priorityFilter}
          onChange={setPriorityFilter}
          dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
        />

        {/* Staff filter only for Admin */}
        {userRole === "admin" && (
          <Dropdown
            options={staffOptions}
            value={staffFilter}
            onChange={setStaffFilter}
            dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
        )}

        <SimpleDropdown
          options={timePeriodOptions}
          value={timePeriodFilter}
          onChange={setTimePeriodFilter}
          dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
        />
        <Dropdown
          options={projectOptions}
          value={projectFilter}
          onChange={setProjectFilter}
          dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
        />

        {(searchInput ||
          statusFilter ||
          priorityFilter ||
          staffFilter ||
          timePeriodFilter ||
          projectFilter ||
          fromDate ||
          toDate ||
          dueFromDate ||
          dueToDate) && (
          <Button
            variant="background-white"
            width="w-full md:w-fit"
            onClick={handleClearAllFilters}
            leftIcon={<FiX className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />}
            tooltip="Clear All Filters"
          />
        )}
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
