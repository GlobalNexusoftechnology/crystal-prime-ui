/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Button, ModalOverlay, DatePicker, InputField } from "@/components";
// import { useEffect, useMemo } from "react";
// import { useAllMaterialsQuery } from "@/services/apis/clients/community-client/query-hooks/useAllMaterialsQuery";

// export interface IProposal {
//   proposalDate: string;
//   proposalNumber: string;
//   proposalText: string;
// }

// export interface SendProposalModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (values: IProposal) => Promise<void> | void;
//   initialValues: IProposal;
//   isPending?: boolean;
// }

// export function SendProposalModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   initialValues,
//   isPending = false,
// }: SendProposalModalProps) {

//   // fetch material

//     // const filters = useMemo(
//     //   () => ({
//     //     searchText: searchQuery,
//     //     page: currentPage,
//     //     limit: 10,
//     //   }),
//     //   [searchQuery, currentPage]
//     // );

//     const { allMaterialsData, fetchAllMaterials } = useAllMaterialsQuery();

//     console.log(allMaterialsData, "allMaterialsData");

//   const formik = useFormik({
//     initialValues: {
//       proposalDate:
//         initialValues.proposalDate || new Date().toISOString().split("T")[0],
//       proposalNumber: initialValues.proposalNumber || "",
//       proposalText: initialValues.proposalText || "",
//     },
//     validationSchema: Yup.object().shape({
//       proposalDate: Yup.string().required("Proposal date is required"),
//       proposalNumber: Yup.string()
//         .trim()
//         .required("Proposal number is required"),
//       proposalText: Yup.string().required("Proposal text is required"),
//     }),
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       await onSubmit(values);
//       formik.resetForm({
//         values: {
//           proposalDate: new Date().toISOString().split("T")[0],
//           proposalNumber: "",
//           proposalText: "",
//         },
//       });
//     },
//   });

//   // Reset form when modal closes
//   useEffect(() => {
//     if (!isOpen) {
//       formik.resetForm({
//         values: {
//           proposalDate: new Date().toISOString().split("T")[0],
//           proposalNumber: "",
//           proposalText: "",
//         },
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen]);

//   return (
//     <ModalOverlay
//       isOpen={isOpen}
//       onClose={onClose}
//       modalTitle="Send Proposal"
//       modalClassName="w-full md:w-[45rem]"
//     >
//       <form
//         onSubmit={formik.handleSubmit}
//         className="flex flex-col gap-6  overflow-auto bg-customGray border  p-3  rounded-md "
//       >
//         {/* Proposal Number + Date */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <InputField
//               label="Proposal Number"
//               value={formik.values.proposalNumber}
//               onChange={(e) => formik.setFieldValue("proposalNumber", e.target.value)}

//               onBlur={formik.handleBlur}
//               placeholder="Enter proposal number (e.g., P-001)"
//               // Removed numeric props since it's a string input
//             />
//             {formik.touched.proposalNumber && formik.errors.proposalNumber && (
//               <p className="mt-1 text-sm text-red-600">
//                 {formik.errors.proposalNumber}
//               </p>
//             )}
//           </div>

//           <DatePicker
//             label="Proposal Date"
//             value={formik.values.proposalDate}
//             onChange={(value) => formik.setFieldValue("proposalDate", value)}
//             placeholder="Select Proposal Date"
//             datePickerWidth="w-full"
//             error={
//               formik.touched.proposalDate
//                 ? formik.errors.proposalDate
//                 : undefined
//             }
//             maxDate={new Date().toISOString().split("T")[0]}
//           />
//         </div>

//         {/* Proposal Text */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Proposal Text
//           </label>
//           <textarea
//             name="proposalText"
//             placeholder="Enter proposal text..."
//             value={formik.values.proposalText}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             rows={6}
//             className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//               formik.touched.proposalText && formik.errors.proposalText
//                 ? "border-red-500"
//                 : ""
//             }`}
//           />
//           {formik.touched.proposalText && formik.errors.proposalText && (
//             <p className="mt-1 text-sm text-red-600">
//               {formik.errors.proposalText}
//             </p>
//           )}
//         </div>

//         {/* Products */}


//         {/* Actions */}
//         <div className="flex flex-wrap md:flex-nowrap gap-4">
//           <Button
//             title="Cancel"
//             variant="primary-outline"
//             type="button"
//             onClick={onClose}
//             width="w-full"
//           />
//           <Button
//             title={isPending ? "Sending..." : "Download Proposal"}
//             type="submit"
//             width="w-full"
//             disabled={isPending}
//           />
//         </div>
//       </form>
//     </ModalOverlay>
//   );
// }

