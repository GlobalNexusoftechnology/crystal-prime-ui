"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Button } from "@/components";
import { AuthCard, OtpInput } from "@/features";

/**
 * SentOTP Component (Formik + Yup)
 *
 * Second step in the "Forget Password" flow.
 * Now uses Formik for state and Yup for validation.
 */

type TSentOTPProps = {
  onNext: () => void;
};

// OTP validation schema (assuming 6-digit code)
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .length(5, "OTP must be exactly 5 digits")
    .matches(/^\d+$/, "OTP must contain only digits"),
});

export function SentOTP({ onNext }: TSentOTPProps) {
  return (
    <div className="flex justify-center items-center">
      <AuthCard
        title="Forget Password"
        copyright="Copyrights and developed © Islahdata.com"
      >
        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("OTP Submitted:", values.otp);
            onNext();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-4 2xl:gap-[1vw]">
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
              <Button type="submit" title="Reset Password" />
              <Button title="Cancel" variant="primary-outline" />
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
}
