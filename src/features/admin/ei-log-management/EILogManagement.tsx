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
    <section className="flex flex-col gap-6 md:gap-8  border border-gray-300 rounded-lg  bg-white p-4 ">
      <div className="flex flex-col gap-2  px-4 ">
        <h1 className="text-xl  ">EI Log Management</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 ">
        <EILogsListTable setAddEILogModalOpen={setAddEILogModalOpen} />
      </div>

      <ModalOverlay
        modalTitle="Back to EI Logs"
        isOpen={isAddEILogModalOpen}
        onClose={() => handleOpenForm("")}
        modalClassName="w-[39rem] "
      >
        <div className="bg-white border border-gray-300 rounded-lg overflow-y-auto md:overflow-visible">
          <div className="space-y-6 p-4 ">
            {activeStep === "initial" && (
              <div className=" w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4  bg-white rounded-xl ">
                  {/* Manual Upload */}
                  <div>
                    <p className="text-[0.9rem]  pb-2  pl-[0.3vw] ">
                      Add EI Log Manually
                    </p>
                    <div
                      className="flex flex-col items-center justify-center border-2 border-dashed   rounded-xl  p-4   text-center hover:shadow transition bg-customGray"
                      onClick={() => handleOpenForm("addForm")}
                    >
                      <div className="w-[16rem] h-[7rem]   pb-4 ">
                        <Image
                          src={ImageRegistry.onelead}
                          alt="manual"
                          width={200}
                          height={120}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <p className="text-purple-600  cursor-pointer text-[0.9rem]  ">
                        Click to add
                      </p>
                      <p className="text-[0.9rem]  text-gray-500">
                        One EI Log at a time
                      </p>
                    </div>
                  </div>

                  {/* Excel Upload */}
                  <div>
                    <p className="text-[0.9rem]  pb-2  pl-[0.3vw] ">
                      Import From Excel
                    </p>
                    <div
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl  p-4   text-center cursor-pointer transition bg-customGray ${
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

                      <div className="w-[16rem] h-[6.8rem]   pb-4 ">
                        <Image
                          src={ImageRegistry.excel}
                          alt="excel"
                          width={200}
                          height={120}
                          className="object-contain w-full h-full"
                        />
                      </div>

                      <div className="flex md:flex-row flx-col gap-2  ">
                        <p className="text-purple-600 text-[0.9rem]  whitespace-nowrap">
                          {isPending ? "Uploading..." : "Click to upload"}
                        </p>
                        <p className="text-[0.9rem]  text-gray-500 whitespace-nowrap ">
                          or drag and drop
                        </p>
                      </div>
                      <p className="text-[0.9rem]  text-gray-400 mt-1 ">
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
          onAddEILogSuccessCallback={eiLogsRefetch}
        />
      )}
    </section>
  );
} 