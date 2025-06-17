export function ProjectHeader() {
  return (
    <div className="flex items-center gap-4 2xl:gap-[1vw]">
      <div>
        <h2 className="text-[1.5rem] 2xl:text-[1.5vw] font-medium">E Commerce Project</h2>
        <p className=" 2xl:text-[1vw]">#21042</p>
      </div>
      <div className="flex items-center gap-4 2xl:gap-[1vw]">
        <span className="px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] bg-skyBlue rounded-xl 2xl:rounded-[1vw] 2xl:text-[1vw]">Open</span>
        <span className="px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] bg-darkGreen rounded-xl 2xl:rounded-[1vw] 2xl:text-[1vw]">6 / 10</span>
      </div>
    </div>
  );
}
