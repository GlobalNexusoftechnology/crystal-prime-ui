"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button, SearchBar } from "@/components";
import { RoleRowTable } from "../role-row-table";
import { AddNewRole } from "../add-new-role";
import { useAllRoleListQuery } from "@/services";
// import { ILeadSourcesListTable } from "@/constants";
// import { IRoleListTable } from "@/constants/tables/role-list-table";

interface LeadsListTableProps {
  setIsFollowUpModalOpen?: Dispatch<SetStateAction<boolean>>;
}


export function RoleManagementListTable({}: LeadsListTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const { isError, isPending, data, isLoading } = useAllRoleListQuery();
  const hasNoData = data?.length === 0;
  const shouldRenderFallback = isError || isPending || isLoading || hasNoData;
  console.log("data", data);
  console.log(shouldRenderFallback);
 
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
                console.log("Searching:", query);
              }}
              bgColor="white"
              width="w-full min-w-[12rem] md:w-[25vw]"
            />

            <Button
              title="Add Role"
              variant="background-white"
              width="w-full md:w-fit"
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>

        {/* Data table */}
        <div className="p-4 ">
          <div className="overflow-x-auto border rounded-md shadow-sm">
            <table className="w-full text-[1rem] 2xl:text-[1vw] text-left border-collapse">
              <thead className="bg-white  uppercase text-[1rem] 2xl:text-[1vw] text-gray-300">
                <tr>
                  <th className="p-3 min-w-[12rem] max-w-[12vw]">ID</th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw]">Role Name</th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw]">Created At</th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw]">Updated At</th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw]">Deleted At</th>
                  <th className="p-3 min-w-[12rem] max-w-[12vw]">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((role) => {
                  console.log("Role:", role); //  Console log to check each role

                  return (
                    <RoleRowTable
                      key={role.id}
                      role={role}
                      isExpanded={expandedId === role.id}
                      onToggle={() => toggleExpand(role.id)}
                      // action={Roleaction}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔵 Modal rendering */}
      {showModal && <AddNewRole onClose={() => setShowModal(false)} />}
    </>
  );
}
