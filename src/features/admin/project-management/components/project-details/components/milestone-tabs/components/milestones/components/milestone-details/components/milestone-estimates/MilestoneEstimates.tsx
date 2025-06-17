export function MilestoneEstimates() {
  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2vw] mb-4 2xl:mb-[1vw]">Milestone Estimates</h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">
              Actual Start Date
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              15-03-2022 10:00 AM
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">
              Actual End Date
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">15-03-2022 10:00 AM</p>
          </div>
        </div>
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">
              Estimated Start Date
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">15-03-2022 10:00 AM</p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">
              Estimated Start Date
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">15-03-2022 10:00 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
