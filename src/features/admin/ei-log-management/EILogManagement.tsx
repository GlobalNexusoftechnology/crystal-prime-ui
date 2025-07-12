"use client";

import { ModalOverlay, UploadDocument } from "@/components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageRegistry } from "@/constants";
import {
  useAllEILogsQuery,
  useUploadEILogFromExcelMutation,
} from "@/services";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { IApiError } from "@/utils";
import { EILogsListTable } from "../ei-logs-list-table";
import { AddEILogModal, ImportExcel } from "./components";

export function EILogManagement() {
  const [isAddEILogModalOpen, setAddEILogModalOpen] = useState(false);
  const { eiLogsRefetch } = useAllEILogsQuery();

  const { onUploadEILogFromExcel, isPending } = useUploadEILogFromExcelMutation({
    onSuccessCallback: (response) => {
      toast.success(response?.message);
      eiLogsRefetch();
      setAddEILogModalOpen(false);
    },
    onErrorCallback: (error: IApiError) => {
      toast.error(error?.message);
      formik.resetForm();
    },
  });

  const [activeStep, setActiveStep] = useState<"initial" | "addForm" | "excel">(
    "initial"
  );

  const handleOpenForm = (value: string) => {
    if (value === "addForm") {
      setActiveStep("addForm");
      setAddEILogModalOpen(false);
    } else if (value === "excel") {
      setActiveStep("excel");
    } else {
      setActiveStep("initial");
      setAddEILogModalOpen(false);
    }
  };

  const handleAddFormClose = () => {
    setActiveStep("initial");
  };

  const formik = useFormik({
    initialValues: {
      file: null as File | null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (values?.file) {
        const formData = new FormData();
        formData.append("file", values?.file);
        try {
          await onUploadEILogFromExcel(formData);
          resetForm();
        } catch (err) {
          console.error("Upload error:", err);
        }
      }
    },
  });

  useEffect(() => {
    if (formik?.values?.file) {
      formik.submitForm();
    }
  }, [formik, formik?.values?.file]);

  return (
    <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <h1 className="text-xl 2xl:text-[1.25vw] ">EI Log Management</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw]">
        <EILogsListTable setAddEILogModalOpen={setAddEILogModalOpen} />
      </div>

      <ModalOverlay
        modalTitle="Back to EI Logs"
        isOpen={isAddEILogModalOpen}
        onClose={() => handleOpenForm("")}
        modalClassName="w-[39rem] 2xl:w-[38vw]"
      >
        <div className="bg-white border border-gray-300 rounded-lg overflow-y-auto md:overflow-visible">
          <div className="space-y-6 p-4 2xl:p-[1vw]">
            {activeStep === "initial" && (
              <div className=" w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw] bg-white rounded-xl 2xl:rounded-[0.75vw]">
                  {/* Manual Upload */}
                  <div>
                    <p className="text-[0.9rem] 2xl:text-[0.875vw] pb-2 2xl:pb-[1vw] pl-[0.3vw] 2xl:pl-[0.5vw]">
                      Add EI Log Manually
                    </p>
                    <div
                      className="flex flex-col items-center justify-center border-2 border-dashed 2xl:border-[0.1vw] 2xl:border-dashed rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] 2xl:h-[15vw] text-center hover:shadow transition bg-customGray"
                      onClick={() => handleOpenForm("addForm")}
                    >
                      <div className="w-[16rem] h-[7rem] 2xl:w-[17vw] 2xl:h-[8vw] pb-4 2xl:pb-[1vw]">
                        <Image
                          src={ImageRegistry.onelead}
                          alt="manual"
                          width={200}
                          height={120}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <p className="text-purple-600  cursor-pointer text-[0.9rem] 2xl:text-[0.875vw] 2xl:pb-[0.5vw]">
                        Click to add
                      </p>
                      <p className="text-[0.9rem] 2xl:text-[0.875vw] text-gray-500">
                        One EI Log at a time
                      </p>
                    </div>
                  </div>

                  {/* Excel Upload */}
                  <div>
                    <p className="text-[0.9rem] 2xl:text-[0.875vw] pb-2 2xl:pb-[1vw] pl-[0.3vw] 2xl:pl-[0.5vw]">
                      Import From Excel
                    </p>
                    <div
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] 2xl:h-[15vw] text-center cursor-pointer transition bg-customGray ${
                        isPending ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <UploadDocument
                        label=""
                        className="absolute top-0 left-0 opacity-0 w-full h-full"
                        onChange={(files: FileList | null) => {
                          console.log("On Change happening", files);
                          if (files && files[0]) {
                            formik.setFieldValue("file", files[0]);
                            formik.submitForm();
                          }
                        }}
                        error={
                          formik?.touched?.file ? formik?.errors?.file : undefined
                        }
                      />

                      <div className="w-[16rem] h-[6.8rem] 2xl:w-[17vw] 2xl:h-[8vw] pb-4 2xl:pb-[1vw]">
                        <Image
                          src={ImageRegistry.excel}
                          alt="excel"
                          width={200}
                          height={120}
                          className="object-contain w-full h-full"
                        />
                      </div>

                      <div className="flex md:flex-row flx-col gap-2 2xl:gap-[0.5vw] 2xl:pb-[0.3vw]">
                        {" "}
                        <p className="text-purple-600 text-[0.9rem] 2xl:text-[0.875vw] whitespace-nowrap">
                          {isPending ? "Uploading..." : "Click to upload"}
                        </p>
                        <p className="text-[0.9rem] 2xl:text-[0.875vw] text-gray-500 whitespace-nowrap ">
                          or drag and drop
                        </p>
                      </div>
                      <p className="text-[0.9rem] 2xl:text-[0.875vw] text-gray-400 mt-1 2xl:mt-[0.25vw]">
                        .XLS, .XLSX (max. 5MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === "excel" && (
              <ImportExcel setAddEILogModalOpen={setAddEILogModalOpen} />
            )}
          </div>
        </div>
      </ModalOverlay>
      {activeStep === "addForm" && (
        <AddEILogModal
          isOpen={activeStep === "addForm"}
          onClose={handleAddFormClose}
          eiLogsRefetch={eiLogsRefetch}
          onAddEILogSuccessCallback={eiLogsRefetch}
        />
      )}
    </section>
  );
} 