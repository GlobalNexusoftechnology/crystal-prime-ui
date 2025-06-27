import { InputField, Button, ActionDropdown } from "@/components";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Task } from "../../../add-project-template/types";

interface TaskRowProps {
  task: Task;
  milestoneIndex: number;
  taskIndex: number;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleBlur: (e: any) => void;
  readOnly?: boolean;
}

export function TaskRow({
  task,
  milestoneIndex,
  taskIndex,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  handleChange,
  handleBlur,
  readOnly = false,
}: TaskRowProps) {
  return (
    <div className="grid grid-cols-4 gap-4 2xl:gap-[1vw] items-center py-2 2xl:py-[0.5vw] px-4 2xl:px-[1vw] hover:bg-gray-50 border-b 2xl:border-b-[0.1vw]">
      {isEditing ? (
        <InputField
          name={`milestones[${milestoneIndex}].tasks[${taskIndex}].title`}
          value={task.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Name"
          disabled={readOnly}
        />
      ) : (
        <span>{task.title}</span>
      )}
      {isEditing ? (
        <InputField
          name={`milestones[${milestoneIndex}].tasks[${taskIndex}].estimated_days`}
          value={task.estimated_days}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Days"
          icon={<FaRegCalendarAlt className="text-gray-400" />}
          disabled={readOnly}
        />
      ) : (
        <span>{task.estimated_days}</span>
      )}
      {isEditing ? (
        <InputField
          name={`milestones[${milestoneIndex}].tasks[${taskIndex}].description`}
          value={task.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Description"
          disabled={readOnly}
        />
      ) : (
        <p className="truncate">{task.description}</p>
      )}
      <div className="flex items-center justify-end gap-2">
        {isEditing && !readOnly ? (
          <>
            <Button title="Save" onClick={onSave} className="py-1 px-2" width="w-fit"/>
            <Button title="Cancel" variant="secondary" onClick={onCancel} className="py-1 px-2" width="w-fit"/>
          </>
        ) : (
          !readOnly && (
            <ActionDropdown
              direction="left"
              options={[
                { label: "Edit", onClick: () => onEdit(task?.id || "") },
                { label: "Delete", onClick: () => onDelete(task?.id || ""), className: "text-red-500" },
              ]}
            />
          )
        )}
      </div>
    </div>
  );
} 