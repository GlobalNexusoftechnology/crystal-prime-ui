/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  Button,
  Dropdown,
  InputField,
  Loading,
  ModalOverlay,
} from "@/components";
import {
  IUserUpdatePayload,
  IUserViewDetails,
  useAllRoleListQuery,
  useAllUsersQuery,
  useUpdateUserMutation,
} from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IAddStaffFormValues } from "../add-new-staff-model/AddNewStaffModel";

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

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits"),
  target: Yup.number().optional(),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .matches(/@.+\..+/, "Email must contain a dot (.) after the @ symbol")
    .required("Email is required"),

  role: Yup.string().required("Role is required"),
});

const initialEditValues: IAddStaffFormValues = {
  employeeId: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  role: "",
  password: "",
  target: 0,
  teamLead: "",
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
  const { allUsersData } = useAllUsersQuery();

  // Format date for form field (YYYY-MM-DD)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    rolesList?.data?.list?.map((roleData) => ({
      label: roleData?.role,
      value: roleData?.id.toString(),
    })) || [];

  const userOptions = [
    { label: "None", value: "" },
    ...(allUsersData?.data?.list
      ?.filter((user: any) => user.first_name && user.last_name)
      ?.map((user: any) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id.toString(),
      })) || []),
  ];

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
      setInitialValues({
        employeeId: selectStaff.employee_id,
        firstName: selectStaff.first_name || "",
        lastName: selectStaff.last_name || "",
        phoneNumber: selectStaff.phone_number || "",
        email: selectStaff.email || "",
        target: selectStaff.target || 0,
        role: selectStaff.role_id?.toString() || "",
        password: "",
        teamLead: (selectStaff as any).team_lead_id?.toString() || "",
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
      modalClassName="w-full md:w-[70%] lg:w-[60%] xl:w-[40%] "
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          const payload: IUserUpdatePayload = {
            employee_id: values.employeeId,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            role_id: values.role,
            phone_number: values.phoneNumber,
            target: values.target,
            team_lead_id: values.teamLead || undefined,
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
          <Form className="overflow-y-auto max-h-[80vh] flex flex-col bg-white rounded-lg  p-4  border  border-gray-200">
            <h1 className="text-lg  font-semibold">Edit Staff</h1>
            <InputField
              label="Employee Id"
              name="employeeId"
              placeholder="Enter Employee Id"
              value={values.employeeId}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.employeeId && errors.employeeId}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
              <div className="w-full grid grid-cols-1 gap-2  pb-2  relative">
                <label className=" text-gray-700 block">Phone Number</label>
                <PhoneInput
                  country="in"
                  value={values.phoneNumber}
                  onChange={(value) => setFieldValue("phoneNumber", value)}
                  inputProps={{ name: "phoneNumber" }}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-[0.9rem] ">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-2 ">
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

            <Dropdown
              label="Team Lead (Optional)"
              options={userOptions}
              value={values.teamLead}
              onChange={(val: string) => setFieldValue("teamLead", val)}
            />

            <InputField
              label="Enter Password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <div className="mt-3">
                <InputField
                  label="Enter Monthly Target"
                  name="target"
                  placeholder="Enter Monthly Target"
                  value={values.target}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.target && (errors.target as string)}
                  type="number"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6  space-x-4">
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
