"use client";

import { StaffListTable } from "./component";

export function StaffManagement() {
  return (
    <section className="flex flex-col gap-6 md:gap-8  border border-gray-300 rounded-lg  bg-white p-2 sm:p-4 ">
      <div className="flex flex-col gap-2  px-4 ">
        <h1 className="text-xl  font-medium">
          Staff Management
        </h1>
      </div>
      <StaffListTable />
    </section>
  );
}
