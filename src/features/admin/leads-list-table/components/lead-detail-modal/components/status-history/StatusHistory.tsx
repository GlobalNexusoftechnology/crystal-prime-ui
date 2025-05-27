"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Dropdown, InputField } from "@/components";
import {
  ICreateLeadStatusHistoryPayload,
  ICreateLeadStatusHistoryResponse,
  useAllLeadStatusHistoryQuery,
  useAllStatusesQuery,
  useAuthStore,
  useCreateLeadStatusHistoryMutation,
} from "@/services";
import { IApiError } from "@/utils";

// ✅ Validation schema
const validationSchema = Yup.object().shape({
  lead_id: Yup.string().required(),
  status_id: Yup.string().required("Status is required"),
  status_remarks: Yup.string().required("Remark is required"),
  changed_by: Yup.string().required(),
});

interface IStatusHistoryProps {
  leadId: string;
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}

export function StatusHistory({
  leadId,
  showForm,
  setShowForm,
}: IStatusHistoryProps) {
  const { allLeadStatusHistoryData, allLeadStatusHistory } = useAllLeadStatusHistoryQuery();
  const { allStatusesData } = useAllStatusesQuery();
  const { activeSession } = useAuthStore();

  const userId = activeSession?.user?.id

  const { createLeadStatusHistory } = useCreateLeadStatusHistoryMutation({
    onSuccessCallback: (data: ICreateLeadStatusHistoryResponse) => {
      console.log("Lead status created successfully", data);
      formik.resetForm();
      setShowForm(false);
      allLeadStatusHistory()
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create lead status:", err);
    },
  });

  const formik = useFormik<ICreateLeadStatusHistoryPayload>({
    initialValues: {
      lead_id: leadId,
      status_id: "",
      status_remarks: "",
      changed_by: userId ? userId : "",
    },
    validationSchema,
    onSubmit: (values) => {
      createLeadStatusHistory(values);
    },
    enableReinitialize: true, // In case leadId or changed_by changes
  });

  const statusOptions =
    allStatusesData?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || [];

  return (
    <div className="flex flex-col gap-4">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="mb-4 p-4 border rounded bg-customGray flex flex-col gap-4"
        >
          <p className="font-bold">Add Status Update</p>

          <Dropdown
            label="Status"
            options={statusOptions}
            value={formik.values.status_id}
            onChange={(val) => formik.setFieldValue("status_id", val)}
            error={formik.touched.status_id ? formik.errors.status_id : undefined}
          />

          <InputField
            label="Remarks"
            name="status_remarks"
            value={formik.values.status_remarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.status_remarks
                ? formik.errors.status_remarks
                : undefined
            }
          />

          <div className="flex justify-end gap-4">
            <Button
              title="Cancel"
              onClick={() => {
                setShowForm(false);
              }}
              variant="primary-outline"
            />
            <Button title="Change Status" type="submit" />
          </div>
        </form>
      ) : (
        allLeadStatusHistoryData?.map((statusHistory, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md space-y-1 mb-3"
          >
            <div className="text-darkBlue flex justify-between items-center">
              <div className="flex items-center gap-2 underline">
                <p>Status:</p>
                <p>{statusHistory?.status?.name}</p>
              </div>
              <div className="text-lightGreen flex items-center gap-2 underline">
                <p>Created At:</p>
                <p>{statusHistory?.created_at}</p>
              </div>
            </div>
            <h1>{statusHistory?.status_remarks}</h1>
            <h1 className="text-primary underline">
              Assigned To: {statusHistory?.changed_by?.first_name}{" "}
              {statusHistory?.changed_by?.last_name}
            </h1>
          </div>
        ))
      )}
    </div>
  );
}
