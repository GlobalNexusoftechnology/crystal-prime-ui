"use client";
import { Button, InputField } from "@/components";
import { IChangePasswordResponse, useChangePasswordMutation } from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";

/**
 * `ChangePassword` component renders a password change form
 * using Formik for state management and Yup for validation.
 *
 * @returns JSX.Element representing the change password form.
 */
export function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { onChangePassword, isPending } = useChangePasswordMutation({
    onSuccessCallback: (response: IChangePasswordResponse) => {
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });
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

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await onChangePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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
          {({ values, handleChange, touched, errors }) => (
            <Form className="space-y-4">
              <InputField
                name="oldPassword"
                label="Old Password"
                placeholder="Enter old password"
                type={showOldPassword ? "text" : "password"}
                value={values.oldPassword}
                onChange={handleChange}
                error={touched.oldPassword && errors.oldPassword}
                suffixIcon={
                  showOldPassword ? (
                    <FiEye className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
                  ) : (
                    <FiEyeOff className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
                  )
                }
                onIconClick={toggleOldPasswordVisibility}
              />

              <InputField
                name="newPassword"
                label="New Password"
                placeholder="Enter new password"
                type={showNewPassword ? "text" : "password"}
                value={values.newPassword}
                onChange={handleChange}
                error={touched.newPassword && errors.newPassword}
                suffixIcon={
                  showNewPassword ? (
                    <FiEye className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
                  ) : (
                    <FiEyeOff className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
                  )
                }
                onIconClick={toggleNewPasswordVisibility}
              />

              <InputField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter new password"
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                error={touched.confirmPassword && errors.confirmPassword}
                suffixIcon={
                  showConfirmPassword ? (
                    <FiEye className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
                  ) : (
                    <FiEyeOff className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
                  )
                }
                onIconClick={toggleConfirmPasswordVisibility}
              />

              <div className="flex gap-5 justify-end pt-4">
                <Button
                  type="button"
                  title="Cancel"
                  variant="primary-outline"
                />
                <Button type="submit" title="Save" disabled={isPending} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
