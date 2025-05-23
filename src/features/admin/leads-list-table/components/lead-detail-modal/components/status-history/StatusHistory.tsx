"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Dropdown, InputField } from "@/components";
import { useAllLeadStatusHistoryQuery } from "@/services";

const statusOptions = [
  { label: "Initiated", value: "initiated" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

const assignOptions = [
  { label: "Meena Kapoor", value: "meena" },
  { label: "Ajay Kumar", value: "ajay" },
];

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  status: Yup.string().required("Status is required"),
  assignedTo: Yup.string().required("Assignee is required"),
  remark: Yup.string().required("Remark is required"),
});

interface IStatusHistoryProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}

export function StatusHistory({ showForm, setShowForm }: IStatusHistoryProps) {
  const { allLeadStatusHistoryData } = useAllLeadStatusHistoryQuery();

  const formik = useFormik({
    initialValues: {
      date: "",
      status: "",
      assignedTo: "",
      remark: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      setShowForm(false);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="mb-4 p-4 border rounded bg-customGray flex flex-col gap-4"
        >
          <p className="font-bold">Add Status Update</p>

          <DatePicker
            label="Date"
            value={formik.values.date}
            onChange={(value: string) => formik.setFieldValue("date", value)}
            error={formik.touched.date ? formik.errors.date : undefined}
          />

          <Dropdown
            label="Status"
            options={statusOptions}
            value={formik.values.status}
            onChange={(value: string) => formik.setFieldValue("status", value)}
            error={formik.touched.status ? formik.errors.status : undefined}
          />

          <Dropdown
            label="Assign To"
            options={assignOptions}
            value={formik.values.assignedTo}
            onChange={(value: string) =>
              formik.setFieldValue("assignedTo", value)
            }
            error={
              formik.touched.assignedTo ? formik.errors.assignedTo : undefined
            }
          />

          <InputField
            label="Remark"
            name="remark"
            value={formik.values.remark}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.remark && formik.errors.remark}
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
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 underline">
                <p>Status:</p>
                <p>{statusHistory?.status.name}</p>
              </div>
              <div className="text-lightGreen flex items-center gap-2 underline">
                <p>Created At:</p>
                <p>{statusHistory.created_at}</p>
              </div>
            </div>
            <h1>{statusHistory.status_remarks}</h1>
            <h1 className="text-primary underline">
              Assigned To:
              {statusHistory.lead.first_name} {statusHistory.lead.last_name}
            </h1>
          </div>
        ))
      )}
    </div>
  );
}
