"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import { useCreateClientCredentialMutation } from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface CreateClientCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillEmail?: string;
  clientId?: string;
}

export function CreateClientCredentialModal({ isOpen, onClose, prefillEmail, clientId }: CreateClientCredentialModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  const { onCreateClientCredential, isPending } = useCreateClientCredentialMutation({
    onSuccessCallback: () => {
      toast.success("Client credentials created successfully");
      onClose();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err?.message || "Failed to create credentials");
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: prefillEmail || "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      if (!clientId) {
        toast.error("Client ID is required");
        return;
      }
      
      onCreateClientCredential({
        ...values,
        clientId,
      });
    },
  });

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} modalTitle="Back to Clients" modalClassName="w-auto md:w-[28rem] 2xl:w-[28vw]">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded-lg max-h-[80vh] overflow-y-auto">
        <p className="text-[1.2rem] 2xl:text-[1.2vw] font-semibold">Create Client Credentials</p>
        
        <InputField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          placeholder="Enter email"
        />
        
        <InputField
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
          placeholder="Enter password"
          type={showPassword ? "text" : "password"}
          suffixIcon={
            showPassword ? (
              <FiEye className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
            ) : (
              <FiEyeOff className="w-5 h-5 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
            )
          }
          onIconClick={togglePasswordVisibility}
        />
        
        <div className="flex justify-end gap-3 pt-2">
          <Button title="Cancel" variant="primary-outline" onClick={onClose} />
          <Button title={isPending ? "Creating..." : "Create"} type="submit" variant="primary" disabled={isPending} />
        </div>
      </form>
    </ModalOverlay>
  );
}


