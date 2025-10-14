"use client";
import { Button, DatePicker, InputField } from "@/components";
import { useCreateHolidayMutation } from "@/services";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface AddHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Yup validation schema
const HolidaySchema = Yup.object().shape({
  holidayName: Yup.string().required("Holiday name is required"),
  date: Yup.string().required("Date is required"),
});

export function AddHolidayModal({ isOpen, onClose }: AddHolidayModalProps) {
  const { onHolidayMutation } = useCreateHolidayMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay Background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add Holiday
        </h2>

        <Formik
          initialValues={{ holidayName: "", date: "" }}
          validationSchema={HolidaySchema}
          onSubmit={(values, { resetForm }) => {
            onHolidayMutation(values);
            resetForm();
            onClose();
          }}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form className="flex flex-col gap-4">
              <InputField
                label="Holiday Name"
                placeholder="Enter Holiday Name"
                name="holidayName"
                value={values.holidayName}
                onChange={handleChange}
                error={touched.holidayName && errors.holidayName}
              />
              <DatePicker
                label="Date"
                value={values.date}
                onChange={(val) => setFieldValue("date", val)}
                error={touched.date && errors.date}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  title="Cancel"
                  variant="primary-outline"
                  onClick={onClose}
                />
                <Button title="Add" type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}