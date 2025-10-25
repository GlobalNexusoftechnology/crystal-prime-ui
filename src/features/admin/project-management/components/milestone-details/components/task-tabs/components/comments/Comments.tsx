"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import {
  ICreateProjectFollowUpPayload,
  ICreateProjectFollowUpResponse,
  ProjectFollowupStatus,
  useAllClientFollowUpQuery,
  useAuthStore,
  useCreateProjectFollowUpMutation,
} from "@/services";
import { IApiError, formatDate } from "@/utils";
import toast from "react-hot-toast";

// Fixing validationSchema field names to match Formik fields
const validationSchema = Yup.object().shape({
  project_id: Yup.string().required("Project ID is required"),
  due_date: Yup.string().required("Next follow-up date is required"),
  status: Yup.string().oneOf(
    Object.values(ProjectFollowupStatus),
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

export function Comments({ projectId, showForm, setShowForm }: IFollowupsProps) {
  const { data: followupData, ProjectFollowUp, isLoading } = useAllClientFollowUpQuery();
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

  const formik = useFormik<ICreateProjectFollowUpPayload>({
    initialValues: {
      due_date: "",
      status: "",
      user_id: userId,
      remarks: "",
      client_id: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!projectId) {
        toast.error("Client ID is missing");
        return;
      }
      await createClientFollowUp({ ...values });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 ">
      {showForm ? (
        <ModalOverlay
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          modalTitle="Add Follow Up"
          modalClassName="w-full md:w-[31rem] "
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6  bg-customGray border  p-3  rounded-md  space-y-1 mb-3 "
          >
            <InputField
              label="Remarks"
              name="remarks"
              placeholder="Enter remarks"
              value={formik.values.remarks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.remarks ? formik.errors.remarks : undefined}
            />
            <div className="flex items-center gap-4 ">
              <Button
                title="Cancel"
                variant="primary-outline"
                type="button"
                onClick={() => setShowForm(false)}
                width="w-full"
              />
              <Button
                title={isPending ? "Creating..." : "Submit Comment"}
                type="submit"
                width="w-full"
                disabled={isPending}
              />
            </div>
          </form>
        </ModalOverlay>
      ) : (
        <div className="flex flex-col gap-4 ">
          {followupData && followupData.length > 0 ? (
            <div className="space-y-4 ">
              {followupData?.length > 0 && followupData?.map((followup) => (
                <div
                  key={followup.id}
                  className="flex flex-col gap-4  bg-customGray border  border-grey-300 rounded-xl  p-4  text-[0.9rem]  text-[#1D2939] w-full"
                >
                  <div className="flex flex-wrap gap-4  mb-2  font-medium text-[#1D2939]">
                    <span>
                      <span className=" font-normal">
                        Assigned To:{" "}
                      </span>
                      <span className="underline ">
                        {followup.user ? `${followup.user.first_name} ${followup.user.last_name}` : 'Unassigned'}
                      </span>
                    </span>
                  </div>

                  <p className=" mb-2 ">
                    {followup.remarks || 'No remarks provided'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4  font-medium">
                    {followup.completed_date && (
                      <p className="text-green-600 ">
                        Completed: {formatDate(followup.completed_date)},
                      </p>
                    )}
                    <p className="text-lightGreen ">
                      Created: {formatDate(followup.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 ">
              <p className="text-gray-500 ">
                No follow-ups found for this client
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
