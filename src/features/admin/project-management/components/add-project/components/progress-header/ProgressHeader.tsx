import React from "react";

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Milestone Setup" },
  { id: 3, title: "Upload Document" },
  { id: 4, title: "Preview" },
];

export function ProgressHeader({ step }: { step: number }) {
  return (
    <div className="flex w-full rounded-md border border-gray-300 overflow-hidden text-[0.9rem] 2xl:text-[0.9vw] font-medium">
      {steps.map((s, i) => {
        const isActive = step === s.id;
        return (
          <div
            key={s.id}
            className={`flex items-center gap-[0.6vw] px-[1.2vw] py-[1vw] w-full min-w-[16vw] relative ${
              isActive ? "bg-[#4E5EFF] text-white" : "bg-white text-gray-400"
            }`}
          >
            <div
              className={`w-[2vw] h-[2vw] min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full border ${
                isActive ? "border-white text-white" : step > s.id ? "border-[#4E5EFF] text-[#4E5EFF]" : "border-gray-400 text-gray-400"
              }`}
            >
              {step > s.id ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 10.5L9 14.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                String(s.id).padStart(2, "0")
              )}
            </div>
            <span>{s.title}</span>
            {i !== steps.length - 1 && (
              <div
                className={`absolute top-0 right-0 h-full w-[2vw] min-w-[18px] bg-white transform skew-x-12 scale-[1.4]${
                  isActive ? " bg-[#4E5EFF]" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
} 