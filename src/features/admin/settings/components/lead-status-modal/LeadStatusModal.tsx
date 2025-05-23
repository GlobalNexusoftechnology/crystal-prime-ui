import { Button, InputField, ModalOverlay } from "@/components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/**
 * Props for the LeadStatusModal component.
 * 
 * @property onClose - Callback function to close the modal.
 */
interface LeadStatusModalProps {
  onClose: () => void;
}

/**
 * `LeadStatusModal` is a modal dialog component for adding a new lead status.
 * 
 * It uses Formik for form state management and Yup for validation.
 * The form consists of a single input for the lead status, which is required and
 * limited to 50 characters.
 * 
 * On successful submission, the form data is logged to the console, the form resets,
 * and the modal is closed.
 * 
 * @param onClose - Function called to close the modal.
 */
export function LeadStatusModal({ onClose }: LeadStatusModalProps) {
  return (
    <ModalOverlay isOpen={true} onClose={onClose}>
      <div className="bg-[#F8F8F8] sm:w-[30rem] mx-auto rounded-lg p-6 shadow space-y-1">
        <div className="border border-[#D7D7D7] rounded-lg p-4 space-y-4 bg-[#FFFFFF]">
          <h2 className="text-base font-semibold text-gray-800">
            Add Lead Status
          </h2>

          <Formik
            initialValues={{ leadStatus: "" }}
            validationSchema={Yup.object({
              leadStatus: Yup.string()
                .required("Lead status is required")
                .max(50, "Must be 50 characters or less"),
            })}
            onSubmit={(values, { resetForm }) => {
              // Log submitted values, reset form, then close modal
              console.log("Form Submitted:", values);
              resetForm();
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Lead Status Input Field */}
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Lead Status
                  </label>
                  <Field
                    name="leadStatus"
                    as={InputField}
                    type="text"
                    placeholder="Enter New Lead Status"
                  />
                  <div className="text-red-500 text-sm mt-1">
                    <ErrorMessage name="leadStatus" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-2">
                  <Button
                    variant="primary-outline"
                    title="Cancel"
                    width="w-full"
                    onClick={onClose}
                    type="button"
                  />
                  <Button
                    variant="primary"
                    title="Add Status"
                    width="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ModalOverlay>
  );
}
