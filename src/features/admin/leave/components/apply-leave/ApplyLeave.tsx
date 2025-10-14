"use client";
import { useState } from "react";
import { Button, DatePicker, Dropdown, InputField } from "@/components";
// import { Breadcrumb } from "@/features";

interface LeaveFormData {
  employeeId: string;
  leaveType: "fullDay" | "halfDay" | "";
  leaveCategory: string;
  fromDate: string;
  toDate: string;
  reason: string;
}

export function ApplyLeave() {
  const leaveTypeOptions = [
    { label: "Sick Leave", value: "sick" },
    { label: "Casual Leave", value: "casual" },
    { label: "Earned Leave", value: "earned" },
    { label: "Maternity Leave", value: "maternity" },
    { label: "Paternity Leave", value: "paternity" },
  ];

  const [formData, setFormData] = useState<LeaveFormData>({
    employeeId: "",
    leaveType: "",
    leaveCategory: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleInputChange = (field: keyof LeaveFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const calculateTotalDays = () => {
    if (!formData.fromDate || !formData.toDate) return "0";

    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return diffDays.toString();
  };

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Apply Leave
        </h1>
        {/* <Breadcrumb /> */}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 w-full md:max-w-2xl">
          <InputField
            label="Employee ID"
            placeholder="Employee ID"
            value={formData.employeeId}
          />

          {/* Type Selection */}
          <div className="flex flex-col gap-3">
            <label className="block text-gray-700 font-medium">
              Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="leaveType"
                  value="fullDay"
                  checked={formData.leaveType === "fullDay"}
                  onChange={(e) =>
                    handleInputChange("leaveType", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Full Day</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="leaveType"
                  value="halfDay"
                  checked={formData.leaveType === "halfDay"}
                  onChange={(e) =>
                    handleInputChange("leaveType", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Half Day</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Dropdown
              label="Leave Type"
              isRequired
              options={leaveTypeOptions}
              value={formData.leaveCategory}
              onChange={(val) => handleInputChange("leaveCategory", val)}
            />
            <div className="text-sm text-gray-600">
              Available Leave - 1.0 Days
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="From"
              value={formData.fromDate}
              onChange={(date) => handleInputChange("fromDate", date)}
              isRequired={true}
              placeholder="Select start date"
            />

            <DatePicker
              label="To"
              value={formData.toDate}
              onChange={(date) => handleInputChange("toDate", date)}
              isRequired={true}
              placeholder="Select end date"
            />
          </div>

          {/* Total Days */}
          <div className="flex flex-col gap-2">
            <label className="block text-gray-700 font-medium">
              Total Day(s)
            </label>
            <div className="text-lg font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded border border-gray-200">
              {calculateTotalDays()}
            </div>
          </div>

          {/* Reason for Leave */}
          <div className="flex flex-col gap-3">
            <label className="block text-gray-700 font-medium">
              Reason for Leave
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px] resize-vertical"
              placeholder="Enter reason for leave..."
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 ">
            <Button title="Cancel" width="w-fit" variant="primary-outline" />
            <Button title="Submit" width="w-fit" />
          </div>
        </div>
      </form>
    </div>
  );
}
