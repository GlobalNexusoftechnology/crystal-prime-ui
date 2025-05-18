"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";

/**
 * Renders the SignUp form UI with Formik and Yup validation.
 *
 * Includes input fields for:
 * - Email
 * - Create Password
 * - Confirm Password
 *
 * Provides buttons for:
 * - Creating an account
 * - Cancelling the process
 *
 * Includes a navigation link to the "Forget Password" page.
 */
export function SignUp() {
  // Formik setup for form management and validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("SignUp Form Submitted:", values);
    },
  });

  return (
    <div className="flex justify-center items-center">
      <AuthCard title="SignUp" copyright="Copyright ©Satkar.com | 2025">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 2xl:gap-[1vw]"
        >
          <span className="text-[1rem] 2xl:text-[1vw] text-center">
            Welcome! To create your account, please enter your details below.
          </span>

          <div>
            <InputField
              label="Email"
              placeholder="Enter Email"
              name="email"
              type="email"
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

          <div>
            <InputField
              label="Create Password"
              placeholder="Create Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : undefined
              }
            />
          </div>

          <div>
            <InputField
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : undefined
              }
            />
          </div>

          <Button type="submit" title="Create Account" />

          <Button title="Cancel" variant="primary-outline" />

          <div className="text-sm 2xl:text-[0.875vw] text-primary font-medium">
            Already a member?
            <Link href="/login"> Sign in to your account!</Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
