"use client";

import { RoleManagementListTable } from "./components/role-management-list-table/RoleManagementListTable";

export function RoleManagement() {
  return (
    <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      <div>
        <RoleManagementListTable />
      </div>
    </section>
  );
}
