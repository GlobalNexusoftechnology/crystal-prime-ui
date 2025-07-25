import React from "react";

interface HoursSpentInputProps {
  value: string; // now expects 'hh:mm' format
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  name?: string;
  minHours?: number;
  maxHours?: number;
}

export const HoursSpentInput: React.FC<HoursSpentInputProps> = ({
  value = "",
  onChange,
  onBlur,
  error,
  label = "Hours Spent",
  name = "hours_spent",
  minHours = 0,
  maxHours = 24,
}) => {
  // Parse value into hours and minutes
  let hours = "";
  let minutes = "";
  if (typeof value === "string" && value.includes(":")) {
    [hours, minutes] = value.split(":");
  } else if (typeof value === "string" && value !== "") {
    hours = value;
    minutes = "00";
  }

  // Handler for hours/minutes change
  const handlePartChange =
    (part: "hours" | "minutes") => (e: React.ChangeEvent<HTMLInputElement>) => {
      let newHours = hours || "0";
      let newMinutes = minutes || "0";
      if (part === "hours") newHours = e.target.value;
      if (part === "minutes") newMinutes = e.target.value;
      // Clamp values
      const h = Math.max(minHours, Math.min(Number(newHours) || 0, maxHours));
      const m = Math.max(0, Math.min(Number(newMinutes) || 0, 59));
      // If both are empty, send empty string
      const combined =
        newHours === "" && newMinutes === ""
          ? ""
          : `${h}:${m.toString().padStart(2, "0")}`;
      // Create a synthetic event for Formik compatibility
      const syntheticEvent = {
        target: { name, value: combined },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    };

  return (
    <div className="flex flex-col">
      <label className="mb-2 2xl:mb-[0.5vw]">{label}</label>
      <div className="flex gap-2 2xl:gap-[0.5vw] items-center border 2xl:border-[0.1vw] border-gray-300 bg-white px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] rounded-md 2xl:rounded-[0.375vw]">
        <input
          type="number"
          min={minHours}
          max={maxHours}
          value={hours}
          onChange={handlePartChange("hours")}
          onBlur={onBlur}
          className="outline-none text-right"
          placeholder="hh"
          name={name + "_hours"}
        />
        <span>:</span>
        <input
          type="number"
          min={0}
          max={59}
          value={minutes}
          onChange={handlePartChange("minutes")}
          onBlur={onBlur}
          className="outline-none"
          placeholder="mm"
          name={name + "_minutes"}
        />
      </div>
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};
