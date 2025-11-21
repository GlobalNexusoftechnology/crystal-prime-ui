"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button } from "@/components";
import { AuthCard, OtpInput } from "@/features";
import { useVerifyOtpMutation } from '@/services';
import toast from 'react-hot-toast';

/**
 * SentOTP Component (Formik + Yup)
 *
 * Second step in the "Forget Password" flow.
 * Now uses Formik for state and Yup for validation.
 */

type TSentOTPProps = {
  onNext: () => void;
  email: string;
};

// OTP validation schema (assuming 6-digit code)
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .matches(/^\d+$/, "OTP must contain only digits"),
});

export function SentOTP({ onNext, email }: TSentOTPProps) {
  const { submitVerifyOtp, isPending, error } = useVerifyOtpMutation({
    onSuccessCallback: () => {
      toast.success('OTP verified successfully');
      onNext();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || 'Failed to verify OTP');
    },
  });
  return (
    <div className="flex justify-center items-center">
      <AuthCard
        title="Forget Password"
        copyright=""
      >
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            submitVerifyOtp({ email, otp: values.otp });
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-4 ">
              {/* OtpInput connected to Formik */}
              <OtpInput
                value={values.otp}
                onChange={(val: string) => setFieldValue("otp", val)}
              />
              <ErrorMessage
                name="otp"
                component="div"
                className="text-red-500 text-[0.9rem]"
              />
              <Button type="submit" title={isPending ? "Verifying..." : "Reset Password"} disabled={isPending} />
              {error && <div className="text-red-500 text-center">{error.message || 'Failed to verify OTP'}</div>}
              <Button title="Cancel" variant="primary-outline" />
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
}
