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
  refetchLeads: () => void;
}

export function StatusHistory({
  leadId,
  showForm,
  setShowForm,
  refetchLeads,
}: IStatusHistoryProps) {
  const { allLeadStatusHistoryData, allLeadStatusHistory } = useAllLeadStatusHistoryQuery(leadId);
  const { allStatusesData } = useAllStatusesQuery();
  const { activeSession } = useAuthStore();

  const userId = activeSession?.user?.id

  const { createLeadStatusHistory } = useCreateLeadStatusHistoryMutation({
    onSuccessCallback: (data: ICreateLeadStatusHistoryResponse) => {
      console.log("Lead status created successfully", data);
      formik.resetForm();
      setShowForm(false);
      allLeadStatusHistory();
      refetchLeads();
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
    <div className="flex flex-col gap-4 2xl:gap-[1vw]">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="mb-4 2xl:mb-[1vw] p-4 2xl:p-[1vw] border rounded bg-customGray flex flex-col gap-4 2xl:gap-[1vw]"
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

          <div className="flex justify-end gap-4 2xl:gap-[1vw]">
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
            className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
          >
            <div className="text-darkBlue flex justify-between flex-col gap-2 2xl:gap-[1vw]">
              <div className="flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw] underline">
                <p className="text-[1rem] 2xl:text-[1vw]">Status:</p>
                <p className="text-[1rem] 2xl:text-[1vw]">{statusHistory?.status?.name}</p>
              </div>
              <div className="text-lightGreen flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw] underline">
                <p className="text-[1rem] 2xl:text-[1vw]">Created At:</p>
                <p className="text-[1rem] 2xl:text-[1vw]">{statusHistory?.created_at}</p>
              </div>
            </div>
            <h1 className="text-[1rem] 2xl:text-[1vw]">{statusHistory?.status_remarks}</h1>
            <h1 className="text-primary underline text-[1rem] 2xl:text-[1vw]">
              Assigned To: {statusHistory?.changed_by?.first_name}{" "}
              {statusHistory?.changed_by?.last_name}
            </h1>
          </div>
        ))
      )}
    </div>
  );
}
