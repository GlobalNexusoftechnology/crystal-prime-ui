"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

import { InputField, Button } from "@/components";
import { AuthCard } from "@/features";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from '@/services';
import toast from 'react-hot-toast';

/**
 * EmailValidation Component
 *
 * Step 1 of the "Forget Password" flow.
 * Renders an input field for the user to enter their email.
 * Includes a "Send OTP" button that triggers the `onNext` callback to proceed to the next step.
 *
 * Props:
 * - onNext: Function called when user clicks "Send OTP" button.
 */

type TEmailValidationProps = {
  onNext: (email: string) => void;
};

export function EmailValidation({ onNext }: TEmailValidationProps) {
  const router = useRouter();
  const { submitForgotPassword, isPending, error } = useForgotPasswordMutation({
    onSuccessCallback: () => {
      toast.success('OTP sent to your email');
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || 'Failed to send OTP');
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      submitForgotPassword({ email: values.email });
      onNext(values.email);
    },
  });

  return (
    <div className="flex justify-center items-center ">
      <AuthCard
        title="Forget Password"
        copyright="Copyrights and developed © Islahdata.com"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 "
        >
          <span className="text-[1rem]  text-center">
            Please Enter you email to forget password
          </span>

          {/* Email Input Field */}
          <div>
            <InputField
              label="Email"
              placeholder="Enter Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : undefined
              }
            />
          </div>

          {/* Buttons */}
          <Button title={isPending ? "Sending..." : "Send OTP"} type="submit" disabled={isPending} />
          {error && <div className="text-red-500 text-center">{error.message || 'Failed to send OTP'}</div>}
          <Button
            type="button"
            onClick={() => router.back()}
            title="Cancel"
            variant="primary-outline"
          />
        </form>
      </AuthCard>
    </div>
  );
}
