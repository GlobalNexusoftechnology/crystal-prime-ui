"use client";
// import React, { useState, useMemo } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useSearchParamsSafe } from "@/utils/hooks";

// import { ProposalSuccessModal, NumberInput } from "@/components";
// import { Breadcrumb } from "@/features";
// import {
//   useAllMaterialsQuery,
//   useAllLeadsListQuery,
//   useCreateBoqMutation,
//   useBoqDetailQuery,
//   useAllBoqQuery,
//   useUpdateBoqMutation,
//   useDownloadBoqInvoicePdfMutation,
// } from "@/services";

// import { ProposalMaterialTable } from "../proposal-material-table";

// interface MaterialItem {
//   id: string;
//   name: string;
//   size: string;
//   uom?: string;
//   pressure: string;
//   brand: string;
//   purchase_price?: string;
//   sales_description?: string;
//   purchase_description?: string;
//   alias?: string;
//   photos: string[];
//   qty: number;
//   hsn: string;
//   discount?: number;
//   salesPrice?: number;
//   type?: string;
// }

// export function EditProposal() {
//   const searchParams = useSearchParamsSafe();
//   const leadIdFromQuery = searchParams.get("leadId") || "";
//   const boqIdFromQuery = searchParams.get("proposalId") || "";
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLead, setSelectedLead] = useState(""); // Lead name
//   const [selectedLeadId, setSelectedLeadId] = useState(leadIdFromQuery || "");
//   const [selectedBusiness, setSelectedBusiness] = useState("");
//   const [selectedDate, setSelectedDate] = useState<string>(() => {
//     return new Date().toISOString().split("T")[0];
//   });
//   const [selectedMaterials, setSelectedMaterials] = useState<MaterialItem[]>(
//     []
//   );
//   const [photoModal, setPhotoModal] = useState<{ open: boolean; src: string }>({
//     open: false,
//     src: "",
//   });
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [createdBoqId, setCreatedBoqId] = useState<string>("");
//   const [errors, setErrors] = useState<{
//     leadId?: string;
//     businessName?: string;
//     date?: string;
//   }>({});
//   const [metalDiscount, setMetalDiscount] = useState<number>(0);
//   const [plasticDiscount, setPlasticDiscount] = useState<number>(0);

//   type ValidationIssue = { path?: Array<string | number>; message?: string };
//   const isIssueArray = (v: unknown): v is ValidationIssue[] =>
//     Array.isArray(v) && v.every((i) => typeof i === "object" && i !== null);

//   const extractIssues = (error: unknown): ValidationIssue[] | null => {
//     if (typeof error === "object" && error !== null) {
//       const obj = error as Record<string, unknown>;
//       const directData = obj.data;
//       if (isIssueArray(directData)) return directData;
//       const response = obj.response as Record<string, unknown> | undefined;
//       const responseData = (response?.data ?? undefined) as unknown;
//       if (isIssueArray(responseData)) return responseData;
//       if (typeof responseData === "object" && responseData !== null) {
//         const rd = responseData as Record<string, unknown>;
//         if (isIssueArray(rd.issues)) return rd.issues as ValidationIssue[];
//         if (isIssueArray(rd.errors)) return rd.errors as ValidationIssue[];
//         if (isIssueArray(rd.data)) return rd.data as ValidationIssue[];
//       }
//     }
//     return null;
//   };

//   const extractMessage = (error: unknown): string | null => {
//     if (typeof error === "object" && error !== null) {
//       const obj = error as Record<string, unknown>;
//       const response = obj.response as Record<string, unknown> | undefined;
//       const responseData = response?.data as
//         | Record<string, unknown>
//         | undefined;
//       const msg = (responseData?.message ??
//         responseData?.error ??
//         obj.message) as unknown;
//       if (typeof msg === "string" && msg.trim().length > 0) return msg;
//     }
//     return null;
//   };

//   const router = useRouter();

