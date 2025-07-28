import { useAllUsersQuery } from "@/services";
import { Dropdown } from "@/components/dropdown";
import { DatePicker } from "@/components/date-picker";
import { IUsersDetails } from "@/services";

interface StaffSearchFilterProps {
  selectedStaff: string;
  setSelectedStaff: (id: string) => void;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
}

export function StaffSearchFilter({
  selectedStaff,
  setSelectedStaff,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: StaffSearchFilterProps) {
  const { allUsersData } = useAllUsersQuery();
  let staffList: IUsersDetails[] = allUsersData?.data?.list || [];
  // Exclude users with role 'admin' (case-insensitive, role may be object)
  staffList = staffList.filter(user => user.role?.role?.toLowerCase() !== "admin");

  const staffOptions = [
    ...staffList.map((user: IUsersDetails) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user.id,
    })),
  ];

  return (
    <form className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw] mb-6 2xl:mb-[1vw]">
      <div>
        <Dropdown
          label="Select Staff"
          options={staffOptions}
          value={selectedStaff}
          onChange={setSelectedStaff}
          dropdownWidth="w-full"
        />
      </div>
      <div>
        <DatePicker
          label="From Date"
          value={fromDate}
          onChange={setFromDate}
          placeholder="From Date"
          maxDate={toDate}
        />
      </div>
      <div>
        <DatePicker
          label="To Date"
          value={toDate}
          onChange={setToDate}
          placeholder="To Date"
          minDate={fromDate}
        />
      </div>
    </form>
  );
} 