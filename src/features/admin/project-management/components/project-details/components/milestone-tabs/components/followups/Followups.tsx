"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Dropdown, InputField, ModalOverlay } from "@/components";
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
  projectId: string;
}

export function Followups({ projectId, showForm, setShowForm }: IFollowupsProps) {
  // const { data: followupData, LeadFollowUp } = useAlLeadFollowUpQuery(leadId);
  const { allUsersData } = useAllUsersQuery();
  const { activeSession } = useAuthStore();
  const userId = activeSession?.user?.id;

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
      lead_id: projectId,
      due_date: "",
      status: "",
      user_id: userId,
      remarks: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!projectId) {
        toast.error("Project ID is missing");
        return;
      }
      await createLeadFollowUp({ ...values, lead_id: projectId });
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
      <ModalOverlay isOpen={showForm} onClose={()=>setShowForm(false)} modalTitle="Add Follow Up" modalClassName="w-full md:w-[31rem] 2xl:w-[31vw]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
        >
            <DatePicker
              label="Next Followup Date"
              value={`${formik.values.due_date}`}
              onChange={(date) => formik.setFieldValue("due_date", date)}
              placeholder="Next Followup Date"
              error={formik.touched.due_date ? formik.errors.due_date : undefined}
            />
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
      </ModalOverlay>
      ) : (
        <div className="flex flex-col gap-4 2xl:gap-[1vw] bg-customGray border 2xl:border-[0.1vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] text-sm 2xl:text-[0.9vw] text-[#1D2939] w-full md:w-[70%]">
          <div className="flex flex-wrap gap-4 2xl:gap-[1vw] mb-2 2xl:mb-[0.5vw] font-medium text-[#1D2939]">
            <span>
              <span className="2xl:text-[1.1vw] font-normal">
                Assigned To:{" "}
              </span>
              <span className="underline 2xl:text-[1.1vw]">Meena Kapoor</span>
            </span>
            <span>
              <span className="2xl:text-[1.1vw] font-normal">Status: </span>
              <span className="underline 2xl:text-[1.1vw]">Failed</span>
            </span>
          </div>

          <p className="2xl:text-[1.1vw] mb-2 2xl:mb-[0.5vw]">
            We are still waiting for the team&apos;s valuable insights on the
            proposal. Your input is essential for us to proceed. Please share
            your thoughts at your earliest convenience.
          </p>

          <div className="flex flex-wrap items-center gap-4 2xl:gap-[1vw] font-medium">
            <p className="2xl:text-[1.1vw] underline">Due: 26 May 2025,</p>
            <p className="text-lightGreen 2xl:text-[1.1vw]">
              Created At: 26 May 2025, 4:00 PM
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