//   // Fetch data
//   const { allMaterialsData } = useAllMaterialsQuery({ limit: 1000000000000 }); // Increase limit to show more materials
//   const { data: leadsData } = useAllLeadsListQuery({});
//   const { refetchAllBoq } = useAllBoqQuery();
//   const { onCreateBoq, isPending: isCreating } = useCreateBoqMutation({
//     onSuccessCallback: (response) => {
//       toast.success("Proposal created successfully");
//       setCreatedBoqId(response?.data?.id || "");
//       setSelectedMaterials([]);
//       setShowSuccessModal(true);
//       refetchAllBoq();
//     },
//     onErrorCallback: (err) => {
//       const issues = extractIssues(err);
//       if (issues) {
//         const next: { leadId?: string; businessName?: string; date?: string } =
//           {};
//         for (const issue of issues) {
//           const p = Array.isArray(issue.path)
//             ? issue.path.join(".")
//             : String(issue.path ?? "");
//           if (p.includes("leadId"))
//             next.leadId = issue.message || "Invalid lead";
//           if (p.includes("businessName"))
//             next.businessName = issue.message || "Invalid business name";
//           if (p.includes("date")) next.date = issue.message || "Invalid date";
//         }
//         setErrors(next);
//         const combined = issues
//           .map(
//             (i) =>
//               `${
//                 Array.isArray(i.path) ? i.path.join(".") : String(i.path ?? "")
//               }: ${i.message ?? ""}`
//           )
//           .join("\n");
//         toast.error(
//           combined || extractMessage(err) || "Failed to create proposal"
//         );
//         return;
//       }
//       toast.error(extractMessage(err) || "Failed to create proposal");
//     },
//   });

//   // Update BOQ mutation
//   const { updateBoq, isPending: isUpdating } = useUpdateBoqMutation({
//     onSuccessCallback: () => {
//       toast.success("Proposal updated successfully");
//       refetchAllBoq();
//       router.push("/admin/material-management/proposal");
//     },
//     onErrorCallback: (err) => {
//       const issues = extractIssues(err);
//       if (issues) {
//         const next: { leadId?: string; businessName?: string; date?: string } =
//           {};
//         for (const issue of issues) {
//           const p = Array.isArray(issue.path)
//             ? issue.path.join(".")
//             : String(issue.path ?? "");
//           if (p.includes("leadId"))
//             next.leadId = issue.message || "Invalid lead";
//           if (p.includes("businessName"))
//             next.businessName = issue.message || "Invalid business name";
//           if (p.includes("date")) next.date = issue.message || "Invalid date";
//         }
//         setErrors(next);
//         const combined = issues
//           .map(
//             (i) =>
//               `${
//                 Array.isArray(i.path) ? i.path.join(".") : String(i.path ?? "")
//               }: ${i.message ?? ""}`
//           )
//           .join("\n");
//         toast.error(
//           combined || extractMessage(err) || "Failed to update proposal"
//         );
//         return;
//       }
//       toast.error(extractMessage(err) || "Failed to update proposal");
//     },
//   });

//   // Download BOQ invoice PDF mutation
//   const { downloadBoqInvoicePdf, isPending: isDownloading } =
//     useDownloadBoqInvoicePdfMutation({
//       onSuccessCallback: (pdfBlob: Blob) => {
//         // Create a blob URL and trigger download
//         const blobUrl = window.URL.createObjectURL(pdfBlob);
//         const link = document.createElement("a");
//         link.href = blobUrl;
//         link.download = `proposal-invoice-${
//           boqIdFromQuery || createdBoqId
//         }.pdf`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         // Clean up the blob URL
//         window.URL.revokeObjectURL(blobUrl);
//         toast.success("Proposal invoice downloaded successfully");
//         setShowSuccessModal(false);
//         router.push("/admin/material-management/proposal");
//       },
//       onErrorCallback: (err) => {
//         toast.error(err?.message || "Failed to download proposal invoice");
//       },
//     });

//   // Fetch BOQ detail if editing
//   const { data: boqDetailData } = useBoqDetailQuery(boqIdFromQuery);

//   // Pre-fill form if editing
//   React.useEffect(() => {
//     if (
//       boqIdFromQuery &&
//       boqDetailData &&
//       "data" in boqDetailData &&
//       boqDetailData.data?.data
//     ) {
//       const d = boqDetailData.data.data;
//       // Set lead by ID
//       if (d.lead && d.lead.id) {
//         setSelectedLeadId(d.lead.id);
//         setSelectedLead(`${d.lead.first_name} ${d.lead.last_name}`);
//         setSelectedBusiness(d.lead.company || "");
//       }
//       setSelectedDate(d.date || "");

