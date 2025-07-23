"use client";

import { AuthCard } from "@/features";
import { Button, InputField } from "@/components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useResetPasswordMutation } from '@/services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

/**
 * ResetPassword Component
 *
 * Final step in the "Forget Password" flow.
 * Provides input fields for entering and confirming the new password.
 * Includes buttons to save the password or cancel the process.
 */

const validationSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
;

export function ResetPassword({ email }: { email: string }) {
  const router = useRouter();
  const { resetPassword, isPending, error } = useResetPasswordMutation({
    onSuccessCallback: () => {
      toast.success('Password reset successfully. Please login.');
      router.push('/login');
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || 'Failed to reset password');
    },
  });
  return (
    <div className="flex justify-center items-center">
      <AuthCard
        title="Forget Password"
        copyright="Copyrights and developed  Islahdata.com"
      >
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            resetPassword({
              email,
              newPassword: values.password,
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-4 2xl:gap-[1vw]">
              <div>
                <Field
                  name="password"
                  as={InputField}
                  label="Enter Password"
                  placeholder="Enter Password"
                  error={touched.password && errors.password}
                />
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  as={InputField}
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  error={touched.confirmPassword && errors.confirmPassword}
                />
              </div>
              <Button title={isPending ? "Saving..." : "Save Password"} type="submit" disabled={isPending} />
              {error && <div className="text-red-500 text-center">{error.message || 'Failed to reset password'}</div>}
              <Button title="Cancel" variant="primary-outline" type="button" />
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
}
