"use client";

type HeaderDetailsProps = {
  title: string;
  status: string;
  progress: string; // e.g., "6 / 10"
  statusBgColor?: string;
  progressBgColor?: string;
};

/**
 * Reusable header details component for project info.
 */
export function HeaderDetails({
  title,
  status,
  progress,
  statusBgColor = "bg-skyBlue",
  progressBgColor = "bg-darkGreen",
}: HeaderDetailsProps) {
  return (
    <div className="flex items-center gap-4 2xl:gap-[1vw]">
      <div>
        <h2 className="text-[1.5rem] 2xl:text-[1.5vw] font-medium">{title}</h2>
      </div>
      <div className="flex items-center gap-4 2xl:gap-[1vw]">
        <span
          className={`px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] ${statusBgColor} rounded-xl 2xl:rounded-[1vw] 2xl:text-[1vw]`}
        >
          {status}
        </span>
        <span
          className={`px-4 py-2 2xl:px-[1vw] 2xl:py-[0.5vw] ${progressBgColor} rounded-xl 2xl:rounded-[1vw] 2xl:text-[1vw]`}
        >
          {progress}
        </span>
      </div>
    </div>
  );
}
