"use client";

/**
 * StaffManagement Component
 *
 * This is the main component for managing staff records.
 * It includes:
 * - A header for the section
 * - Analytical summary cards
 * - A staff list table with search, filter, export, and add staff functionality
 * - A modal for uploading staff data manually, via Excel, or from external sources
 *
 * Features:
 * - Dropzone integration for drag & drop uploads
 * - ModalOverlay for adding new staff
 * - Responsive layout for cards and table
 */

import { ModalOverlay } from "@/components";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { analyticalCards, ImageRegistry } from "@/constants";
import { AnalyticalCard } from "../analytical-card";
import { StaffListTable } from "./component";

export function StaffManagement() {
    const [isAddLeadModalOpen, setIsAddStaffModalOpen] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("Dropped files:", acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
            <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
                <h1 className="text-xl 2xl:text-[1.25vw] font-medium">Staff Management</h1>
            </div>

            <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 2xl:gap-[1vw] flex-wrap px-4 2xl:px-[1vw]">
                    {analyticalCards.slice(0, 3).map((card, index) => (
                        <AnalyticalCard key={index} data={card} />
                    ))}
                </div>

                <StaffListTable setAddStaffModalOpen={setIsAddStaffModalOpen} />
            </div>

            <ModalOverlay
                isOpen={isAddLeadModalOpen}
                onClose={() => setIsAddStaffModalOpen(false)}
                modalClassName="w-[45rem] h-[35rem]"
            >
                <div className="bg-[#F8F8F8]">
                    <div className="space-y-6 p-4 bg-white ">
                        <h3 className="text-sm font-semibold text-start">- Back to Leads</h3>

                        <div className="border-2 p-4 w-full space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl">
                                {/* Manual Upload */}
                                <div className="border-2 border-dashed rounded-xl p-4 text-center hover:shadow transition bg-[#F8F8F8]">
                                    <div className="w-[15rem] h-[6rem] pb-4">
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
                                        className="text-purple-600 font-medium cursor-pointer"
                                    >
                                        Click to upload
                                    </label>
                                    <p className="text-sm text-gray-500">One Lead at a time</p>
                                </div>

                                {/* Excel Upload with Dropzone */}
                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition bg-[#F8F8F8] ${
                                        isDragActive ? "bg-purple-100" : "hover:shadow"
                                    }`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="w-[15rem] h-[6rem] pb-4">
                                        <Image
                                            src={ImageRegistry.excel}
                                            alt="excel"
                                            width={200}
                                            height={120}
                                            className="mx-auto mb-4 object-contain w-full h-full"
                                        />
                                    </div>
                                    <p className="text-purple-600 font-medium">Click to upload</p>
                                    <p className="text-sm text-gray-500">or drag and drop</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        .XLS, .XLSX (max. 5MB)
                                    </p>
                                </div>
                            </div>

                            {/* External Upload */}
                            <div className="md:col-span-2 border-2 border-dashed rounded-xl p-2 text-center bg-[#F8F8F8] flex justify-center items-center flex-col">
                                <div className="w-[18rem] h-[8rem] pb-4">
                                    <Image
                                        src={ImageRegistry.external}
                                        alt="external"
                                        width={200}
                                        height={120}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <input type="file" hidden id="external-upload" />
                                <label
                                    htmlFor="external-upload"
                                    className="text-purple-600 font-medium cursor-pointer"
                                >
                                    Click to upload
                                </label>
                                <p className="text-sm text-gray-500">or drag and drop</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    SVG, PNG, JPG or GIF (max. 800×400px)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalOverlay>
        </section>
    );
}
