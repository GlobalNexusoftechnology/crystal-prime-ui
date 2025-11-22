"use client";
// import React, { useState } from "react";
// import {
//   SearchBar,
//   DeleteModal,
//   ModalOverlay,
//   Dropdown,
//   Button,
//   RejectionModal,
//   Checkbox,
// } from "@/components";
// import { Breadcrumb } from "@/features";
// import { useAllClientQuery, useGenerateProposalPdfMutation } from "@/services";
// import { usePermission } from "@/utils/hooks";
// import { ProposalListTable } from "./components";
// import { EModule, EAction } from "@/constants";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export function Proposal() {
//   const { allBoqData = [], refetchAllBoq } = useAllBoqQuery();
//   const [search, setSearch] = useState("");
//   const [deleteConfirm, setDeleteConfirm] = useState<IAllBoqList | null>(null);
//   const [approveModal, setApproveModal] = useState<{ id: string } | null>(null);
//   const [rejectionModal, setRejectionModal] = useState<{ id: string } | null>(
//     null
//   );
//   const [selectedClientId, setSelectedClientId] = useState<string>("");
//   const [isAddingNewClient, setIsAddingNewClient] = useState(false); // ✅ new state

//   const { allClientData } = useAllClientQuery();
//   const { hasPermission } = usePermission();
//   const router = useRouter();

//   const clientOptions = (allClientData?.data?.list || [])?.map((client) => ({
//     label: client.name,
//     value: client.id,
//   }));

//   // ✅ Update BOQ mutation for status
//   const { onUpdateBOQProposalStatus, isPending: isUpdatingStatus } =
//     useUpdateBOQProposalStatusMutation({
//       onSuccessCallback: () => {
//         toast.success("BOQ status updated successfully");
//         refetchAllBoq();
//       },
//       onErrorCallback: (err) => {
//         toast.error(err?.message || "Failed to update BOQ status");
//       },
//     });

//   // ✅ Delete BOQ mutation
//   const { onDeleteBoq, isPending: isDeleting } = useDeleteBoqMutation({
//     onSuccessCallback: () => {
//       toast.success("BOQ deleted successfully");
//       setDeleteConfirm(null);
//       refetchAllBoq();
//     },
//     onErrorCallback: (err) => {
//       toast.error(err?.message || "Failed to delete BOQ");
//     },
//   });

//   const { generateProposalPdf } = useGenerateProposalPdfMutation({
//     onSuccessCallback: (pdfBlob: Blob) => {
//       const blobUrl = window.URL.createObjectURL(pdfBlob);
//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = `generate-proposal.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
//       toast.success("Proposal Generated successfully");
//     },
//     onErrorCallback: (err) => {
//       toast.error(err?.message || "Failed to generate proposal");
//     },
//   });

//   const { onUpdateBOQStatus } = useUpdateBOQStatusMutation({
//     onSuccessCallback: () => {},
//     onErrorCallback: (err) => {
//       toast.error(err?.message || "Failed to update BOQ status");
//     },
//   });

//   const { onCreateBoq } = useCreateBoqMutation({
//     onSuccessCallback: (response) => {
//       const newId = response?.data?.id;
//       if (newId) {
//         onUpdateBOQProposalStatus({
//           id: newId,
//           payload: { status: ProposalStatus.PENDING },
//         });
//         onUpdateBOQStatus({
//           id: newId,
//           payload: { status: BoqStatus.PROPOSAL_READY },
//         });
//       }

//       toast.success("Proposal duplicated successfully");
//       refetchAllBoq();
//     },
//     onErrorCallback: (err) => {
//       toast.error(err?.message || "Failed to duplicate proposal");
//     },
//   });

//   const canEditBoq = hasPermission(EModule.BOQ, EAction.EDIT);
//   const canDeleteBoq = hasPermission(EModule.BOQ, EAction.DELETE);

