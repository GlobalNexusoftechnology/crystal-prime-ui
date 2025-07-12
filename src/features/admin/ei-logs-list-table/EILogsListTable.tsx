"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table, Dropdown, DatePicker } from "@/components";
import { EAction, EModule, IEILogListTableColumn, ITableAction } from "@/constants";
import {
  IAllEILogList,
  useAllEILogsQuery,
  useDeleteEILogMutation,
  useAllEILogTypesQuery,
  useAllEILogHeadsQuery,
  useAllEILogsDownloadExcelQuery,
  useEILogDownloadTemplateExcelQuery,
} from "@/services";
import { formatDate, IApiError } from "@/utils";
import { useDebounce } from "@/utils/hooks";
import toast from "react-hot-toast";
import { usePermission } from "@/utils/hooks";
import { AddEILogModal } from "../ei-log-management/components";


interface EILogsListTableProps {
  setAddEILogModalOpen: (value: boolean) => void;
}

export function EILogsListTable({ setAddEILogModalOpen }: EILogsListTableProps) {
  const [eiLogId, setEiLogId] = useState("");
  const [isEditEILogModalOpen, setIsEditEILogModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("All Type");
  const [selectedHead, setSelectedHead] = useState("All Head");
  const [viewEILog, setViewEILog] = useState<IAllEILogList | null>(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState<
    "All" | "Daily" | "Weekly" | "Monthly"
  >("All");

  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  const filters = useMemo(
    () => ({
      searchText: searchQuery,
      eiLogTypeId: selectedType,
      eiLogHeadId: selectedHead,
      dateRange: dateRangeFilter,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [
      searchQuery,
      selectedType,
      selectedHead,
      dateRangeFilter,
      fromDate,
      toDate,
    ]
  );

  const {
    data: allEILogList,
    eiLogsRefetch,
  } = useAllEILogsQuery(filters);
  const { allEILogTypesData } = useAllEILogTypesQuery();
  const { allEILogHeadsData } = useAllEILogHeadsQuery();
  const { onAllEILogsDownloadExcel } = useAllEILogsDownloadExcelQuery();
  const { onEILogDownloadTemplateExcel } = useEILogDownloadTemplateExcelQuery();

  const { hasPermission } = usePermission();
  const cavAddEILogManagement = hasPermission(
    EModule.EI_LOG_MANAGEMENT,
    EAction.ADD
  );
  const cavEditEILogManagement = hasPermission(
    EModule.EI_LOG_MANAGEMENT,
    EAction.EDIT
  );
  const cavDeleteEILogManagement = hasPermission(
    EModule.EI_LOG_MANAGEMENT,
    EAction.DELETE
  );

  const { onDeleteEILog } = useDeleteEILogMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      eiLogsRefetch();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleHeadChange = (value: string) => {
    setSelectedHead(value);
  };

  const handleDateRangeChange = (value: "All" | "Daily" | "Weekly" | "Monthly") => {
    setDateRangeFilter(value);
  };

  const handleExport = () => {
    onAllEILogsDownloadExcel(filters);
  };

  const handleDownloadTemplate = () => {
    onEILogDownloadTemplateExcel();
  };

  // Prepare full list from API
  const fullEILogList: IAllEILogList[] = (allEILogList?.data?.list ?? []).map(
    (eiLog) => ({
      id: eiLog?.id || "N/A",
      created_at: `${formatDate(eiLog?.created_at)}` || "N/A",
      updated_at: `${formatDate(eiLog?.updated_at)}` || "N/A",
      description: eiLog?.description || "N/A",
      income: eiLog?.income || 0,
      expense: eiLog?.expense || 0,
      payment_mode: eiLog?.payment_mode || "N/A",
      attachment: eiLog?.attachment || undefined,
      ei_log_type: eiLog?.ei_log_type || { id: "N/A", name: "N/A" },
      ei_log_head: eiLog?.ei_log_head || { id: "N/A", name: "N/A" },
    })
  );

  const eiLogAction: ITableAction<IAllEILogList>[] = [];

  if (cavEditEILogManagement) {
    eiLogAction.push({
      label: "Edit",
      onClick: (row: IAllEILogList) => {
        setEiLogId(row.id);
        setViewEILog(row);
        setIsEditEILogModalOpen(true);
      },
      className: "text-blue-500",
    });
  }

  if (cavDeleteEILogManagement) {
    eiLogAction.push({
      label: "Delete",
      onClick: (row: IAllEILogList) => {
        onDeleteEILog(row.id);
      },
      className: "text-red-500",
    });
  }

  const handleAddEILogSuccessCallback = () => {
    eiLogsRefetch();
    setEiLogId("");
    setViewEILog(null);
    setIsEditEILogModalOpen(false);
  };

  const handleModalClose = () => {
    setIsEditEILogModalOpen(false);
    setEiLogId("");
    setViewEILog(null);
  };

  const typeOptions = [
    { key: "All Type", label: "All Type", value: "All Type" },
    ...(allEILogTypesData?.data?.map((type) => ({
      key: type.id,
      label: type.name,
      value: type.id,
    })) || []),
  ];

  const headOptions = [
    { key: "All Head", label: "All Head", value: "All Head" },
    ...(allEILogHeadsData?.data?.map((head) => ({
      key: head.id,
      label: head.name,
      value: head.id,
    })) || []),
  ];

  const dateRangeOptions = [
    { key: "All", label: "All", value: "All" },
    { key: "Daily", label: "Daily", value: "Daily" },
    { key: "Weekly", label: "Weekly", value: "Weekly" },
    { key: "Monthly", label: "Monthly", value: "Monthly" },
  ];

  return (
    <div className="bg-customGray p-5 2xl:p-[1.25vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.375vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          EI Logs List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          <Dropdown
            options={typeOptions}
            value={selectedType}
            onChange={handleTypeChange}
            dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
          <Dropdown
            options={headOptions}
            value={selectedHead}
            onChange={handleHeadChange}
            dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
          <Dropdown
            options={dateRangeOptions}
            value={dateRangeFilter}
            onChange={(val: string) => handleDateRangeChange(val as "All" | "Daily" | "Weekly" | "Monthly")}
            dropdownWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
          <DatePicker
            value={fromDate}
            onChange={(date) => setFromDate(date)}
            placeholder="From Date"
            datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
          <DatePicker
            value={toDate}
            onChange={(date) => setToDate(date)}
            placeholder="To Date"
            datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
          {cavAddEILogManagement ? (
            <Button
              title="Add EI Log"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => setAddEILogModalOpen(true)}
            />
          ) : null}
          <Button
            title="Export"
            variant="background-white"
            width="w-full md:w-fit"
            onClick={handleExport}
          />
          <Button
            title="Download Template"
            variant="background-white"
            width="w-full md:w-fit"
            onClick={handleDownloadTemplate}
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <Table
          data={fullEILogList}
          columns={IEILogListTableColumn}
          actions={eiLogAction}
        />
      </div>

      {isEditEILogModalOpen && (
        <AddEILogModal
          isOpen={isEditEILogModalOpen}
          onClose={handleModalClose}
          onAddEILogSuccessCallback={handleAddEILogSuccessCallback}
          eiLogId={eiLogId}
          eiLogData={viewEILog}
          onClearEditData={() => {
            setEiLogId("");
            setViewEILog(null);
          }}
        />
      )}
    </div>
  );
} 