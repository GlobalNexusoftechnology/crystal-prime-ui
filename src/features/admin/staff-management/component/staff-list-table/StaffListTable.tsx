"use client";

import { useEffect, useState } from "react";
import { Button, SearchBar, Table } from "@/components";
import toast from "react-hot-toast";
import {
  ITableAction,
  staffListColumn,
} from "@/constants";
import {
  IAllUsersListResponse,
  IUserViewDetails,
  useAllUserDownloadExcelQuery,
  useAllUsersQuery,
  useDeleteUserMutation,
} from "@/services";
import { ExportIcon } from "@/features";
import { AddNewStaffModel } from "../add-new-staff-model";
import { EditStaffModel } from "../edit-staff-model";
import { ViewStaffModel } from "../view-staff-model";
import {
  downloadBlobFile,
  formatDate,
  formatDateToMMDDYYYY,
  IApiError,
} from "@/utils";

export function StaffListTable() {
  const { allUsersData, refetchAllUsers } = useAllUsersQuery();
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [isViewStaffModalOpen, setIsViewStaffModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<IUserViewDetails | null>(null);
  const { downloadAllUserExcel, data: downloadAllUserExcelData } = useAllUserDownloadExcelQuery();


  const { onDeleteUser } = useDeleteUserMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchAllUsers();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Process Excel file download
  useEffect(() => {
    if (downloadAllUserExcelData instanceof Blob) {
      const filename = `staff_list_${new Date().getTime()}.xlsx`;
      downloadBlobFile(downloadAllUserExcelData, filename);
    }
  }, [downloadAllUserExcelData]);

  // Prepare staff list data for table
  const userList: IAllUsersListResponse[] = (allUsersData ?? []).map((user) => ({
    id: user.id || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    number: user?.phone_number || "",
    email: user?.email || "",
    role: user?.role?.role || "",
    dob: formatDateToMMDDYYYY(user?.dob) || "",
    created_at: formatDate(user?.created_at) || "",
    updated_at: formatDate(user?.updated_at) || "",
    role_id: user?.role?.id || "",
  }));

  // Table actions
  const staffActions: ITableAction<IAllUsersListResponse>[] = [
    {
      label: "View",
      onClick: (row) => {
        setSelectedStaff({
        id: row.id || "",
        first_name: row.first_name || "",
        last_name: row.last_name || "",
        email: row.email || "",
        phone_number: row.number || "",
        dob: row.dob || "",
        role: row?.role || "",
        role_id: row.role_id || "",
        created_at: formatDate(row.created_at) || "",
        updated_at: formatDate(row.updated_at) || "",
      });
        setIsViewStaffModalOpen(true);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
    {
      label: "Edit",
      onClick: (row) => {
        setSelectedStaff({
        id: row.id || "",
        first_name: row.first_name || "",
        last_name: row.last_name || "",
        email: row.email || "",
        phone_number: row.number || "",
        dob: row.dob || "",
        role: row?.role || "",
        role_id: row.role_id || "",
        created_at: formatDate(row.created_at) || "",
        updated_at: formatDate(row.updated_at) || "",
      });
        setIsEditStaffModalOpen(true);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
    {
      label: "Delete",
      onClick: (row) => {
        onDeleteUser(row.id);
      },
      className: "text-red-500",
    },
  ];

  // Modal close handlers
  const handleCloseAddModal = () => setIsAddStaffModalOpen(false);
  const handleCloseEditModal = () => setIsEditStaffModalOpen(false);
  const handleCloseViewModal = () => setIsViewStaffModalOpen(false);

  const handleUserDownloadExcel = () => {
    downloadAllUserExcel();
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Staff List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={(query) => console.log("Searching:", query)}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          <Button
            title="Add Staff"
            variant="background-white"
            width="w-full md:w-fit"
            onClick={() => setIsAddStaffModalOpen(true)}
          />
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
            onClick={handleUserDownloadExcel}
          />
        </div>
      </div>

      <Table data={userList} columns={staffListColumn} actions={staffActions} />

      {/* Modals */}
      <AddNewStaffModel
        isOpen={isAddStaffModalOpen}
        onClose={handleCloseAddModal}
        onNewStaffSuccessCallback={refetchAllUsers}
      />

      {isEditStaffModalOpen && selectedStaff && (
        <EditStaffModel
          isOpen={isEditStaffModalOpen}
          selectStaff={selectedStaff}
          onClose={handleCloseEditModal}
          onAEditSuccessCallback={refetchAllUsers}
        />
      )}

      {isViewStaffModalOpen && selectedStaff && (
        <ViewStaffModel
          isOpen={isViewStaffModalOpen}
          selectStaff={selectedStaff}
          onClose={handleCloseViewModal}
        />
      )}
    </div>
  );
}
