"use client";

import { Button } from "@/components";
import { useEffect, useRef, useState } from "react";
import { Comments, Task } from "./components";

const tabs = ["Task", "Comments"];

export function TaskTabs() {
  const [activeTab, setActiveTab] = useState("Task");
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
              className={` 2xl:gap-[2vw] font-medium text-[1rem] 2xl:text-[1vw] ${
                activeTab === tab
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
                {activeTab === "Task" ? (
                  <Button title="Add Task" variant="primary-outline" />
                ) : (
                  <Button title="Add Comment" variant="primary-outline" />
                )}
              </>
            )}
          </span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "Task" && (
          <Task
            leadId="12345"
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
        {activeTab === "Comments" && (
          <Comments
            leadId="12345"
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
