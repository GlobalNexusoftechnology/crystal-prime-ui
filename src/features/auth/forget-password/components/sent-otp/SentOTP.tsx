"use client";

import Link from "next/link";
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
        copyright="Copyright ©Satkar.com | 2025"
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
                className="text-red-500 text-sm"
              />

              <div className="flex flex-col md:flex-row gap-2 2xl:gap-[0.5vw]">
                <span className="text-sm 2xl:text-[0.875vw] text-black">
                  Haven&apos;t received the OTP?
                </span>
                <Link
                  href="/create-account"
                  className="text-sm 2xl:text-[0.875vw] text-primary underline underline-offset-4"
                >
                  Click here to resend.
                </Link>
              </div>

              <div className="flex gap-2 2xl:gap-[0.5vw]">
                <span className="text-sm 2xl:text-[0.875vw] text-primary">
                  Now here
                </span>
                <Link
                  href="/create-account"
                  className="text-sm 2xl:text-[0.875vw] text-primary underline underline-offset-4"
                >
                  Create your account now!
                </Link>
              </div>

              <Button type="submit" title="Reset Password" />
              <Button title="Cancel" variant="primary-outline" />
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
}
