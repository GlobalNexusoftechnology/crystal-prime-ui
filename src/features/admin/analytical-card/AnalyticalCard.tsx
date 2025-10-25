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
      className={`w-full bg-customGray border  border-gray-300 rounded-lg  p-4   ${
        onClick ? "cursor-pointer hover:shadow" : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
    >
      <div className="w-full flex items-center justify-start gap-3  mb-2  border  border-gray-300 rounded-lg  bg-white p-2 ">
        <div className="h-10  w-10  bg-customGray p-2  rounded-lg  border  border-gray-300">
          <AnalyticalCardIcon className="h-full w-full" />
        </div>
        <div className="flex">
          <h2 className="text-[1.3rem]  font-semibold">
            {data.count}
          </h2>
        </div>
      </div>
      {data.customContent ? (
        data.customContent
      ) : (
        <div className="flex flex-col">
          <p className="text-[0.9rem]  text-gray-700 font-medium">
            {data.title}
          </p>
          <p className="text-[0.6rem] text-gray-400 ">
            {data.subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
