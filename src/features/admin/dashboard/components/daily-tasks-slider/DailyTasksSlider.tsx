"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DailyTaskCard } from "./component";
import { motion, AnimatePresence } from "framer-motion";
import { HorizontalTreeDotIcon } from "@/features";

const tasks = [
  {
    priority: "High",
    date: "20 / 02 / 2022",
    task: "E-Commerce App Development",
    assignedTo: "Aj",
    color: "bg-blue-200",
  },
  {
    priority: "Medium",
    date: "21 / 02 / 2022",
    task: "Marketing Strategy",
    assignedTo: "Sm",
    color: "bg-yellow-200",
  },
  {
    priority: "Low",
    date: "22 / 02 / 2022",
    task: "Customer Survey",
    assignedTo: "Ra",
    color: "bg-green-200",
  },
];

export function DailyTasksSlider() {
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"today" | "tomorrow">("today");

  const handlePrev = () =>
    setIndex((prev) => (prev === 0 ? tasks.length - 1 : prev - 1));
  const handleNext = () =>
    setIndex((prev) => (prev === tasks.length - 1 ? 0 : prev + 1));

  return (
    <div className="flex flex-col gap-10 2xl:gap-[2.5vw] border 2xl:border-[0.1vw] rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-sm 2xl:text-[0.875vw] font-semibold">
          Daily Task
        </span>
        <div className="flex gap-4 2xl:gap-[1vw] items-center text-sm 2xl:text-[0.875vw] font-medium">
          <button
            className={`pb-1 2xl:pb-[0.25vw] ${
              activeTab === "today"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
          <button
            className={`pb-1 2xl:pb-[0.25vw] ${
              activeTab === "tomorrow"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("tomorrow")}
          >
            Tomorrow
          </button>
        </div>
        <HorizontalTreeDotIcon className="w-8 h-8 2xl:w-[2vw] 2xl:h-[2vw]" />
      </div>
      {/* Content */}
      {activeTab === "today" ? (
        <div className="relative flex justify-between items-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="z-10 p-2 2xl:p-[0.5vw] border rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          {/* Card Stack */}
          <div className="relative flex justify-center items-center w-full">
            {/* Bottom Next Card Preview */}
            <div className="absolute bottom-[-4px] scale-95 opacity-70 z-0 pointer-events-none">
              <DailyTaskCard {...tasks[(index + 1) % tasks.length]} />
            </div>
            {/* Foreground (Current) Card with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="z-10"
              >
                <DailyTaskCard {...tasks[index]} />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="z-10 p-2 2xl:p-[0.5vw] border rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      ) : (
        <div className="text-center text-lg 2xl:text-[1.125vw] text-gray-600 font-semibold">
          Hello
        </div>
      )}
    </div>
  );
}
