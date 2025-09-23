import { AnalyticalCardData } from "@/constants";
import { AnalyticalCardIcon } from "@/features";
import { ReactNode } from "react";

interface AnalyticalCardDataProps {
  data: AnalyticalCardData & {
    customContent?: ReactNode;
  };
  onClick?: () => void;
}

/**
 * Reusable card component that displays analytical summary data such as counts, titles, and subtitles.
 * Accepts a single `data` prop of type `AnalyticalCardData` to render the content dynamically.
 * Optionally accepts customContent to display custom elements like dropdowns.
 */

export function AnalyticalCard({ data, onClick }: AnalyticalCardDataProps) {
  return (
    <div
      className={`w-full bg-customGray border 2xl:border-[0.05vw] border-gray-300 rounded-lg 2xl:rounded-[0.5vw] p-4  2xl:p-[1vw] ${
        onClick ? "cursor-pointer hover:shadow" : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
    >
      <div className="w-full flex items-center justify-start gap-3 2xl:gap-[0.75vw] mb-2 2xl:mb-[0.5vw] border 2xl:border-[0.05vw] border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-2 2xl:p-[0.5vw]">
        <div className="h-10 2xl:h-[2.5vw] w-10 2xl:w-[2.5vw] bg-customGray p-2 2xl:p-[0.5vw] rounded-lg 2xl:rounded-[0.5vw] border 2xl:border-[0.05vw] border-gray-300">
          <AnalyticalCardIcon className="h-full w-full" />
        </div>
        <div className="flex">
          <h2 className="text-[1.3rem] 2xl:text-[1.3vw] font-semibold">
            {data.count}
          </h2>
        </div>
      </div>
      {data.customContent ? (
        data.customContent
      ) : (
        <div className="flex flex-col">
          <p className="text-[0.9rem] 2xl:text-[0.875vw] text-gray-700 font-medium">
            {data.title}
          </p>
          <p className="text-[0.6rem] 2xl:text-[0.6vw] text-gray-400 ">
            {data.subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
