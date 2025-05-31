import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  Button,
  DatePicker,
  Dropdown,
  InputField,
  Loading,
  ModalOverlay,
} from "@/components";
import {
  IUserUpdatePayload,
  IUserViewDetails,
  useAllRoleListQuery,
  useUpdateUserMutation,
} from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { IAddStaffFormValues } from "../add-new-staff-model/AddNewStaffModel";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface EditStaffModelProps {
  isOpen: boolean;
  onClose: () => void;
  selectStaff: IUserViewDetails;
  onAEditSuccessCallback: () => void;
}

// Updated Yup validation schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),

  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),

  dob: Yup.date()
    .max(new Date(), "DOB cannot be in the future")
    .required("Date of Birth is required")
    .typeError("Invalid date format (YYYY-MM-DD)"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    .required("Email is required"),

  role: Yup.string().required("Role is required"),
});

const initialEditValues: IAddStaffFormValues = {
  firstName: "",
  lastName: "",
  dob: "",
  phoneNumber: "",
  email: "",
  role: "",
  password: "",
};

export const EditStaffModel: React.FC<EditStaffModelProps> = ({
  isOpen,
  onClose,
  selectStaff,
  onAEditSuccessCallback,
}) => {
  const [initialValues, setInitialValues] =
    useState<IAddStaffFormValues>(initialEditValues);

  const { data: rolesList } = useAllRoleListQuery();

  // Format date for form field (YYYY-MM-DD)
  const formatDateForSave = (inputDate: string) => {
    if (!inputDate) return "";
    if (inputDate.includes("T")) {
      return inputDate.slice(0, 10);
    }
    const [month, day, year] = inputDate.split("-");
    if (month && day && year) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return "";
  };

  const roleOptions =
    rolesList?.map((roleData) => ({
      label: roleData?.role,
      value: roleData?.id.toString(),
    })) || [];

  const { onEditUser } = useUpdateUserMutation({
    onSuccessCallback: (response) => {
      onAEditSuccessCallback();
      onClose();
      toast.success(response.message);
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (selectStaff) {
      const convertedDOB = formatDateForSave(selectStaff.dob);
      setInitialValues({
        firstName: selectStaff.first_name || "",
        lastName: selectStaff.last_name || "",
        dob: convertedDOB,
        phoneNumber: selectStaff.phone_number || "",
        email: selectStaff.email || "",
        role: selectStaff.role_id?.toString() || "",
        password: "",
      });
    }
  }, [selectStaff]);

  if (!selectStaff) {
    return <Loading />;
  }

  return (
    <ModalOverlay
      modalTitle="Back to Staffs"
      isOpen={isOpen}
      onClose={onClose}
      modalClassName="w-full md:w-[70%] lg:w-[60%] xl:w-[40%] 2xl:w-[40vw]"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          const payload: IUserUpdatePayload = {
            first_name: values.firstName,
            last_name: values.lastName,
            dob: values.dob,
            email: values.email,
            role_id: values.role,
            phone_number: values.phoneNumber,
            ...(values.password &&
              values.password.trim() !== "" && { password: values.password }),
          };

          onEditUser({
            id: selectStaff?.id,
            payload,
          });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form className="overflow-y-auto max-h-[80vh] flex flex-col bg-white rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-200">
            <h1 className="text-lg 2xl:text-[1.125vw] font-semibold">Edit Staff</h1>

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
                  <p className="text-red-500 text-sm 2xl:text-[0.9vw]">
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
            />

            <div className="flex justify-between mt-6 2xl:mt-[1.5vw] space-x-4">
              <Button
                title="Cancel"
                variant="primary-outline"
                width="w-full"
                type="button"
                onClick={onClose}
              />
              <Button title="Edit" width="w-full" type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </ModalOverlay>
  );
};
