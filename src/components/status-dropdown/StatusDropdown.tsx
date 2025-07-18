import React, { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface StatusDropdownProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find(opt => opt.value === value);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        className="flex items-center justify-between w-full px-4 py-2 bg-cyan-100 rounded-xl font-semibold text-black focus:outline-none min-w-[120px]"
        onClick={() => setOpen(o => !o)}
      >
        <span className="mx-auto">{selected ? selected.label : "Select"}</span>
        <svg className="w-5 h-5 ml-2 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white rounded-xl shadow-lg z-50">
          {options.map(opt => (
            <button
              key={opt.value}
              className={`block w-full text-left px-4 py-2 hover:bg-cyan-50 ${opt.value === value ? "font-bold bg-cyan-100" : ""}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown; 