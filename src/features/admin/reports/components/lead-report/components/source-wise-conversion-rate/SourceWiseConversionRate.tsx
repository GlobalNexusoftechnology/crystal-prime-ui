import React from "react";

interface SourceWiseConversionRateProps {
  data?: Array<{
    source: string;
    conversionRate: number;
  }>;
}

export const SourceWiseConversionRate: React.FC<SourceWiseConversionRateProps> = ({ data }) => {
  const sourceData = data
    ? data.map(item => ({
        label: item.source,
        value: `${item.conversionRate}%`
      }))
    : [
        { label: "Website", value: "0%" },
        { label: "Referral", value: "0%" }
      ];

  return (
    <div className="w-full p-6 2xl:p-[1.5vw]">
      <div className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold text-black mb-6 2xl:mb-[1vw]">
        Source-Wise Conversion Rate
      </div>
      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw]">
        {sourceData.map((source, idx) => (
          <div key={idx} className="flex flex-col items-start gap-2 2xl:gap-[0.5vw] px-6 2xl:px-[1.5vw] py-2 2xl:py-[0.5vw] border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] shadow-sm bg-white">
            <span className="text-[1rem] 2xl:text-[1vw] font-light text-[#1a2341] mb-1">
              {source.label}
            </span>
            <span className="text-[1rem] 2xl:text-[1vw] font-medium text-[#1a2341] underline cursor-pointer">
              {source.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
