import {
  Button,
  DatePicker,
  Dropdown,
  InputField,
  ModalOverlay,
} from "@/components";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  ICreateUserPayload,
  ICreateUserResponse,
  useAllRoleListQuery,
  useCreateUserMutation,
} from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface AddNewStaffModelProps {
  isOpen: boolean;
  onClose: () => void;
  onNewStaffSuccessCallback: () => void;
}

export interface IAddStaffFormValues {
  employeeId: string;
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  email: string;
  role: string;
  password: string;
}

const initialValues: IAddStaffFormValues = {
  employeeId: "",
  firstName: "",
  lastName: "",
  dob: "",
  phoneNumber: "",
  email: "",
  role: "",
  password: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dob: Yup.date()
    .max(new Date(), "DOB cannot be in the future")
    .required("Date of Birth is required")
    .typeError("Invalid date format (YYYY-MM-DD)"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits"),
  email: Yup.string()
    .email("Invalid email")
    .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, "Password must contain at least one letter and one number")
    .required("Password is required"),
});

export const AddNewStaffModel: React.FC<AddNewStaffModelProps> = ({
  isOpen,
  onClose,
  onNewStaffSuccessCallback,
}) => {
  const { data: rolesList } = useAllRoleListQuery();
  const [showPassword, setShowPassword] = React.useState(false);

  const roleOptions =
    rolesList?.data?.list?.map((roleData) => ({
      label: roleData?.role,
      value: roleData?.id.toString(),
    })) || [];

  const handleCreateUserSuccessCallback = (response: ICreateUserResponse) => {
    toast.success(response.message);
    onNewStaffSuccessCallback();
    onClose();
  };

  const handleCreateUserErrorCallback = (error: IApiError) => {
    toast.error(error.message);
  };

  const { isPending, onCreateUser } = useCreateUserMutation({
    onSuccessCallback: handleCreateUserSuccessCallback,
    onErrorCallback: handleCreateUserErrorCallback,
  });

  const handleAddNewStaffSubmit = (values: IAddStaffFormValues) => {
    const createUserPayload: ICreateUserPayload = {
      first_name: values.firstName,
      last_name: values.lastName,
      dob: values.dob,
      email: values.email,
      password: values.password,
      phone_number: values.phoneNumber,
      role_id: values.role,
      employee_id: values.employeeId, 
    };
  
    onCreateUser(createUserPayload);
  };
  

  return (
    <div>
      <ModalOverlay
        modalTitle="Back to Staffs"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddNewStaffSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form className="overflow-y-auto max-h-[80vh] flex flex-col bg-white rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] border 2xl:border-[0.05vw] border-gray-200">
              <h1 className="text-lg 2xl:text-[1.125vw] font-semibold">
                Add New Staff
              </h1>
                <InputField
                  label="Employee Id"
                  name="employeeId"
                  placeholder="Enter Employee Id"
                  value={values.employeeId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.employeeId && errors.employeeId}
                />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                <InputField
                  label="First Name"
                  name="firstName"
                  placeholder="Enter First name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && errors.firstName}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter Last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && errors.lastName}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                <DatePicker
                  label="DOB"
                  name="dob"
                  value={values.dob}
                  onChange={(value) => setFieldValue("dob", value)}
                  placeholder="Select DOB"
                  error={touched.dob && errors.dob}
                  maxDate={new Date().toISOString().split("T")[0]}
                />
                <div className="w-full grid grid-cols-1 gap-2 2xl:gap-[0.5vw] pb-2 2xl:pb-[0.5vw] relative">
                  <label className="2xl:text-[1vw] text-gray-700 block">
                    Phone Number
                  </label>
                  <PhoneInput
                    country="in"
                    value={values.phoneNumber}
                    onChange={(value) => setFieldValue("phoneNumber", value)}
                    inputProps={{ name: "phoneNumber" }}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <p className="text-red-500 text-[0.9rem] 2xl:text-[0.9vw]">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] py-2 2xl:py-[0.5vw]">
                <InputField
                  label="Email"
                  name="email"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                />
                <Dropdown
                  label="Role Name"
                  options={roleOptions}
                  value={values.role}
                  onChange={(val: string) => setFieldValue("role", val)}
                  error={touched.role ? errors.role : undefined}
                />
              </div>

              <InputField
                label="Enter Password"
                name="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                type={showPassword ? "text" : "password"}
                suffixIcon={
                  <span style={{ userSelect: "none" }}>
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </span>
                }
                onIconClick={() => setShowPassword((prev) => !prev)}
              />
              <div className="flex justify-between mt-6 2xl:mt-[1.5vw] space-x-4">
                <Button
                  title="Cancel"
                  variant="primary-outline"
                  width="w-full"
                  onClick={onClose}
                  type="button"
                />
                <Button
                  disabled={isPending}
                  title="Add Staff"
                  width="w-full"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </ModalOverlay>
    </div>
  );
};