"use client";

import { Button, DatePicker, InputField, ModalOverlay } from "@/components";
import { useAllMaterialsQuery } from "@/services/apis/clients/community-client/query-hooks/useAllMaterialsQuery";
import { useFormik } from "formik";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export interface IProposal {
  proposalDate: string;
  proposalNumber: string;
  proposalText: string;
  productsText?: string
  subtotal?: number,
  taxPercent?: number,
  finalAmount?: number,
}

// export ProductRow so parent can reuse the type
export type ProductRow = {
  id: string;
  materialId: string;
  name: string;
  salePrice: string;
};

export interface SendProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  // now accepts products array as the second argument
  onSubmit: (values: IProposal, products: ProductRow[],
    subtotal?: any,
    taxPercent?: any,
    finalAmount?: any,

  ) => Promise<void> | void;
  initialValues: IProposal;
  isPending?: boolean;
};

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

// function signature stays the same but types reflect the updated props
export function SendProposalModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isPending = false,
}: SendProposalModalProps) {
  // ...rest of component (no changes needed except the onSubmit call inside formik)

  const { allMaterialsData } = useAllMaterialsQuery();

  // If your query returns data under a property (like `.data`), adjust here:
  const materials = allMaterialsData?.data ?? [];

  // Local state for product rows
  const [productRows, setProductRows] = useState<ProductRow[]>(() => [
    {
      id: generateId(),
      materialId: "",
      name: "",
      salePrice: "",
    },
  ]);

  const [taxPercent, setTaxPercent] = useState(0);


  // Add a new empty row
  const addRow = () => {
    setProductRows((prev) => [
      ...prev,
      { id: generateId(), materialId: "", name: "", salePrice: "" },
    ]);
  };

  // Remove a row by id
  const removeRow = (rowId: string) => {
    setProductRows((prev) => prev.filter((r) => r.id !== rowId));
  };

  // Handle material selection from dropdown
  const handleSelectMaterial = (rowId: string, materialId?: string) => {
    setProductRows((prev) =>
      prev.map((r) => {
        if (r.id !== rowId) return r;

        if (!materialId) {
          return { ...r, materialId: "", name: "", salePrice: "" };
        }

        // 🔥 If custom product selected
        if (materialId === "custom") {
          return { ...r, materialId: "custom", name: "", salePrice: "" };
        }

        const selected = materials.find((m: any) => m.id === materialId);

        return {
          ...r,
          materialId,
          name: selected?.name ?? "",
          salePrice: selected?.sales_price ? String(selected.sales_price) : "",
        };
      })
    );
  };


  // Handle manual sale price edit
  const handleSalePriceChange = (rowId: string, value: string) => {
    setProductRows((prev) => prev.map((r) => (r.id === rowId ? { ...r, salePrice: value } : r)));
  };

  // Optionally expose productRows on submit or to parent — currently local only
  const handleLogProducts = () => {
    console.log("Products to submit:", productRows);
  };

  const subtotal = productRows.reduce((acc, row) => {
    const price = Number(row.salePrice) || 0; // safer than parseFloat + ||
    return acc + price;
  }, 0);

  const taxRate = Number(taxPercent) || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const finalAmount = subtotal + taxAmount;

  const formik = useFormik({
    initialValues: {
      proposalDate:
        initialValues.proposalDate || new Date().toISOString().split("T")[0],
      proposalNumber: initialValues.proposalNumber || "",
      proposalText: initialValues.proposalText || "",
      productsText: initialValues.productsText || "",
    },
    validationSchema: Yup.object().shape({
      proposalDate: Yup.string().required("Proposal date is required"),
      proposalNumber: Yup.string()
        .trim()
        .required("Proposal number is required"),
      proposalText: Yup.string().required("Proposal text is required"),
      productsText: Yup.string().optional(),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      // pass productRows to parent onSubmit which now expects (values, products)
      await onSubmit(values, productRows,
        subtotal,
        taxPercent,
        finalAmount,

      );

      // optional: log product rows
      handleLogProducts();

      formik.resetForm({
        values: {
          proposalDate: new Date().toISOString().split("T")[0],
          proposalNumber: "",
          proposalText: "",
          productsText: ""
        },
      });

      // clear product rows to one empty
      setProductRows([{ id: generateId(), materialId: "", name: "", salePrice: "" }]);
    },
  });


  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      formik.resetForm({
        values: {
          proposalDate: new Date().toISOString().split("T")[0],
          proposalNumber: "",
          proposalText: "",
          productsText: ""
        },
      });
      setProductRows([{ id: generateId(), materialId: "", name: "", salePrice: "" }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // useEffect(() => {
  //   const sum = productRows.reduce((acc, row) => {
  //     const price = parseFloat(row.salePrice) || 0;
  //     return acc + price;
  //   }, 0);

  //   setSubtotal(sum);

  //   const final = sum + (sum * taxPercent) / 100;
  //   setFinalAmount(final);
  // }, [productRows, taxPercent]);


  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="Send Proposal"
      modalClassName="w-full md:w-[45rem] h-[95vh] max-h-[95vh] overflow-y-auto flex flex-col justify-center"
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6  overflow-auto bg-customGray border  p-3  rounded-md "
      >
        {/* Proposal Number + Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputField
              label="Proposal Number"
              value={formik.values.proposalNumber}
              onChange={(e) => formik.setFieldValue("proposalNumber", e.target.value)}
              onBlur={formik.handleBlur}
              placeholder="Enter proposal number (e.g., P-001)"
            />
            {formik.touched.proposalNumber && formik.errors.proposalNumber && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.proposalNumber}
              </p>
            )}
          </div>

          <DatePicker
            label="Proposal Date"
            value={formik.values.proposalDate}
            onChange={(value) => formik.setFieldValue("proposalDate", value)}
            placeholder="Select Proposal Date"
            datePickerWidth="w-full"
            error={
              formik.touched.proposalDate ? formik.errors.proposalDate : undefined
            }
            maxDate={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Proposal Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proposal Text
          </label>
          <textarea
            name="proposalText"
            placeholder="Enter proposal text..."
            value={formik.values.proposalText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={6}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formik.touched.proposalText && formik.errors.proposalText ? "border-red-500" : ""
              }`}
          />
          {formik.touched.proposalText && formik.errors.proposalText && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.proposalText}
            </p>
          )}
        </div>

        {/* Products */}
        <div className="border p-3 rounded-md bg-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Products</h3>
            <div className="flex gap-2">
              <Button title="Add Product" variant="primary-outline" type="button" onClick={addRow} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {productRows.map((row) => (
              <div key={row.id} className="grid grid-cols-12 gap-3 items-end">

                {/* Dropdown (select) */}
                <div className="col-span-5">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Item</label>
                  <select
                    value={row.materialId ?? ""}
                    onChange={(e) => handleSelectMaterial(row.id, e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                  >
                    <option value="">Select item</option>

                    {materials.map((m: any) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}

                    {/* 🔥 Custom option */}
                    <option value="custom">➕ Custom Product</option>
                  </select>
                </div>

                {/* If custom product → editable input */}
                {row.materialId === "custom" ? (
                  <div className="col-span-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Custom Name</label>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        setProductRows((prev) =>
                          prev.map((r) =>
                            r.id === row.id ? { ...r, name: e.target.value } : r
                          )
                        )
                      }
                      placeholder="Enter custom product name"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                ) : (
                  /* Normal Name (read-only) */
                  <div className="col-span-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={row.name}
                      readOnly
                      placeholder="Selected item name"
                      className="w-full px-3 py-2 border rounded-md bg-gray-100"
                    />
                  </div>
                )}

                {/* Price */}
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="text"
                    value={row.salePrice}
                    onChange={(e) => handleSalePriceChange(row.id, e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {/* Remove */}
                <div className="col-span-1 flex items-center">
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="m-auto text-sm text-red-600 hover:underline"
                  >
                      <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Products
          </label>
          <textarea
            name="productsText"
            placeholder="Enter products"
            value={formik.values.productsText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={6}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${formik.touched.productsText && formik.errors.productsText ? "border-red-500" : ""
              }`}
          />
          {formik.touched.productsText && formik.errors.productsText && (
            <p className="mt-1 text-sm text-red-600">
              {formik.errors.productsText}
            </p>
          )}
        </div>

        {/* Totals Section */}
        {/* Totals Section */}
        <div className="border p-4 rounded-md bg-white flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal:</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <label className="font-medium">Tax (%)</label>
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
              className="w-32 px-3 py-2 border rounded-md"
              placeholder="0"
            />
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Final Amount:</span>
            <span className="text-lg font-semibold">₹ {finalAmount.toFixed(2)}</span>
          </div>
        </div>


        {/* Actions */}
        <div className="flex flex-wrap md:flex-nowrap gap-4">
          <Button
            title="Cancel"
            variant="primary-outline"
            type="button"
            onClick={onClose}
            width="w-full"
          />
          <Button
            title={isPending ? "Sending..." : "Download Proposal"}
            type="submit"
            width="w-full"
            disabled={isPending}
          />
        </div>
      </form>
    </ModalOverlay>
  );
}
