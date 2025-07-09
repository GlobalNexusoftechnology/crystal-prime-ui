import toast from "react-hot-toast";
import {
  FaChevronDown,
  FaChevronRight,
  FaRegCalendarAlt,
} from "react-icons/fa";

import { FieldArray, FormikProps } from "formik";

import { InputField, Button, ActionDropdown } from "@/components";
import { AddSquareIcon, TreeStructureIcon } from "@/features";
import { useDeleteProjectTemplateMilestoneMutation } from "@/services";

import { Milestone, Task } from "../../../add-project-template/types";
import { ProjectTemplateFormValues } from "../../../add-project-template/types";
import { TaskRow } from "../task-row";

interface MilestoneRowProps {
  milestone: Milestone;
  index: number;
  isEditing: boolean;
  expanded: boolean;
  openMilestones: { [key: string]: boolean };
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBlur: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  readOnly?: boolean;
}

export function MilestoneRow({
  milestone,
  index,
  isEditing,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  editingTaskId,
  setEditingTaskId,
  readOnly = false,
  formik,
}: MilestoneRowProps & { formik: FormikProps<ProjectTemplateFormValues> }) {
  // Milestone delete mutation
  const { onDeleteProjectTemplateMilestone, isPending: isMilestoneDeleting } =
    useDeleteProjectTemplateMilestoneMutation({
      onSuccessCallback: () => {
        toast.success("Milestone deleted successfully");
        onDelete(index);
      },
      onErrorCallback: (err) => {
        toast.error(err.message || "Failed to delete milestone");
      },
    });

  // Handler for milestone delete
  const handleMilestoneDelete = () => {
    if (milestone.id) {
      onDeleteProjectTemplateMilestone(milestone.id);
    } else {
      onDelete(index); // If not saved yet, just remove from UI
    }
  };

  // Ensure at least one empty task for a new milestone
  const isNewMilestone = !milestone.id && milestone.tasks.length === 0 && index === 0;
  if (isNewMilestone) {
    milestone.tasks.push({ id: '', title: '', estimated_days: '', description: '' });
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 2xl:gap-[1vw] items-center py-2 2xl:py-[0.5vw] px-4 2xl:px-[1vw]  hover:bg-gray-50 border-b ">
        <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
          <button
            type="button"
            onClick={() => onToggle(milestone.id || String(index))}
            className="p-1"
          >
            {expanded ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {isEditing ? (
            <InputField
              name={`milestones[${index}].name`}
              value={formik.values.milestones[index]?.name}
              onChange={e => {
                // Disallow special characters
                const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                formik.setFieldValue(`milestones[${index}].name`, value);
              }}
              onBlur={formik.handleBlur}
              placeholder="Enter Name"
              className="w-full"
              error={
                formik.touched.milestones?.[index]?.name &&
                typeof formik.errors.milestones?.[index] === "object" &&
                formik.errors.milestones?.[index] &&
                "name" in formik.errors.milestones[index]
                  ? formik.errors.milestones[index].name
                  : undefined
              }
            />
          ) : (
            <div className="flex items-center gap-4 2xl:gap-[1vw]">
              <span>{milestone.name}</span>
              <div className="flex items-center gap-1">
                <TreeStructureIcon className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
                <p className="border-2 border-dotted border-primary rounded-full text-xs 2xl:text-[0.9vw] px-1 2xl:px-[0.25vw] text-primary">
                  {milestone.tasks.length}
                </p>
              </div>
            </div>
          )}
        </div>
        {isEditing ? (
          <InputField
            name={`milestones[${index}].estimated_days`}
            value={formik.values.milestones[index]?.estimated_days}
            onChange={e => {
              // Allow only numbers
              const value = e.target.value.replace(/[^0-9]/g, '');
              formik.setFieldValue(`milestones[${index}].estimated_days`, value);
            }}
            onBlur={formik.handleBlur}
            placeholder="Enter Days"
            icon={<FaRegCalendarAlt className="text-gray-400" />}
            error={
              formik.touched.milestones?.[index]?.estimated_days &&
              typeof formik.errors.milestones?.[index] === "object" &&
              formik.errors.milestones?.[index] &&
              "estimated_days" in formik.errors.milestones[index]
                ? formik.errors.milestones[index].estimated_days
                : undefined
            }
          />
        ) : (
          <span>{milestone.estimated_days}</span>
        )}
        {isEditing ? (
          <InputField
            name={`milestones[${index}].description`}
            value={formik.values.milestones[index]?.description}
            onChange={e => {
              // Disallow special characters
              const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
              formik.setFieldValue(`milestones[${index}].description`, value);
            }}
            onBlur={formik.handleBlur}
            placeholder="Enter Description"
            error={
              formik.touched.milestones?.[index]?.description &&
              typeof formik.errors.milestones?.[index] === "object" &&
              formik.errors.milestones?.[index] &&
              "description" in formik.errors.milestones[index]
                ? formik.errors.milestones[index].description
                : undefined
            }
          />
        ) : (
          <p className="truncate">{milestone.description}</p>
        )}
        <div className="flex items-center justify-end gap-2">
          {isEditing && !readOnly ? (
            <>
              <Button
                title="Save"
                type="button"
                onClick={async () => {
                  // Mark all milestone fields as touched
                  await formik.setFieldTouched(
                    `milestones[${index}].name`,
                    true,
                    true
                  );
                  await formik.setFieldTouched(
                    `milestones[${index}].estimated_days`,
                    true,
                    true
                  );
                  await formik.setFieldTouched(
                    `milestones[${index}].description`,
                    true,
                    true
                  );

                  // Validate the milestone fields
                  await formik.validateForm();
                  const milestoneErrors = formik.errors.milestones?.[index];

                  // Only save if there are no errors for this milestone
                  if (
                    !milestoneErrors ||
                    (typeof milestoneErrors === "object" &&
                      !milestoneErrors.name &&
                      !milestoneErrors.estimated_days &&
                      !milestoneErrors.description)
                  ) {
                    onSave();
                  }
                  // Otherwise, stay in edit mode and show errors
                }}
                className="py-1 px-2"
                width="w-fit"
              />
              <Button
                title="Cancel"
                type="button"
                variant="secondary"
                onClick={() => {
                  if (!milestone.id) {
                    // If new milestone (no id), remove the row
                    onDelete(index);
                  } else {
                    // If existing, exit edit mode
                    onCancel();
                  }
                }}
                className="py-1 px-2"
                width="w-fit"
              />
            </>
          ) : (
            !readOnly && (
              <ActionDropdown
                direction="left"
                options={[
                  {
                    label: "Edit",
                    onClick: () => onEdit(milestone.id || String(index)),
                  },
                  {
                    label: isMilestoneDeleting ? "Deleting..." : "Delete",
                    onClick: handleMilestoneDelete,
                    className: "text-red-500",
                  },
                ]}
              />
            )
          )}
        </div>
      </div>
      {expanded && !isEditing && (
        <div className="pl-12 2xl:pl-[3vw] pr-4 2xl:pr-[1vw] pb-4 2xl:pb-[1vw] mt-2">
          <FieldArray
            name={`milestones[${index}].tasks`}
            render={(taskArrayHelpers) => (
              <div>
                <div className="grid grid-cols-4 gap-4 2xl:gap-[1vw] items-center p-4 2xl:p-[1vw] border-b 2xl:border-b-[0.1vw]">
                  <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                    <span className="text-[0.9rem] 2xl:text-[0.875vw] font-medium text-gray-500">
                      Task Name
                    </span>
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => {
                          const tasks =
                            formik.values.milestones[index]?.tasks || [];
                          const lastTask = tasks[tasks.length - 1];
                          if (
                            tasks.length === 0 ||
                            (lastTask &&
                              lastTask.title &&
                              lastTask.estimated_days &&
                              lastTask.description)
                          ) {
                            const newTask = {
                              id: "",
                              title: "",
                              estimated_days: "",
                              description: "",
                            };
                            taskArrayHelpers.push(newTask);
                            setEditingTaskId(String(tasks.length)); // Use the new task's index as the editing key
                          } else {
                            toast.error(
                              "Please complete the previous task before adding a new one."
                            );
                          }
                        }}
                      >
                        <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                      </button>
                    )}
                  </div>
                  <span className="text-[0.9rem] 2xl:text-[0.875vw] font-medium text-gray-500">
                    Estimated Days
                  </span>
                  <span className="text-[0.9rem] 2xl:text-[0.875vw] font-medium text-gray-500">
                    Description
                  </span>
                </div>
                {milestone.tasks?.map((task: Task, taskIndex: number) => (
                  <TaskRow
                    key={task.id ? task.id : taskIndex}
                    task={task}
                    milestoneIndex={index}
                    taskIndex={taskIndex}
                    isEditing={!!editingTaskId && editingTaskId.startsWith(task.id ? task.id : String(taskIndex))}
                    onEdit={() => setEditingTaskId((task.id ? task.id : String(taskIndex)) + '-' + Date.now())}
                    onDelete={taskArrayHelpers.remove}
                    onSave={() => setEditingTaskId(null)}
                    onCancel={() => setEditingTaskId(null)}
                    readOnly={readOnly}
                    formik={formik}
                  />
                ))}
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
