import { useState, useCallback, useEffect, useRef } from 'react';

interface UseNumberInputProps {
  initialValue?: number;
  currentValue?: number;
  min?: number;
  max?: number;
}

export const useNumberInput = ({ 
  initialValue = 0, 
  currentValue,
  min = 0, 
  max 
}: UseNumberInputProps = {}) => {
  const [value, setValue] = useState<number>(currentValue ?? initialValue);
  const [displayValue, setDisplayValue] = useState<string>((currentValue ?? initialValue).toString());
  const prevValueRef = useRef<number>(currentValue ?? initialValue);

  // Sync with external value changes
  useEffect(() => {
    if (currentValue !== undefined && currentValue !== prevValueRef.current) {
      prevValueRef.current = currentValue;
      setValue(currentValue);
      setDisplayValue(currentValue.toString());
    }
  }, [currentValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // If input is empty, set to 0
    if (inputValue === '') {
      setDisplayValue('0');
      setValue(0);
      return;
    }

    // Remove leading zeros except for single zero
    let cleanValue = inputValue;
    if (inputValue.startsWith('0') && inputValue.length > 1) {
      cleanValue = inputValue.replace(/^0+/, '');
      if (cleanValue === '') cleanValue = '0';
    }

    const numValue = Number(cleanValue);
    
    // Validate min/max constraints
    if (min !== undefined && numValue < min) {
      return;
    }
    if (max !== undefined && numValue > max) {
      return;
    }

    setDisplayValue(cleanValue);
    setValue(numValue);
  }, [min, max]);

  const handleBlur = useCallback(() => {
    // Ensure display value matches the actual value
    setDisplayValue(value.toString());
  }, [value]);

  const updateValue = useCallback((newValue: number) => {
    const clampedValue = Math.max(min, newValue);
    if (max !== undefined) {
      const finalValue = Math.min(clampedValue, max);
      setValue(finalValue);
      setDisplayValue(finalValue.toString());
    } else {
      setValue(clampedValue);
      setDisplayValue(clampedValue.toString());
    }
  }, [min, max]);

  return {
    value,
    displayValue,
    handleChange,
    handleBlur,
    updateValue,
    setValue: updateValue
  };
};
