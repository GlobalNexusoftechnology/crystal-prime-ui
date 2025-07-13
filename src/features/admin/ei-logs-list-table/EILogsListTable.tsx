"use client";

import { useState, useMemo } from "react";
import { SearchBar, Button, Table, Dropdown, DatePicker } from "@/components";
import {
  EAction,
  EModule,
  IEILogListTableColumn,
  ITableAction,
} from "@/constants";
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
import { AddEILogModal, ViewEILogModal } from "../ei-log-management/components";
import { ImDownload2 } from "react-icons/im";
import { ExportIcon } from "@/features";
import { FiPlus, FiX } from "react-icons/fi";

interface EILogsListTableProps {
  setAddEILogModalOpen: (value: boolean) => void;
}

export function EILogsListTable({
  setAddEILogModalOpen,
}: EILogsListTableProps) {
  const [eiLogId, setEiLogId] = useState("");
  const [isEditEILogModalOpen, setIsEditEILogModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("All Type");
  const [selectedHead, setSelectedHead] = useState("All Head");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("All Payment Mode");
  const [viewEILog, setViewEILog] = useState<IAllEILogList | null>(null);
  const [isViewEILogModalOpen, setIsViewEILogModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState<
    "All Dates" | "Daily" | "Weekly" | "Monthly"
  >("All Dates");

  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  const filters = useMemo(
    () => ({
      eilogTypeId: selectedType !== "All Type" ? selectedType : undefined,
      eilogHeadId: selectedHead !== "All Head" ? selectedHead : undefined,
      paymentMode: selectedPaymentMode !== "All Payment Mode" ? selectedPaymentMode : undefined,
      dateRange: dateRangeFilter !== "All Dates" ? dateRangeFilter : undefined,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      searchText: searchQuery,
    }),
    [selectedType, selectedHead, selectedPaymentMode, dateRangeFilter, fromDate, toDate, searchQuery]
  );

  const { data: allEILogList, eiLogsRefetch } = useAllEILogsQuery(filters);
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

  const handlePaymentModeChange = (value: string) => {
    setSelectedPaymentMode(value);
  };

  const handleDateRangeChange = (
    value: "All Dates" | "Daily" | "Weekly" | "Monthly"
  ) => {
    setDateRangeFilter(value);
  };

  const handleExport = () => {
    onAllEILogsDownloadExcel(filters);
  };

  const handleDownloadTemplate = () => {
    onEILogDownloadTemplateExcel();
  };

  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
  };

  // Prepare full list from API
  const dataSource =
    allEILogList?.data && "list" in allEILogList.data
      ? ((allEILogList.data.list as { data: IAllEILogList[] }).data)
      : allEILogList?.data?.data ?? [];

  const fullEILogList: IAllEILogList[] = dataSource.map(
    (eiLog: IAllEILogList) => ({
      id: eiLog?.id || "N/A",
      created_at: `${formatDate(eiLog?.created_at)}` || "N/A",
      updated_at: `${formatDate(eiLog?.updated_at)}` || "N/A",
      description: eiLog?.description || "N/A",
      income: eiLog?.income !== undefined && eiLog?.income !== null ? String(eiLog.income) : undefined,
      expense: typeof eiLog?.expense === 'number' ? eiLog.expense : eiLog?.expense ? Number(eiLog.expense) : null,
      paymentMode: eiLog?.paymentMode || "N/A",
      attachment: eiLog?.attachment || undefined,
      eilogType: eiLog?.eilogType || { id: "N/A", name: "N/A" },
      eilogHead: eiLog?.eilogHead || { id: "N/A", name: "N/A" },
      createdBy: eiLog?.createdBy,
    })
  );

  const eiLogAction: ITableAction<IAllEILogList>[] = [];

  // Add View action for all users
  eiLogAction.push({
    label: "View",
    onClick: (row: IAllEILogList) => {
      setViewEILog(row);
      setIsViewEILogModalOpen(true);
    },
    className: "text-green-500",
  });

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

  const handleViewModalClose = () => {
    setIsViewEILogModalOpen(false);
    setViewEILog(null);
  };

  const typeOptions = [
    { key: "All Type", label: "All Type", value: "All Type" },
    ...(allEILogTypesData?.data?.map((type) => ({
      key: type.id,
      label: type.name,
      value: type.id, // Use ID as value
    })) || []),
  ];

  const headOptions = [
    { key: "All Head", label: "All Head", value: "All Head" },
    ...(allEILogHeadsData?.data?.map((head) => ({
      key: head.id,
      label: head.name,
      value: head.id, // Use ID as value
    })) || []),
  ];

  const dateRangeOptions = [
    { key: "All Dates", label: "All Dates", value: "All Dates" },
    { key: "Daily", label: "Daily", value: "Daily" },
    { key: "Weekly", label: "Weekly", value: "Weekly" },
    { key: "Monthly", label: "Monthly", value: "Monthly" },
  ];

  const paymentModeOptions = [
    { key: "All Payment Mode", label: "All Payment Mode", value: "All Payment Mode" },
    { key: "Cash", label: "Cash", value: "Cash" },
    { key: "Online", label: "Online", value: "Online" },
    { key: "UPI", label: "UPI", value: "UPI" },
    { key: "Bank Transfer", label: "Bank Transfer", value: "Bank Transfer" },
    { key: "Cheque", label: "Cheque", value: "Cheque" },
    { key: "Others", label: "Others", value: "Others" },
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
          {cavAddEILogManagement ? (
            <Button
              title="Add EI Log"
              variant="background-white"
              width="w-full md:w-fit"
              leftIcon={
                <FiPlus className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              }
              onClick={() => setAddEILogModalOpen(true)}
            />
          ) : null}
         
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
            onClick={handleExport}
          />
          <Button
            variant="primary-outline-blue"
            width="w-full md:w-fit"
            onClick={handleDownloadTemplate}
            leftIcon={
              <ImDownload2
                className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]"
                color="#034A9F"
              />
            }
            tooltip="Download Template"
          />
        </div>
      </div>
      <div className="flex justify-start items-end flex-wrap gap-4 2xl:gap-[1vw] mt-4 mt-[1vw]">
        <div className="flex flex-col justify-start items-start w-full min-w-[12rem] md:w-[15vw]">
           <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(date) => setFromDate(date)}
            placeholder="From Date"
            datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
          />
        </div>
        <DatePicker
            label="To Date"
            value={toDate}
            onChange={(date) => setToDate(date)}
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
            options={typeOptions}
            value={selectedType}
            onChange={handleTypeChange}
            dropdownWidth="w-full md:w-fit"
          />
          <Dropdown
            options={headOptions}
            value={selectedHead}
            onChange={handleHeadChange}
            dropdownWidth="w-full md:w-fit"
          />
            <Dropdown
              options={paymentModeOptions}
              value={selectedPaymentMode}
              onChange={handlePaymentModeChange}
              dropdownWidth="w-full md:w-fit"
            />
          <Dropdown
            options={dateRangeOptions}
            value={dateRangeFilter}
            onChange={(val: string) =>
              handleDateRangeChange(
                val as "All Dates" | "Daily" | "Weekly" | "Monthly"
              )
            }
            dropdownWidth="w-full md:w-fit"
          />
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

      {isViewEILogModalOpen && (
        <ViewEILogModal
          isOpen={isViewEILogModalOpen}
          onClose={handleViewModalClose}
          eiLogData={viewEILog}
        />
      )}
    </div>
  );
}
