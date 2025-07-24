"use client";

import { useFormik, FieldArray, FormikProvider, getIn } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import { IUpdateClientPayload, useCreateClientMutation } from "@/services";
import { IClientList } from "@/services";
import { AddSquareIcon } from "@/features";

interface AddClientModalProps {
  onClose: () => void;
  selectedClient?: IClientList | null;
  onUpdateClient?: (payload: IUpdateClientPayload) => void;
  isUpdatePending?: boolean;
  clientRefech: () => void;
}

export function AddClientModal({
  onClose,
  selectedClient,
  onUpdateClient,
  isUpdatePending,
  clientRefech,
}: AddClientModalProps) {
  const isEditMode = !!selectedClient;
  const { onCreateClient, isPending: isCreatePending } =
    useCreateClientMutation({
      onSuccessCallback: () => {
        onClose();
        clientRefech();
      },
      onErrorCallback: () => {},
    });

  const handleVisibleOtherContact = (index: number) => {
    const updated = [...formik.values.client_details];
    updated[index]._showOtherContact = true;
    formik.setFieldValue("client_details", updated);
  };

  const formik = useFormik({
    initialValues: {
      name: selectedClient?.name || "",
      company_name: selectedClient?.company_name || "",
      address: selectedClient?.address || "",
      website: selectedClient?.website || "",
      contact_person: selectedClient?.contact_person || "",
      contact_number: selectedClient?.contact_number || "",
      email: selectedClient?.email || "",
      gst_number: selectedClient?.gst_number || "",
      client_details: selectedClient?.client_details?.map((c) => ({
        ...c,
        _showOtherContact: false,
      })) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Customer name is required"),
      company_name: Yup.string().required("Company name is required"),
      address: Yup.string().required("Address is required"),
      website: Yup.string().required("Website URL is required"),
      contact_person: Yup.string().required("Contact person is required"),
      contact_number: Yup.string().required("Phone number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      gst_number: Yup.string()
        .matches(
          /^$|^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          "Invalid GST number"
        )
        .nullable(),
    }),
    onSubmit: (values) => {
      if (isEditMode && selectedClient && onUpdateClient) {
        onUpdateClient({ id: selectedClient.id, payload: values });
      } else {
        onCreateClient(values);
      }
    },
  });

  return (
    <ModalOverlay
      modalTitle="Back to Clients"
      isOpen={true}
      onClose={onClose}
      modalClassName="w-auto md:w-[40rem] 2xl:w-[45vw]"
    >
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="max-h-[80vh] flex flex-col gap-4 p-4 border bg-white rounded-lg h-full overflow-y-auto"
        >
          <p className="text-[1.2rem] 2xl:text-[1.2vw] font-semibold">
            {isEditMode ? "Edit Client" : "Add New Client"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Customer Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
              placeholder="Enter customer name"
            />
            <InputField
              label="Company Name"
              name="company_name"
              value={formik.values.company_name}
              onChange={formik.handleChange}
              error={formik.touched.company_name && formik.errors.company_name}
              placeholder="Enter company name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && formik.errors.address}
              placeholder="Enter address"
            />
            <InputField
              label="GST Number"
              name="gst_number"
              value={formik.values.gst_number}
              onChange={formik.handleChange}
              error={formik.touched.gst_number && formik.errors.gst_number}
              placeholder="Enter GST number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Contact Person"
              name="contact_person"
              value={formik.values.contact_person}
              onChange={formik.handleChange}
              error={
                formik.touched.contact_person && formik.errors.contact_person
              }
              placeholder="Enter contact person"
            />
            <InputField
              label="Website URL"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              error={formik.touched.website && formik.errors.website}
              placeholder="Enter website URL"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Phone No"
              name="contact_number"
              value={formik.values.contact_number}
              onChange={formik.handleChange}
              error={
                formik.touched.contact_number && formik.errors.contact_number
              }
              placeholder="Enter phone number"
            />
            <InputField
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              placeholder="Enter email address"
            />
          </div>
          <FieldArray
            name="client_details"
            render={(arrayHelpers) => (
              <div className="flex flex-col gap-4 2xl:gap-[1vw]">
                {formik.values.client_details.length > 0 && formik.values.client_details.map((contact, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 2xl:gap-[1vw] relative border p-2 rounded"
                  >
                    {formik.values.client_details.length > 1 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        X
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Client Contact No"
                        name={`client_details.${index}.client_contact`}
                        value={contact.client_contact}
                        onChange={formik.handleChange}
                        error={
                          getIn(
                            formik.touched,
                            `client_details[${index}].client_contact`
                          ) &&
                          getIn(
                            formik.errors,
                            `client_details[${index}].client_contact`
                          )
                        }
                        placeholder="Enter contact number"
                      />
                      <InputField
                        label="Contact Person Name"
                        name={`client_details.${index}.contact_person`}
                        value={contact.contact_person}
                        onChange={formik.handleChange}
                        error={
                          getIn(
                            formik.touched,
                            `client_details[${index}].contact_person`
                          ) &&
                          getIn(
                            formik.errors,
                            `client_details[${index}].contact_person`
                          )
                        }
                        placeholder="Enter contact name"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Email"
                        name={`client_details.${index}.email`}
                        value={contact.email}
                        onChange={formik.handleChange}
                        error={
                          getIn(
                            formik.touched,
                            `client_details[${index}].email`
                          ) &&
                          getIn(formik.errors, `client_details[${index}].email`)
                        }
                        placeholder="Enter email address"
                      />
                      <InputField
                        label="Designation"
                        name={`client_details.${index}.designation`}
                        value={contact.designation}
                        onChange={formik.handleChange}
                        error={
                          getIn(
                            formik.touched,
                            `client_details[${index}].designation`
                          ) &&
                          getIn(
                            formik.errors,
                            `client_details[${index}].designation`
                          )
                        }
                        placeholder="Enter designation"
                      />
                    </div>
                    {/* Other Contact No - show only if toggled */}
                    {contact._showOtherContact ? (
                      <InputField
                        label="Other Contact No"
                        name={`client_details.${index}.other_contact`}
                        value={contact.other_contact}
                        onChange={formik.handleChange}
                        placeholder="Enter other contact"
                      />
                    ) : (
                      <button
                        type="button"
                        className="flex items-center gap-2 mt-2"
                        onClick={() => handleVisibleOtherContact(index)}
                      >
                        <span className="text-primary flex items-center gap-2 2xl:gap-[0.5vw]">
                          <AddSquareIcon className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
                          <span>Add Other Contact No</span>
                        </span>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="flex items-center gap-2 mt-2"
                  onClick={() =>
                    arrayHelpers.push({
                      client_id: "",
                      client_contact: "",
                      contact_person: "",
                      designation: "",
                      email: "",
                      other_contact: "",
                      _showOtherContact: false,
                    })
                  }
                >
                  <span className="text-primary flex items-center gap-2 2xl:gap-[0.5vw]">
                    <AddSquareIcon className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
                    <span>Add Client Contact</span>
                  </span>
                </button>
              </div>
            )}
          />
          <div className="flex justify-end gap-4 mt-auto pt-4">
            <Button
              title="Cancel"
              variant="primary-outline"
              onClick={onClose}
            />
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
