import { Table } from "@/components";
import { holidaysAction, holidaysList, holidaysListColumn } from "@/constants";
import { Breadcrumb } from "@/features";

export function Holidays() {
  return (
    <div className="p-6 md:p-8  bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Holidays</h1>
        <Breadcrumb />
      </div>
      <Table
        data={holidaysList}
        columns={holidaysListColumn}
        actions={holidaysAction}
      />
    </div>
  );
}
