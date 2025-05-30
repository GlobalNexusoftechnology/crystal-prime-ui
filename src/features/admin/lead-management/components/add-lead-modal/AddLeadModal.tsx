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
              other_contact: "",
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

                <div className="grid grid-cols-2 gap-4 py-2">
                  <InputField
                    label="Company Name"
                    placeholder="Enter Company Name"
                    name="company"
                    value={values?.company}
                    onChange={handleChange}
                    error={touched?.company && errors?.company}
                  />
                  <div className="flex flex-col justify-center pt-[0.4rem] 2xl:pt-[0.4vw]">
                    <label className="text-sm 2xl:text-[0.875vw] font-medium text-gray-700 mb-1 2xl:mb-[0.25vw] block">
                      Phone
                    </label>
                    <PhoneInput
                      country="in"
                      value={values.phone}
                      onChange={(value) => setFieldValue("phone", value)}
                      inputClass="text-[1vw] !ml-8 !2xl:ml-[2vw] !border !border-gray-300 !rounded-md !px-4 py-5 2xl:py-[1.25vw] !text-gray-700 !placeholder-gray-500 !focus:outline-primary"
                      containerClass="w-full"
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
