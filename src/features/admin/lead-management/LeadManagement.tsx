"use client";

import { ModalOverlay } from "@/components";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LeadsListTable } from "../leads-list-table";
import Image from "next/image";
import { AnalyticalCardData, ImageRegistry } from "@/constants";
import { AnalyticalCard } from "../analytical-card";
import { ImportExcel, AddLeadModal } from "./components";
import { useAllLeadsListQuery } from "@/services";
import { AnalyticalCardIcon } from "@/features";

export function LeadManagement() {
  const [isAddLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const { data: allLeadList } = useAllLeadsListQuery();

  const [activeStep, setActiveStep] = useState<"initial" | "addForm" | "excel">(
    "initial"
  );

  const analyticalCards: AnalyticalCardData[] = [
    {
      count: `${allLeadList?.data.stats.totalLeads}`,
      title: "Total Leads",
      subtitle: "All leads in the system",
      icon: <AnalyticalCardIcon />,
    },
    {
      count: `${allLeadList?.data.stats.profileSent}`,
      title: "Profile Sent",
      subtitle: "Profiles sent this week",
      icon: <AnalyticalCardIcon />,
    },
    {
      count: `${allLeadList?.data.stats.businessDone}`,
      title: "Business Done",
      subtitle: "Leads business done",
      icon: <AnalyticalCardIcon />,
    },
    {
      count: `${allLeadList?.data.stats.notInterested}`,
      title: "Not Interested",
      subtitle: "Leads not interested",
      icon: <AnalyticalCardIcon />,
    },
    {
      count: `${allLeadList?.data.stats.assignedToMe}`,
      title: "Assigned To Me",
      subtitle: "Leads assigned to me",
      icon: <AnalyticalCardIcon />,
    },
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Dropped files:", acceptedFiles);
  }, []);

  const handleOpenForm = (value: string) => {
    if (value === "addForm") {
      setActiveStep("addForm");
      setAddLeadModalOpen(false);
    } else if (value === "excel") {
      setActiveStep("excel");
    } else {
      setActiveStep("initial");
      setAddLeadModalOpen(false);
    }
  };

  const handleAddFormClose = () => {
    setActiveStep("initial");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <h1 className="text-xl 2xl:text-[1.25vw] font-medium">
          Lead Management
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 2xl:gap-[1vw] flex-wrap px-4 2xl:px-[1vw]">
          {analyticalCards.map((card, index) => (
            <AnalyticalCard key={index} data={card} />
          ))}
        </div>
        <LeadsListTable setAddLeadModalOpen={setAddLeadModalOpen} />
      </div>

      <ModalOverlay
        modalTitle="Back to Leads"
        isOpen={isAddLeadModalOpen}
        onClose={() => handleOpenForm("")}
        modalClassName="w-[35rem] 2xl:w-[36vw]"
      >
        <div className="bg-white border border-gray-300 rounded-lg overflow-y-auto md:overflow-visible">
          <div className="space-y-6 p-4">
            {activeStep === "initial" && (
              <div className=" w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl">
                  {/* Manual Upload */}
                  <div>
                    <p className="text-[1rem] 2xl:text-[1vw]  pb-2">
                      Add Lead Manually
                    </p>
                    <div
                      className="border-2 border-dashed rounded-xl p-4 2xl:h-[15vw] text-center hover:shadow transition bg-customGray"
                      onClick={() => handleOpenForm("addForm")}
                    >
                      <div className="w-[15rem] h-[6rem] 2xl:w-[15vw] 2xl:h-[6vw] pb-4">
                        <Image
                          src={ImageRegistry.onelead}
                          alt="manual"
                          width={200}
                          height={120}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <input type="file" hidden id="manual-upload" />
                      <label
                        htmlFor="manual-upload"
                        className="text-purple-600 font-medium cursor-pointer text-[1rem] 2xl:text-[1vw]"
                      >
                        Click to add
                      </label>
                      <p className="text-[1rem] 2xl:text-[1vw] text-gray-500">
                        One Lead at a time
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[1rem] 2xl:text-[1vw] pb-2 ">
                      Import From Excel
                    </p>
                    {/* Excel Upload */}
                    <div
                      {...getRootProps()}
                      onClick={() => handleOpenForm("excel")}
                      className={`border-2 border-dashed rounded-xl p-4 2xl:h-[15vw] text-center cursor-pointer transition bg-customGray ${
                        isDragActive ? "bg-purple-100" : "hover:shadow"
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className=" h-[6rem] sm:h-[4.5rem] 2xl:w-[15vw] 2xl:h-[6vw] pb-4">
                        <Image
                          src={ImageRegistry.excel}
                          alt="excel"
                          width={200}
                          height={120}
                          className="mx-auto mb-4 object-contain w-full h-full"
                        />
                      </div>
                      <p className="text-purple-600 text-[1rem] 2xl:text-[1vw] font-medium">
                        Click to upload
                      </p>
                      <p className="text-[1rem] 2xl:text-[1vw] text-gray-500">
                        or drag and drop
                      </p>
                      <p className="text-[1rem] 2xl:text-[1vw] text-gray-400 mt-1">
                        .XLS, .XLSX (max. 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeStep === "excel" && (
              <ImportExcel setAddLeadModalOpen={setAddLeadModalOpen} />
            )}
          </div>
        </div>
      </ModalOverlay>

      {activeStep === "addForm" && (
        <AddLeadModal setAddLeadModalOpen={handleAddFormClose} />
      )}
    </section>
  );
}
