"use client";

import { AddSquareIcon } from "@/features/icons";
import { FieldArray, FormikProps } from "formik";
import { useState } from "react";
import { Milestone } from "../add-project-template/types";
import { MilestoneRow } from "./components";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectTemplateMilestone({ formik, readOnly = false }: { formik: FormikProps<any>; readOnly?: boolean }) {
  const { values, handleChange, handleBlur } = formik;
  const [openMilestones, setOpenMilestones] = useState<{ [key: string]: boolean }>({});
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const toggleMilestone = (id: string) => {
    setOpenMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEditMilestone = (id: string) => {
    setEditingTaskId(null);
    setEditingMilestoneId(id);
  };

  const handleCancel = () => {
    setEditingMilestoneId(null);
    setEditingTaskId(null);
  }

  return (
    <div className="p-4 2xl:p-[1vw]">
      <h1 className="text-[1.1rem] 2xl:text-[1.1vw] font-medium">Milestone</h1>
      <FieldArray
        name="milestones"
        render={(arrayHelpers) => (
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-4 2xl:gap-[1vw] items-center p-4 2xl:p-[1vw] border-b 2xl:border-b-[0.1vw]">
              <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                <span className="text-sm 2xl:text-[0.875vw] font-medium text-gray-500">
                  Milestone Name
                </span>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => {
                      const milestones = values.milestones || [];
                      const lastMilestone = milestones[milestones.length - 1];
                      if (
                        milestones.length === 0 ||
                        (lastMilestone && lastMilestone.name && lastMilestone.estimated_days && lastMilestone.description)
                      ) {
                        const newMilestone = {
                          id: "",
                          name: "",
                          estimated_days: "",
                          description: "",
                          tasks: [],
                        };
                        arrayHelpers.push(newMilestone);
                        const newKey = String(milestones.length);
                        setEditingMilestoneId(newKey);
                      } else {
                        toast.error("Please complete the previous milestone before adding a new one.");
                      }
                    }}
                  >
                    <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                  </button>
                )}
              </div>
              <span className="text-sm 2xl:text-[0.875vw] font-medium text-gray-500">
                Estimated Days
              </span>
              <span className="text-sm 2xl:text-[0.875vw] font-medium text-gray-500">
                Description
              </span>
            </div>
            {values.milestones?.map((milestone: Milestone, index: number) => {
              const milestoneKey = milestone.id || String(index);
              const isEditing = editingMilestoneId === milestoneKey;
              return (
                <MilestoneRow
                  key={milestoneKey}
                  milestone={milestone}
                  index={index}
                  isEditing={isEditing}
                  expanded={!!openMilestones[milestoneKey]}
                  openMilestones={openMilestones}
                  onToggle={toggleMilestone}
                  onEdit={handleEditMilestone}
                  onDelete={arrayHelpers.remove}
                  onSave={() => setEditingMilestoneId(null)}
                  onCancel={handleCancel}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  editingTaskId={editingTaskId}
                  setEditingTaskId={setEditingTaskId}
                  readOnly={readOnly}
                  formik={formik}
                />
              );
            })}
          </div>
        )}
      />
    </div>
  );
} 