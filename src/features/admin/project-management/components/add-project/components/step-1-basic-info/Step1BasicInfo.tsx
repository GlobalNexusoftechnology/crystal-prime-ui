import { InputField, Dropdown, DatePicker } from "@/components";
// import Image from "next/image";
import React from "react";
import { FormikProps } from "formik";
import { IAddProjectFormValues } from "../../AddProject";
import { ImageRegistry } from "@/constants";
import Image from "next/image";

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

export function Step1BasicInfo({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}: FormikProps<IAddProjectFormValues>) {
  const isMilestoneSelected = values.milestoneOption === "milestone";
  const isTemplateSelected = values.milestoneOption === "template";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw]">
        <InputField
          label="Project Name"
          name="name"
          placeholder="Enter Project Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.name && typeof errors.name === "string"
              ? errors.name
              : undefined
          }
          className="2xl:text-[1vw]"
        />
        <Dropdown
          label="Type Of Project"
          options={projectTypeOptions}
          value={values.projectType}
          onChange={(val) => setFieldValue("projectType", val)}
          error={
            touched.projectType && typeof errors.projectType === "string"
              ? errors.projectType
              : undefined
          }
          dropdownWidth="w-full"
        />
        <Dropdown
          label="Client"
          options={clientOptions}
          value={values.client}
          onChange={(val) => setFieldValue("client", val)}
          error={
            touched.client && typeof errors.client === "string"
              ? errors.client
              : undefined
          }
          dropdownWidth="w-full"
        />
      </div>
      <InputField
        label="Project Description"
        name="description"
        placeholder="Enter Description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.description && typeof errors.description === "string"
            ? errors.description
            : undefined
        }
        type="textarea"
        className="2xl:text-[1vw]"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw]">
        <DatePicker
          label="Estimated Start Date"
          value={values.estimatedStart}
          onChange={(val) => setFieldValue("estimatedStart", val)}
          placeholder="Estimated Start Date"
          error={
            touched.estimatedStart && typeof errors.estimatedStart === "string"
              ? errors.estimatedStart
              : undefined
          }
        />
        <DatePicker
          label="Estimated End Date"
          value={values.estimatedEnd}
          onChange={(val) => setFieldValue("estimatedEnd", val)}
          placeholder="Estimated End Date"
          error={
            touched.estimatedEnd && typeof errors.estimatedEnd === "string"
              ? errors.estimatedEnd
              : undefined
          }
        />
        <InputField
          label="Budget"
          name="budget"
          placeholder="Enter Budget"
          value={values.budget}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.budget && typeof errors.budget === "string"
              ? errors.budget
              : undefined
          }
          type="number"
          className="2xl:text-[1vw]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-[1vw]">
        <InputField
          label="Estimated Cost"
          name="estimatedCost"
          placeholder="Estimated Cost"
          value={values.estimatedCost}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.estimatedCost && typeof errors.estimatedCost === "string"
              ? errors.estimatedCost
              : undefined
          }
          type="number"
          className="2xl:text-[1vw]"
        />
        <InputField
          label="Cost Of Labour"
          name="costOfLabour"
          placeholder="Cost Of Labour"
          value={values.costOfLabour}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.costOfLabour && typeof errors.costOfLabour === "string"
              ? errors.costOfLabour
              : undefined
          }
          type="number"
          className="2xl:text-[1vw]"
        />
        <InputField
          label="Over Head Cost"
          name="overHeadCost"
          placeholder="Over Head Cost"
          value={values.overHeadCost}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.overHeadCost && typeof errors.overHeadCost === "string"
              ? errors.overHeadCost
              : undefined
          }
          type="number"
          className="2xl:text-[1vw]"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1vw]">
        <Dropdown
          label="Project Renewal Type"
          options={renewalTypeOptions}
          value={values.renewalType}
          onChange={(val) => setFieldValue("renewalType", val)}
          error={
            touched.renewalType && typeof errors.renewalType === "string"
              ? errors.renewalType
              : undefined
          }
          dropdownWidth="w-full"
        />
        <DatePicker
          label="Renewal Date"
          value={values.renewalDate}
          onChange={(val) => setFieldValue("renewalDate", val)}
          placeholder="Select Renewal Date"
          error={
            touched.renewalDate && typeof errors.renewalDate === "string"
              ? errors.renewalDate
              : undefined
          }
        />
      </div>
      <div className="flex gap-6 2xl:gap-[1.5vw] mt-6 2xl:mt-[1vw]">
        <div
          className={`w-[18rem] 2xl:w-[18vw] h-[16rem] 2xl:h-[16vw] flex flex-col items-center justify-center border-2 border-dashed rounded-lg gap-4 2xl:gap-[1vw] p-6 2xl:p-[2vw] cursor-pointer transition ${
            isMilestoneSelected
              ? "border-primary bg-blue-50"
              : "border-gray-300 bg-white"
          }`}
          onClick={() => setFieldValue("milestoneOption", "milestone")}
        >
          <div className="w-[8rem] 2xl:w-[8vw] h-[10rem] 2xl:h-[10vw]">
            <Image
              src={ImageRegistry.addMilestone}
              width={500}
              height={500}
              alt="Milestone"
              className="w-full h-full mb-2 2xl:mb-[0.5vw]"
            />
          </div>
          <span className="font-semibold text-center mb-2 2xl:mb-[0.5vw] 2xl:text-[1vw] 2xl:leading-[1.4vw]">
            Do you want to add Milestones?
          </span>
        </div>
        <div
          className={`w-[18rem] 2xl:w-[18vw] h-[16rem] 2xl:h-[16vw] flex flex-col items-center justify-center border-2 border-dashed rounded-lg gap-4 2xl:gap-[1vw] p-6 2xl:p-[2vw] cursor-pointer transition ${
            isTemplateSelected
              ? "border-primary bg-blue-50"
              : "border-gray-300 bg-white"
          }`}
          onClick={() => setFieldValue("milestoneOption", "template")}
        >
          <div className="w-[18rem] 2xl:w-[18vw] h-[10rem] 2xl:h-[10vw]">
            <Image
              src={ImageRegistry.projectTemplate}
              width={500}
              height={500}
              alt="Template"
              className="w-full h-full mb-2 2xl:mb-[0.5vw]"
            />
          </div>
          <span className="font-semibold text-center mb-2 2xl:mb-[0.5vw] 2xl:text-[1vw] 2xl:leading-[1.4vw]">
            Use Project Template
          </span>
        </div>
      </div>
    </div>
  );
}
