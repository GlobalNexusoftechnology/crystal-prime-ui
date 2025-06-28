import { ITaskInfo } from "@/constants";
import React from "react";

export interface ITaskInfoProps {
  taskInfoData: ITaskInfo
}

export function TaskInfo({ taskInfoData }: ITaskInfoProps) {
  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2vw] mb-4 2xl:mb-[1vw]">Task Info</h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Task Name</p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">{taskInfoData.title}</p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Assigned To</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{taskInfoData.assigned_to}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-light text-sm 2xl:text-[0.875vw]">Description</p>
          <p className="text-[1rem] 2xl:text-[1.1vw]">{taskInfoData.description}</p>
        </div>
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Created At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{taskInfoData.created_at}</p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Updated At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{taskInfoData.updated_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
