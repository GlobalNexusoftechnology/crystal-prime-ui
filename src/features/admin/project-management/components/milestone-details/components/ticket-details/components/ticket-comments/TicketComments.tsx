import React, { useState } from "react";
import { DailyTask, Followups } from "./components";
import { Button } from "@/components";

const tabs = ["Daily Task", "Follow-ups"];

interface CommentTabsProps {
  projectId: string;
  taskId: string;
  assignedTo: string;
  originalTitle: string;
  originalDescription: string;
}

export function CommentTabs({
  projectId,
  taskId,
  assignedTo,
  originalTitle,
  originalDescription,
}: CommentTabsProps) {
  const [activeTab, setActiveTab] = useState("Daily Task");
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
      {/* Tabs */}
      <div className="flex flex-wrap gap-8 2xl:gap-[2vw] items-center">
        <div className="flex gap-8 2xl:gap-[2vw]">
          {tabs?.length > 0 && tabs?.map((tab) => (
            <button
              key={tab}
              className={` 2xl:gap-[2vw] font-medium text-[1.2rem] 2xl:text-[1.2vw] ${
                activeTab === tab ? "" : "text-gray-500"
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
        <div
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 2xl:gap-[0.5vw] text-primary text-[1rem] 2xl:text-[1vw] cursor-pointer"
        >
          <span>
            {showForm ? (
              "Close"
            ) : (
              <Button
                title={activeTab === "Daily Task" ? "Add Daily Task Comment" : "Add Followup"}
                variant="primary-outline"
              />
            )}
          </span>
        </div>
      </div>
      {/* Tab Contents */}
      <div>
        {activeTab === "Daily Task" && (
          <DailyTask
            projectId={projectId}
            taskId={taskId}
            assignedTo={assignedTo}
            originalTitle={originalTitle}
            originalDescription={originalDescription}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
        {activeTab === "Follow-ups" && (
          <Followups showForm={showForm} setShowForm={setShowForm} taskId={taskId} />
        )}
      </div>
    </div>
  );
}
