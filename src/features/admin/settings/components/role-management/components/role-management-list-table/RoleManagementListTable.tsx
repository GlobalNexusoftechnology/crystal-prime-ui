"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Button, SearchBar } from "@/components"
import { RoleRowTable } from "../role-row-table"
import { RolePermissionModal } from "../role-permission-modal"
import { IAllRoleList, useAllRoleListQuery } from "@/services"
// import { ILeadSourcesListTable } from "@/constants";
// import { IRoleListTable } from "@/constants/tables/role-list-table";

interface LeadsListTableProps {
  setIsFollowUpModalOpen?: Dispatch<SetStateAction<boolean>>
}

export function RoleManagementListTable({}: LeadsListTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState<IAllRoleList | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }
  const { isError, isPending, data, isLoading, refetchRoles } =
    useAllRoleListQuery()
  const hasNoData = data?.length === 0
  const shouldRenderFallback = isError || isPending || isLoading || hasNoData
  console.log(shouldRenderFallback)

  const handleRoleDelete = (roleId: string) => {
    console.log(roleId)
  }

  const handleRoleEdit = (role: IAllRoleList) => {
    setSelectedRole(role);
    setShowModal(true);
  }

  const handleAddRole = () => {
    setSelectedRole(null);
    setShowModal(true);
  }

  return (
    <>
      <div className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray mx-4 2xl:mx-[1vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw]">
        {/* Header and action controls */}
        <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
          <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
            Role List
          </h1>

          <div className="flex items-center gap-4 2xl:gap-[1vw]">
            <SearchBar
              onSearch={(query) => {
                console.log("Searching:", query)
              }}
              bgColor="white"
              width="w-full min-w-[12rem] md:w-[25vw]"
            />

            <Button
              title="Add Role"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={handleAddRole}
            />
          </div>
        </div>

        {/* Data table */}
        <div>
          <div className="overflow-x-auto border rounded-md shadow-sm">
            <table className="w-full text-[0.9rem] 2xl:text-[0.9vw] text-left border-collapse">
              <thead className="bg-white  uppercase text-[0.9rem] 2xl:text-[0.9vw]">
                <tr>
                  <th className="p-3 min-w-[12rem] max-w-[12vw] uppercase">
                    SR NO
                  </th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw] uppercase">
                    Role Name
                  </th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw] uppercase">
                    Created At
                  </th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw] uppercase">
                    Updated At
                  </th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw] uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((role, index) => {
                  return (
                    <RoleRowTable
                      index={index}
                      key={role.id}
                      role={role}
                      isExpanded={expandedId === role.id}
                      onToggle={() => toggleExpand(role.id)}
                      onRoleDelete={handleRoleDelete}
                      onRoleEdit={handleRoleEdit}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <RolePermissionModal
          mode={selectedRole ? "edit" : "create"}
          onClose={() => setShowModal(false)}
          refetchRoles={refetchRoles}
          defaultValues={selectedRole ?? undefined}
        />
      )}
    </>
  )
}
