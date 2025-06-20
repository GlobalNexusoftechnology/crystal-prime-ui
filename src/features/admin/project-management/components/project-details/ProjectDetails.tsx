"use client";

import { Breadcrumb } from "@/features";
import {
  ClientInfo,
  DocumentSection,
  MilestoneTabs,
  ProjectEstimate,
  ProjectInfo,
} from "./components";
import { HeaderDetails } from "../header-details";

export function ProjectDetails() {
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
          <ProjectInfo projectInfoData={{
            name: "",
            type: "",
            contactPerson: "",
            description: "",
            createdAt: "",
            updatedAt: ""
          }} />
          <DocumentSection documentSectionData={[]} />
        </div>
        <div>
          <ClientInfo clientInfoData={{
            clientName: "",
            companyName: "",
            contactPerson: "",
            phone: "",
            email: ""
          }} />
          <ProjectEstimate projectEstimateData={{
            estimatedStart: "",
            actualStart: "",
            estimatedEnd: "",
            actualEnd: "",
            estimatedCost: "",
            actualCost: "",
            labourCost: "",
            overheadCost: "",
            budget: ""
          }} />
        </div>
      </div>
      <MilestoneTabs />
    </section>
  );
}
