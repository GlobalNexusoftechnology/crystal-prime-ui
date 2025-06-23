"use client";

import { useFormik, FieldArray, FormikProvider, getIn } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import { IUpdateClientPayload, useCreateClientMutation } from "@/services";
import { IApiError } from "@/utils";
import toast from "react-hot-toast";
import { IExtendedClientListProps } from "..";
import { AddSquareIcon } from "@/features";
import { FiTrash2 } from "react-icons/fi";

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
      websiteUrl: Yup.string().url("Invalid URL format"),
      contacts: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Contact name is required"),
          designation: Yup.string(),
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
        contact_person: values.contacts[0]?.name || "",
        contact_number: values.contacts[0]?.phone_numbers[0] || "",
        email: values.contacts[0]?.email || "",
        client_details: values.contacts.map(c => ({
          ...c,
          contact_numbers: c.phone_numbers.map((phone, index) => ({
            type: index === 0 ? 'primary' : 'other',
            number: phone
          }))
        })),
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
    <ModalOverlay modalTitle="Back to Clients" isOpen={true} onClose={onClose} >
      <FormikProvider value={formik} >
        <form
          onSubmit={formik.handleSubmit}
          className="max-h-[80vh] flex flex-col gap-4 p-4 2xl:gap-[1vw] border 2xl:border-[0.1vw] border-borderGray bg-white rounded-lg 2xl:rounded-[0.5vw] h-full overflow-y-auto"
        >
          <p className="text-[1.2rem] 2xl:text-[1.2vw] font-semibold">
            {isEditMode ? "Edit Client" : "Add New Client"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Customer Name" name="customerName" value={formik.values.customerName} onChange={formik.handleChange} error={formik.touched.customerName && formik.errors.customerName} />
            <InputField label="Company Name" name="companyName" value={formik.values.companyName} onChange={formik.handleChange} error={formik.touched.companyName && formik.errors.companyName} />
          </div>
          <InputField label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} error={formik.touched.address && formik.errors.address} />
          <InputField label="Website URL" name="websiteUrl" value={formik.values.websiteUrl} onChange={formik.handleChange} error={formik.touched.websiteUrl && formik.errors.websiteUrl} />
          <FieldArray
            name="contacts"
            render={(arrayHelpers) => (
              <div className="flex flex-col gap-4">
                {formik.values.contacts.map((contact, index) => (
                  <div key={index} className="relative">
                    {formik.values.contacts.length > 1 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <FiTrash2 />
                      </button>
                    )}
                    <div className={`grid grid-cols-1 ${index > 0 ? 'md:grid-cols-2' : ''} gap-4`}>
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
                      {index > 0 &&
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
                      }
                    </div>

                    <FieldArray
                      name={`contacts.${index}.phone_numbers`}
                      render={(phoneArrayHelpers) => (
                        <div className="flex flex-col gap-2 mt-2">
                          {contact.phone_numbers.map((phone, phoneIndex) => (
                            <div key={phoneIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                              <InputField
                                label={phoneIndex === 0 ? `Phone No` : `Other Phone No ${phoneIndex}`}
                                name={`contacts.${index}.phone_numbers.${phoneIndex}`}
                                value={phone}
                                onChange={formik.handleChange}
                                error={
                                  getIn(formik.touched, `contacts[${index}].phone_numbers[${phoneIndex}]`) &&
                                  getIn(formik.errors, `contacts[${index}].phone_numbers[${phoneIndex}]`)
                                }
                              />
                              <div className="flex items-center gap-2">
                                {phoneIndex === 0 ?
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
                                  /> : <div className="h-10" />
                                }
                                {contact.phone_numbers.length > 1 && phoneIndex > 0 && (
                                  <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700 mt-6"
                                    onClick={() => phoneArrayHelpers.remove(phoneIndex)}
                                  >
                                    <FiTrash2 />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          {index > 0 &&
                            <button type="button" className="flex items-center gap-2 2xl:gap-[0.5vw]" onClick={() => phoneArrayHelpers.push("")}
                            >
                              <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                              <span className="text-primary 2xl:text-[1vw]">Add Other Contact No</span>
                            </button>
                          }
                        </div>
                      )}
                    />
                  </div>
                ))}
                <button type="button" className="flex items-center gap-2 2xl:gap-[0.5vw]" onClick={() => arrayHelpers.push({ name: "", designation: "", email: "", phone_numbers: [""] })}
                >
                  <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                  <span className="text-primary 2xl:text-[1vw]">Add Client Contact</span>
                </button>
              </div>
            )}
          />
          <div className="flex justify-end gap-4 2xl:gap-[1vw] mt-auto pt-4">
            <Button title="Cancel" variant="primary-outline" onClick={onClose} />
            <Button
              type="submit"
              title={isEditMode ? "Update Client" : "Add Client"}
              variant="primary"
              disabled={isCreatePending || isUpdatePending}
            />
          </div>
        </form>
      </FormikProvider>
    </ModalOverlay>
  );
}