//       // Set materials from items array (new structure) or searchMaterial (old structure)
//       if (d.items && d.items.length > 0) {
//         // New structure with items array
//         const materialsFromItems = d.items.map((item) => {
//           // Find the original material to get the type
//           const originalMaterial = allMaterialsData?.data?.find(
//             (m) => m.id === item.materialId
//           );
//           return {
//             id: item.materialId,
//             name: item.materialName,
//             size: item.size || "",
//             uom: item.uom || "",
//             pressure: item.pressure || "",
//             brand: item.brand || "",
//             sales_description: item.sales_description || "",
//             purchase_description: item.purchase_description || "",
//             alias: item.alias || "",
//             photos: item.photos || [],
//             qty: Number(item.qty),
//             hsn: item.hsn || "",
//             discount: Number(item.discount) || 0,
//             salesPrice: Number(item.rate) || 0, // Assuming rate is the sales price
//             type: originalMaterial?.materialType?.name || "", // Get type from original material
//           };
//         });
//         setSelectedMaterials(materialsFromItems);
//       } else if (d.searchMaterial && d.searchMaterial.id) {
//         // Old structure with single searchMaterial
//         setSelectedMaterials([
//           {
//             id: d.searchMaterial.id,
//             name: d.searchMaterial.name,
//             size: d.searchMaterial.size || "",
//             uom: d.searchMaterial.uom || "",
//             pressure: d.searchMaterial.pressure || "",
//             brand: d.searchMaterial.brand || "",
//             sales_description: d.searchMaterial.sales_description || "",
//             purchase_description: d.searchMaterial.purchase_description || "",
//             alias: d.searchMaterial.alias || "",
//             photos: d.searchMaterial.photos || [],
//             qty: 1,
//             hsn: d.searchMaterial.hsn || "",
//             salesPrice: Number(d.searchMaterial.sales_price) || 0,
//             type: d.searchMaterial.type || "",
//           },
//         ]);
//       }
//     }
//   }, [boqIdFromQuery, boqDetailData, allMaterialsData]);

//   // Calculate and set initial metal and plastic discount values from existing materials
//   React.useEffect(() => {
//     if (selectedMaterials.length > 0) {
//       // Find the most common discount value for metal materials
//       const metalMaterials = selectedMaterials.filter(
//         (material) => material.type && isMetalMaterial(material.type)
//       );

//       if (metalMaterials.length > 0) {
//         const metalDiscounts = metalMaterials.map((m) => m.discount || 0);
//         const mostCommonMetalDiscount = metalDiscounts.reduce((a, b) =>
//           metalDiscounts.filter((v) => v === a).length >=
//           metalDiscounts.filter((v) => v === b).length
//             ? a
//             : b
//         );
//         setMetalDiscount(mostCommonMetalDiscount);
//       }

//       // Find the most common discount value for plastic materials
//       const plasticMaterials = selectedMaterials.filter(
//         (material) => material.type && isPlasticMaterial(material.type)
//       );

//       if (plasticMaterials.length > 0) {
//         const plasticDiscounts = plasticMaterials.map((m) => m.discount || 0);
//         const mostCommonPlasticDiscount = plasticDiscounts.reduce((a, b) =>
//           plasticDiscounts.filter((v) => v === a).length >=
//           plasticDiscounts.filter((v) => v === b).length
//             ? a
//             : b
//         );
//         setPlasticDiscount(mostCommonPlasticDiscount);
//       }
//     }
//   }, [selectedMaterials]);

//   // Auto-fill business name if leadIdFromQuery is present and leadsData is loaded
//   React.useEffect(() => {
//     if (leadIdFromQuery && leadsData?.data?.list) {
//       const lead = leadsData.data.list.find((l) => l.id === leadIdFromQuery);
//       if (lead) {
//         setSelectedBusiness(lead.company);
//       }
//     }
//   }, [leadIdFromQuery, leadsData]);

