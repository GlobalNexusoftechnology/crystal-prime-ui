'use client';

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

import { InputField, Button } from "@/components";
import { AuthCard } from "@/features";

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
  onNext: () => void;
};

export function EmailValidation({ onNext }: TEmailValidationProps) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Email Submitted:", values);
      onNext();
    },
  });

  return (
    <div className="flex justify-center items-center ">
      <AuthCard title="Forget Password" copyright="Copyright ©Satkar.com | 2025">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 2xl:gap-[1vw]">
          <span className="text-[1rem] 2xl:text-[1vw] text-center">
            Please provide your credentials to access your account.
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
              error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
            />
          </div>

          {/* Buttons */}
          <Button title="Send OTP" type="submit" />
          <Button title="Cancel" variant="primary-outline" />

          {/* Link to Create Account */}
          <div className="flex gap-2 2xl:gap-[0.5vw]">
            <span className="text-sm 2xl:text-[0.875vw] text-primary font-medium">
              New here?
            </span>
            <Link
              href="/create-account"
              className="text-sm 2xl:text-[0.875vw] text-primary underline underline-offset-4 font-medium"
            >
              Create your account now
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
