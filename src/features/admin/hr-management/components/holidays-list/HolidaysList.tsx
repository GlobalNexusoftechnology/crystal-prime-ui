"use client";
import { useState } from "react";
import { Button, Table } from "@/components";
import { holidaysListColumn, ITableAction } from "@/constants";
import { AddHolidayModal, Breadcrumb } from "@/features";
import { FiPlus } from "react-icons/fi";
import {
  IHoliday,
  useAllHolidayQuery,
  useDeleteHolidayMutation,
} from "@/services";
import toast from "react-hot-toast";

export function HolidaysList() {
  const { data, refetchHolidays } = useAllHolidayQuery();

  const { onDeleteHoliday } = useDeleteHolidayMutation({
    onSuccessCallback(data) {
      toast.success(data.message);
      refetchHolidays();
    },
    onErrorCallback(err) {
      toast.error(err.message);
    },
  });

  const holidaysAction: ITableAction<IHoliday>[] = [
    {
      label: "Edit",
      onClick: (row) => {
        console.log("Edit clicked", row);
      },
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: (row) => {
          onDeleteHoliday(row.id); 
        
      },
      className: "text-red-500",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Holidays list
          </h1>
          <Breadcrumb />
        </div>
        <Button
          title="Add Holiday"
          variant="primary"
          onClick={handleOpenModal}
          width="w-full md:w-fit"
          leftIcon={<FiPlus className="w-4 h-4" />}
        />
      </div>

      {/* Table */}
      <Table
        data={data || []}
        columns={holidaysListColumn}
        actions={holidaysAction}
      />

      {/* Modal */}
      <AddHolidayModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        refetchHolidays={refetchHolidays}
      />
    </div>
  );
}