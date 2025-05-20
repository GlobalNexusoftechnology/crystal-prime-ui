"use client";
import { Button, InputField } from "@/components";
import { Formik, Form } from "formik";
import * as Yup from "yup";

/**
 * `ChangePassword` component renders a password change form
 * using Formik for state management and Yup for validation.
 *
 * @returns JSX.Element representing the change password form.
 */
export function ChangePassword() {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm your new password"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Password Change Submitted:", values);
    // TODO: integrate with backend service
  };

  return (
    <section className="bg-white rounded-lg pb-2 2xl:pb-3 h-screen">
      <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium ml-5 py-5">
        Change Password
      </h1>

      <div className="bg-[#F8F8F8] rounded-xl m-5 border border-[#D7D7D7] p-6 space-y-4 sm:w-[36rem] 2xl:w-[36vw]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, touched, errors, isSubmitting }) => (
            <Form className="space-y-4">
              <InputField
                name="oldPassword"
                label="Old Password"
                placeholder="Enter old password"
                type="password"
                value={values.oldPassword}
                onChange={handleChange}
                error={touched.oldPassword && errors.oldPassword}
              />

              <InputField
                name="newPassword"
                label="New Password"
                placeholder="Enter new password"
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                error={touched.newPassword && errors.newPassword}
              />

              <InputField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter new password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && errors.confirmPassword}
              />

              <div className="flex gap-5 justify-end pt-4">
                <Button type="button" title="Cancel" variant="primary-outline" />
                <Button type="submit" title="Save" disabled={isSubmitting} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
