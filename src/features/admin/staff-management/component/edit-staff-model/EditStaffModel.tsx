import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Button, DatePicker, Dropdown, InputField, Loading, ModalOverlay } from "@/components";
import { useAllRoleListQuery, useUpdateUserMutation, useUserDetailQuery } from "@/services";
import { formatDateToMMDDYYYY, IApiError } from "@/utils";
import toast from "react-hot-toast";
import { IAddStaffFormValues } from "../add-new-staff-model/AddNewStaffModel";

interface EditStaffModelProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onAEditSuccessCallback: () => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  dob: Yup.string().required("Date of Birth is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialEditValues: IAddStaffFormValues = {
  firstName: "",
  lastName: "",
  dob: "",
  phoneNumber: "",
  email: "",
  role: "",
  password: "",
}

export const EditStaffModel: React.FC<EditStaffModelProps> = ({
  isOpen,
  onClose,
  userId,
  onAEditSuccessCallback,
}) => {
  const [initialValues, setInitialValues] = useState<IAddStaffFormValues>(initialEditValues);;
  
  const { userDetailById, isLoading } = useUserDetailQuery(userId);
  const { data: rolesList } = useAllRoleListQuery();
  
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
      console.error("Failed to edit user:", err);
      toast.error(err.message);
    },
  });

   useEffect(() => {
      if(userDetailById) {
        setInitialValues({
          firstName: userDetailById.first_name || "",
          lastName: userDetailById.last_name || "",
          dob: formatDateToMMDDYYYY(userDetailById.dob) || "",
          phoneNumber: userDetailById.phone_number || "",
          email: userDetailById.email || "",
          role: userDetailById.role_id || "",
          password: "",
        })
      }
    }, [userDetailById]);

  if (!userDetailById || isLoading) {
    return <Loading/>;
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
          onEditUser({
            id: userId,
            payload: {
              first_name: values.firstName,
              last_name: values.lastName,
              dob: values.dob,
              email: values.email,
              role_id: values.role,
              phone_number: values.phoneNumber,
              password: values.password,
            },
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
          <Form className="flex flex-col gap-4 2xl:gap-[1vw] p-4 2xl:p-[1vw] bg-white rounded-xl border-gray-400">
            <h1 className="text-md 2xl:text-[1vw] text-gray-900">Edit Staff</h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 2xl:gap-[2vw]">
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

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 2xl:gap-[2vw]">
              <DatePicker
                label="DOB"
                name="dob"
                value={values.dob}
                onChange={(value) => setFieldValue('dob', value)}
                placeholder="Select DOB"
                error={touched.dob && errors.dob}
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && errors.phoneNumber}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-8 2xl:gap-[2vw]">
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
            />

            <div className="flex gap-4 2xl:gap-[1vw] w-full">
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
