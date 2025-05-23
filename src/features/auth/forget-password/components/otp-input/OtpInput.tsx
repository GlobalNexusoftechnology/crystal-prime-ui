"use client";

import { useRef } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Renders a 5-digit OTP input component with auto-focus behavior.
 * Accepts value and onChange props for Formik/Yup integration.
 */
export function OtpInput({ value, onChange }: OtpInputProps) {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;

    if (!/^\d?$/.test(val)) return; 

    const otpChars = value.split("");
    otpChars[index] = val;
    const updatedOtp = otpChars.join("").slice(0, 5);
    onChange(updatedOtp);

    if (val && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[1rem] 2xl:text-[1vw]">
        Enter OTP
      </h1>
      <div className="flex gap-2 justify-start">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            type="text"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-8 w-8 md:w-10 md:h-10 2xl:h-[3vw] 2xl:w-[3vw] border rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        ))}
      </div>
    </div>
  );
}
