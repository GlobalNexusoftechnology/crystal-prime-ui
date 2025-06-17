"use client";

import { Breadcrumb } from "@/features";
import {
  ClientInfo,
  DocumentSection,
  MilestoneTabs,
  ProjectEstimate,
  ProjectHeader,
  ProjectInfo,
} from "./components";

export function ProjectDetails() {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <ProjectHeader />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <ProjectInfo />
          <DocumentSection />
        </div>
        <div>
          <ClientInfo />
          <ProjectEstimate />
        </div>
      </div>
      <MilestoneTabs />
    </section>
  );
}
