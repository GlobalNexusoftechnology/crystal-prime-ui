import React from "react";
import { useAllUsersQuery } from "@/services";
import { IUsersDetails } from "@/services/apis/clients/community-client/types";
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
    const user = (allUsersData as IUsersDetails[]).find((u) => u.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : userId;
  };

  const getUserInitials = (userId: string) => {
    const userName = getUserName(userId);
    return getInitials(userName);
  };

  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Milestone Info
      </h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Milestone Name
            </p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">
              {milestoneInfoData.name}
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Assigned To
            </p>
            <div className="flex items-center gap-2 2xl:gap-[0.5vw] mt-2 2xl:mt-[0.5vw]">
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
              <p className="py-1 2xl:py-[0.25vw] text-[0.9rem]">
                {getUserName(milestoneInfoData.assigned_to)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
            Description
          </p>
          <p className="text-[1rem] 2xl:text-[1.1vw]">
            {milestoneInfoData.description}
          </p>
        </div>
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Created At
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {milestoneInfoData.created_at}
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Updated At
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {milestoneInfoData.updated_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
