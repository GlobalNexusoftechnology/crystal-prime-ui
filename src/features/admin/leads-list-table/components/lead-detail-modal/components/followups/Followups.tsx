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
import { formatDate, formatIndiaTime, IApiError } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

interface IFollowupsProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  leadId: string;
}

export function Followups({ leadId, showForm, setShowForm }: IFollowupsProps) {
  const queryClient = useQueryClient();
  const { data: followupData, LeadFollowUp } = useAlLeadFollowUpQuery(leadId);
  const { allUsersData } = useAllUsersQuery();
  const { activeSession } = useAuthStore();
  const userId = activeSession?.user?.id;

  const { createLeadFollowUp } = useCreateLeadFollowUpMutation({
    onSuccessCallback: (response: ICreateLeadFollowUpResponse) => {
      console.log("Lead follow-up created successfully", response);
      toast.success(response.message);
      formik.resetForm();
      setShowForm(false);
      LeadFollowUp();
      queryClient.invalidateQueries({ queryKey: ["leads-list-query-key"] });
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

  const statusOptions = Object?.entries(LeadFollowupStatus)?.map(([, value]) => ({
    label: value,
    value,
  }));

  const userOptions =
    allUsersData?.data?.list?.map((user) => ({
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
            label="Next Followup Date"
            value={`${formik.values.due_date}`}
            onChange={(date) => formik.setFieldValue("due_date", date)}
            placeholder="Next Followup Date"
            minDate={new Date().toISOString().slice(0, 10)}
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
        followupData?.map((followup, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-2 md:gap-6 2xl:gap-[2vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
          >
            <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
              <div className="text-darkBlue flex justify-between items-center gap-4 2xl:gap-[1vw]">
                <div className="flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw] underline">
                  <p className="text-[1rem] 2xl:text-[1vw]">Assigned To:</p>
                  <p className="text-[1rem] 2xl:text-[1vw]">{`${followup?.user?.first_name} ${followup?.user?.last_name}`}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw] underline">
                  <p className="text-[1rem] 2xl:text-[1vw]">Status:</p>
                  <p className="text-[1rem] 2xl:text-[1vw]">
                    {followup?.status}
                  </p>
                </div>
              </div>
              <h1 className="text-[1rem] 2xl:text-[1vw]">
                {followup?.remarks}
              </h1>
            </div>
            <div className="flex justify-between flex-col md:flex-row flex-wrap gap-4">
              <div className="flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw] underline">
                <p className="text-[1rem] 2xl:text-[1vw]">Due:</p>
                <p className="text-[1rem] 2xl:text-[1vw]">
                  {formatDate(`${followup?.due_date}`)}
                </p>
              </div>
              <div className="flex flex-col text-lightGreen md:flex-row gap-2 2xl:gap-[0.5vw] underline">
                <p className="text-[1rem] 2xl:text-[1vw]">Created At</p>
                <p className="text-[1rem] 2xl:text-[1vw]">
                  {formatIndiaTime(`${followup?.created_at}`, "toReadable")}
                </p>
              </div>
              {followup?.completed_date ? (
                <div className="text-lightGreen flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw] underline">
                  <p className="text-[1rem] 2xl:text-[1vw]">Completed:</p>
                  <p className="text-[1rem] 2xl:text-[1vw]">
                    {formatIndiaTime(
                      `${followup?.completed_date}`,
                      "toReadable"
                    )}
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
