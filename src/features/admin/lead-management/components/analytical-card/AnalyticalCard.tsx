import { AnalyticalCardData } from "@/constants";
import { AnalyticalCardIcon } from "@/features";

interface AnalyticalCardDataProps {
  data: AnalyticalCardData;
}

/**
 * Reusable card component that displays analytical summary data such as counts, titles, and subtitles.
 * Accepts a single `data` prop of type `AnalyticalCardData` to render the content dynamically.
 */

export function AnalyticalCard({ data }: AnalyticalCardDataProps) {
  return (
    <div className="w-full md:w-[30vw] xl:w-[20vw] bg-[#F8F8F8] border border-gray-200 rounded-lg 2xl:rounded-[0.5vw] p-4  2xl:p-[1vw] ">
      <div className="w-full  flex items-start justify-start gap-3 2xl:gap-[0.75vw] mb-2 2xl:mb-[0.5vw] border border-gray-200 rounded-lg 2xl:rounded-[0.5vw] bg-white p-2 2xl:p-[0.5vw]">
        <div className="h-10 2xl:h-[2.5vw] w-10 2xl:w-[2.5vw] bg-[#F8F8F8] p-2 2xl:p-[0.5vw] rounded-lg 2xl:rounded-[0.5vw] border border-gray-200">
          <AnalyticalCardIcon className="h-full w-full" />
        </div>

        <div className="flex flex-col ">
          <h2 className="text-[1rem] 2xl:text-[1vw] font-semibold">
            {data.count}
          </h2>
          <p className="text-[0.6rem] 2xl:text-[0.5vw] text-gray-400 ">
            {data.subtitle}
          </p>
        </div>
      </div>
      <div className="flex  items-center justify-between ">
        <p className="text-sm 2xl:text-[0.875vw] text-gray-700 font-medium">
          {data.title}
        </p>
        <p className="text-sm 2xl:text-[0.875vw] text-gray-700 font-medium ">
          . . .
        </p>
      </div>
    </div>
  );
}
