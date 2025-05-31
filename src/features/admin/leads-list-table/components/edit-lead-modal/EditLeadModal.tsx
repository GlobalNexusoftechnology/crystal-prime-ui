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
  useAllLeadsListQuery,
  useAllSourcesQuery,
  useAllStatusesQuery,
  useAllUsersQuery,
  useCreateLeadFollowUpMutation,
  useUpdateLeadMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";

interface IEditLeadModalProps {
  setIsEditLeadModalOpen: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lead: any; // Adjust type as needed
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  company: Yup.string().required("Company is required"),
  phone: Yup.string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be at most 15 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
  requirement: Yup.string().required("Requirement is required"),
  source_id: Yup.string().required("Source is required"),
  status_id: Yup.string().required("Status is required"),
  assigned_to: Yup.string().required("Assigned To is required"),
});

export function EditLeadModal({
  setIsEditLeadModalOpen,
  lead,
}: IEditLeadModalProps) {
  const currentUser = `${lead?.assigned_to?.first_name} ${lead?.assigned_to?.last_name}`;
  const { leadsRefetch } = useAllLeadsListQuery();
  const { allSourcesData } = useAllSourcesQuery();
  const { allStatusesData } = useAllStatusesQuery();
  const { allUsersData } = useAllUsersQuery();

  const { onEditLead, isPending } = useUpdateLeadMutation({
    onSuccessCallback: (response: IUpdateLeadResponse) => {
      toast.success(response.message);
      setIsEditLeadModalOpen(false);
      leadsRefetch();
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

  // Normalize initialValues to handle undefined nested fields
  const initialValues: ICreateLeadPayload = {
    first_name: lead.first_name || "",
    last_name: lead.last_name || "",
    company: lead.company || "",
    phone: lead.phone || "",
    other_contact: lead.other_contact || "",
    escalate_to: lead.escalate_to || false,
    email: lead.email || "",
    location: lead.location || "",
    budget: lead.budget ?? 0,
    requirement: lead.requirement || "",
    source_id: lead.source?.id?.toString() || lead.source_id?.toString() || "",
    status_id: lead.status?.id?.toString() || lead.status_id?.toString() || "",
    assigned_to:
      lead.assigned_to?.id?.toString() || lead.assigned_to_id?.toString() || "",
  };

  return (
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={handleCancel}
      modalClassName="w-[18rem] md:w-[30rem] 2xl:w-[39vw]"
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        <div className="bg-white rounded-lg p-4 2xl:p-[1vw] border border-gray-200">
          <h2 className="text-[1rem] 2xl:text-[1.3vw] font-semibold 2xl:pl-[1vw]">
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
                },
              });

              if (values.escalate_to) {
                createLeadFollowUp({
                  lead_id: lead.id,
                  user_id: values.assigned_to,
                  remarks: `${lead.first_name} ${lead.last_name} escalated by ${lead.assigned_to?.first_name} ${lead.assigned_to?.last_name}`,
                  status: "PENDING",
                  due_date: Date()
                });
              }
            }}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => {
              return (
                <Form className="2xl:pl-4">
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-4 2xl:gap-[2vw] py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[2vw] py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
                    <InputField
                      label="Company"
                      placeholder="Enter Company Name"
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                      error={touched.company && errors.company}
                    />
                    <div className="flex flex-col justify-center pt-[0.4rem] 2xl:pt-[0.4vw]">
                      <label className="text-sm 2xl:text-[0.875vw] font-medium text-gray-700 mb-1 2xl:mb-[0.25vw] block">
                        Phone
                      </label>
                      <PhoneInput
                        country="in"
                        value={values.phone}
                        onChange={(value) => setFieldValue("phone", value)}
                        inputClass="!w-fit text-[1vw] !ml-8 !2xl:ml-[2vw] !border !border-gray-300 !rounded-md !px-4 py-5 2xl:py-[1.25vw] !text-gray-700 !placeholder-gray-500 !focus:outline-primary"
                        containerClass="w-fit"
                        inputProps={{ name: "phone" }}
                      />
                      {errors.phone && touched.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 gap-4 py-2 relative">
                    <div className="w-full flex flex-col justify-center pt-[0.4rem] 2xl:pt-[0.4vw]">
                      <label className="text-sm 2xl:text-[0.875vw] font-medium text-gray-700 mb-1 2xl:mb-[0.25vw] block">
                        Other Contact
                      </label>
                      <PhoneInput
                        country="in"
                        value={values.other_contact}
                        onChange={(value) =>
                          setFieldValue("other_contact", value)
                        }
                        inputClass="!w-[95%] text-[1vw] !ml-8 !2xl:ml-[2vw] !border !border-gray-300 !rounded-md !px-4 py-5 2xl:py-[1.25vw] !text-gray-700 !placeholder-gray-500 !focus:outline-primary"
                        containerClass="w-full"
                        inputProps={{ name: "other_contact" }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[2vw] py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[2vw] py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[2vw] py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
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
                  <div className="grid grid-cols-1 gap-4 2xl:gap-[2vw] py-2 2xl:py-[0.5vw] w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
                    <InputField
                      label="Requirement"
                      placeholder="Enter Requirement"
                      name="requirement"
                      type="textarea"
                      value={values.requirement}
                      onChange={handleChange}
                      error={touched.requirement && errors.requirement}
                    />
                    <div className="py-2">
                      <Checkbox
                        label="Escalate To"
                        name="escalate_to"
                        checked={values.escalate_to}
                        onChange={(e) =>
                          setFieldValue("escalate_to", e.target.checked)
                        }
                      />
                    </div>
                    <div className="flex justify-between mt-6 2xl:mt-[1.5vw] space-x-3">
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
