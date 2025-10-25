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
    <div className="w-full p-6 ">
      <div className="text-[1.1rem]  font-semibold text-black mb-6 ">
        Source-Wise Conversion Rate
      </div>
      <div className="flex flex-wrap gap-6 ">
        {sourceData.map((source, idx) => (
          <div key={idx} className="flex flex-col items-start gap-2  px-6  py-2  border border-gray-300  rounded-lg  shadow-sm bg-white">
            <span className="text-[1rem]  font-light text-[#1a2341] mb-1">
              {source.label}
            </span>
            <span className="text-[1rem]  font-medium text-[#1a2341] underline cursor-pointer">
              {source.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
