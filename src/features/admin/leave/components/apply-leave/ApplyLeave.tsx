"use client";
import { useState } from "react";
import { Button, DatePicker, Dropdown, InputField } from "@/components";
import { useAuthStore, useCreateLeaveMutation } from "@/services";
import toast from "react-hot-toast";

interface LeaveFormData {
  staffId: string;
  leaveType: "Full Day" | "Half Day" | "";
  leaveCategory: string;
  fromDate: string;
  toDate: string;
  reason: string;
}

export function ApplyLeave() {
  const { activeSession } = useAuthStore();
  const userId = activeSession?.user?.id
  
  const leaveTypeOptions = [
    { label: "Sick Leave", value: "Sick Leave" },
    { label: "Casual Leave", value: "Casual Leave" },
    { label: "Earned Leave", value: "Earned Leave" },
    { label: "Maternity Leave", value: "Maternity Leave" },
    { label: "Paternity Leave", value: "Paternity Leave" },
  ];

  const [formData, setFormData] = useState<LeaveFormData>({
    staffId: "",
    leaveType: "",
    leaveCategory: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  //  Connect the API Hook
  const { onLeaveMutation, isPending } = useCreateLeaveMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
      setFormData({
        staffId: "",
        leaveType: "",
        leaveCategory: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Something went wrong!");
    },
  });

  const handleInputChange = (field: keyof LeaveFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !userId ||
      !formData.leaveType ||
      !formData.fromDate ||
      !formData.toDate
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    //  Prepare payload for API
    const payload = {
      staffId: userId,
      appliedDate: new Date().toISOString().split("T")[0], // current date
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      leaveType: formData.leaveType,
      description: formData.reason,
    };

    onLeaveMutation(payload);
  };

  const calculateTotalDays = () => {
    if (!formData.fromDate || !formData.toDate) return "0";
    
    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);
    
    // Handle half-day leaves
    if (formData.leaveType === "Half Day") {
      // For half day, check if it's a weekend
      const dayOfWeek = from.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return "0"; // Weekend, no leave days
      }
      return "0.5"; // Half day
    }
    
    // Handle single day leaves (when fromDate and toDate are the same)
    if (from.getTime() === to.getTime()) {
      // Check if it's a weekend
      const dayOfWeek = from.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        return "0"; // Weekend, no leave days
      }
      return "1"; // Single working day
    }
    
    // Handle multi-day leaves
    let leaveDays = 0;
    const currentDate = new Date(from);
    
    // Ensure we process all days from start to end (inclusive)
    while (currentDate <= to) {
      const dayOfWeek = currentDate.getDay();
      
      // Count only weekdays (Monday = 1, Tuesday = 2, ..., Friday = 5)
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        leaveDays++;
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return leaveDays.toString();
  };

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] border border-gray-300 rounded-xl min-h-screen flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Apply Leave
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 w-full md:max-w-2xl">
          <InputField
            label="Employee ID"
            placeholder="Employee ID"
            value={userId}
            onChange={(e) => handleInputChange("staffId", e.target.value)}
          />

          {/* Type Selection */}
          <div className="flex flex-col gap-3">
            <label className="block text-gray-700 font-medium">
              Leave Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="leaveType"
                  value="Full Day"
                  checked={formData.leaveType === "Full Day"}
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
                  value="Half Day"
                  checked={formData.leaveType === "Half Day"}
                  onChange={(e) =>
                    handleInputChange("leaveType", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Half Day</span>
              </label>
            </div>
          </div>

          <Dropdown
            label="Leave Category"
            isRequired
            options={leaveTypeOptions}
            value={formData.leaveCategory}
            onChange={(val) => handleInputChange("leaveCategory", val)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              label="From"
              value={formData.fromDate}
              onChange={(date) => handleInputChange("fromDate", date)}
              isRequired
            />
            <DatePicker
              label="To"
              value={formData.toDate}
              onChange={(date) => handleInputChange("toDate", date)}
              isRequired
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-gray-700 font-medium">
              Total Day(s)
            </label>
            <div className="text-lg font-semibold text-gray-900 bg-gray-50 px-4 py-2 rounded border border-gray-200">
              {calculateTotalDays()} {calculateTotalDays() === "0.5" ? "day" : calculateTotalDays() === "1" ? "day" : "days"}
            </div>
          </div>

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

          <div className="flex gap-4 ">
            <Button
              title="Cancel"
              width="w-fit"
              variant="primary-outline"
              type="button"
            />
            <Button
              title={isPending ? "Submitting..." : "Submit"}
              width="w-fit"
              type="submit"
              disabled={isPending}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
