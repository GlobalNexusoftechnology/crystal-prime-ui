import {
  Button,
  Checkbox,
  Dropdown,
  InputField,
  ModalOverlay,
} from "@/components";
import {
  ICreateLeadPayload,
  ICreateLeadResponse,
  useAllLeadsListQuery,
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

interface IAddLeadModalProps {
  setAddLeadModalOpen: (open: boolean) => void;
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
  type_id: Yup.string().required("Type is required"),
  assigned_to: Yup.string().required("Assigned To is required"),
});

export function AddLeadModal({ setAddLeadModalOpen }: IAddLeadModalProps) {
  const { leadsRefetch } = useAllLeadsListQuery();
  const { allSourcesData } = useAllSourcesQuery();
  const { allStatusesData } = useAllStatusesQuery();
  const { allUsersData } = useAllUsersQuery();
  const { allTypesData } = useAllTypesQuery();

  const { createLead, isPending } = useCreateLeadMutation({
    onSuccessCallback: (response: ICreateLeadResponse) => {
      console.log("Lead created successfully", response);
      toast.success(response.message);
      setAddLeadModalOpen(false);
      leadsRefetch();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const handleCancel = () => {
    setAddLeadModalOpen(false);
  };

  const sourceOptions =
    allSourcesData?.data?.map((source) => ({
      label: source?.name,
      value: source?.id.toString(),
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

  return (
    <ModalOverlay
      modalTitle="Back to Leads"
      isOpen={true}
      onClose={handleCancel}
    >
      <div className="overflow-y-auto max-h-[80vh] space-y-4">
        <div className="bg-white rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-200">
          <h2 className="text-lg 2xl:text-[1.125vw] font-semibold">Lead Information</h2>
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
              requirement: "",
              source_id: "",
              status_id: "",
              type_id: "",
              assigned_to: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              createLead(values);
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
                    error={touched.last_name && errors.last_name}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                  <InputField
                    label="Company Name"
                    placeholder="Enter Company Name"
                    name="company"
                    value={values?.company}
                    onChange={handleChange}
                    error={touched?.company && errors?.company}
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
                      <p className="text-red-500 text-sm 2xl:text-[0.9vw]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 gap-4 2xl:gap-[1vw] pb-2 2xl:pb-[0.5vw] relative">
                  <InputField
                      label="Other Contact"
                      placeholder="Enter Other Contact"
                      name="other_contact"
                      value={values?.other_contact}
                      onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                  <InputField
                    label="Budget"
                    placeholder="Enter Budget"
                    name="budget"
                    type="number"
                    value={values.budget ?? 0}
                    onChange={(e) => {
                      setFieldValue("budget", parseFloat(e.target.value));
                    }}
                  />
                  <Dropdown
                    label="Assigned To"
                    options={userOptions}
                    value={values.assigned_to}
                    onChange={(val) => setFieldValue("assigned_to", val)}
                    error={touched.assigned_to ? errors.assigned_to : undefined}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
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
                </div>
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
