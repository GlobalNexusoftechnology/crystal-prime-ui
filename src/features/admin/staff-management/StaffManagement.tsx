"use client";

import { StaffListTable } from "./component";

export function StaffManagement() {
  return (
    <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <h1 className="text-xl 2xl:text-[1.25vw] font-medium">
          Staff Management
        </h1>
      </div>
      <StaffListTable />
    </section>
  );
}
