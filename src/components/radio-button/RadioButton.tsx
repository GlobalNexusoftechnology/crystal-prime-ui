// components/RadioButton.tsx

import React from "react";

export type TRadioOption = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  name: string;
  options: TRadioOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
};

/**
 * RadioButton: Reusable radio button group with 2xl responsive styles.
 */
export function RadioButton({
  name,
  options,
  selectedValue,
  onChange,
  className = "",
  labelClassName = "",
}: RadioButtonProps) {
  return (
    <div className={`flex flex-col gap-4 2xl:gap-[0.8vw] ${className}`}>
      {options.length > 0 && options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-3 2xl:gap-[0.6vw] cursor-pointer text-base 2xl:text-[0.9vw] ${labelClassName}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="accent-blue-600 w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
