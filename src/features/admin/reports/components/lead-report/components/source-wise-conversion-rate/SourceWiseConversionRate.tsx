import React from "react";

interface SourceWiseConversionRateProps {
  data?: Array<{
    source: string;
    conversionRate: number;
  }>;
}

export const SourceWiseConversionRate: React.FC<SourceWiseConversionRateProps> = ({ data }) => {
  const sourceData = data ? data.map(item => ({
    label: item.source,
    value: `${item.conversionRate}%`
  })) : [
    { label: "Website", value: "0%" },
    { label: "Referral", value: "0%" },
  ];
  return (
    <div className="w-full">
      <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium text-black mb-8">Source-Wise Conversion Rate</div>
      <div className="grid grid-cols-2 gap-x-16">
        {sourceData.map((source, idx) => (
          <div key={idx} className="flex flex-col items-start">
            <span className="text-[1rem] 2xl:text-[1vw] font-light text-[#1a2341] mb-2">{source.label}</span>
            <span className="text-[1rem] 2xl:text-[1vw] font-medium text-[#1a2341] underline cursor-pointer">{source.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 