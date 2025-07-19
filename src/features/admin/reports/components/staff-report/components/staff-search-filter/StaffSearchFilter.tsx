import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { DatePicker } from "@/components/date-picker";

export function StaffSearchFilter() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw] mb-6 2xl:mb-[1vw]">
      <div>
        <label className="block text-gray-700 2xl:text-[0.9vw] mb-1 2xl:mb-[0.25vw]">Enter Staff Name</label>
        <SearchBar
          placeholder="Enter Staff Name"
          value={search}
          onSearch={setSearch}
          width="w-full"
        />
      </div>
      <div>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          placeholder="Start Date"
        />
      </div>
      <div>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          placeholder="End Date"
        />
      </div>
    </form>
  );
} 