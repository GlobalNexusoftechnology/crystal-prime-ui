"use client";
import { Button, Table } from "@/components";
import { holidaysListColumn } from "@/constants";
import { Breadcrumb } from "@/features";
import { useAllHolidayQuery } from "@/services";
import { useState } from "react";
import { useAuthStore } from "@/services/stores/auth-store";
import { WorkRequestModal } from "../../../hr-management/components/attendance/component/work-request-modal";

export function Holidays() {
  const { data } = useAllHolidayQuery();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const { activeSession } = useAuthStore();
  const userRole = activeSession?.user?.role?.role;
  const canRequestWork = userRole !== "Admin" && userRole !== "Client";

  return (
    <div className="p-6 md:p-8  bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Holidays
          </h1>
          <Breadcrumb />
        </div>
        {canRequestWork && (
          <Button
            title="Request Work"
            width="w-fit"
            onClick={() => setIsRequestModalOpen(true)}
          />
        )}
      </div>
      <Table data={data || []} columns={holidaysListColumn} />

      <WorkRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
}
