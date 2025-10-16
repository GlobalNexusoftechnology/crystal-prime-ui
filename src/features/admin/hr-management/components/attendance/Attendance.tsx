"use client";
import { Breadcrumb, ExportIcon } from "@/features";
import { AttendanceTable } from "./component";
import { Button, SearchBar, SimpleDropdown } from "@/components";
import { useState } from "react";
import { useAllAttendanceDownloadExcelQuery } from "@/services"; // import your hook

export function Attendance() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [searchText, setSearchText] = useState<string>("");

  const { onAllAttendanceDownloadExcel } = useAllAttendanceDownloadExcelQuery();
  const [isExporting, setIsExporting] = useState(false);

  // Month & Year dropdown options
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const monthValue = i + 1;
    const date = new Date(2000, i, 1);
    const label = date.toLocaleDateString('en-US', { month: 'long' });
    return { value: monthValue.toString(), label };
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - 2 + i;
    return { value: year.toString(), label: year.toString() };
  });

  const handleMonthChange = (value: string) => setSelectedMonth(Number(value));
  const handleYearChange = (value: string) => setSelectedYear(Number(value));
  const handleSearch = (value: string) => setSearchText(value);

  // Export handler
  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob = await onAllAttendanceDownloadExcel({
        year: selectedYear,
        month: selectedMonth,
        searchText,
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Attendance_${selectedMonth}_${selectedYear}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export attendance:", error);
      alert("Failed to export attendance. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Attendance
        </h1>
        <Breadcrumb />
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <SimpleDropdown
            label="Month"
            options={monthOptions}
            value={selectedMonth.toString()}
            onChange={handleMonthChange}
            dropdownWidth="min-w-[140px]"
            buttonClassName="bg-white hover:bg-gray-50"
          />
          <SimpleDropdown
            label="Year"
            options={yearOptions}
            value={selectedYear.toString()}
            onChange={handleYearChange}
            dropdownWidth="min-w-[100px]"
            buttonClassName="bg-white hover:bg-gray-50"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[20vw]"
          />
          <Button
            title={isExporting ? "Exporting..." : "Export"}
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
            onClick={handleExport}
            disabled={isExporting}
          />
        </div>
      </div>

      {/* Attendance Table with filters */}
      <AttendanceTable
        year={selectedYear}
        month={selectedMonth}
        searchText={searchText}
      />
    </div>
  );
}
