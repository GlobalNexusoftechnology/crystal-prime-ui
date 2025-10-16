"use client";
import { Breadcrumb, ExportIcon } from "@/features";
import { AttendanceTable } from "./component";
import { Button, SearchBar, SimpleDropdown } from "@/components";
import { useState } from "react";

export function Attendance() {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const handleSearch = () => {
    console.log("habbi");
  };

  // Dynamically create months array for dropdown
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const monthValue = i + 1;
    const date = new Date(2000, i, 1);
    const label = date.toLocaleDateString('en-US', { month: 'long' });
    return { value: monthValue.toString(), label };
  });

  // Dynamically create years array for dropdown
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - 2 + i;
    return { value: year.toString(), label: year.toString() };
  });

  // Convert selected values to strings for the dropdown
  const selectedMonthString = selectedMonth.toString();
  const selectedYearString = selectedYear.toString();

  const handleMonthChange = (value: string) => {
    setSelectedMonth(Number(value));
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(Number(value));
  };

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Attendance
        </h1>
        <Breadcrumb />
      </div>
      
      {/* Date Selection Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Month Dropdown */}
          <div className="flex flex-col gap-1">
            <SimpleDropdown
              label="Month"
              options={monthOptions}
              value={selectedMonthString}
              onChange={handleMonthChange}
              dropdownWidth="min-w-[140px]"
              buttonClassName="bg-white hover:bg-gray-50"
            />
          </div>

          {/* Year Dropdown */}
          <div className="flex flex-col gap-1">
            <SimpleDropdown
              label="Year"
              options={yearOptions}
              value={selectedYearString}
              onChange={handleYearChange}
              dropdownWidth="min-w-[100px]"
              buttonClassName="bg-white hover:bg-gray-50"
            />
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <SearchBar
            onSearch={handleSearch}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[20vw]"
          />
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
            // onClick={handleLeadDownloadExcel}
          />
        </div>
      </div>

      {/* Pass selected year and month to AttendanceTable */}
      <AttendanceTable year={selectedYear} month={selectedMonth} />
    </div>
  );
}