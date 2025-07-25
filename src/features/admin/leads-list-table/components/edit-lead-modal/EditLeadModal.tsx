import {
  Button,
  Checkbox,
  Dropdown,
  InputField,
  ModalOverlay,
} from "@/components";
import {
  ICreateLeadPayload,
  IUpdateLeadResponse,
  useAllSourcesQuery,
  useAllStatusesQuery,
  useAllTypesQuery,
  useAllUsersQuery,
  useCreateLeadFollowUpMutation,
  useUpdateLeadMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import { Plus, X } from "lucide-react";

interface IEditLeadModalProps {
  setIsEditLeadModalOpen: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lead: any; // Adjust type as needed
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  // last_name: Yup.string().required("Last Name is required"),
  company: Yup.string().required("Company is required"),
  phone: Yup.string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .required("Phone number is required"),
  email: Yup.array()
    .of(
      Yup.string()
        .email("Invalid email address")
        .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    )
    .min(1, "At least one email is required")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
  requirement: Yup.string().required("Requirement is required"),
  source_id: Yup.string().required("Source is required"),
  status_id: Yup.string().required("Status is required"),
  type_id: Yup.string().required("Type is required"),
  assigned_to: Yup.string().required("Assigned To is required"),
  other_contact: Yup.string()
    .matches(/^[0-9]{8,15}$/, "Other Contact must be 8 to 15 digits")
});