//   // Filter materials based on search (only active materials in search)
//   const filteredMaterials = useMemo(() => {
//     if (!allMaterialsData) return [];
//     const materials = allMaterialsData.data || [];
//     const activeMaterials = materials.filter((item) => item.active);
//     if (!searchQuery) return activeMaterials;
//     const searchResults = activeMaterials.filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     return searchResults;
//   }, [allMaterialsData, searchQuery]);

//   // Lead options
//   const leadOptions = useMemo(() => {
//     if (!leadsData?.data?.list) return [];
//     return leadsData.data.list.map((lead) => ({
//       label: `${lead.company}`,
//       value: lead.id,
//     }));
//   }, [leadsData]);

//   // Handle material selection
//   const handleMaterialSelect = (material: MaterialItem) => {
//     const existingIndex = selectedMaterials.findIndex(
//       (item) => item.id === material.id
//     );

//     if (existingIndex >= 0) {
//       // Update qty if already selected
//       const updatedMaterials = [...selectedMaterials];
//       const currentQuantity = Number(updatedMaterials[existingIndex].qty) || 0;
//       updatedMaterials[existingIndex].qty = currentQuantity + 1;
//       setSelectedMaterials(updatedMaterials);
//     } else {
//       // Add new material
//       // Determine the appropriate discount based on material type and current discount values
//       let materialDiscount = material.discount || 0;
//       if (material.type) {
//         if (isMetalMaterial(material.type)) {
//           materialDiscount = metalDiscount;
//         } else if (isPlasticMaterial(material.type)) {
//           materialDiscount = plasticDiscount;
//         }
//       }

//       const newMaterial: MaterialItem = {
//         id: material.id,
//         name: material.name,
//         size: material.size,
//         uom: material.uom,
//         pressure: material.pressure,
//         brand: material.brand || "",
//         sales_description: material.sales_description,
//         purchase_price: material.purchase_price,
//         purchase_description: material.purchase_description,
//         alias: material.alias,
//         photos: material.photos,
//         qty: 1,
//         hsn: material.hsn || "",
//         salesPrice: material.salesPrice,
//         discount: materialDiscount,
//         type: material.type,
//       };
//       setSelectedMaterials([...selectedMaterials, newMaterial]);
//     }
//   };

//   // Handle qty change
//   const handleQuantityChange = (materialId: string, increment: boolean) => {
//     setSelectedMaterials((prev) =>
//       prev
//         .map((material) => {
//           if (material.id === materialId) {
//             const currentQuantity = Number(material.qty) || 0;
//             const newQuantity = increment
//               ? currentQuantity + 1
//               : Math.max(0, currentQuantity - 1);
//             return { ...material, qty: newQuantity };
//           }
//           return material;
//         })
//         .filter((material) => (Number(material.qty) || 0) > 0)
//     );
//   };

//   // Handle direct qty input
//   const handleQuantityInputChange = (materialId: string, value: number) => {
//     setSelectedMaterials((prev) =>
//       prev
//         .map((material) =>
//           material.id === materialId ? { ...material, qty: value } : material
//         )
//         .filter((material) => (Number(material.qty) || 0) > 0)
//     );
//   };

//   // Handle remove material
//   const handleRemoveMaterial = (materialId: string) => {
//     setSelectedMaterials((prev) =>
//       prev.filter((material) => material.id !== materialId)
//     );
//   };

//   // Handle rate change
//   const handleRateChange = (materialId: string, value: number) => {
//     setSelectedMaterials((prev) =>
//       prev.map((material) =>
//         material.id === materialId
//           ? { ...material, salesPrice: value >= 0 ? value : 0 }
//           : material
//       )
//     );
//   };

//   // Helper function to determine if a material is metal or plastic based on material type
//   const isMetalMaterial = (materialType: string): boolean => {
//     const materialTypeLower = materialType.toLowerCase();
//     const isMetal =
//       materialTypeLower.includes("metal") ||
//       materialTypeLower.includes("steel") ||
//       materialTypeLower.includes("iron") ||
//       materialTypeLower.includes("aluminum") ||
//       materialTypeLower.includes("copper") ||
//       materialTypeLower.includes("brass") ||
//       materialTypeLower.includes("bronze");
//     return isMetal;
//   };