//   const filteredData = React.useMemo(() => {
//     return allBoqData.filter(
//       (item: IAllBoqList) =>
//         item.status === BoqStatus.PROPOSAL_READY &&
//         ((item.leadName || "").toLowerCase().includes(search.toLowerCase()) ||
//           (item.businessName || "")
//             .toLowerCase()
//             .includes(search.toLowerCase()) ||
//           (item.lead?.lead_code || "")
//             .toLowerCase()
//             .includes(search.toLowerCase()))
//     );
//   }, [allBoqData, search]);

//   const handleEdit = React.useCallback(
//     (proposal: IAllBoqList) => {
//       router.push(
//         `/admin/material-management/proposal/edit?proposalId=${proposal.id}`
//       );
//     },
//     [router]
//   );

//   const handleDelete = React.useCallback((boq: IAllBoqList) => {
//     setDeleteConfirm(boq);
//   }, []);

//   const confirmDelete = React.useCallback(() => {
//     if (deleteConfirm) {
//       onDeleteBoq(deleteConfirm.id);
//     }
//   }, [deleteConfirm, onDeleteBoq]);

//   const cancelDelete = React.useCallback(() => {
//     setDeleteConfirm(null);
//   }, []);

//   const handleDuplicateProposal = React.useCallback(
//     async (proposal: IAllBoqList) => {
//       try {
//         const originalProposal = allBoqData.find(
//           (boq) => boq.id === proposal.id
//         );

//         if (!originalProposal) {
//           toast.error("Original proposal not found");
//           return;
//         }

//         const duplicatePayload = {
//           leadId: originalProposal.lead.id,
//           businessName: originalProposal.businessName,
//           date: new Date().toISOString().split("T")[0],
//           proposalStatus: ProposalStatus.PENDING,
//           status: BoqStatus.PROPOSAL_READY,
//           materials:
//             originalProposal.items?.map((item) => ({
//               id: item.materialId,
//               name: item.materialName,
//               size: item.size || "",
//               uom: item.uom || "",
//               pressure: item.pressure || "",
//               brand: item.brand || "",
//               photos: item.photos || [],
//               qty: item.qty,
//               hsn: item.hsn || "",
//               discount: Number(item.discount) || 0,
//               rate: Number(item.rate) || 0,
//             })) || [],
//         };

//         // @ts-expect-error simplified payload for backend
//         onCreateBoq(duplicatePayload);
//       } catch {
//         toast.error("Failed to duplicate proposal");
//       }
//     },
//     [allBoqData, onCreateBoq]
//   );

//   const actions = React.useMemo(() => {
//     const actionButtons = [];

//     if (canEditBoq) {
//       actionButtons.push({
//         label: "Edit",
//         onClick: handleEdit,
//         className: "text-green-600",
//       });
//     }
//     actionButtons.push({
//       label: "Duplicate Proposal",
//       onClick: handleDuplicateProposal,
//       className: "text-blue-500",
//     });
//     actionButtons.push({
//       label: "Generate Proposal",
//       onClick: (row: IAllBoqList) => {
//         generateProposalPdf(row.id);
//       },
//       className: "text-blue-500",
//     });

//     if (canDeleteBoq) {
//       actionButtons.push({
//         label: "Delete",
//         onClick: handleDelete,
//         className: "text-red-600",
//       });
//     }

//     return actionButtons;
//   }, [
//     canEditBoq,
//     generateProposalPdf,
//     handleDuplicateProposal,
//     canDeleteBoq,
//     handleEdit,
//     handleDelete,
//   ]);

//   const statusLabelMap: Record<ProposalStatus, string> = {
//     [ProposalStatus.PENDING]: "Pending",
//     [ProposalStatus.GENERATED]: "Generated",
//     [ProposalStatus.SENT]: "Sent",
//     [ProposalStatus.APPROVED]: "Approved",
//     [ProposalStatus.REJECTED]: "Rejected",
//   };

//   const statusOptions = Object.values(ProposalStatus).map((status) => ({
//     label: statusLabelMap[status as ProposalStatus] || status,
//     value: status,
//   }));

//   const handleStatusChange = (id: string, newStatus: string) => {
//     if (newStatus === ProposalStatus.APPROVED) {
//       setApproveModal({ id });
//       return;
//     }
//     if (newStatus === ProposalStatus.REJECTED) {
//       setRejectionModal({ id });
//       return;
//     }
//     const boq = allBoqData.find((b) => b.id === id);
//     if (!boq) {
//       toast.error("BOQ not found");
//       return;
//     }
//     onUpdateBOQProposalStatus({
//       id,
//       payload: { status: newStatus as ProposalStatus },
//     });
//   };

