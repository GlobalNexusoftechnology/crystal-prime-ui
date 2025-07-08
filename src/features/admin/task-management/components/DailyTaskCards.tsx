import { TaskManagementList } from "@/constants";
import { ThreeIcon } from "@/features/icons";

/**
 * DailyTaskCards component renders categorized task cards.
 * Cards are organized into columns by status (Open, In Progress, Final),
 * with color and type (detailed or summary) defined per task.
 */

export function DailyTaskCards() {
  return (
    <main className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 bg-white rounded-xl">
        {TaskManagementList.map((section) => (
          <div
            key={section.id}
            className="border border-[#D7D7D7] rounded-xl p-4 h-auto "
          >
            {/* Section Header */}
            <div className="flex justify-between items-center mb-7 2xl:mb-10 px-2 rounded-lg py-2 sm:py-[1rem] 2xl:py-[1vw] border border-[#D7D7D7] bg-[#F8F8F8] ">
              <h2 className="text-[0.9rem] font-semibold lg:text-base 2xl:text-[1vw]">
                {section.title}
              </h2>
              <ThreeIcon className="w-5 h-5" />
            </div>

            {/* Tasks */}
            {section.tasks.map((task) => {
              if (task.type === "detailed") {
                return (
                  <div
                    key={task.id}
                    className="rounded-xl p-4 mb-7 2xl:mb-10 shadow-xl text-[#1B1B1F]"
                    style={{ backgroundColor: task.color }}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[0.9rem]  2xl:text-[1vw] ">Task Name</p>
                        <h3 className="text-[0.9rem] font-medium  mt-1 2xl:mt-[0.5vw] 2xl:text-[1vw]">
                          {task.taskName}
                        </h3>
                      </div>
                      <ThreeIcon className="w-5 h-5" />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-0 sm:items-center sm:justify-between mt-5 sm:mt-0 lg:mt-0 2xl:mt-5 text-[0.9rem] pt-5">
                      {/* Priority */}
                      <select className="bg-[#0880EA] text-white  py-1 rounded-md text-[0.9rem] 2xl:text-[1vw] focus:outline-none">
                        <option className="2xl:text-xs">High</option>
                        <option className="2xl:text-xs">Medium</option>
                        <option className="2xl:text-xs">Low</option>
                      </select>

                      {/* End Date */}
                      <div className="text-center 2xl:gap-[]">
                        <p className="text-xs 2xl:text-[0.8vw] 2xl:pb-2">End Date</p>
                        <p className="text-xs 2xl:text-[0.7vw]">{task.endDate}</p>
                      </div>

                      {/* Assignee */}
                      <div className="flex flex-col items-center  2xl:gap-1">
                        <p className="text-xs mr-2 opacity-70 2xl:text-[0.8vw]">
                          Assigned To
                        </p>
                        <div className="flex justify-start items-center m-1 ">
                          <span className="w-8 h-8 2xl:w-11 2xl:h-11 rounded-full bg-red-400 flex items-center justify-center text-white font-semibold text-[0.9rem] 2xl:text-[0.9vw]">
                            {task.assigneeInitials}
                          </span>
                          <span className="ml-2 underline text-[0.9rem] 2xl:text-[0.7vw]">
                            {task.assigneeName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              if (task.type === "summary") {
                return (
                  <div
                    key={task.id}
                    className="rounded-xl p-4 mb-6  text-[#1B1B1F] border border-[#D7D7D7] "
                    style={{ backgroundColor: task.color }}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start 2xl:max-mb-[0.5vw] ">
                      <div>
                        <p className="text-[0.9rem] 2xl:text-[1vw] 2xl:pb-2">Project Name</p>
                        <h3 className="text-[0.9rem] font-medium  2xl:text-[1vw] ">
                          {task.taskName}
                        </h3>
                      </div>
                      <ThreeIcon className="w-5 h-5" />
                    </div>

                    {/* Lead Info */}
                    <div className="flex justify-between mt-6 text-[0.9rem] pt-5">
                      <div className="">
                        <p className="text-[0.7rem] opacity-70 2xl:text-[0.8vw] 2xl:pb-2 ">
                          Lead Name
                        </p>
                        <p className="text-xs font-medium 2xl:text-[0.9vw] ">
                          {task.leadName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[0.7rem] opacity-70 2xl:text-[0.8vw] 2xl:pb-2 ">
                          Renewal Date
                        </p>
                        <p className="text-xs font-medium 2xl:text-[0.9vw] ">
                          {task.renewalDate}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ))}
      </div>
    </main>
  );
}
