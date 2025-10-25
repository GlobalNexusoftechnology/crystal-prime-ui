"use client";

import { AddSquareIcon } from "@/features/icons";
import { FieldArray, FormikProps } from "formik";
import { useState, useEffect } from "react";
import { Milestone } from "../add-project-template/types";
import { MilestoneRow } from "./components";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectTemplateMilestone({ formik, readOnly = false }: { formik: FormikProps<any>; readOnly?: boolean }) {
  const { values, handleChange, handleBlur } = formik;
  const [openMilestones, setOpenMilestones] = useState<{ [key: string]: boolean }>(() => {
    if (values.milestones && values.milestones.length > 0) {
      // Open all milestones by default
      return Object.fromEntries(
        values?.milestones?.map((m: Milestone, idx: number) => [(m.id || String(idx)), true])
      );
    }
    return {};
  });
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(() => {
    if (values?.milestones && values.milestones.length === 1 && !values.milestones[0].id) {
      return "0";
    }
    return null;
  });
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (values.milestones && values.milestones.length > 0) {
      setOpenMilestones(
        Object.fromEntries(
          values?.milestones?.map((m: Milestone, idx: number) => [(m.id || String(idx)), true])
        )
      );
    }
  }, [values.milestones]);

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
    <div className="p-4 ">
      <h1 className="text-[1.1rem]  font-medium">Milestone</h1>
      <FieldArray
        name="milestones"
        render={(arrayHelpers) => (
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-4  items-center p-4  border-b ">
              <div className="flex items-center gap-2 ">
                <span className="text-[0.9rem]  font-medium text-gray-500">
                  Milestone Name
                </span>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={() => {
                      const milestones = values.milestones || [];
                      const firstMilestone = milestones[0];
                      if (
                        milestones.length === 0 ||
                        (firstMilestone && firstMilestone.name && firstMilestone.estimated_days && firstMilestone.description)
                      ) {
                        const newMilestone = {
                          id: "",
                          name: "",
                          estimated_days: "",
                          description: "",
                          tasks: [],
                        };
                        arrayHelpers.unshift(newMilestone);
                        setEditingMilestoneId("0");
                      } else {
                        toast.error("Please complete the current milestone before adding a new one.");
                      }
                    }}
                  >
                    <AddSquareIcon className="w-6 h-6  " />
                  </button>
                )}
              </div>
              <span className="text-[0.9rem]  font-medium text-gray-500">
                Estimated Days
              </span>
              <span className="text-[0.9rem]  font-medium text-gray-500">
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
                  onSave={() => {
                    setEditingMilestoneId(null);
                    const currentMilestone = values.milestones[index];
                    const firstTask = currentMilestone && currentMilestone.tasks && currentMilestone.tasks[0];
                    if (firstTask) {
                      setEditingTaskId((firstTask.id ? firstTask.id : String(0)) + '-' + Date.now());
                    } else {
                      setEditingTaskId(null);
                    }
                  }}
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