import React from "react";

export interface ITaskEstimateProps {
    taskEstimateData: { due_date: string }
}

export function TaskEstimate({ taskEstimateData }: ITaskEstimateProps) {
    return (
        <div className="border-b p-4 ">
            <h3 className="text-[1.2rem]  mb-4 ">Task Estimates</h3>
            <div className="flex flex-col gap-8  text-[0.9rem] ">
                <div className="flex flex-wrap gap-12  items-start">
                    <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
                        <p className="font-light">Estimated Start Date</p>
                        <p className="text-[1rem] ">{taskEstimateData.due_date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
