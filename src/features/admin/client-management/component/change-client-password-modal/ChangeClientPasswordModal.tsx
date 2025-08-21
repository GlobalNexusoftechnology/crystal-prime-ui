"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import { useChangeClientPasswordMutation } from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface ChangeClientPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientEmail?: string;
  userId?: string;
}

export function ChangeClientPasswordModal({ isOpen, onClose, clientEmail, userId }: ChangeClientPasswordModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { onChangeClientPassword, isPending } = useChangeClientPasswordMutation({
    onSuccessCallback: () => {
      toast.success("Client password updated successfully");
      onClose();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err?.message || "Failed to update client password");
    },
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(8, "Password must be at least 8 characters").required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      if (!userId) {
        toast.error("User ID is required");
        return;
      }
      
      await onChangeClientPassword({
        userId: userId,
        password: values.newPassword,
      });
    },
  });

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} modalTitle="Back to Clients" modalClassName="w-auto md:w-[28rem] 2xl:w-[28vw]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded-lg max-h-[80vh] overflow-y-auto">
        <p className="text-[1.2rem] 2xl:text-[1.2vw] font-semibold">Change Client Password</p>
        
        {clientEmail && (
          <div className="p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">Client Email: {clientEmail}</p>
          </div>
        )}

        <InputField
          label="New Password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.touched.newPassword && formik.errors.newPassword}
          placeholder="Enter new password"
          type={showPassword ? "text" : "password"}
          suffixIcon={
            showPassword ? (
              <FiEye className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
            ) : (
              <FiEyeOff className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
            )
          }
          onIconClick={() => setShowPassword((s) => !s)}
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          placeholder="Confirm new password"
          type={showConfirmPassword ? "text" : "password"}
          suffixIcon={
            showConfirmPassword ? (
              <FiEye className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
            ) : (
              <FiEyeOff className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
            )
          }
          onIconClick={() => setShowConfirmPassword((s) => !s)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button title="Cancel" variant="primary-outline" onClick={onClose} />
          <Button title={isPending ? "Updating..." : "Update"} type="submit" variant="primary" disabled={isPending} />
        </div>
      </form>
    </ModalOverlay>
  );
}
