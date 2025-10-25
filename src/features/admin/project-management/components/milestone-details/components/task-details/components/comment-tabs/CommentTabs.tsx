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
    <div className="flex flex-col gap-8  p-4 ">
      {/* Tabs */}
      <div className="flex flex-wrap gap-8  items-center">
        <div className="flex gap-8 ">
          {tabs?.length > 0 && tabs?.map((tab) => (
            <button
              key={tab}
              className={`  font-medium text-[1.2rem]  ${
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
          className="flex items-center gap-2  text-primary text-[1rem]  cursor-pointer"
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
          <Followups showForm={showForm} setShowForm={setShowForm} taskId={taskId} projectId={projectId} />
        )}
      </div>
    </div>
  );
}
