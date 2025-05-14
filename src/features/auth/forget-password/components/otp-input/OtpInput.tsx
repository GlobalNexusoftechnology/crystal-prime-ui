"use client";

import { useRef } from "react";

/**
 * Renders a 5-digit OTP input component with auto-focus behavior.
 * Each input only allows one character and automatically moves focus
 * to the next or previous input based on user input or deletion.
 */

export function OtpInput() {
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
    const value = e.target.value;

    // Move to next input if character entered and not last index
    if (value.length === 1 && index < 4) {
      inputRefs[index + 1].current?.focus();
    }

    // Move back if input is cleared
    else if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg md:text-xl 2xl:text-[1.5vw] font-semibold">
        Enter OTP
      </h1>
      <div className="flex gap-2 justify-start">
        {inputRefs.map((ref, index) => (
          <input
            key={index}
            ref={ref}
            type="text"
            maxLength={1}
            className="h-8 w-8 md:w-10 md:h-10 2xl:h-[3vw] 2xl:w-[3vw] border rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={(e) => handleChange(index, e)}
          />
        ))}
      </div>
    </div>
  );
}
