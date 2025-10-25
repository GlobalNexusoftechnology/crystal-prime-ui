import React, { useState } from "react";
import { TicketComments } from "./components";
import { Button } from "@/components";

interface CommentTabsProps {
  taskId: string;
  originalTitle: string;
  originalDescription: string;
}

export function TicketCommentTab({
  taskId,
  originalTitle,
  originalDescription,
}: CommentTabsProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-8  p-4 ">
      {/* Header */}
      <div className="flex flex-wrap gap-8  items-center">
        <div className="flex gap-8 ">
          <h3 className="font-medium text-[1.2rem] ">Ticket Comments</h3>
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
                title="Add Ticket Comment"
                variant="primary-outline"
              />
            )}
          </span>
        </div>
      </div>
      {/* Content */}
      <div>
        <TicketComments
          taskId={taskId}
          originalTitle={originalTitle}
          originalDescription={originalDescription}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </div>
    </div>
  );
}
