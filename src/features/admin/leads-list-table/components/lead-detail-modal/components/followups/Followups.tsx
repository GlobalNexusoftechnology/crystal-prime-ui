"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Dropdown, InputField } from "@/components";
import {
  ICreateLeadFollowUpPayload,
  ICreateLeadFollowUpResponse,
  LeadFollowupStatus,
  useAlLeadFollowUpQuery,
  useAllUsersQuery,
  useAuthStore,
  useCreateLeadFollowUpMutation,
} from "@/services";
import { formatDate, formattingDate, IApiError } from "@/utils";

// ✅ Fixing validationSchema field names to match Formik fields
const validationSchema = Yup.object().shape({
  due_date: Yup.string().required("Next follow-up date is required"),
  status: Yup.string().oneOf(
    Object.values(LeadFollowupStatus),
    "Invalid status"
  ),
  user_id: Yup.string().required("Assignee is required"),
  remarks: Yup.string().required("Remark is required"),
});

interface IFollowupsProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  leadId: string;
}

export function Followups({ leadId, showForm, setShowForm }: IFollowupsProps) {
  const { data: followupData, LeadFollowUp } = useAlLeadFollowUpQuery();
  const { allUsersData } = useAllUsersQuery();
  const { activeSession } = useAuthStore();
  const userId = activeSession?.user?.id;

  const { createLeadFollowUp } = useCreateLeadFollowUpMutation({
    onSuccessCallback: (data: ICreateLeadFollowUpResponse) => {
      console.log("Lead follow-up created successfully", data);
      formik.resetForm();
      setShowForm(false);
      LeadFollowUp();
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create lead follow-up:", err);
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
    onSubmit: (values) => {
      createLeadFollowUp(values);
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
    <div className="flex flex-col gap-4">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md space-y-1 mb-3"
        >
          <div className="flex items-center gap-4 2xl:gap-[1vw]">
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
            label="Next Followup Date"
            value={`${formik.values.due_date}`}
            onChange={(date) => formik.setFieldValue("due_date", date)}
            placeholder="Next Followup Date"
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
            <Button title="Add Next Followup" type="submit" width="w-full" />
          </div>
        </form>
      ) : (
        followupData?.map((followup, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-6 2xl:gap-[2vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md space-y-1 mb-3"
          >
            <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
              <div className="flex items-center gap-4 2xl:gap-[1vw]">
                <div className="flex items-center gap-2 2xl:gap-[0.5vw] underline">
                  <p>Assigned To:</p>
                  <p>{`${followup?.user?.first_name} ${followup?.user?.last_name}`}</p>
                </div>
                <div className="flex items-center gap-2 2xl:gap-[0.5vw] underline">
                  <p>Status:</p>
                  <p>{followup.status}</p>
                </div>
              </div>
              <h1>{followup.remarks}</h1>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 2xl:gap-[0.5vw] underline">
                <p>Due:</p>
                <p>{formatDate(`${followup?.due_date}`)}</p>
              </div>
              {followup.completed_date ? (
                <div className="text-lightGreen flex items-center gap-2 2xl:gap-[0.5vw] underline">
                  <p>Completed:</p>
                  <p>
                    {formattingDate(`${followup.completed_date}`, "toReadable")}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
