"use client";

import { useState, useEffect } from "react";
import { Button, SearchBar, Table } from "@/components";
import toast from "react-hot-toast";
import { EAction, EModule, ITableAction, staffListColumn } from "@/constants";
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
import {
  downloadBlobFile,
  formatDate,
  formatDateToDDMMYYYY,
  IApiError,
} from "@/utils";
import { usePermission } from "@/utils/hooks";
import { DeleteModal } from "@/components";

export function StaffListTable() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const { allUsersData, refetchAllUsers } = useAllUsersQuery({ searchText: searchQuery, page: currentPage });
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<IUserViewDetails | null>(
    null
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { downloadAllUserExcel } = useAllUserDownloadExcelQuery();

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const { hasPermission } = usePermission();
  const cavAddStaffManagement = hasPermission(
    EModule.STAFF_MANAGEMENT,
    EAction.ADD
  );

  const cavEditStaffManagement = hasPermission(
    EModule.STAFF_MANAGEMENT,
    EAction.EDIT
  );
  const cavDeleteStaffManagement = hasPermission(
    EModule.STAFF_MANAGEMENT,
    EAction.DELETE
  );

  const { onDeleteUser } = useDeleteUserMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchAllUsers();
      setShowDeleteModal(false);
      setDeleteId(null);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
      setShowDeleteModal(false);
      setDeleteId(null);
    },
  });

  const handleUserDownloadExcel = async () => {
    const blob = await downloadAllUserExcel(searchQuery); 
    if (blob instanceof Blob) {
      await downloadBlobFile(blob, `staff_data.xlsx`);
    }
  };

  // Prepare staff list data for table (no frontend filtering)
  const userList: IAllUsersListResponse[] = (allUsersData?.data?.list ?? []).map(
    (user) => ({
      id: user.id || "",
      employee_id: user?.employee_id || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      number: user?.phone_number || "",
      email: user?.email || "",
      role: user?.role?.role || "",
      dob: formatDateToDDMMYYYY(user?.dob) || "",
      created_at: formatDate(user?.created_at) || "",
      updated_at: formatDate(user?.updated_at) || "",
      role_id: user?.role?.id || "",
    })
  );
  const filteredUserList = userList;

  // Extract pagination data
  const paginationData = allUsersData?.data?.pagination;

  const leadStaffManagementAction: ITableAction<IAllUsersListResponse>[] = [];
  
  if (cavEditStaffManagement) {
    leadStaffManagementAction.push({
      label: "Edit",
      onClick: (row) => {
        setSelectedStaff({
          id: row.id || "",
          employee_id: row.employee_id || "",
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
    });
  }

  if (cavDeleteStaffManagement) {
    leadStaffManagementAction.push({
      label: "Delete",
      onClick: (row) => {
        setDeleteId(row.id);
        setShowDeleteModal(true);
      },
      className: "text-red-500",
    });
  }

  // Modal close handlers
  const handleCloseAddModal = () => setIsAddStaffModalOpen(false);
  const handleCloseEditModal = () => setIsEditStaffModalOpen(false);
  // const handleCloseViewModal = () => setIsViewStaffModalOpen(false);

  const staffNameToDelete = deleteId
    ? (() => {
        const staff = filteredUserList.find((u) => u.id === deleteId);
        return staff ? `${staff.first_name} ${staff.last_name}` : "";
      })()
    : "";

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.05vw] rounded-xl 2xl:rounded-[0.75vw]">
      <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
          Staff List
        </h1>
        <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <SearchBar
            onSearch={setSearchQuery}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw]"
          />
          {cavAddStaffManagement ? (
            <Button
              title="Add Staff"
              variant="background-white"
              width="w-full md:w-fit"
              hover={true}
              onClick={() => setIsAddStaffModalOpen(true)}
            />
          ) : null}
          <Button
            title="Export"
            variant="background-white"
            rightIcon={<ExportIcon />}
            width="w-full md:w-fit"
            onClick={handleUserDownloadExcel}
          />
        </div>
      </div>

              <Table
          data={filteredUserList}
          columns={staffListColumn}
          actions={leadStaffManagementAction}
          paginationData={paginationData}
          onPageChange={setCurrentPage}
        />

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
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId) onDeleteUser(deleteId);
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
        isLoading={false}
        title="Delete Staff"
        message="Are you sure you want to delete this staff "
        itemName={staffNameToDelete}
      />
    </div>
  );
}
