"use client";

import { Button, InputField } from "@/components";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ICreateLeadResponse,
  useAllLeadsListQuery,
  useCreateLeadMutation,
} from "@/services";
import { IApiError } from "@/utils";

// Define the payload interface
export interface ICreateLeadPayload {
  first_name: string;
  last_name: string; // Added
  company: string;
  phone: string;
  email: string;
  location: string;
  budget: number;
  requirement: string;
  source_id: string;
  status_id: string;
}

type NewLeadFormProps = {
  setAddLeadModalOpen: (open: boolean) => void;
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"), // Added
  company: Yup.string().required("Company is required"),
  phone: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  location: Yup.string().required("Location is required"),
  budget: Yup.number().required("Budget is required"),
  requirement: Yup.string().required("Requirement is required"),
  source_id: Yup.string().required("Source ID is required"),
  status_id: Yup.string().required("Status ID is required"),
});

export function NewLeadForm({ setAddLeadModalOpen }: NewLeadFormProps) {
  const { leadsRefetch } = useAllLeadsListQuery();
  const { createLead, isPending } = useCreateLeadMutation({
    onSuccessCallback: (data: ICreateLeadResponse) => {
      console.log("Lead created successfully", data);
      setAddLeadModalOpen(false);
      leadsRefetch();
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to create lead:", err);
    },
  });

  const handleCancel = () => {
    setAddLeadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-md w-[500px] max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Lead Information</h2>
        </div>

        <div className="py-2">
          <label className="block 2xl:text-[1vw] text-gray-700 mb-2 2xl:mb-[0.5vw]">
            Assigned To
          </label>
          <select className="w-full border rounded px-3 py-2 text-sm">
            <option>Select Staff</option>
            <option>John Doe</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4 py-2 sm:py-4">
          <InputField
            label="Nature Of Business"
            placeholder="Enter Nature Of Business"
            name="natureOfBusiness"
          />
          <InputField
            label="Business Name"
            placeholder="Enter Business Name"
            name="businessName"
          />
        <Formik<ICreateLeadPayload>
          initialValues={{
            first_name: "",
            last_name: "",
            company: "",
            phone: "",
            email: "",
            location: "",
            budget: 0,
            requirement: "",
            source_id: "",
            status_id: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            createLead(values);
          }}
        >
          {({ values, handleChange, setFieldValue, errors, touched }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4 py-2">
                <InputField
                  label="First Name"
                  placeholder="Enter First Name"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  error={touched.first_name && errors.first_name}
                />
                <InputField
                  label="Last Name"
                  placeholder="Enter Last Name"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  error={touched.last_name && errors.last_name}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <InputField
                  label="Company Name"
                  placeholder="Enter Company Name"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  error={touched.company && errors.company}
                />
                <InputField
                  label="Phone"
                  placeholder="Enter Phone Number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  error={touched.phone && errors.phone}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <InputField
                  label="Email"
                  placeholder="Enter Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && errors.email}
                />
                <InputField
                  label="Location"
                  placeholder="Enter Location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  error={touched.location && errors.location}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <InputField
                  label="Budget"
                  placeholder="Enter Budget"
                  name="budget"
                  type="number"
                  value={values.budget}
                  onChange={(e) => {
                    setFieldValue("budget", parseFloat(e.target.value || "0"));
                  }}
                  error={touched.budget && errors.budget}
                />
                <InputField
                  label="Requirement"
                  placeholder="Enter Requirement"
                  name="requirement"
                  value={values.requirement}
                  onChange={handleChange}
                  error={touched.requirement && errors.requirement}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <InputField
                  label="Source ID"
                  placeholder="Enter Source ID"
                  name="source_id"
                  value={values.source_id}
                  onChange={handleChange}
                  error={touched.source_id && errors.source_id}
                />
                <InputField
                  label="Status ID"
                  placeholder="Enter Status ID"
                  name="status_id"
                  value={values.status_id}
                  onChange={handleChange}
                  error={touched.status_id && errors.status_id}
                />
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <Button
                  title="Cancel"
                  onClick={handleCancel}
                  variant="primary-outline"
                  type="button"
                />
                <Button title="Add Lead" type="submit" isLoading={isPending} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
}
