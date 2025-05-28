import { Button, Dropdown, InputField, ModalOverlay } from "@/components";
import {
  ICreateLeadPayload,
  ICreateLeadResponse,
  useAllLeadsListQuery,
  useAllSourcesQuery,
  useAllStatusesQuery,
  useAllUsersQuery,
  useCreateLeadMutation,
} from "@/services";
import { IApiError } from "@/utils";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface IAddLeadModalProps {
  setAddLeadModalOpen: (open: boolean) => void;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  company: Yup.string().required("Company is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
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

export function AddLeadModal({ setAddLeadModalOpen }: IAddLeadModalProps) {
  const { leadsRefetch } = useAllLeadsListQuery();
  const { allSourcesData } = useAllSourcesQuery();
  const { allStatusesData } = useAllStatusesQuery();
  const { allUsersData } = useAllUsersQuery();

  const { createLead, isPending } = useCreateLeadMutation({
    onSuccessCallback: (response: ICreateLeadResponse) => {
      console.log("Lead created successfully", response);
      toast.success(response.message)
      setAddLeadModalOpen(false);
      leadsRefetch();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message)
    },
  });

  const handleCancel = () => {
    setAddLeadModalOpen(false);
  };

  const sourceOptions =
    allSourcesData?.data.map((source) => ({
      label: source.name,
      value: source.id.toString(),
    })) || [];

  const statusOptions =
    allStatusesData?.map((status) => ({
      label: status.name,
      value: status.id.toString(),
    })) || [];

  const userOptions =
    allUsersData?.map((user) => ({
      label: `${user?.first_name} ${user?.last_name}`,
      value: user?.id.toString(),
    })) || [];

  return (
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={handleCancel}
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold">Lead Information</h2>
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
              assigned_to: "",
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
                      setFieldValue(
                        "budget",
                        parseFloat(e.target.value)
                      );
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
                  <Dropdown
                    label="Source"
                    options={sourceOptions}
                    value={values.source_id}
                    onChange={(val) => setFieldValue("source_id", val)}
                    error={touched.source_id ? errors.source_id : undefined}
                  />
                  <Dropdown
                    label="Status"
                    options={statusOptions}
                    value={values.status_id}
                    onChange={(val) => setFieldValue("status_id", val)}
                    error={touched.status_id ? errors.status_id : undefined}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 py-2">
                  <Dropdown
                    label="Assigned To"
                    options={userOptions}
                    value={values.assigned_to}
                    onChange={(val) => setFieldValue("assigned_to", val)}
                    error={touched.assigned_to ? errors.assigned_to : undefined}
                  />
                </div>
                <div className="flex justify-between mt-6 space-x-4">
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
