"use client"

import { Button, InputField } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUpdateUserMutation, useAuthStore, useUserDetailQuery } from "@/services";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@/components";
import toast from "react-hot-toast";

/**
 * PersonalInfo component
 *
 * Renders a user interface for updating personal details such as name, email, role, and profile photo.
 * Includes input fields, an image preview, file upload functionality, and action buttons.
 */
export function PersonalInfo() {
  const router = useRouter();
  const { updateActiveSession, activeSession } = useAuthStore();
  const userId = activeSession?.user?.id;

  // Fetch user profile on mount or when userId changes
  const { userDetailById, isLoading } = useUserDetailQuery(userId || '');

  useEffect(() => {
    if (userDetailById && userId && userDetailById.id === userId) {
      updateActiveSession({
        access_token: activeSession?.access_token || '',
        refresh_token: activeSession?.refresh_token || '',
        user: { ...userDetailById },
      });
    }
  }, [userDetailById, userId, activeSession?.access_token, activeSession?.refresh_token, updateActiveSession]);

  
  const user = activeSession?.user;

  const initialValues = {
    employee_id: user?.employee_id || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    dob: user?.dob || "",
    phone_number: user?.phone_number ? String(user.phone_number) : "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dob: Yup.string().required("Date of birth is required"),
    phone_number: Yup.string()
      .matches(/^[0-9]{8,15}$/, "Phone number must be 8 to 15 digits")
      .required("Phone number is required"),
  });

  const { onEditUser, isPending } = useUpdateUserMutation({
    onSuccessCallback: (response) => {
      toast.success("Profile updated successfully!");
      // Immediately update the session with the updated user data
      if (response?.data && response.data.id === userId) {
        updateActiveSession({
          access_token: activeSession?.access_token || '',
          refresh_token: activeSession?.refresh_token || '',
          user: { ...response.data },
        });
      }
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Failed to update profile");
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-2  p-4  rounded-lg ">
      <div className="flex flex-col px-4  mb-3 ">
        <h1 className="text-lg  text-[#414651] font-medium ">
          Personal Info
        </h1>
        <span className="text-[0.9rem] ">
          Update your photo and personal details.
        </span>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (!userId) return;
          onEditUser({
            id: userId as string,
            payload: { ...values, role_id: user?.role_id || "" },
          });
        }}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <div className="bg-white flex flex-col gap-4  p-4  rounded-lg ">
              <div className="flex-flex-col gap-2 ">
                <div className="flex flex-col md:flex-row gap-4  mb-4 ">
                  <InputField
                    label="First Name"
                    placeholder="Enter name"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    error={touched.first_name && errors.first_name}
                  />
                  <InputField
                    label="Last Name"
                    placeholder="Enter name"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    error={touched.last_name && errors.last_name}
                  />
                </div>
                <div className="mb-4 ">
                  <InputField
                    label="Email"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && errors.email}
                  />
                </div>
                <div className="mb-4 ">
                  <DatePicker
                    label="Date of Birth"
                    value={values.dob ? (values.dob.length > 10 ? values.dob.slice(0, 10) : values.dob) : ""}
                    onChange={(val) => setFieldValue("dob", val)}
                    maxDate={new Date().toISOString().slice(0, 10)}
                    error={touched.dob && errors.dob}
                  />
                </div>
                <div className="mb-4 ">
                  <InputField
                    label="Phone Number"
                    placeholder="Enter phone number"
                    name="phone_number"
                    type="tel"
                    pattern="[0-9]*"
                    value={values.phone_number}
                    onChange={(e) => {
                      let onlyNums = e.target.value.replace(/[^0-9]/g, "");
                      if (onlyNums.length > 15) onlyNums = onlyNums.slice(0, 15);
                      setFieldValue("phone_number", onlyNums);
                    }}
                    error={touched.phone_number && errors.phone_number}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 ">
                <Button type="button" title="Cancel" variant="primary-outline" onClick={() => router.back()} />
                <Button title={isPending ? "Saving..." : "Save changes"} type="submit" disabled={isPending} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
