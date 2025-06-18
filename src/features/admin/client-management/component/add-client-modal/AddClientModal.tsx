"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Checkbox, InputField, ModalOverlay } from "@/components";
import { IUpdateClientPayload, useAllClientQuery, useCreateClientMutation } from "@/services";
import { IApiError } from "@/utils";
import { IClientListProps } from "@/constants";
import toast from "react-hot-toast";

type AddClientModalProps = {
  onClose: () => void;
  selectedClient?: IClientListProps | null;
  onUpdateClient?: (payload: IUpdateClientPayload) => void;
  isUpdatePending?: boolean;
};

/**
 * Modal for adding a new client or editing an existing client.
 */
export function AddClientModal({ onClose, selectedClient, onUpdateClient, isUpdatePending }: AddClientModalProps) {
  const { refetchClient } = useAllClientQuery();
  const isEditMode = !!selectedClient;

  const handleClientSuccess = () => {
    toast.success(isEditMode ? "Client updated successfully" : "Client created successfully");
    refetchClient();
    onClose();
  };

  const handleClientError = (error: IApiError) => {
    toast.error(error.message || "Something went wrong");
  };

  const { onCreateClient, isPending: isCreatePending } = useCreateClientMutation({
    onSuccessCallback: handleClientSuccess,
    onErrorCallback: handleClientError,
  });

  const formik = useFormik({
    initialValues: {
      customerName: selectedClient?.name || "",
      companyName: selectedClient?.company_name || "",
      address: selectedClient?.address || "",
      contactPerson1: selectedClient?.contact_person || "",
      websiteUrl: selectedClient?.website || "",
      phoneNumber1: selectedClient?.contact_number || "",
      email1: selectedClient?.email || "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Customer name is required"),
      companyName: Yup.string().required("Company name is required"),
      address: Yup.string().required("Address is required"),
      contactPerson1: Yup.string().required("Contact Person is required"),
      websiteUrl: Yup.string().required("Website Url is required"),
      phoneNumber1: Yup.string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Number must be 10 digits"),
      email1: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    }),
    onSubmit: (values) => {
      const payload = {
        name: values.customerName,
        contact_number: values.phoneNumber1,
        email: values.email1,
        address: values.address,
        website: values.websiteUrl,
        company_name: values.companyName,
        contact_person: values.contactPerson1,
      };

      if (isEditMode && selectedClient && onUpdateClient) {
        onUpdateClient({
          id: selectedClient.id,
          payload,
        });
      } else {
        onCreateClient(payload);
      }
    },
  });

  return (
    <ModalOverlay modalTitle="Back to Clients" isOpen={true} onClose={onClose}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-4 2xl:gap-[1vw] border 2xl:border-[0.1vw] border-lightWhite bg-white rounded-lg 2xl:rounded-[0.5vw] h-[80vh] overflow-y-auto"
      >
        <p className="text-[1rem] 2xl:text-[1vw]">
          {isEditMode ? "Edit Client" : "Add new Client"}
        </p>
        <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw] w-full">
          <div className="w-full md:w-[50%]">
            <InputField
              label="Customer name"
              placeholder="Enter Customer Name"
              name="customerName"
              value={formik.values.customerName}
              onChange={formik.handleChange}
              error={
                (formik.touched.customerName && formik.errors.customerName) ||
                undefined
              }
            />
          </div>
          <div className="w-full md:w-[50%]">
            <InputField
              label="Company name"
              placeholder="Enter Company Name"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={
                (formik.touched.companyName && formik.errors.companyName) ||
                undefined
              }
            />
          </div>
        </div>
        <div className=" flex gap-4 2xl:gap-[1vw] w-full">
          <InputField
            label="Address"
            placeholder="Enter Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={
              (formik.touched.address && formik.errors.address) || undefined
            }
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 2xl:gap-[1vw] w-full">
          <div className="w-full md:w-[50%]">
            <InputField
              label="Contact Person"
              placeholder="Enter Contact Person"
              name="contactPerson1"
              value={formik.values.contactPerson1}
              onChange={formik.handleChange}
              error={
                (formik.touched.contactPerson1 &&
                  formik.errors.contactPerson1) ||
                undefined
              }
            />
          </div>
          <div className="w-full md:w-[50%]">
            <InputField
              label="Website URL"
              placeholder="Enter Website URL"
              name="websiteUrl"
              value={formik.values.websiteUrl}
              onChange={formik.handleChange}
              error={
                (formik.touched.websiteUrl && formik.errors.websiteUrl) ||
                undefined
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row  gap-4 2xl:gap-[1vw] w-full">
          <div className="w-full md:w-[50%]">
            <InputField
              label="Phone Number"
              placeholder="Enter Phone Number"
              name="phoneNumber1"
              value={formik.values.phoneNumber1}
              onChange={formik.handleChange}
              error={
                (formik.touched.phoneNumber1 && formik.errors.phoneNumber1) ||
                undefined
              }
            />
          </div>
          <div className="w-full md:w-[50%]">
            <InputField
              label="Email"
              placeholder="Enter Email"
              name="email1"
              value={formik.values.email1}
              onChange={formik.handleChange}
              error={
                (formik.touched.email1 && formik.errors.email1) || undefined
              }
            />
          </div>
        </div>

        <Checkbox label="Do you want to use other contact person details?" />

        <div className="flex justify-between gap-4 2xl:gap-[1vw]">
          <Button title="Close" variant="primary-outline" onClick={onClose} />
          <Button 
            title={isEditMode ? "Update" : "Submit"} 
            disabled={isCreatePending || isUpdatePending} 
          />
        </div>
      </form>
    </ModalOverlay>
  );
}
