import React from 'react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
};

/**
 * Reusable Checkbox Component
 * @param label - Optional label for the checkbox
 * @param labelClassName - Additional classes for the label
 * @param wrapperClassName - Additional classes for the wrapper div
 */
export function Checkbox({
  label,
  labelClassName = '',
  wrapperClassName = '',
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <div className={`flex items-center gap-2 ${wrapperClassName}`}>
      <input
        type="checkbox"
        className={`h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
      {label && <label className={`text-gray-700 text-sm ${labelClassName}`}>{label}</label>}
    </div>
  );
}

