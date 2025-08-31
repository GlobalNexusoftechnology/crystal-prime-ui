"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Dropdown, InputField, ModalOverlay } from "@/components";
import {
  ICreateProjectFollowUpResponse,
  ProjectFollowupStatus,
  useAllClientFollowUpQuery,
  useAllUsersQuery,
  useAuthStore,
  useCreateProjectFollowUpMutation,
  useAllClientQuery,
} from "@/services";
import { IApiError, formatDate } from "@/utils";
import toast from "react-hot-toast";

// Fixing validationSchema field names to match Formik fields
const validationSchema = Yup.object().shape({
  client_id: Yup.string().required("Client is required"),
  user_id: Yup.string().nullable(),
  status: Yup.string().oneOf(
    [
      "RESCHEDULE",
      "PENDING",
      "AWAITING RESPONSE",
      "NO RESPONSE",
      "FAILED",
      "COMPLETED",
    ],
    "Invalid status"
  ),
  due_date: Yup.string().nullable(),
  completed_date: Yup.string().nullable(),
  remarks: Yup.string().nullable(),
});

interface IFollowupsProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  taskId: string;
}

export function Followups({ showForm, setShowForm, taskId }: IFollowupsProps) {
  const { data: followupData, ProjectFollowUp, isLoading } = useAllClientFollowUpQuery({ project_task_id: taskId });
  const { allUsersData } = useAllUsersQuery();
  const { allClientData } = useAllClientQuery();
  const { activeSession } = useAuthStore();
  const userId = activeSession?.user?.id;

  const { createClientFollowUp, isPending } = useCreateProjectFollowUpMutation({
    onSuccessCallback: (response: ICreateProjectFollowUpResponse) => {
      toast.success(response.message);
      formik.resetForm();
      setShowForm(false);
      ProjectFollowUp();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const statusOptions = Object?.entries(ProjectFollowupStatus)?.map(([, value]) => ({
    label: value,
    value,
  }));

  const userOptions =
    allUsersData?.data?.list?.map((user) => ({
      label: `${user?.first_name} ${user?.last_name}`,
      value: user?.id.toString(),
    })) || [];

  const clientOptions =
    allClientData?.data?.list?.map((client) => ({
      label: client?.name,
      value: client?.id,
    })) || [];

  const formik = useFormik<{
    client_id: string;
    user_id?: string | null;
    status?: string;
    due_date?: string | null;
    remarks?: string | null;
  }>({
    initialValues: {
      client_id: clientOptions[0]?.value || "",
      user_id: userId || "",
      status: "PENDING",
      due_date: "",
      remarks: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!values.client_id) {
        toast.error("Client ID is required");
        return;
      }
      await createClientFollowUp({
        client_id: values.client_id,
        user_id: values.user_id || undefined,
        status: values.status || "PENDING",
        due_date: values.due_date || undefined,
        remarks: values.remarks || undefined,
        project_task_id: taskId, 
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case ProjectFollowupStatus.COMPLETED:
        return "text-green-600";
      case ProjectFollowupStatus.FAILED:
        return "text-red-600";
      case ProjectFollowupStatus.AWAITING_RESPONSE:
        return "text-blue-600";
      case ProjectFollowupStatus.NO_RESPONSE:
        return "text-orange-600";
      case ProjectFollowupStatus.RESCHEDULE:
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw]">
      {showForm ? (
        <ModalOverlay
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          modalTitle="Add Follow Up"
          modalClassName="w-full md:w-[31rem] 2xl:w-[31vw]"
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.05vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
          >
            <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw]">
              <Dropdown
                label="Client"
                options={clientOptions}
                value={formik.values.client_id}
                onChange={(val) => formik.setFieldValue("client_id", val)}
                error={formik.touched.client_id ? formik.errors.client_id : undefined}
              />
              <Dropdown
                label="Assigned To"
                options={userOptions}
                value={formik.values.user_id?.toString() || ""}
                onChange={(val) => formik.setFieldValue("user_id", val)}
                error={formik.touched.user_id ? formik.errors.user_id : undefined}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw]">
              <Dropdown
                label="Status"
                options={statusOptions}
                value={formik.values.status || "PENDING"}
                onChange={(val) => formik.setFieldValue("status", val)}
                error={formik.touched.status ? formik.errors.status : undefined}
              />
            <DatePicker
              label="Next Followup Date"
              value={formik.values.due_date || ""}
              onChange={(date) => formik.setFieldValue("due_date", date)}
              placeholder="Next Followup Date"
              error={formik.touched.due_date ? formik.errors.due_date : undefined}
            />
            </div>
            <InputField
              label="Remarks"
              name="remarks"
              placeholder="Enter remarks"
              value={formik.values.remarks || ""}
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
              <Button
                title={isPending ? "Creating..." : "Submit followup"}
                type="submit"
                width="w-full"
                disabled={isPending}
              />
            </div>
          </form>
        </ModalOverlay>
      ) : (
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          {followupData && followupData.length > 0 ? (
            <div className="space-y-4 2xl:space-y-[1vw]">
              {followupData?.length > 0 && followupData?.map((followup) => (
                <div
                  key={followup.id}
                  className="flex flex-col gap-4 2xl:gap-[1vw] bg-customGray border 2xl:border-[0.05vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] text-[0.9rem] 2xl:text-[0.9vw] text-[#1D2939] w-full"
                >
                  <div className="flex flex-wrap gap-4 2xl:gap-[1vw] mb-2 2xl:mb-[0.5vw] font-medium text-[#1D2939]">
                    <span>
                      <span className="2xl:text-[1.1vw] font-normal">
                        Assigned To: {" "}
                      </span>
                      <span className="underline 2xl:text-[1.1vw]">
                        {followup.user ? `${followup.user.first_name} ${followup.user.last_name}` : 'Unassigned'}
                      </span>
                    </span>
                    <span>
                      <span className="2xl:text-[1.1vw] font-normal">Status: </span>
                      <span className={`underline 2xl:text-[1.1vw] ${getStatusColor(followup.status)}`}>
                        {followup.status}
                      </span>
                    </span>
                  </div>

                  <p className="2xl:text-[1.1vw] mb-2 2xl:mb-[0.5vw]">
                    {followup.remarks || 'No remarks provided'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 2xl:gap-[1vw] font-medium">
                    <p className="2xl:text-[1.1vw] underline">
                      Due: {followup.due_date ? formatDate(followup.due_date) : 'Not set'},
                    </p>
                    {followup.completed_date && (
                      <p className="text-green-600 2xl:text-[1.1vw]">
                        Completed: {formatDate(followup.completed_date)},
                      </p>
                    )}
                    <p className="text-lightGreen 2xl:text-[1.1vw]">
                      Created: {formatDate(followup.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 2xl:py-[1vw]">
              <p className="text-gray-500 2xl:text-[1.1vw]">
                No follow-ups found for this client
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
