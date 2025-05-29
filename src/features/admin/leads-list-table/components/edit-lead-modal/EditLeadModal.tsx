import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import {
  ICreateLeadPayload,
  IUpdateLeadResponse,
  useAllLeadsListQuery,
  useAllSourcesQuery,
  useAllStatusesQuery,
  useAllUsersQuery,
  useUpdateLeadMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
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
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits")
    .required("Phone Number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    .required("Email is required"),
  location: Yup.string().required("Location is required"),
  budget: Yup.number()
    .typeError("Budget must be a number")
    .positive("Budget must be a positive number")
    .required("Budget is required"),
  requirement: Yup.string().required("Requirement is required"),
  source_id: Yup.string().required("Source is required"),
  status_id: Yup.string().required("Status is required"),
  assigned_to: Yup.string().required("Assigned To is required"),
});

export function EditLeadModal({
  setIsEditLeadModalOpen,
  lead,
}: IEditLeadModalProps) {
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

  // Defensive check: if lead or required fields not loaded yet, show loading or null
  if (!lead || !lead.first_name) {
    return (
      <ModalOverlay
        modalTitle="Back to Leads"
        isOpen={true}
        onClose={() => setIsEditLeadModalOpen(false)}
      >
        <div className="p-4">Loading lead data...</div>
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
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-[1rem] 2xl:text-[1vw] font-semibold">
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
            }}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => {
              return (
                <Form>
                  <div className="grid grid-cols-2 gap-4 py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
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

                  <div className="grid grid-cols-2 gap-4 py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
                    <InputField
                      label="Company"
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

                  <div className="grid grid-cols-2 gap-4 py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
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

                  <div className="grid grid-cols-2 gap-4 py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
                    <InputField
                      label="Budget"
                      placeholder="Enter Budget"
                      name="budget"
                      type="number"
                      value={values.budget}
                      onChange={handleChange}
                      error={touched.budget && errors.budget}
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

                  <div className="grid grid-cols-2 gap-4 py-2 w-[15rem] md:w-[26rem] xl-w-[29rem] 2xl:w-[34vw]">
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
                  <div className="grid grid-cols-1 gap-4 py-2">
                    <InputField
                      label="Requirement"
                      placeholder="Enter Requirement"
                      name="requirement"
                      type="textarea"
                      value={values.requirement}
                      onChange={handleChange}
                      error={touched.requirement && errors.requirement}
                  />
                  </div>

                  <div className="flex justify-between mt-6 space-x-3">
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
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </ModalOverlay>
  );
}
