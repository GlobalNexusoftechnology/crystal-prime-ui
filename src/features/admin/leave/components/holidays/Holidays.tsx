"use client";
import { Button, Table } from "@/components";
import { holidaysListColumn } from "@/constants";
import { Breadcrumb } from "@/features";
import { useAllHolidayQuery } from "@/services";
import { useState } from "react";
import { useAuthStore } from "@/services/stores/auth-store";
import { WorkRequestModal } from "../../../hr-management/components/attendance/component/work-request-modal";
import { WorkRequestsTable } from "../../../hr-management/components/attendance/component/work-requests-table";

export function Holidays() {
  const { data } = useAllHolidayQuery();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"holidays" | "requests">("holidays");

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

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          className={`pb-2 px-1 ${activeTab === "holidays"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("holidays")}
        >
          Holidays List
        </button>
        <button
          className={`pb-2 px-1 ${activeTab === "requests"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-500 hover:text-gray-700"
            }`}
          onClick={() => setActiveTab("requests")}
        >
          My Work Requests
        </button>
      </div>

      {activeTab === "holidays" ? (
        <Table data={data || []} columns={holidaysListColumn} />
      ) : (
        <WorkRequestsTable />
      )}

      <WorkRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
}
