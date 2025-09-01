import React from "react";
import { useAllUsersQuery } from "@/services";
import { getInitials, getRandomColor } from "@/utils";

export interface ITicketInfoProps {
  ticketInfoData: {
    title: string;
    assigned_to: string;
    description: string;
    created_at: string;
    updated_at: string;
    priority: string;
    remark: string;
  };
}

export function TicketInfo({ ticketInfoData }: ITicketInfoProps) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "high":
        return "bg-orange-100 text-orange-600";
      case "critical":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Ticket Info
      </h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Ticket Title
            </p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">
              {ticketInfoData.title}
            </p>
          </div>
          <div className="flex flex-col border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Assigned To
            </p>
            <div className="flex items-center gap-2 2xl:gap-[0.5vw] mt-2 2xl:mt-[0.5vw]">
              <p
                className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full"
                style={{
                  backgroundColor: getRandomColor(
                    ticketInfoData.assigned_to || ""
                  ),
                }}
              >
                {getUserInitials(ticketInfoData.assigned_to)}
              </p>
              <p className="py-1 2xl:py-[0.25vw] text-[0.9rem]">
                {getUserName(ticketInfoData.assigned_to)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
            Description
          </p>
          <p className="text-[1rem] 2xl:text-[1.1vw]">
            {ticketInfoData.description}
          </p>
        </div>
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col items-center border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-1 2xl:mb-[0.25vw]">
              Priority
            </p>
            <span
              className={`px-3 py-1 rounded-full text-[0.9rem] font-semibold ${getPriorityColor(
                ticketInfoData.priority
              )}`}
            >
              {ticketInfoData.priority}
            </span>
          </div>
          <div className="flex flex-col border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Remark
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {ticketInfoData.remark || "No remark"}
            </p>
          </div>
        </div>
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Created At
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {ticketInfoData.created_at}
            </p>
          </div>
          <div className="flex flex-col border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">
              Updated At
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {ticketInfoData.updated_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