//   const handleRejectionConfirm = (remark: string) => {
//     if (!rejectionModal) return;

//     onUpdateBOQProposalStatus({
//       id: rejectionModal.id,
//       payload: {
//         status: ProposalStatus.REJECTED,
//         remark: remark,
//       },
//     });
//     setRejectionModal(null);
//   };

//   return (
//     <section className="flex flex-col gap-4 border border-gray-300 rounded-lg bg-white px-2 sm:px-6 py-2 sm:py-4">
//       <Breadcrumb />
//       <h1 className="text-2xl font-medium">Proposal List</h1>
//       <SearchBar
//         placeholder="Search Client"
//         onSearch={setSearch}
//         value={search}
//         bgColor="white"
//         width="w-full md:w-[25vw]"
//       />

//       <ProposalListTable
//         data={filteredData}
//         actions={actions}
//         statusOptions={statusOptions}
//         onStatusChange={handleStatusChange}
//         isUpdatingStatus={isUpdatingStatus}
//       />

//       {/* ✅ Approve Modal */}
//       {approveModal && (
//         <ModalOverlay
//           isOpen={!!approveModal}
//           onClose={() => {
//             setApproveModal(null);
//             setSelectedClientId("");
//             setIsAddingNewClient(false);
//           }}
//           modalTitle="Approve Proposal"
//           modalClassName="w-full md:w-[30vw]"
//         >
//           <div className="flex flex-col gap-4 border p-4 rounded-md">
//             <div className="flex items-start">
//               <Checkbox
//                 label="Do you want to add a new client?"
//                 checked={isAddingNewClient}
//                 onChange={(e) => setIsAddingNewClient(e.target.checked)}
//                 labelClassName="text-sm"
//               />
//             </div>

//             {!isAddingNewClient && (
//               <Dropdown
//                 label="Select a client to approve this BOQ:"
//                 options={clientOptions}
//                 value={selectedClientId}
//                 onChange={setSelectedClientId}
//               />
//             )}

//             <div className="flex gap-2 justify-end">
//               <Button
//                 title="Cancel"
//                 variant="primary-outline"
//                 onClick={() => {
//                   setApproveModal(null);
//                   setSelectedClientId("");
//                   setIsAddingNewClient(false);
//                 }}
//               />

//               <Button
//                 type="submit"
//                 disabled={
//                   (!selectedClientId && !isAddingNewClient) || isUpdatingStatus
//                 }
//                 onClick={() => {
//                   if (!isAddingNewClient && !selectedClientId) {
//                     toast.error("Please select a client");
//                     return;
//                   }

//                   onUpdateBOQProposalStatus({
//                     id: approveModal.id,
//                     payload: {
//                       status: ProposalStatus.APPROVED,
//                       ...(isAddingNewClient
//                         ? { createNewClient: true }
//                         : { clientId: selectedClientId }),
//                     },
//                   });

//                   setApproveModal(null);
//                   setSelectedClientId("");
//                   setIsAddingNewClient(false);
//                 }}
//                 title={isUpdatingStatus ? "Approving..." : "Approve"}
//               />
//             </div>
//           </div>
//         </ModalOverlay>
//       )}

//       <DeleteModal
//         isOpen={!!deleteConfirm}
//         onClose={cancelDelete}
//         onConfirm={confirmDelete}
//         title="Delete BOQ"
//         message="Are you sure you want to delete this BOQ?"
//         itemName={deleteConfirm?.businessName || ""}
//         isLoading={isDeleting}
//       />

//       <RejectionModal
//         isOpen={!!rejectionModal}
//         onClose={() => setRejectionModal(null)}
//         onConfirm={handleRejectionConfirm}
//         isLoading={isUpdatingStatus}
//       />
//     </section>
//   );
// }

import React from "react";

export const Proposal = () => {
  return <>Proposal</>;
};
