import { ITaskInfo } from "@/constants";
import React from "react";
import { useAllUsersQuery } from "@/services";
import { getInitials, getRandomColor } from "@/utils";

export interface ITaskInfoProps {
  taskInfoData: ITaskInfo;
}

export function TaskInfo({ taskInfoData }: ITaskInfoProps) {
  // Fetch users to get the name from ID
  const { allUsersData, isLoading: usersLoading } = useAllUsersQuery();

  // Helper function to get user name from ID
  const getUserName = (userId: string) => {
    if (!allUsersData || usersLoading) return userId;
    const user = allUsersData?.data?.list?.find((user) => user.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : userId;
  };

  const getUserInitials = (userId: string) => {
    const userName = getUserName(userId);
    return getInitials(userName);
  };

  return (
    <div className="border-b p-4 ">
      <h3 className="text-[1.2rem]  mb-4 ">Task Info</h3>
      <div className="flex flex-col gap-8  text-[0.9rem] ">
        <div className="flex gap-12  items-start">
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">Task Name</p>
            <p className="underline text-[1rem] ">
              {taskInfoData.title}
            </p>
          </div>
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">Assigned To</p>
            <div className="flex items-center gap-2  mt-2 ">
              <p
                className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full"
                style={{
                  backgroundColor: getRandomColor(
                    taskInfoData.assigned_to || ""
                  ),
                }}
              >
                {getUserInitials(taskInfoData.assigned_to)}
              </p>
              <p className="py-1  text-[0.9rem]">
                {getUserName(taskInfoData.assigned_to)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
          <p className="font-light text-[0.9rem] ">Description</p>
          <p className="text-[1rem] ">
            {taskInfoData.description}
          </p>
        </div>
        <div className="flex gap-12  items-center">
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">Created At</p>
            <p className="text-[1rem] ">
              {taskInfoData.created_at}
            </p>
          </div>
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light text-[0.9rem] ">Updated At</p>
            <p className="text-[1rem] ">
              {taskInfoData.updated_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
