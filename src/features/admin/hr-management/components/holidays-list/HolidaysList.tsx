"use client";
import { useState } from "react";
import { Button, Table } from "@/components";
import { holidaysAction, holidaysListColumn } from "@/constants";
import { AddHolidayModal, Breadcrumb } from "@/features";
import { FiPlus } from "react-icons/fi";
import { useAllHolidayQuery } from "@/services";

export function HolidaysList() {
  const { data } = useAllHolidayQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Holidays list
          </h1>
          <Breadcrumb />
        </div>
        <div>
          <Button
            title="Add Holiday"
            variant="primary"
            onClick={handleOpenModal}
            width="w-full md:w-fit"
            leftIcon={<FiPlus className="w-4 h-4" />}
          />
        </div>
      </div>

      <Table
        data={data || []}
        columns={holidaysListColumn}
        actions={holidaysAction}
      />

      <AddHolidayModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
