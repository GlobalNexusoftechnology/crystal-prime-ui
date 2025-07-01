import React from "react";
import { InputField } from "@/components";

interface HoursSpentInputProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  name?: string;
  min?: number;
  max?: number;
}

export const HoursSpentInput: React.FC<HoursSpentInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  label = "Hours Spent",
  name = "hours_spent",
  min = 0,
  max = 24,
}) => (
  <InputField
    label={label}
    name={name}
    type="number"
    min={min}
    max={max}
    placeholder="Enter hours"
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    onKeyDown={e => {
      // Prevent: e, E, +, - and any non-numeric except navigation and control keys
      if (["e", "E", "+", "-", "."].includes(e.key)) {
        e.preventDefault();
      }
    }}
  />
); 