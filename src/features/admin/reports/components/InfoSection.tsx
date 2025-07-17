import React from "react";

export interface InfoSectionItem {
  label: string;
  value: React.ReactNode;
}

export interface InfoSectionProps {
  title: string;
  items: InfoSectionItem[];
  className?: string;
}

export function InfoSection({ title, items, className = "" }: InfoSectionProps) {
  return (
    <div className={`border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw] ${className}`}>
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw] font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-12 2xl:gap-[3vw] text-[0.9rem] 2xl:text-[0.875vw]">
        {items.map((item, idx) => (
          <div className="flex flex-col" key={idx}>
            <span className="font-light">{item.label}</span>
            <span className="underline font-semibold text-[1rem] 2xl:text-[1.1vw] cursor-pointer">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 