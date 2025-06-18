export function Comments() {
  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw]">
      <h3 className="text-[1.2vw] mb-4 2xl:mb-[1vw]">Comments</h3>
      <div className="flex flex-col gap-4 2xl:gap-[1vw] bg-customGray border 2xl:border-[0.1vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] text-sm 2xl:text-[0.9vw] text-[#1D2939] w-full md:w-[70%]">
        <div className="flex flex-wrap gap-4 2xl:gap-[1vw] mb-2 2xl:mb-[0.5vw] font-medium text-[#1D2939]">
          <div>
            <span className="2xl:text-[1.1vw] font-normal">Assigned To: </span>
            <span className="underline 2xl:text-[1.1vw]">Meena Kapoor</span>
          </div>
        </div>

        <p className="2xl:text-[1.1vw] mb-2 2xl:mb-[0.5vw]">
          We are still waiting for the team&apos;s valuable insights on the
          proposal. Your input is essential for us to proceed. Please share your
          thoughts at your earliest convenience.
        </p>

        <p className="text-lightGreen 2xl:text-[1.1vw] font-medium">
          Created At: 26 May 2025, 4:00 PM
        </p>
      </div>
    </div>
  );
}
