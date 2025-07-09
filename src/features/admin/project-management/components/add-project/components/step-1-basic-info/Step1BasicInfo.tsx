import { InputField, Dropdown, DatePicker } from "@/components";
// import Image from "next/image";
import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { IAddProjectFormValues } from "../../AddProject";
import { ImageRegistry } from "@/constants";
import Image from "next/image";
import { Checkbox } from '@/components';
import { useAllTypesQuery } from "@/services";
import { differenceInCalendarDays, parseISO } from 'date-fns';


const renewalTypeOptions = [
  { label: "Monthly", value: "MONTHLY" },
  { label: "Quarterly", value: "QUARTERLY" },
  { label: "Yearly", value: "YEARLY" },
  { label: "Custom", value: "CUSTOM" },
];

interface Step1BasicInfoProps extends FormikProps<IAddProjectFormValues> {
  clientOptions: { label: string; value: string }[];
  clientLoading: boolean;
  clientError: boolean;
  hideMilestoneTemplateOption?: boolean;
}

export function Step1BasicInfo({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  clientOptions,
  clientLoading,
  clientError,
  hideMilestoneTemplateOption = false,
}: Step1BasicInfoProps) {
  const isMilestoneSelected = values.milestoneOption === "milestone";
  const isTemplateSelected = values.milestoneOption === "template";

  // Fetch lead/project types
  const { allTypesData } = useAllTypesQuery();
  const projectTypeOptions =
    allTypesData?.map((type) => ({
      label: type?.name,
      value: type?.id.toString(),
    })) || [];

  // Helper to ensure string for DatePicker
  const toDateString = (val: string | Date | undefined) =>
    val
      ? typeof val === 'string'
        ? val
        : val instanceof Date && !isNaN(val.getTime())
          ? val.toISOString().slice(0, 10)
          : ''
      : '';

  // Calculate Estimated Cost
  let estimatedCost = '';
  const costOfLabour = Number(values.cost_of_labour) || 0;
  const overheadCost = Number(values.overhead_cost) || 0;
  const extraCost = Number(values.extra_cost) || 0;
  let days = 0;
  // Overhead cost validation
  const overheadCostError = overheadCost > costOfLabour ? 'Overhead cost cannot be greater than cost of labour' : undefined;
  if (values.start_date && values.end_date) {
    try {
      const start = typeof values.start_date === 'string' ? parseISO(values.start_date) : new Date(values.start_date);
      const end = typeof values.end_date === 'string' ? parseISO(values.end_date) : new Date(values.end_date);
      days = differenceInCalendarDays(end, start) + 1;
    } catch {}
  }
  if (costOfLabour > 0 || overheadCost > 0 || extraCost > 0) {
    estimatedCost = (((costOfLabour + overheadCost) * (days > 0 ? days : 0)) + extraCost).toString();
  }

  // After estimatedCost calculation
  useEffect(() => {
    if (estimatedCost !== "" && estimatedCost !== values.estimated_cost) {
      setFieldValue("estimated_cost", estimatedCost);
    }
    if (estimatedCost === "" && values.estimated_cost !== "") {
      setFieldValue("estimated_cost", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estimatedCost]);

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
          value={values.project_type || ''}
          onChange={(val) => setFieldValue("project_type", val)}
          error={touched.project_type && typeof errors.project_type === "string" ? errors.project_type : undefined}
          dropdownWidth="w-full"
        />
        <Dropdown
          label="Client"
          options={clientLoading
            ? [{ label: "Loading...", value: "" }]
            : clientError
              ? [{ label: "Error loading clients", value: "" }]
              : clientOptions}
          value={values.client_id || ''}
          onChange={(val) => setFieldValue("client_id", val)}
          error={touched.client_id && typeof errors.client_id === "string" ? errors.client_id : undefined}
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
          value={toDateString(values.start_date)}
          onChange={(val) => setFieldValue("start_date", val)}
          placeholder="Estimated Start Date"
          maxDate={toDateString(values.end_date)}
          minDate={toDateString(values.start_date) || new Date().toISOString().slice(0, 10)}
          error={touched.start_date && typeof errors.start_date === "string" ? errors.start_date : undefined}
        />
        <DatePicker
          label="Estimated End Date"
          value={toDateString(values.end_date)}
          onChange={(val) => setFieldValue("end_date", val)}
          placeholder="Estimated End Date"
          minDate={toDateString(values.start_date) || new Date().toISOString().slice(0, 10)}
          error={touched.end_date && typeof errors.end_date === "string" ? errors.end_date : undefined}
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
          name="estimated_cost"
          placeholder="Estimated Cost"
          value={estimatedCost}
          disabled
          type="number"
          className="2xl:text-[1vw]"
          error={errors.estimated_cost}
        />
        <InputField
          label="Cost Of Labour"
          name="cost_of_labour"
          placeholder="Cost Of Labour"
          value={values.cost_of_labour}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.cost_of_labour && typeof errors.cost_of_labour === "string"
              ? errors.cost_of_labour
              : undefined
          }
          type="number"
          className="2xl:text-[1vw]"
        />
        <InputField
          label="Over Head Cost"
          name="overhead_cost"
          placeholder="Over Head Cost"
          value={values.overhead_cost}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            overheadCostError || (touched.overhead_cost && typeof errors.overhead_cost === "string"
              ? errors.overhead_cost
              : undefined)
          }
          type="number"
          className="2xl:text-[1vw]"
        />
        <InputField
          label="Extra Cost"
          name="extra_cost"
          placeholder="Extra Cost"
          value={values.extra_cost}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          className="2xl:text-[1vw]"
        />
      </div>

      <div className="mt-4">
        <Checkbox
          label="Is Renewal?"
          checked={values.is_renewal}
          onChange={e => setFieldValue('is_renewal', e.target.checked)}
          name="is_renewal"
        />
      </div>
      {values.is_renewal && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Dropdown
              label="Renewal Type"
              options={renewalTypeOptions}
              value={values.renewal_type || ''}
              onChange={val => setFieldValue('renewal_type', val)}
              error={touched.renewal_type && typeof errors.renewal_type === 'string' ? errors.renewal_type : undefined}
              dropdownWidth="w-full"
            />
          </div>
          <div>
            <DatePicker
              label="Renewal Date"
              value={toDateString(values.renewal_date)}
              onChange={val => setFieldValue('renewal_date', val)}
              placeholder="Select Renewal Date"
              error={touched.renewal_date && typeof errors.renewal_date === 'string' ? errors.renewal_date : undefined}
              minDate={new Date().toISOString().slice(0, 10)}
            />
          </div>
        </div>
      )}
      {!hideMilestoneTemplateOption && (
        <div className="flex gap-6 2xl:gap-[1.5vw] mt-6 2xl:mt-[1vw]">
          <div
            className={`w-[18rem] 2xl:w-[18vw] h-[16rem] 2xl:h-[16vw] flex flex-col items-center justify-center border-2 border-dashed rounded-lg gap-4 2xl:gap-[1vw] p-6 2xl:p-[2vw] cursor-pointer transition ${isMilestoneSelected
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
            className={`w-[18rem] 2xl:w-[18vw] h-[16rem] 2xl:h-[16vw] flex flex-col items-center justify-center border-2 border-dashed rounded-lg gap-4 2xl:gap-[1vw] p-6 2xl:p-[2vw] cursor-pointer transition ${isTemplateSelected
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
      )}
    </div>
  );
}
