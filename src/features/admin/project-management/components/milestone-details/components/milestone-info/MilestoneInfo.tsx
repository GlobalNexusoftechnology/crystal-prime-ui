import React from "react";
import { useAllUsersQuery } from "@/services";
import { getInitials, getRandomColor } from "@/utils";

export interface ProjectInfoProps {
  milestoneInfoData: {
    name: string;
    assigned_to: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

export function MilestoneInfo({ milestoneInfoData }: ProjectInfoProps) {
  // Fetch all users to map assigned_to ID to name
  const { allUsersData, isLoading: usersLoading } = useAllUsersQuery();

  // Helper to get user name from ID
  const getUserName = (userId: string) => {
    if (!allUsersData || usersLoading) return userId;
    const user = allUsersData?.data?.list?.find((u) => u.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : userId;
  };

  const getUserInitials = (userId: string) => {
    const userName = getUserName(userId);
    return getInitials(userName);
  };

  return (
    <div className="border-b p-4 ">
      <h3 className="text-[1.2rem]  mb-4 ">
        Milestone Info
      </h3>
      <div className="flex flex-col gap-8  text-[0.9rem] ">
        <div className="flex gap-12  items-start">
          <div className="border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">
              Milestone Name
            </p>
            <p className="underline text-[1rem] ">
              {milestoneInfoData.name}
            </p>
          </div>
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">
              Assigned To
            </p>
            <div className="flex items-center gap-2  mt-2 ">
              <p
                className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full"
                style={{
                  backgroundColor: getRandomColor(
                    milestoneInfoData.assigned_to || ""
                  ),
                }}
              >
                {getUserInitials(milestoneInfoData.assigned_to)}
              </p>
              <p className="py-1  text-[0.9rem]">
                {getUserName(milestoneInfoData.assigned_to)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
          <p className="font-light text-[0.9rem] ">
            Description
          </p>
          <p className="text-[1rem] ">
            {milestoneInfoData.description}
          </p>
        </div>
        <div className="flex gap-12  items-center">
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">
              Created At
            </p>
            <p className="text-[1rem] ">
              {milestoneInfoData.created_at}
            </p>
          </div>
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">
              Updated At
            </p>
            <p className="text-[1rem] ">
              {milestoneInfoData.updated_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
