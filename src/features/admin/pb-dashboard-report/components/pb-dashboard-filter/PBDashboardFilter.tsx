import { DatePicker } from "@/components";

interface PBDashboardFilterProps {
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
}

export function PBDashboardFilter({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: PBDashboardFilterProps) {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4  mb-6  items-end">
      <div>
        <DatePicker
          label="Start Date"
          value={fromDate}
          onChange={setFromDate}
          placeholder="Start Date"
          maxDate={toDate}
        />
      </div>
      <div className="flex gap-2">
        <DatePicker
          label="End Date"
          value={toDate}
          onChange={setToDate}
          placeholder="End Date"
          minDate={fromDate}
        />
      </div>
    </form>
  );
}
