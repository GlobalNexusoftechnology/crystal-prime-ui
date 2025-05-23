"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, DatePicker, Dropdown, InputField } from "@/components";
import { useAlLeadFollowUpQuery } from "@/services";
import { formatDate, formattingDate } from "@/utils";

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
  nextFollowupDate: Yup.string().required("Next follow-up date is required"),
  status: Yup.string().required("Status is required"),
  assign: Yup.string().required("Assignee is required"),
  remark: Yup.string().required("Remark is required"),
});

interface IFollowupsProps {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
}

export function Followups({ showForm, setShowForm }: IFollowupsProps) {
  const { data: followupData } = useAlLeadFollowUpQuery();
  const formik = useFormik({
    initialValues: {
      nextFollowupDate: "",
      status: "",
      assign: "",
      remark: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Followup Submitted:", values);
      formik.resetForm();
      setShowForm(false);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      {showForm ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 rounded-md space-y-1 mb-3"
        >
          <DatePicker
            label="Next Followup Date"
            value={formik.values.nextFollowupDate}
            onChange={(date) => formik.setFieldValue("nextFollowupDate", date)}
            placeholder="Next Followup Date"
            error={
              formik.touched.nextFollowupDate
                ? formik.errors.nextFollowupDate
                : undefined
            }
          />

          <div className="flex items-center gap-4 2xl:gap-[1vw]">
            <Dropdown
              label="Status"
              options={statusOptions}
              value={formik.values.status}
              onChange={(val) => formik.setFieldValue("status", val)}
              dropdownWidth="w-full"
              error={formik.touched.status ? formik.errors.status : undefined}
            />

            <Dropdown
              label="Assign To"
              options={assignOptions}
              value={formik.values.assign}
              onChange={(val) => formik.setFieldValue("assign", val)}
              dropdownWidth="w-full"
              error={formik.touched.assign ? formik.errors.assign : undefined}
            />
          </div>

          <InputField
            label="Remark"
            name="remark"
            placeholder="Enter remark"
            value={formik.values.remark}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.remark ? formik.errors.remark : undefined}
          />

          <div className="flex items-center gap-4 2xl:gap-[1vw]">
            <Button
              title="Cancel"
              variant="primary-outline"
              type="button"
              onClick={() => {
                setShowForm(false);
              }}
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
                  <p>{`${followup.user_id?.first_name} ${followup.user_id?.last_name}`}</p>
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
              <div className="text-lightGreen flex items-center gap-2 2xl:gap-[0.5vw] underline">
                <p>Created At:</p>
                <p>
                  {formattingDate(`${followup.completed_date}`, "toReadable")}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
