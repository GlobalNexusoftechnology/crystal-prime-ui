"use client";

import React from "react";
import { Button, DatePicker, InputField, ModalOverlay } from "@/components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { IUpdateSalesOrderPayload } from "@/services";
import { useUpdateSalesOrderMutation } from "@/services";

export interface IOrderFormValues {
  purchaseOrderNumber: string;
  purchaseOrderDate: string;
  salesOrderDate: string;
}

// ✅ Yup validation with only digits allowed
const validationSchema = Yup.object({
  purchaseOrderNumber: Yup.string().required(
    "Purchase Order Number is required"
  ),
  purchaseOrderDate: Yup.string().required("Purchase Order Date is required"),
  salesOrderDate: Yup.string().required("Sales Order Date is required"),
});

export function EditSalesOrderModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<IOrderFormValues & { id: string }> | null;
  onSuccess?: () => void;
}) {
  const { updateSalesOrder, isPending } = useUpdateSalesOrderMutation({
    onSuccessCallback: () => {
      toast.success("Sales Order updated successfully");
      onSuccess?.();
      onClose();
    },
    onErrorCallback: (err) => {
      toast.error(err?.message || "Failed to update Sales Order");
    },
  });

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Edit Sales & Purchase Order"
      modalClassName="w-[30rem] "
    >
      <Formik
        enableReinitialize
        initialValues={{
          purchaseOrderNumber: initialData?.purchaseOrderNumber || "",
          purchaseOrderDate: initialData?.purchaseOrderDate || "",
          salesOrderDate: initialData?.salesOrderDate || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          if (!initialData?.id) {
            toast.error("Missing Sales Order ID");
            return;
          }

          const payload: IUpdateSalesOrderPayload = {
            id: initialData.id,
            payload: {
              purchaseOrderNumber: values.purchaseOrderNumber,
              purchaseOrderDate: values.purchaseOrderDate,
              salesOrderDate: values.salesOrderDate,
            },
          };

          updateSalesOrder(payload);
          actions.setSubmitting(false);
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
          <Form className="flex flex-col gap-4 p-4  bg-white rounded-lg">
            <InputField
              label="Purchase Order Number"
              name="purchaseOrderNumber"
              placeholder="Enter Purchase Order Number"
              value={values.purchaseOrderNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.purchaseOrderNumber && errors.purchaseOrderNumber}
            />

            <DatePicker
              label="Purchase Order Date"
              name="purchaseOrderDate"
              value={values.purchaseOrderDate}
              onChange={(val) => setFieldValue("purchaseOrderDate", val)}
              error={touched.purchaseOrderDate && errors.purchaseOrderDate}
              isRequired
            />
            <DatePicker
              label="Sales Order Date"
              name="salesOrderDate"
              value={values.salesOrderDate}
              onChange={(val) => setFieldValue("salesOrderDate", val)}
              error={touched.salesOrderDate && errors.salesOrderDate}
              isRequired
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button
                title="Cancel"
                variant="background-white"
                onClick={onClose}
                type="button"
              />
              <Button
                title={isPending ? "Saving..." : "Save"}
                type="submit"
                variant="primary"
                isLoading={isPending}
              />
            </div>
          </Form>
        )}
      </Formik>
    </ModalOverlay>
  );
}
