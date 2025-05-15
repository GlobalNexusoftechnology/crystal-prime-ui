"use client";

import { AuthCard } from "@/features";
import { Button, InputField } from "@/components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

export function ResetPassword() {
  return (
    <div className="flex justify-center items-center">
      <AuthCard
        title="Forget Password"
        copyright="Copyright ©Satkar.com | 2025"
      >
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form values:", values);
            // Call API or handle save logic here
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

              <Button title="Save Password" type="submit" />
              <Button title="Cancel" variant="primary-outline" type="button" />
            </Form>
          )}
        </Formik>
      </AuthCard>
    </div>
  );
}
