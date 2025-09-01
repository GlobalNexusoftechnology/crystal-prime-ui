"use client";

import React from 'react';
import { useNumberInput } from '@/utils/hooks/useNumberInput';

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value = 0,
  onChange,
  min = 0,
  max,
  placeholder,
  className = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
  disabled = false,
  onBlur,
  onFocus,
}) => {
  const {
    displayValue,
    handleChange,
    handleBlur: handleInputBlur,
  } = useNumberInput({
    initialValue: 0,
    currentValue: value,
    min,
    max,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const numValue = Number(e.target.value.replace(/^0+/, '') || '0');
    onChange?.(numValue);
  };

  const handleBlurEvent = (e: React.FocusEvent<HTMLInputElement>) => {
    handleInputBlur();
    onBlur?.(e);
  };

  return (
    <input
      type="number"
      min={min}
      max={max}
      value={displayValue}
      onChange={handleInputChange}
      onBlur={handleBlurEvent}
      onFocus={onFocus}
      placeholder={placeholder}
      className={className}
      disabled={disabled}
    />
  );
};