//   const isPlasticMaterial = (materialType: string): boolean => {
//     const materialTypeLower = materialType.toLowerCase();
//     const isPlastic =
//       materialTypeLower.includes("plastic") ||
//       materialTypeLower.includes("hdpe") ||
//       materialTypeLower.includes("pvc") ||
//       materialTypeLower.includes("pe") ||
//       materialTypeLower.includes("pp") ||
//       materialTypeLower.includes("abs") ||
//       materialTypeLower.includes("nylon") ||
//       materialTypeLower.includes("teflon");
//     return isPlastic;
//   };

//   // Handle metal discount change
//   const handleMetalDiscountChange = (value: number) => {
//     setMetalDiscount(value);
//     // Auto-fill discount for all metal materials
//     setSelectedMaterials((prev) => {
//       const updated = prev.map((material) => {
//         if (material.type && isMetalMaterial(material.type)) {
//           return { ...material, discount: value >= 0 ? value : 0 };
//         }
//         return material;
//       });
//       return updated;
//     });
//   };

//   // Handle plastic discount change
//   const handlePlasticDiscountChange = (value: number) => {
//     setPlasticDiscount(value);
//     // Auto-fill discount for all plastic materials
//     setSelectedMaterials((prev) => {
//       const updated = prev.map((material) => {
//         if (material.type && isPlasticMaterial(material.type)) {
//           return { ...material, discount: value >= 0 ? value : 0 };
//         }
//         return material;
//       });
//       return updated;
//     });
//   };

//   // Handle lead selection to auto-fill business name
//   const handleLeadChange = (leadId: string) => {
//     setSelectedLeadId(leadId);
//     setErrors((e) => ({ ...e, leadId: undefined }));
//     const selectedLeadData = leadsData?.data?.list?.find(
//       (lead) => lead.id === leadId
//     );
//     if (selectedLeadData) {
//       setSelectedLead(
//         `${selectedLeadData.first_name} ${selectedLeadData.last_name}`
//       );
//       setSelectedBusiness(selectedLeadData.company);
//       setErrors((e) => ({ ...e, businessName: undefined }));
//     } else {
//       setSelectedLead("");
//       setSelectedBusiness("");
//     }
//   };

//   // Get minimum date based on operation type
//   const getMinDate = () => {
//     if (
//       boqIdFromQuery &&
//       boqDetailData &&
//       "data" in boqDetailData &&
//       boqDetailData.data?.data?.created_at
//     ) {
//       // For update: minimum date is the original creation date
//       return new Date(boqDetailData.data.data.created_at)
//         .toISOString()
//         .split("T")[0];
//     } else {
//       // For create: minimum date is today
//       return new Date().toISOString().split("T")[0];
//     }
//   };

//   // Handle create/update BOQ
//   const handleCreateBOQ = () => {
//     const nextErrors: {
//       leadId?: string;
//       businessName?: string;
//       date?: string;
//     } = {};
//     if (!selectedLead) nextErrors.leadId = "Please select a lead";
//     if (!selectedBusiness)
//       nextErrors.businessName = "Business name is required";
//     if (!selectedDate) nextErrors.date = "Date is required";
//     setErrors(nextErrors);
//     if (Object.keys(nextErrors).length > 0) {
//       return;
//     }
//     if (selectedMaterials.length === 0) {
//       toast.error("Please select at least one material");
//       return;
//     }

//     // Create a simplified payload that matches the backend expectations
//     const boqPayload = {
//       leadId: selectedLeadId,
//       businessName: selectedBusiness,
//       date: selectedDate,
//       materials: selectedMaterials.map((material) => ({
//         id: material.id,
//         name: material.name,
//         size: material.size,
//         uom: material.uom,
//         pressure: material.pressure,
//         brand: material.brand || "",
//         photos: material.photos,
//         qty: material.qty,
//         hsn: material.hsn,
//         discount: Number(material.discount) || 0,
//         rate: material.salesPrice,
//       })),
//     };

//     if (boqIdFromQuery) {
//       // Update existing BOQ
//       // @ts-expect-error - Backend expects complex payload but we're sending simplified version
//       updateBoq({ id: boqIdFromQuery, payload: boqPayload });
//     } else {
//       // Create new BOQ
//       // @ts-expect-error - Backend expects complex payload but we're sending simplified version
//       onCreateBoq(boqPayload);
//     }
//   };

