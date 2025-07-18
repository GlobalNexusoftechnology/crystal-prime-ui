import { IoInformationCircleOutline } from "react-icons/io5";

export function TaskSummary() {
  return (
    <div className="border-b 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-4 2xl:mb-[1vw] font-medium">
        Task Summary
      </h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light flex items-center gap-1">
              <IoInformationCircleOutline className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              Total Task Assigned
            </span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              25
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light flex items-center gap-1">
              <IoInformationCircleOutline className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              Completed Task
            </span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              20
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light flex items-center gap-1">
              <IoInformationCircleOutline className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              Completion Rate
            </span>
            <span className="text-[1rem] 2xl:text-[1vw] font-medium">
              80.0%
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light flex items-center gap-1">
              <IoInformationCircleOutline className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              Avg Day To Complete
            </span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              3.2 Days
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light flex items-center gap-1">
              <IoInformationCircleOutline className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              Delayed Task
            </span>
            <span className="text-[1rem] 2xl:text-[1vw] font-medium">
              5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
