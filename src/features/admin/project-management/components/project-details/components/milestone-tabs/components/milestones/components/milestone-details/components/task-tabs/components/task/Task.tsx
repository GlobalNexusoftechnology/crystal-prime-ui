"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Dropdown, InputField } from "@/components";
import {
  ICreateLeadFollowUpPayload,
  ICreateLeadFollowUpResponse,
  LeadFollowupStatus,
  // useAlLeadFollowUpQuery,
  useAllUsersQuery,
  useAuthStore,
  useCreateLeadFollowUpMutation,
} from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { useState } from "react";
import { projectData } from "@/constants";
import { TaskStageSection } from "./components";

// Fixing validationSchema field names to match Formik fields
const validationSchema = Yup.object().shape({
  lead_id: Yup.string().required("Lead ID is required"),
  due_date: Yup.string().required("Next follow-up date is required"),
  status: Yup.string().oneOf(
    Object.values(LeadFollowupStatus),
    "Invalid status"
  ),
  user_id: Yup.string().required("Assignee is required"),
  remarks: Yup.string().required("Remark is required"),
});

interface IMilestonesProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  leadId: string;
}

const stageLabels = {
  open: "Open Task",
  inProgress: "In Progress Task",
  completed: "Completed Task",
};

const bgColors = {
  open: "bg-aqua",
  inProgress: "bg-skyBlue",
  completed: "bg-darkGreen",
};

export function Task({
  leadId,
  showForm,
  setShowForm,
}: IMilestonesProps) {
  // const { data: followupData, LeadFollowUp } = useAlLeadFollowUpQuery(leadId);
  const { allUsersData } = useAllUsersQuery();
  const { activeSession } = useAuthStore();
  const userId = activeSession?.user?.id;
    const [projects] = useState(projectData);
    const getProjectsByStage = (stage: "open" | "inProgress" | "completed") =>
      projects.filter((project) => project.stage === stage);

  const { createLeadFollowUp } = useCreateLeadFollowUpMutation({
    onSuccessCallback: (response: ICreateLeadFollowUpResponse) => {
      console.log("Lead follow-up created successfully", response);
      toast.success(response.message);
      formik.resetForm();
      setShowForm(false);
      // LeadFollowUp();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const formik = useFormik<ICreateLeadFollowUpPayload>({
    initialValues: {
      lead_id: leadId,
      due_date: "",
      status: "",
      user_id: userId,
      remarks: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!leadId) {
        toast.error("Lead ID is missing");
        return;
      }
      await createLeadFollowUp({ ...values, lead_id: leadId });
    },
  });

  const statusOptions = Object.entries(LeadFollowupStatus).map(([, value]) => ({
    label: value,
    value,
  }));

  const userOptions =
    allUsersData?.map((user) => ({
      label: `${user?.first_name} ${user?.last_name}`,
      value: user?.id.toString(),
    })) || [];

  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw]">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
        >
          <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw]">
            <Dropdown
              label="Status"
              options={statusOptions}
              value={formik.values.status}
              onChange={(val) => formik.setFieldValue("status", val)}
              error={formik.touched.status ? formik.errors.status : undefined}
            />
            <Dropdown
              label="Assigned To"
              options={userOptions}
              value={formik.values.user_id?.toString() || ""}
              onChange={(val) => formik.setFieldValue("user_id", val)}
              error={formik.touched.user_id ? formik.errors.user_id : undefined}
            />
          </div>
          <InputField
            label="Remarks"
            name="remarks"
            placeholder="Enter remarks"
            value={formik.values.remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.remarks ? formik.errors.remarks : undefined}
          />
          <DatePicker
            label="Next Milestone Date"
            value={`${formik.values.due_date}`}
            onChange={(date) => formik.setFieldValue("due_date", date)}
            placeholder="Next Milestone Date"
            error={formik.touched.due_date ? formik.errors.due_date : undefined}
          />
          <div className="flex items-center gap-4 2xl:gap-[1vw]">
            <Button
              title="Cancel"
              variant="primary-outline"
              type="button"
              onClick={() => setShowForm(false)}
              width="w-full"
            />
            <Button title="Submit followup" type="submit" width="w-full" />
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-[2vw]">
          {(["open", "inProgress", "completed"] as const).map((stage) => (
            <TaskStageSection
              key={stage}
              projects={getProjectsByStage(stage).map((project) => ({
                id: parseInt(project.id.replace("#", "")),
                name: project.projectInfo.name,
                clientName: project.clientInfo.clientName,
                endDate: project.estimates.estimatedEnd,
                status: 0,
                totalTasks: 0,
                stage: project.stage as "open" | "inProgress" | "completed",
                slug: project.slug,
              }))}
              label={stageLabels[stage]}
              bgColor={bgColors[stage]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
