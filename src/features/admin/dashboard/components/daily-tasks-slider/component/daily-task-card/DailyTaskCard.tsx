import { motion } from "framer-motion";

interface IDailyTaskCardProps {
  priority: string;
  date: string;
  task: string;
  assignedTo: string;
  color: string;
}

export const DailyTaskCard = ({
  priority,
  date,
  task,
  assignedTo,
  color,
}: IDailyTaskCardProps) => {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0}}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`relative flex flex-col items-center justify-between w-full rounded-xl shadow-xl p-4 2xl:p-[1vw] ${color} text-gray-900`}
    >
      <div className="flex flex-col items-start">
        <p className="text-sm 2xl:text-[0.875vw] font-medium">Task Name</p>
        <h2 className="2xl:text-[1vw]">{task}</h2>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4 2xl:gap-[1vw] mt-4 2xl:mt-[1vw] text-sm 2xl:text-[0.875vw]">
        <div>
          <button className="bg-blue-500 text-white text-sm 2xl:text-[0.875vw] px-2 py-1 rounded-md">
            {priority}
          </button>
        </div>
        <div>
          <h1>Date</h1>
          <span className="font-semibold">{date}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[1rem] 2xl:text-[1vw]">Assigned to</span>
          <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
            <div className="w-7 h-7 rounded-full bg-red-300 flex items-center justify-center text-[1rem] 2xl:text-[1vw]  text-white">
              {assignedTo}
            </div>
            <span className="text-[1rem] 2xl:text-[1vw] underline">Me</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
