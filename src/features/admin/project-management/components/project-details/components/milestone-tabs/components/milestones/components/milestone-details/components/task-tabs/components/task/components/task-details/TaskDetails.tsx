"use client";

import { Breadcrumb } from "@/features";
import { HeaderDetails } from "../../../../../../../../../../../../../header-details";
import { Comments, TaskEstimates, TaskInfo } from "./components";

export function TaskDetails() {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <HeaderDetails
        title="E Commerce Project"
        projectId="21042"
        status="Open"
        progress="6 / 10"
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <TaskInfo />
        </div>
        <div>
          <TaskEstimates />
        </div>
      </div>
      <Comments />
    </section>
  );
}
