import { InputField, Dropdown, DatePicker } from "@/components";
// import Image from "next/image";
import React from "react";
import { FormikProps } from "formik";
import { IAddProjectFormValues } from "../../AddProject";

const projectTypeOptions = [
    { label: "Website", value: "website" },
    { label: "Mobile App", value: "mobile_app" },
    { label: "CRM", value: "crm" },
];
const clientOptions = [
    { label: "Client A", value: "client_a" },
    { label: "Client B", value: "client_b" },
];
const renewalTypeOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
];

export function Step1BasicInfo({ values, errors, touched, handleChange, handleBlur, setFieldValue }: FormikProps<IAddProjectFormValues>) {
    const isMilestoneSelected = values.milestoneOption === 'milestone';
    const isTemplateSelected = values.milestoneOption === 'template';

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw]">
                <InputField label="Project Name" name="name" placeholder="Enter Project Name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={touched.name && typeof errors.name === 'string' ? errors.name : undefined} className="2xl:text-[1vw]" />
                <Dropdown label="Type Of Project" options={projectTypeOptions} value={values.projectType} onChange={val => setFieldValue("projectType", val)} error={touched.projectType && typeof errors.projectType === 'string' ? errors.projectType : undefined} dropdownWidth="w-full" />
                <Dropdown label="Client" options={clientOptions} value={values.client} onChange={val => setFieldValue("client", val)} error={touched.client && typeof errors.client === 'string' ? errors.client : undefined} dropdownWidth="w-full" />
            </div>
            <InputField label="Project Description" name="description" placeholder="Enter Description" value={values.description} onChange={handleChange} onBlur={handleBlur} error={touched.description && typeof errors.description === 'string' ? errors.description : undefined} type="textarea" className="2xl:text-[1vw]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw]">
                <DatePicker label="Estimated Start Date" value={values.estimatedStart} onChange={val => setFieldValue("estimatedStart", val)} placeholder="Estimated Start Date" error={touched.estimatedStart && typeof errors.estimatedStart === 'string' ? errors.estimatedStart : undefined} />
                <DatePicker label="Estimated End Date" value={values.estimatedEnd} onChange={val => setFieldValue("estimatedEnd", val)} placeholder="Estimated End Date" error={touched.estimatedEnd && typeof errors.estimatedEnd === 'string' ? errors.estimatedEnd : undefined} />
                <InputField label="Budget" name="budget" placeholder="Enter Budget" value={values.budget} onChange={handleChange} onBlur={handleBlur} error={touched.budget && typeof errors.budget === 'string' ? errors.budget : undefined} type="number" className="2xl:text-[1vw]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw]">
                <InputField label="Estimated Cost" name="estimatedCost" placeholder="Estimated Cost" value={values.estimatedCost} onChange={handleChange} onBlur={handleBlur} error={touched.estimatedCost && typeof errors.estimatedCost === 'string' ? errors.estimatedCost : undefined} type="number" className="2xl:text-[1vw]" />
                <InputField label="Cost Of Labour" name="costOfLabour" placeholder="Cost Of Labour" value={values.costOfLabour} onChange={handleChange} onBlur={handleBlur} error={touched.costOfLabour && typeof errors.costOfLabour === 'string' ? errors.costOfLabour : undefined} type="number" className="2xl:text-[1vw]" />
                <InputField label="Over Head Cost" name="overHeadCost" placeholder="Over Head Cost" value={values.overHeadCost} onChange={handleChange} onBlur={handleBlur} error={touched.overHeadCost && typeof errors.overHeadCost === 'string' ? errors.overHeadCost : undefined} type="number" className="2xl:text-[1vw]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw]">
                <Dropdown label="Project Renewal Type" options={renewalTypeOptions} value={values.renewalType} onChange={val => setFieldValue("renewalType", val)} error={touched.renewalType && typeof errors.renewalType === 'string' ? errors.renewalType : undefined} dropdownWidth="w-full" />
                <DatePicker label="Renewal Date" value={values.renewalDate} onChange={val => setFieldValue("renewalDate", val)} placeholder="Select Renewal Date" error={touched.renewalDate && typeof errors.renewalDate === 'string' ? errors.renewalDate : undefined} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 2xl:p-[2vw] cursor-pointer transition ${
                        isMilestoneSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                    }`}
                    onClick={() => setFieldValue('milestoneOption', 'milestone')}
                >
                    {/* <Image src="/images/external.png" alt="Milestone" className="w-16 h-16 mb-2" /> */}
                    <span className="font-semibold mb-2">Do you want to add Milestones?</span>
                    <span
                        className={`mt-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isMilestoneSelected ? 'border-blue-500' : 'border-gray-300'
                        }`}
                    >
                        {isMilestoneSelected && (
                            <span className="w-3 h-3 bg-blue-500 rounded-full block" />
                        )}
                    </span>
                </div>
                <div
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 2xl:p-[2vw] cursor-pointer transition ${
                        isTemplateSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
                    }`}
                    onClick={() => setFieldValue('milestoneOption', 'template')}
                >
                    {/* <Image src="/images/excel.png" alt="Template" className="w-16 h-16 mb-2" /> */}
                    <span className="font-semibold mb-2">Use Project Template</span>
                    <span
                        className={`mt-2 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isTemplateSelected ? 'border-blue-500' : 'border-gray-300'
                        }`}
                    >
                        {isTemplateSelected && (
                            <span className="w-3 h-3 bg-blue-500 rounded-full block" />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
} 