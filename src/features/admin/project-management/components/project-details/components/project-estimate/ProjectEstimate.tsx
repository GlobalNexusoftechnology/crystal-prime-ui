export function ProjectEstimate() {
  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2vw] mb-4 2xl:mb-[1vw]">Project Estimates</h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        {/* Dates Section */}
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light">Estimated Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              24–02–2021 09:00 AM
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              24–02–2021 09:00 AM
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Estimated End Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              24–02–2021 09:00 AM
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual End Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              24–02–2021 09:00 AM
            </p>
          </div>
        </div>

        {/* Cost Section */}
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light">Estimated Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              $42,452.00
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              $72.00
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Cost Of Labour</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              $42.00
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Over Head Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              $72.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
