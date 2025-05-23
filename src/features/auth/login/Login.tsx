"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";
import {
  ILoginUserResponseData,
  useAuthStore,
  useLoginMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { addNewSession } = useAuthStore();
  // On successful login, store session and redirect
  const handleSuccessCallback = (data: ILoginUserResponseData) => {
    addNewSession({
      user: data?.data?.user,
      access_token: data?.data.access_token || "",
      refresh_token: data?.data.refresh_token || "",
    });
    window.alert(data?.data?.message);
    const role = data.data.user?.role?.toLowerCase();

    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "developer") {
      router.push("/admin/dashboard");
    }
  };

  // On login failure, show error
  const handleErrorCallback = (error: IApiError) => {
    const response = error.response as { data?: { message?: string } };
    if (error) {
      const errMsg =
        response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      window.alert(errMsg);
    }
  };

  // Use mutation hook for login API
  const { submitLogin, isPending } = useLoginMutation({
    onSuccessCallback: handleSuccessCallback,
    onErrorCallback: handleErrorCallback,
  });

  /**
   * Formik handles form values, validation, and submission.
   */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    /**
     * On submit we simply forward the Formik values
     * to the React-Query mutation.
     */
    onSubmit: (values) => submitLogin(values),
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
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : undefined
            }
          />
          <InputField
            label="Password"
            placeholder="Enter Password"
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
          <Button type="submit" title={isPending ? "Logging in..." : "Login"} />
          <Link
            href="/forget-password"
            className="text-sm 2xl:text-[0.875vw] text-black underline underline-offset-4"
          >
            Forget Password?
          </Link>
        </form>
      </AuthCard>
    </div>
  );
}
