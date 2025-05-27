"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button, InputField } from "@/components";
import { AuthCard } from "../auth-card";
import { ILoginUserResponse, useAuthStore, useLoginMutation } from "@/services";
import { IApiError } from "@/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // ✅ import toast
import { FiEye, FiEyeOff } from "react-icons/fi";

export function Login() {
  const router = useRouter();
  const { addNewSession } = useAuthStore();
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

  const handleSuccessCallback = (response: ILoginUserResponse) => {
    const loginData = response.data;

    addNewSession({
      user: loginData?.user,
      access_token: loginData.access_token || "",
      refresh_token: loginData.refresh_token || "",
    });

    toast.success(response?.message || "Login successful 🎉");
    router.push("/admin/lead-management");
  };

  const handleErrorCallback = (error: IApiError) => {
    const response = error.response as { data?: { message?: string } };
    const errMsg =
      response?.data?.message ||
      error?.message ||
      "Login failed. Please try again.";
    toast.error(errMsg); 
  };

  const { submitLogin, isPending } = useLoginMutation({
    onSuccessCallback: handleSuccessCallback,
    onErrorCallback: handleErrorCallback,
  });

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
    onSubmit: (values) => submitLogin(values),
  });

  return (
    <div className="flex justify-center items-center">
      <AuthCard title="Login" copyright="Copyrights and developed © Islahdata.com">
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
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : undefined
            }
            suffixIcon={
              showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />
            }
            onIconClick={togglePasswordVisibility}
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
