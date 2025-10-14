"use client";
import { Button, DatePicker, InputField } from "@/components";
import {
  IHoliday,
  useCreateHolidayMutation,
  useUpdateHolidayMutation,
} from "@/services";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface AddHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetchHolidays: () => void;
  selectedHoliday?: IHoliday | null;
}

const HolidaySchema = Yup.object().shape({
  holidayName: Yup.string().required("Holiday name is required"),
  date: Yup.string().required("Date is required"),
});

export function AddHolidayModal({
  isOpen,
  onClose,
  refetchHolidays,
  selectedHoliday,
}: AddHolidayModalProps) {
  const { onHolidayMutation } = useCreateHolidayMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchHolidays();
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });

  const { updateHoliday } = useUpdateHolidayMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      refetchHolidays();
    },
    onErrorCallback: (err) => {
      toast.error(err.message);
    },
  });

  if (!isOpen) return null;
  const isEditMode = !!selectedHoliday;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4 z-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isEditMode ? "Edit Holiday" : "Add Holiday"}
        </h2>

        <Formik
          initialValues={{
            holidayName: selectedHoliday?.holidayName || "",
            date: selectedHoliday?.date || "",
          }}
          enableReinitialize
          validationSchema={HolidaySchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              if (isEditMode && selectedHoliday) {
                await updateHoliday({
                  id: selectedHoliday.id,
                  payload: {
                    holidayName: values.holidayName,
                    date: values.date,
                  },
                });
              } else {
                await onHolidayMutation(values);
              }
              await refetchHolidays();
              resetForm();
              onClose();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {({
            values,
            handleChange,
            setFieldValue,
            errors,
            touched,
            resetForm,
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
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                />
                <Button title={isEditMode ? "Update" : "Add"} type="submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
