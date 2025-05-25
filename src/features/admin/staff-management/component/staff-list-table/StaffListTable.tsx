"use client";

import { useState } from "react";
import { Button, SearchBar, Table } from "@/components";
import {
  ITableAction,
  // staffList,
  staffListColumn,
} from "@/constants";
import {
  IAllUsersListResponse,
  useAllUserDownloadExcelQuery,
  useAllUsersQuery,
  useDeleteUserMutation,
} from "@/services";
import { ExportIcon } from "@/features";
import { AddNewStaffModel } from "../add-new-staff-model";
import { EditStaffModel } from "../edit-staff-model";
import { ViewStaffModel } from "../view-staff-model";
import { downloadFile, formatDate, formatDateToMMDDYYYY, IApiError } from "@/utils";
import toast from "react-hot-toast";

export function StaffListTable() {
  const { allUsersData, refetchAllUsers } = useAllUsersQuery();
  const [userId, setUserId] = useState("");
  const [isAddStaffModalOpen, setAddStaffIsModalOpen] = useState(false);
  const [isEditStaffModalOpen, setEditStaffIsModalOpen] = useState(false);
  const [isViewStaffModalOpen, setViewStaffIsModalOpen] = useState(false);
  const { data: allUserDownloadExcel } = useAllUserDownloadExcelQuery();

  const { onDeleteUser } = useDeleteUserMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchAllUsers();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const userList: IAllUsersListResponse[] = (allUsersData ?? []).map(
    (user) => ({
      id: user.id || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      number: user?.phone_number || "",
      email: user?.email || "",
      role: user?.role || "",
      dob: formatDateToMMDDYYYY(user?.dob) || "",
      created_at: formatDate(user?.created_at) || "",
      updated_at: formatDate(user?.updated_at) || "",
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setSelectedRow] = useState<any>(null);

  const handleOpenModal = () => {
    setSelectedRow(null);
    setAddStaffIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddStaffIsModalOpen(false);
    setSelectedRow(null);
  };
  const handleCloseEditStaffModel = () => {
    setEditStaffIsModalOpen(false);
  };

  const handleCloseViewStaffModel = () => {
    setViewStaffIsModalOpen(false);
  };

  const staffActions: ITableAction<IAllUsersListResponse>[] = [
    {
      label: "View",
      onClick: (row) => {
        console.log("View clicked", row.id);
        setViewStaffIsModalOpen(true);
        setUserId(row.id);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
    {
      label: "Edit",
      onClick: (row) => {
        console.log("Edit clicked", row.id);
        setEditStaffIsModalOpen(true);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
    {
      label: "Delete",
      onClick: (row) => {
        console.log("Delete clicked", row.id);
        onDeleteUser(row.id);
      },
      className: "text-red-500",
    },
  ];

  const handleNewStaffSuccessCallback = () => {
    refetchAllUsers();
  };

  const handleUserDownloadExcel = () => {
    if (allUserDownloadExcel?.fileURL) {
      downloadFile(`${allUserDownloadExcel?.fileURL}`, "leads.xlsx");
    } else {
      console.error("Excel download URL is not available");
    }
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

          <div>
            <Button
              title="Add Staff"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={handleOpenModal}
            />

            <AddNewStaffModel
              isOpen={isAddStaffModalOpen}
              onClose={handleCloseModal}
              onNewStaffSuccessCallback={handleNewStaffSuccessCallback}
            />
          </div>

          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            onClick={handleUserDownloadExcel}
            width="w-full md:w-fit"
          />
        </div>
      </div>

      <Table data={userList} columns={staffListColumn} actions={staffActions} />

      {isEditStaffModalOpen && (
        <EditStaffModel
          isOpen={isEditStaffModalOpen}
          userId={userId}
          onAEditSuccessCallback={handleNewStaffSuccessCallback}
          onClose={handleCloseEditStaffModel}
        />
      )}

      {isViewStaffModalOpen && (
        <ViewStaffModel
          isOpen={isViewStaffModalOpen}
          onClose={handleCloseViewStaffModel}
          userId={userId}
        />
      )}
    </div>
  );
}
