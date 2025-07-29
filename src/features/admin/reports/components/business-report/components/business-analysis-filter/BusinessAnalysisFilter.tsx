import { DatePicker } from "@/components";

interface BusinessAnalysisFilterProps {
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
}

export function BusinessAnalysisFilter({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: BusinessAnalysisFilterProps) {
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] mb-6 2xl:mb-[1vw]">
      <div>
        <DatePicker
          label="Start Date"
          value={fromDate}
          onChange={setFromDate}
          placeholder="Start Date"
          maxDate={toDate}
        />
      </div>
      <div>
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