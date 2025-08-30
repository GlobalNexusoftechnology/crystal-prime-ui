import { Button, Dropdown, InputField, ModalOverlay, NumberInput } from "@/components";
import {
  ICreateLeadPayload,
  ICreateLeadResponse,
  useAllSourcesQuery,
  useAllStatusesQuery,
  useAllTypesQuery,
  useAllUsersQuery,
  useCreateLeadMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";
import { Plus, X } from "lucide-react";
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
  email: Yup.array()
    .of(
      Yup.string()
        .email("Invalid email address")
        .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    )
    .test('emails', 'At least one valid email is required if emails are provided', function(value) {
      if (!value || value.length === 0) return true; // Allow empty array
      const validEmails = value.filter((email: string | undefined) => email && email.trim() !== '' && Yup.string().email().isValidSync(email));
      return validEmails.length > 0;
    })
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
  const { allSourcesData } = useAllSourcesQuery();
  const { allStatusesData } = useAllStatusesQuery();
  const { allUsersData } = useAllUsersQuery();
  const { allTypesData } = useAllTypesQuery();

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
        <div className="bg-white rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-200">
          <h2 className="text-lg 2xl:text-[1.125vw] font-semibold">
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
              email: [""],
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
              
              // Filter out empty emails
              const filteredEmails = (email || []).filter(email => email.trim() !== '');
              
              const payload = {
                ...rest,
                budget: values.budget ?? 0,
                possibility_of_conversion: values.possibility_of_conversion ?? 0,
                // Only include email if there are valid emails
                ...(filteredEmails.length > 0 && { email: filteredEmails }),
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                  <InputField
                    label="Company Name"
                    placeholder="Enter Company Name"
                    name="company"
                    value={values?.company}
                    onChange={handleChange}
                  />
                  <div className="w-full grid grid-cols-1 gap-2 2xl:gap-[0.5vw] pb-2 2xl:pb-[0.5vw] relative">
                    <label className="2xl:text-[1vw] text-gray-700 block">
                      Phone <span className="text-red-500">*</span>
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

                  />
                  <div className="w-full grid grid-cols-1 gap-2 2xl:gap-[0.5vw] pb-2 2xl:pb-[0.5vw] relative">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                  <div
                    className={`w-full grid grid-cols-1 gap-4 2xl:gap-[1vw] pb-2 2xl:pb-[0.5vw] relative`}
                  >
                    <div className="space-y-2">
                      <label className="text-[0.9rem] font-medium text-gray-700">
                        Emails
                      </label>
                      {values?.email?.map((_, index) => (
                        <div key={index} className="flex gap-2">
                          <InputField
                            placeholder="Enter Email"
                            name={`email.${index}`}
                            type="email"
                            value={values.email?.[index] || ""}
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
                                const newEmails = [...(values.email || [])];
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
                          setFieldValue("email", [...(values.email || []), ""]);
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
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                  <div className="w-full grid grid-cols-1 gap-2 2xl:gap-[0.5vw] pb-2 2xl:pb-[0.5vw] relative">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
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
                <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                  <Dropdown
                    label="Type"
                    options={typeOptions}
                    value={values.type_id || ""}
                    onChange={(val) => setFieldValue("type_id", val)}
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
                  />
                </div>
                <div className="flex justify-between mt-6 2xl:mt-[1.5vw] space-x-4">
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
