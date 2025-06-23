import { InputField, Button, ActionDropdown } from "@/components";
import { AddSquareIcon, TreeStructureIcon } from "@/features";
import { FaChevronDown, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import { FieldArray } from "formik";
import { Milestone, Task } from "../../../add-project-template/types";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: (e: any) => void;
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
  handleChange,
  handleBlur,
  editingTaskId,
  setEditingTaskId,
  readOnly = false,
}: MilestoneRowProps) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 2xl:gap-[1vw] items-center py-2 2xl:py-[0.5vw] px-4 2xl:px-[1vw]  hover:bg-gray-50 border-b ">
        <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
          <button
            type="button"
            onClick={() => onToggle(milestone.id)}
            className="p-1"
          >
            {expanded ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          {isEditing ? (
            <InputField
              name={`milestones[${index}].name`}
              value={milestone.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Name"
              className="w-full"
              disabled={readOnly}
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
            name={`milestones[${index}].estimatedDays`}
            value={milestone.estimatedDays}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Days"
            icon={<FaRegCalendarAlt className="text-gray-400" />}
            disabled={readOnly}
          />
        ) : (
          <span>{milestone.estimatedDays}</span>
        )}
        {isEditing ? (
          <InputField
            name={`milestones[${index}].description`}
            value={milestone.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Description"
            disabled={readOnly}
          />
        ) : (
          <p className="truncate">{milestone.description}</p>
        )}
        <div className="flex items-center justify-end gap-2">
          {isEditing && !readOnly ? (
            <>
              <Button title="Save" onClick={onSave} className="py-1 px-2" width="w-fit" />
              <Button title="Cancel" variant="secondary" onClick={onCancel} className="py-1 px-2" width="w-fit" />
            </>
          ) : (
            !readOnly && (
              <ActionDropdown
                direction="left"
                options={[
                  { label: "Edit", onClick: () => onEdit(milestone.id) },
                  { label: "Delete", onClick: () => onDelete(index), className: "text-red-500" },
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
                    <span className="text-sm 2xl:text-[0.875vw] font-medium text-gray-500">
                      Task Name
                    </span>
                    {!readOnly && (
                      <button
                        type="button"
                        onClick={() => {
                          const newTask = {
                            id: Math.random().toString(36).substr(2, 9),
                            name: "New Task",
                            estimatedDays: "",
                            description: "",
                          };
                          taskArrayHelpers.push(newTask);
                          setEditingTaskId(newTask.id);
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
                {milestone.tasks?.map((task: Task, taskIndex: number) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    milestoneIndex={index}
                    taskIndex={taskIndex}
                    isEditing={editingTaskId === task.id}
                    onEdit={setEditingTaskId}
                    onDelete={() => taskArrayHelpers.remove(taskIndex)}
                    onSave={() => setEditingTaskId(null)}
                    onCancel={() => setEditingTaskId(null)}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    readOnly={readOnly}
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