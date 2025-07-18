export function MilestoneFileActivity() {
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-4 2xl:mb-[1vw] font-medium">
        Milestone & File Activity
      </h3>
      <div className="flex flex-wrap gap-12 2xl:gap-[3vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-col">
          <span className="font-light">Milestone Managed</span>
          <span className="underline font-medium text-[1rem] 2xl:text-[1vw] cursor-pointer">
            4
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-light">Files Uploaded</span>
          <span className="underline font-medium text-[1rem] 2xl:text-[1vw] cursor-pointer">
            8
          </span>
        </div>
      </div>
    </div>
  );
}
