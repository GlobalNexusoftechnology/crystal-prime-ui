"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";
/**
 * Login Component
 * 
 * This component renders a login form that allows users to sign in to their account. It uses Formik for form management and Yup for validation. The form includes fields for entering an email and password, as well as error handling for form validation.
 * 
 * Key Features:
 * - Form handling with Formik, including form values, validation, and submission.
 * - Yup validation schema for email (must be valid and required) and password (must be at least 6 characters and required).
 * - Conditional rendering of error messages for form fields when validation fails.
 * - Responsive design with Tailwind CSS for better usability on different screen sizes.
 * - Navigation links for "Forgot Password?" and "Create Account" pages.
 */
export function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Login Form Submitted:", values);
    },
  });

  return (
    <div className="flex justify-center items-center">
      <AuthCard title="Login" copyright="Copyright ©Satkar.com | 2025">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 2xl:gap-[1vw]"
        >
          <span className="text-[1rem] 2xl:text-[1vw] text-center">
            Please provide your credentials to access your account.
          </span>

          <InputField
            label="Email"
            placeholder="Enter Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
          />

          <InputField
            label="Password"
            placeholder="Enter Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
          />

          <Button type="submit" title="Login" />

          <Link
            href="/forget-password"
            className="text-sm 2xl:text-[0.875vw] text-black underline underline-offset-4"
          >
            Forget Password?
          </Link>

          <div className="flex gap-2 2xl:gap-[0.5vw]">
            <span className="text-sm 2xl:text-[0.875vw] text-primary">
              New here?
            </span>
            <Link
              href="/create-account"
              className="text-sm 2xl:text-[0.875vw] text-primary underline underline-offset-4"
            >
              Create your account now
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