export function EditLeadModal({
  setIsEditLeadModalOpen,
  lead,
}: IEditLeadModalProps) {
  const queryClient = useQueryClient();
  const { allSourcesData } = useAllSourcesQuery();
  const { allStatusesData } = useAllStatusesQuery();
  const { allUsersData } = useAllUsersQuery();
  const { allTypesData } = useAllTypesQuery();

  const { onEditLead, isPending } = useUpdateLeadMutation({
    onSuccessCallback: (response: IUpdateLeadResponse) => {
      queryClient.invalidateQueries({ queryKey: ["leads-list-query-key"] });
      toast.success(response.message);
      setIsEditLeadModalOpen(false);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const { createLeadFollowUp } = useCreateLeadFollowUpMutation({
    onSuccessCallback: () => {
      toast.success("Follow-up created successfully.");
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Defensive check: if lead or required fields not loaded yet, show loading or null
  if (!lead || !lead.first_name) {
    return (
      <ModalOverlay
        modalTitle="Back to Leads"
        isOpen={true}
        onClose={() => setIsEditLeadModalOpen(false)}
      >
        <div className="p-4 2xl:p-[1vw]">Loading lead data...</div>
      </ModalOverlay>
    );
  }

  const handleCancel = () => {
    setIsEditLeadModalOpen(false);
  };

  const sourceOptions =
    allSourcesData?.data?.map((source) => ({
      label: source?.name,
      value: source.id.toString(),
    })) || [];

  const statusOptions =
    allStatusesData?.map((status) => ({
      label: status?.name,
      value: status?.id.toString(),
    })) || [];

  const userOptions =
    allUsersData?.map((user) => ({
      label: `${user?.first_name} ${user?.last_name}`,
      value: user?.id.toString(),
    })) || [];

  const typeOptions =
    allTypesData?.map((type) => ({
      label: type?.name,
      value: type?.id.toString(),
    })) || [];

  // Normalize initialValues to handle undefined nested fields
  const initialValues: ICreateLeadPayload = {
    first_name: lead.first_name || "",
    last_name: lead.last_name || "",
    company: lead.company || "",
    phone: lead.phone || "",
    other_contact: lead.other_contact || "",
    escalate_to: lead.escalate_to || false,
    email:
      typeof lead.email === "string"
        ? lead.email
            .split(",")
            .map((email: string) => email.trim())
            .filter((email: string) => email !== "")
        : Array.isArray(lead.email)
        ? lead.email
        : [""],
    location: lead.location || "",
    budget: lead.budget ?? 0,
    possibility_of_conversion: lead.possibility_of_conversion ?? "",
    requirement: lead.requirement || "",
    source_id: lead.source?.id?.toString() || lead.source_id?.toString() || "",
    status_id: lead.status?.id?.toString() || lead.status_id?.toString() || "",
    type_id: lead.type?.id?.toString() || lead.type_id?.toString() || "",
    assigned_to:
      lead.assigned_to?.id?.toString() || lead.assigned_to_id?.toString() || "",
  };

  return (
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={handleCancel}
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        <div className="bg-white rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-200">
          <h2 className="text-[1rem] 2xl:text-[1.3vw] font-semibold">
            Edit Lead Information
          </h2>
          <Formik<ICreateLeadPayload>
            key={lead.id} // Ensures Formik reinitializes when lead changes
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: ICreateLeadPayload) => {
              onEditLead({
                id: lead.id,
                payload: {
                  ...values,
                  budget: Number(values.budget),
                  possibility_of_conversion: values.possibility_of_conversion
                    ? Number(values.possibility_of_conversion)
                    : null,
                },
              });

              if (values.escalate_to) {
                const newAssignee = allUsersData?.find(
                  (user) => user.id.toString() === values.assigned_to
                );

                const previousAssigneeName = `${
                  lead.assigned_to?.first_name || ""
                } ${lead.assigned_to?.last_name || ""}`.trim();
                const newAssigneeName = `${newAssignee?.first_name || ""} ${
                  newAssignee?.last_name || ""
                }`.trim();

                createLeadFollowUp({
                  lead_id: lead.id,
                  user_id: values.assigned_to,
                  remarks: `${previousAssigneeName} escalate to ${newAssigneeName}`,
                  status: "PENDING",
                  due_date: new Date().toISOString(),
                });
              }
            }}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => {
              return (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
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
                      // error={touched.last_name && errors.last_name}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                    <InputField
                      label="Company"
                      placeholder="Enter Company Name"
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                      error={touched.company && errors.company}
                    />
                    <div className="w-full grid grid-cols-1 gap-2 2xl:gap-[0.5vw] pb-2 2xl:pb-[0.5vw] relative">
                      <label className="2xl:text-[1vw] text-gray-700 block">
                        Phone
                      </label>
                      <PhoneInput
                        country="in"
                        value={values.phone}
                        onChange={(value) => setFieldValue("phone", value)}
                        inputProps={{ name: "phone" }}
                      />
                      {errors.phone && touched.phone && (
                        <p className="text-red-500 text-[0.9rem] 2xl:text-[0.9vw]">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] pb-2 2xl:pb-[0.5vw] relative">
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
                      error={touched.other_contact && errors.other_contact}
                    />
                    <InputField
                      label="Possibility of Conversion (%)"
                      placeholder="Enter Possibility of Conversion"
                      name="possibility_of_conversion"
                      type="number"
                      min="0"
                      max="100"
                      value={values.possibility_of_conversion ?? ""}
                      onChange={(e) => {
                        setFieldValue(
                          "possibility_of_conversion",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        );
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                    <div className="w-full grid grid-cols-1 gap-4 2xl:gap-[1vw] pb-2 2xl:pb-[0.5vw] relative">
                      <div className="space-y-2">
                        <label className="block text-[0.9rem] font-medium text-gray-700">
                          Emails
                        </label>
                        {values.email.map((_, index) => (
                          <div key={index} className="flex gap-2">
                            <InputField
                              placeholder="Enter Email"
                              name={`email.${index}`}
                              type="email"
                              value={values.email[index]}
                              onChange={handleChange}
                              error={
                                touched.email &&
                                Array.isArray(errors.email) &&
                                errors.email[index]
                              }
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const newEmails = [...values.email];
                                  newEmails.splice(index, 1);
                                  setFieldValue("email", newEmails);
                                }}
                                className="p-2 text-red-500 hover:text-red-700"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setFieldValue("email", [...values.email, ""]);
                          }}
                          className="flex items-center gap-1 text-[0.9rem] text-blue-600 hover:text-blue-800"
                        >
                          <Plus className="w-4 h-4" />
                          Add Another Email
                        </button>
                      </div>
                    </div>
                    <InputField
                      label="Location"
                      placeholder="Enter Location"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      error={touched.location && errors.location}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                    <InputField
                      label="Budget"
                      placeholder="Enter Budget"
                      name="budget"
                      type="number"
                      value={values.budget ?? 0}
                      onChange={handleChange}
                    />
                    <Dropdown
                      label="Assigned To"
                      options={userOptions}
                      value={values.assigned_to}
                      onChange={(val) => setFieldValue("assigned_to", val)}
                      error={
                        touched.assigned_to ? errors.assigned_to : undefined
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                    <Dropdown
                      label="Source ID"
                      options={sourceOptions}
                      value={values.source_id}
                      onChange={(val) => setFieldValue("source_id", val)}
                      error={touched.source_id ? errors.source_id : undefined}
                    />
                    <Dropdown
                      label="Status ID"
                      options={statusOptions}
                      value={values.status_id}
                      onChange={(val) => setFieldValue("status_id", val)}
                      error={touched.status_id ? errors.status_id : undefined}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                    <Dropdown
                      label="Type"
                      options={typeOptions}
                      value={values.type_id}
                      onChange={(val) => setFieldValue("type_id", val)}
                      error={touched.type_id ? errors.type_id : undefined}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                    <InputField
                      label="Requirement"
                      placeholder="Enter Requirement"
                      name="requirement"
                      type="textarea"
                      value={values.requirement}
                      onChange={handleChange}
                      error={touched.requirement && errors.requirement}
                    />
                    <div className="py-2 2xl:py-[0.5vw]">
                      <Checkbox
                        label="Escalate To"
                        name="escalate_to"
                        checked={values.escalate_to}
                        onChange={(e) =>
                          setFieldValue("escalate_to", e.target.checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between mt-2 2xl:mt-[0.5vw] space-x-3">
                      <Button
                        title="Cancel"
                        onClick={handleCancel}
                        variant="primary-outline"
                        type="button"
                        width="w-full"
                      />
                      <Button
                        title="Update Lead"
                        type="submit"
                        isLoading={isPending}
                        width="w-full"
                        disabled={!lead?.id}
                      />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalOverlay>
  );
}
