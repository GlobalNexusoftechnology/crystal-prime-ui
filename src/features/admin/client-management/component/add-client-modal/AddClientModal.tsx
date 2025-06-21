"use client";

import { useFormik, FieldArray, FormikProvider, getIn } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import { IUpdateClientPayload, useCreateClientMutation } from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { IExtendedClientListProps } from "..";
import { FiPlus, FiTrash2 } from "react-icons/fi";

type AddClientModalProps = {
  onClose: () => void;
  selectedClient?: IExtendedClientListProps | null;
  onUpdateClient?: (payload: IUpdateClientPayload) => void;
  isUpdatePending?: boolean;
};

/**
 * Modal for adding a new client or editing an existing client.
 */
export function AddClientModal({
  onClose,
  selectedClient,
  onUpdateClient,
  isUpdatePending,
}: AddClientModalProps) {
  const isEditMode = !!selectedClient;

  const { onCreateClient, isPending: isCreatePending } = useCreateClientMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      onClose();
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      customerName: selectedClient?.name || "",
      companyName: selectedClient?.company_name || "",
      address: selectedClient?.address || "",
      websiteUrl: selectedClient?.website || "",
      contacts: selectedClient?.contacts?.length ? selectedClient.contacts.map(c => ({
        name: c.name,
        designation: c.designation,
        email: c.email,
        phone_numbers: c.contact_numbers.map(cn => cn.number)
      })) : [{ name: "", designation: "", email: "", phone_numbers: [""] }],
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Customer name is required"),
      companyName: Yup.string().required("Company name is required"),
      address: Yup.string().required("Address is required"),
      websiteUrl: Yup.string().url("Invalid URL format").required("Website URL is required"),
      contacts: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Contact name is required"),
          designation: Yup.string().required("Designation is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          phone_numbers: Yup.array().of(
            Yup.string().required("Phone number is required")
          ),
        })
      ),
    }),
    onSubmit: (values) => {
      const payload = {
        name: values.customerName,
        company_name: values.companyName,
        address: values.address,
        website: values.websiteUrl,
        // This is a simplified payload. The backend will likely expect
        // a more structured contacts array.
        contact_person: values.contacts[0]?.name || "",
        contact_number: values.contacts[0]?.phone_numbers[0] || "",
        email: values.contacts[0]?.email || "",
        contacts: values.contacts,
      };

      if (isEditMode && selectedClient && onUpdateClient) {
        onUpdateClient({
          id: selectedClient.id,
          payload,
        });
      } else {
        onCreateClient(payload);
      }
    },
  });

  return (
    <ModalOverlay modalTitle="Back to Clients" isOpen={true} onClose={onClose}>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 p-4 2xl:gap-[1vw] border 2xl:border-[0.1vw] border-borderGray bg-white rounded-lg 2xl:rounded-[0.5vw] h-[90vh] overflow-y-auto"
        >
          <p className="text-[1.2rem] 2xl:text-[1.2vw] font-semibold">
            {isEditMode ? "Edit Client" : "Add New Client"}
          </p>
          
          {/* Main Client Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Customer Name" name="customerName" value={formik.values.customerName} onChange={formik.handleChange} error={formik.touched.customerName && formik.errors.customerName} />
            <InputField label="Company Name" name="companyName" value={formik.values.companyName} onChange={formik.handleChange} error={formik.touched.companyName && formik.errors.companyName} />
          </div>
          <InputField label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} error={formik.touched.address && formik.errors.address}/>
          <InputField label="Website URL" name="websiteUrl" value={formik.values.websiteUrl} onChange={formik.handleChange} error={formik.touched.websiteUrl && formik.errors.websiteUrl}/>

          <hr className="my-4" />

          {/* Contacts Section */}
          <FieldArray
            name="contacts"
            render={(arrayHelpers) => (
              <div>
                {formik.values.contacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-md mb-4 relative">
                    <h3 className="text-lg font-medium mb-2">Contact Person {index + 1}</h3>
                     {formik.values.contacts.length > 1 && (
                        <button
                          type="button"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Contact Person"
                        name={`contacts.${index}.name`}
                        value={contact.name}
                        onChange={formik.handleChange}
                        error={
                          getIn(formik.touched, `contacts[${index}].name`) &&
                          getIn(formik.errors, `contacts[${index}].name`)
                        }
                      />
                      <InputField
                        label="Designation"
                        name={`contacts.${index}.designation`}
                        value={contact.designation}
                        onChange={formik.handleChange}
                        error={
                          getIn(formik.touched, `contacts[${index}].designation`) &&
                          getIn(formik.errors, `contacts[${index}].designation`)
                        }
                      />
                    </div>
                    <InputField
                      label="Email"
                      name={`contacts.${index}.email`}
                      type="email"
                      value={contact.email}
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, `contacts[${index}].email`) &&
                        getIn(formik.errors, `contacts[${index}].email`)
                      }
                    />

                    <FieldArray
                      name={`contacts.${index}.phone_numbers`}
                      render={(phoneArrayHelpers) => (
                        <div>
                          {contact.phone_numbers.map((phone, phoneIndex) => (
                            <div key={phoneIndex} className="flex items-center gap-2 mt-2">
                              <InputField
                                label={`Phone No ${phoneIndex + 1}`}
                                name={`contacts.${index}.phone_numbers.${phoneIndex}`}
                                value={phone}
                                onChange={formik.handleChange}
                                error={
                                  getIn(formik.touched, `contacts[${index}].phone_numbers[${phoneIndex}]`) &&
                                  getIn(formik.errors, `contacts[${index}].phone_numbers[${phoneIndex}]`)
                                }
                              />
                              {contact.phone_numbers.length > 1 && (
                                <button
                                  type="button"
                                  className="text-red-500 hover:text-red-700 mt-6"
                                  onClick={() => phoneArrayHelpers.remove(phoneIndex)}
                                >
                                  <FiTrash2 />
                                </button>
                              )}
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="primary-outline"
                            className="mt-2"
                            onClick={() => phoneArrayHelpers.push("")}
                            leftIcon={<FiPlus />}
                            title="Add Other Contact No"
                          />
                        </div>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => arrayHelpers.push({ name: "", designation: "", email: "", phone_numbers: [""] })}
                  title="Add Client Contact"
                  leftIcon={<FiPlus />}
                />
              </div>
            )}
          />

          <div className="flex justify-end gap-4 2xl:gap-[1vw] mt-6">
            <Button title="Cancel" variant="primary-outline" onClick={onClose} />
            <Button
              type="submit"
              title={isEditMode ? "Update Client" : "Add Project"}
              variant="primary"
              disabled={isCreatePending || isUpdatePending}
            />
          </div>
        </form>
      </FormikProvider>
    </ModalOverlay>
  );
}