//   // Handle download BOQ and redirect
//   const handleDownloadBOQ = () => {
//     if (createdBoqId) {
//       // Download newly created BOQ
//       downloadBoqInvoicePdf(createdBoqId);
//     } else if (boqIdFromQuery) {
//       // Download existing BOQ
//       downloadBoqInvoicePdf(boqIdFromQuery);
//     } else {
//       // For newly created BOQ, we need to wait for the response
//       toast.error("Please save the proposal first before downloading");
//     }
//   };

//   // Handle modal close and redirect
//   const handleModalClose = () => {
//     setShowSuccessModal(false);
//     router.push("/admin/material-management/proposal");
//   };

//   return (
//     <section className="flex flex-col gap-6  border  border-gray-300 rounded-lg  bg-white px-4  py-4 ">
//       <Breadcrumb />
//       <h1 className="text-2xl  font-medium">Edit Proposal</h1>

//       {/* Filters */}
//       <BOQFilters
//         businessNameOptions={leadOptions}
//         selectedLead={selectedLead}
//         selectedBusiness={selectedBusiness}
//         selectedLeadId={selectedLeadId}
//         selectedDate={selectedDate}
//         onLeadChange={handleLeadChange}
//         onDateChange={(date) => setSelectedDate(date)}
//         minDate={getMinDate()}
//         leadError={errors.leadId}
//         businessError={errors.businessName}
//         dateError={errors.date}
//       />
//       <div className="flex gap-4 items-center">
//         <BOQSearch
//           searchQuery={searchQuery}
//           filteredMaterials={filteredMaterials}
//           onSearchChange={setSearchQuery}
//           onMaterialSelect={(material) => {
//             handleMaterialSelect(material);
//             setSearchQuery(""); // Clear search after selection
//           }}
//         />

//         {/* Global Discount Fields */}
//         <div className="flex gap-4 items-end">
//           <NumberInput
//             label="Metal Discount"
//             value={metalDiscount}
//             onChange={handleMetalDiscountChange}
//             min={0}
//             max={100}
//             placeholder="0"
//           />
//           <NumberInput
//             label="Plastic Discount"
//             value={plasticDiscount}
//             onChange={handlePlasticDiscountChange}
//             min={0}
//             max={100}
//             placeholder="0"
//           />
//         </div>
//       </div>
//       {/* Search Bar */}

//       {/* Proposal InventoryList Table */}
//       <ProposalMaterialTable
//         selectedMaterials={selectedMaterials}
//         onQuantityChange={handleQuantityChange}
//         onQuantityInputChange={handleQuantityInputChange}
//         onPhotoClick={(src) => setPhotoModal({ open: true, src })}
//         onRemoveMaterial={handleRemoveMaterial}
//         onDiscountChange={(materialId, value) => {
//           setSelectedMaterials((prev) =>
//             prev.map((material) =>
//               material.id === materialId
//                 ? { ...material, discount: value >= 0 ? value : 0 }
//                 : material
//             )
//           );
//         }}
//         onRateChange={handleRateChange}
//       />

//       {/* Custom Photo Modal */}
//       <BOQPhotoModal
//         isOpen={photoModal.open}
//         src={photoModal.src}
//         onClose={() => setPhotoModal({ open: false, src: "" })}
//       />

//       {/* Create/Update BOQ Button */}
//       <BOQActions
//         isEditing={!!boqIdFromQuery}
//         isCreating={isCreating}
//         isUpdating={isUpdating}
//         hasMaterials={selectedMaterials.length > 0}
//         onCreateBOQ={handleCreateBOQ}
//         title="Proposal"
//       />
//       {/* Only show success modal for newly created proposals, not for updates */}
//       {!boqIdFromQuery && (
//         <ProposalSuccessModal
//           isOpen={showSuccessModal}
//           onClose={handleModalClose}
//           isDownloading={isDownloading}
//           onDownload={handleDownloadBOQ}
//           title="Proposal Ready"
//         />
//       )}
//     </section>
//   );
// }

import React from "react";

export const EditProposal = () => {
  return <>EditProposal</>;
};
