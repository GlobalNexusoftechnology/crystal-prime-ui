import React from "react";
import { Dropdown, DatePicker, Button, Table, Loading } from "@/components";
import { FiX } from "react-icons/fi";
import { ITableAction, ITableColumn } from "@/constants/table";

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
  statusOptions: { label: string; value: string }[];
  statusFilter: string;
  handleStatusChange: (value: string) => void;
  priorityOptions: { label: string; value: string }[];
  priorityFilter: string;
  handlePriorityChange: (value: string) => void;
  handleSearch: (value: string) => void;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
  handleClearDates: () => void;
}

const DailyTaskTable: React.FC<DailyTaskTableProps> = ({
  // userRole,
  dailyTasksLoading,
  dailyTasksError,
  dailyTasksErrorObj,
  dailyTaskList,
  dailyTaskListColumn,
  dailyTaskListAction,
  statusOptions,
  statusFilter,
  handleStatusChange,
  priorityOptions,
  priorityFilter,
  handlePriorityChange,
  //   handleSearch,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  handleClearDates,
}) => {
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
          {/* <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          /> */}
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
      </div>
      <Table
        data={dailyTaskList}
        columns={dailyTaskListColumn}
        actions={dailyTaskListAction}
      />
    </div>
  );
};

export default DailyTaskTable;
