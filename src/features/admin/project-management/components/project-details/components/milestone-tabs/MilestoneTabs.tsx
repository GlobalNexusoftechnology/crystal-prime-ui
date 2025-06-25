"use client";

import { Button } from "@/components";
import { useEffect, useRef, useState } from "react";
import { Followups } from "./components";
import { PreviewMilestone } from "../../../add-project/components/step-4-preview/components";

const tabs = ["Milestones", "Followup's"];

export function MilestoneTabs({
  miletonesData = [],
  projectId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  miletonesData?: any[],
  projectId: string,
}) {
  const [activeTab, setActiveTab] = useState("Milestones");
  const [showForm, setShowForm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [showForm]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]"
    >
      {/* Tabs */}
      <div className="flex gap-8 2xl:gap-[2vw] items-center">
        <div className="flex gap-8 2xl:gap-[2vw]">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` 2xl:gap-[2vw] font-medium text-[1rem] 2xl:text-[1vw] ${activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
                }`}
              onClick={() => {
                setActiveTab(tab);
                setShowForm(false);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 2xl:gap-[0.5vw] text-primary text-[1rem] 2xl:text-[1vw]"
        >
          <span>
            {showForm ? (
              "Close"
            ) : (
              <>
                {activeTab === "Milestones" ? (
                  null
                ) : (
                  <Button title="Add followup" variant="primary-outline" />
                )}
              </>
            )}
          </span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "Milestones" && (
          <div className="mb-4 2xl:mb-[1vw]">
            <h3 className="text-lg 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">Milestones</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
                <thead>
                  <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                    <th className="text-left p-2 2xl:p-[0.5vw]">Milestone Name</th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Assigned To</th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Status</th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Estimated Start Date</th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Estimated End Date</th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
                  </tr>
                </thead>
                <tbody>
                  {miletonesData.map((milestone) => (
                    <PreviewMilestone key={milestone.id} milestone={milestone} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {activeTab === "Followup's" && (
          <Followups
            projectId={projectId}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
