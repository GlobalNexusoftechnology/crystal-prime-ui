import { Button, Dropdown, InputField, ModalOverlay, NumberInput } from "@/components";
import {
  ICreateLeadPayload,
  ICreateLeadResponse,
  useAllDropdownDataQuery,
  useCreateLeadMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";

import { useQueryClient } from "@tanstack/react-query";

interface IAddLeadModalProps {
  setAddLeadModalOpen: (open: boolean) => void;
  leadsRefetch?: () => void;
}



const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  company: Yup.string().optional(),
  phone: Yup.string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    .optional(),
  location: Yup.string().optional(),
  requirement: Yup.string().optional(),
  source_id: Yup.string().optional(),
  status_id: Yup.string().optional(),
  type_id: Yup.string().optional(),
  assigned_to: Yup.string().optional(),
  other_contact: Yup.string()
    .matches(/^[0-9]{8,15}$/, "Other Contact must be 8 to 15 digits")
    .optional(),
  budget: Yup.number().optional(),
  possibility_of_conversion: Yup.number().nullable().optional(),
});

export function AddLeadModal({
  setAddLeadModalOpen,
  leadsRefetch,
}: IAddLeadModalProps) {
  const queryClient = useQueryClient();
  const { allSourcesData, allStatusesData, allUsersData, allTypesData } = useAllDropdownDataQuery();

  const { createLead, isPending } = useCreateLeadMutation({
    onSuccessCallback: (response: ICreateLeadResponse) => {
      queryClient.invalidateQueries({ queryKey: ["leads-list-query-key"] });
      if (leadsRefetch) {
        leadsRefetch();
      }
      toast.success(response.message);
      setAddLeadModalOpen(false);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const handleCancel = () => {
    setAddLeadModalOpen(false);
  };

  const sourceOptions =
    allSourcesData?.data?.list?.map((source) => ({
      label: source?.name,
      value: source?.id.toString(),
    })) || [];

  const statusOptions =
    allStatusesData?.data?.list?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || [];

  const userOptions =
    allUsersData?.data?.list?.map((user) => ({
      label: `${user?.first_name} ${user?.last_name}`,
      value: user?.id.toString(),
    })) || [];

  const typeOptions =
    allTypesData?.data?.list?.map((type) => ({
      label: type?.name,
      value: type?.id.toString(),
    })) || [];

  return (
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={handleCancel}
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        <div className="bg-white rounded-lg  p-4  border  border-gray-200">
          <h2 className="text-lg  font-semibold">
            Lead Information
          </h2>
          <Formik<ICreateLeadPayload>
            initialValues={{
              first_name: "",
              last_name: "",
              company: "",
              phone: "",
              other_contact: "",
              escalate_to: false,
              email: "",
              location: "",
              budget: 0,
              possibility_of_conversion: 0,
              requirement: "",
              source_id: "",
              status_id: "",
              type_id: "",
              assigned_to: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const { source_id, status_id, type_id, assigned_to, email, ...rest } = values;
              
              const payload = {
                ...rest,
                budget: values.budget ?? 0,
                possibility_of_conversion: values.possibility_of_conversion ?? 0,
                // Only include email if it's not empty
                ...(email && email.trim() !== '' && { email }),
                // Filter out empty strings for optional fields
                ...(values.last_name && { last_name: values.last_name }),
                ...(values.company && { company: values.company }),
                ...(values.other_contact && { other_contact: values.other_contact }),
                ...(values.location && { location: values.location }),
                ...(values.requirement && { requirement: values.requirement }),
                ...(source_id && { source_id }),
                ...(status_id && { status_id }),
                ...(type_id && { type_id }),
                ...(assigned_to && { assigned_to }),
              };
              
              createLead(payload);
            }}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
                  <InputField
                    label="First Name"
                    placeholder="Enter First Name"
                    name="first_name"
                    value={values?.first_name}
                    onChange={handleChange}
                    error={touched.first_name && errors.first_name}
                  />
                  <InputField
                    label="Last Name"
                    placeholder="Enter Last Name"
                    name="last_name"
                    value={values?.last_name}
                    onChange={handleChange}
                    // error={touched.last_name && errors.last_name}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
                  <InputField
                    label="Company Name"
                    placeholder="Enter Company Name"
                    name="company"
                    value={values?.company}
                    onChange={handleChange}
                  />
                  <div className="w-full grid grid-cols-1 gap-2  pb-2  relative">
                    <label className=" text-gray-700 block">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
                      country="in"
                      value={values.phone}
                      onChange={(value) => setFieldValue("phone", value)}
                      inputProps={{ name: "phone" }}
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-[0.9rem] ">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4  pb-2  relative">
                  <InputField
                    label="Other Contact"
                    placeholder="Enter Other Contact"
                    name="other_contact"
                    type="text"
                    value={values?.other_contact}
                    onChange={e => {
                      let digitsOnly = e.target.value.replace(/[^0-9]/g, "");
                      if (digitsOnly.length > 15) digitsOnly = digitsOnly.slice(0, 15);
                      setFieldValue("other_contact", digitsOnly);
                    }}

                  />
                  <div className="w-full grid grid-cols-1 gap-2  pb-2  relative">
                    <label className="text-[0.9rem] font-medium text-gray-700">
                      Possibility of Conversion (%)
                    </label>
                    <NumberInput
                      value={values.possibility_of_conversion || 0}
                      onChange={(value) => setFieldValue("possibility_of_conversion", value)}
                      min={0}
                      max={100}
                      placeholder="Enter Possibility of Conversion"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
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
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
                  <div className="w-full grid grid-cols-1 gap-2  pb-2  relative">
                    <label className="text-[0.9rem] font-medium text-gray-700">
                      Budget
                    </label>
                    <NumberInput
                      value={values.budget || 0}
                      onChange={(value) => setFieldValue("budget", value)}
                      min={0}
                      placeholder="Enter Budget"
                    />
                  </div>
                  <Dropdown
                    label="Assigned To"
                    options={userOptions}
                    value={values.assigned_to || ""}
                    onChange={(val) => setFieldValue("assigned_to", val)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
                  <Dropdown
                    label="Source"
                    options={sourceOptions}
                    value={values.source_id || ""}
                    onChange={(val) => setFieldValue("source_id", val)}
                  />
                  <Dropdown
                    label="Status"
                    options={statusOptions}
                    value={values.status_id || ""}
                    onChange={(val) => setFieldValue("status_id", val)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4  py-2 ">
                  <Dropdown
                    label="Type"
                    options={typeOptions}
                    value={values.type_id || ""}
                    onChange={(val) => setFieldValue("type_id", val)}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4  py-2 ">
                  <InputField
                    label="Requirement"
                    placeholder="Enter Requirement"
                    name="requirement"
                    type="textarea"
                    value={values.requirement}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between mt-6  space-x-4">
                  <Button
                    title="Cancel"
                    onClick={handleCancel}
                    variant="primary-outline"
                    type="button"
                    width="w-full"
                  />
                  <Button
                    title="Add Lead"
                    type="submit"
                    isLoading={isPending}
                    width="w-full"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </ModalOverlay>
  );
}
