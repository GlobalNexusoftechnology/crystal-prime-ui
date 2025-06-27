import { InputField, Button, ActionDropdown } from "@/components";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Task } from "../../../add-project-template/types";
import { FormikProps } from "formik";
import { ProjectTemplateFormValues } from "../../../add-project-template/types";

interface TaskRowProps {
  task: Task;
  milestoneIndex: number;
  taskIndex: number;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onDelete: (index: number) => void;
  onSave: () => void;
  onCancel: () => void;
  readOnly?: boolean;
  formik: FormikProps<ProjectTemplateFormValues>;
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
  readOnly = false,
  formik,
}: TaskRowProps) {
  return (
    <div className="grid grid-cols-4 gap-4 2xl:gap-[1vw] items-center py-2 2xl:py-[0.5vw] px-4 2xl:px-[1vw] hover:bg-gray-50 border-b 2xl:border-b-[0.1vw]">
      {isEditing ? (
        <InputField
          name={`milestones[${milestoneIndex}].tasks[${taskIndex}].title`}
          value={formik.values.milestones[milestoneIndex]?.tasks[taskIndex]?.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Name"
          disabled={readOnly}
          error={
            formik.touched.milestones?.[milestoneIndex]?.tasks?.[taskIndex]?.title &&
            typeof formik.errors.milestones?.[milestoneIndex] === 'object' &&
            formik.errors.milestones?.[milestoneIndex] &&
            'tasks' in formik.errors.milestones[milestoneIndex] &&
            typeof (formik.errors.milestones[milestoneIndex] as any).tasks?.[taskIndex] === 'object' &&
            (formik.errors.milestones[milestoneIndex] as any).tasks?.[taskIndex] &&
            'title' in (formik.errors.milestones[milestoneIndex] as any).tasks[taskIndex] ?
              (formik.errors.milestones[milestoneIndex] as any).tasks[taskIndex].title : undefined
          }
        />
      ) : (
        <span>{task.title}</span>
      )}
      {isEditing ? (
        <InputField
          name={`milestones[${milestoneIndex}].tasks[${taskIndex}].estimated_days`}
          value={formik.values.milestones[milestoneIndex]?.tasks[taskIndex]?.estimated_days}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Days"
          icon={<FaRegCalendarAlt className="text-gray-400" />}
          disabled={readOnly}
          error={
            formik.touched.milestones?.[milestoneIndex]?.tasks?.[taskIndex]?.estimated_days &&
            typeof formik.errors.milestones?.[milestoneIndex] === 'object' &&
            formik.errors.milestones?.[milestoneIndex] &&
            'tasks' in formik.errors.milestones[milestoneIndex] &&
            typeof (formik.errors.milestones[milestoneIndex] as any).tasks?.[taskIndex] === 'object' &&
            (formik.errors.milestones[milestoneIndex] as any).tasks?.[taskIndex] &&
            'estimated_days' in (formik.errors.milestones[milestoneIndex] as any).tasks[taskIndex] ?
              (formik.errors.milestones[milestoneIndex] as any).tasks[taskIndex].estimated_days : undefined
          }
        />
      ) : (
        <span>{task.estimated_days}</span>
      )}
      {isEditing ? (
        <InputField
          name={`milestones[${milestoneIndex}].tasks[${taskIndex}].description`}
          value={formik.values.milestones[milestoneIndex]?.tasks[taskIndex]?.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Description"
          disabled={readOnly}
          error={
            formik.touched.milestones?.[milestoneIndex]?.tasks?.[taskIndex]?.description &&
            typeof formik.errors.milestones?.[milestoneIndex] === 'object' &&
            formik.errors.milestones?.[milestoneIndex] &&
            'tasks' in formik.errors.milestones[milestoneIndex] &&
            typeof (formik.errors.milestones[milestoneIndex] as any).tasks?.[taskIndex] === 'object' &&
            (formik.errors.milestones[milestoneIndex] as any).tasks?.[taskIndex] &&
            'description' in (formik.errors.milestones[milestoneIndex] as any).tasks[taskIndex] ?
              (formik.errors.milestones[milestoneIndex] as any).tasks[taskIndex].description : undefined
          }
        />
      ) : (
        <p className="truncate">{task.description}</p>
      )}
      <div className="flex items-center justify-end gap-2">
        {isEditing && !readOnly ? (
          <>
            <Button
              title="Save"
              onClick={async () => {
                // Mark all task fields as touched
                await formik.setFieldTouched(`milestones[${milestoneIndex}].tasks[${taskIndex}].title`, true, true);
                await formik.setFieldTouched(`milestones[${milestoneIndex}].tasks[${taskIndex}].estimated_days`, true, true);
                await formik.setFieldTouched(`milestones[${milestoneIndex}].tasks[${taskIndex}].description`, true, true);

                // Validate the task fields
                await formik.validateForm();
                let taskErrors;
                if (
                  typeof formik.errors.milestones?.[milestoneIndex] === 'object' &&
                  formik.errors.milestones?.[milestoneIndex] &&
                  'tasks' in formik.errors.milestones[milestoneIndex]
                ) {
                  taskErrors = (formik.errors.milestones[milestoneIndex] as any).tasks?.[taskIndex];
                }

                // Only save if there are no errors for this task
                if (
                  !taskErrors ||
                  (typeof taskErrors === 'object' &&
                    !taskErrors.title &&
                    !taskErrors.estimated_days &&
                    !taskErrors.description)
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
              variant="secondary"
              onClick={() => {
                if (!task.id) {
                  onDelete(taskIndex);
                } else {
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
                { label: "Edit", onClick: () => onEdit(task?.id || "") },
                { label: "Delete", onClick: () => onDelete(taskIndex), className: "text-red-500" },
              ]}
            />
          )
        )}
      </div>
    </div>
  );
} 