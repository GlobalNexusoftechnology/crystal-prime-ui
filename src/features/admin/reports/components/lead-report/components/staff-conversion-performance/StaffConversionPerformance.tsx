import React, { useRef, useState, useEffect } from "react";

interface StaffConversionPerformanceProps {
  data?: Array<{
    staffName: string;
    conversionRate: number;
  }>;
}

export const StaffConversionPerformance: React.FC<StaffConversionPerformanceProps> = ({ data }) => {
  const staffData = data ? data.map(item => ({
    name: item.staffName,
    initials: item.staffName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
    percent: item.conversionRate || 0
  })) : [
    { name: "No Data", initials: "ND", percent: 0 },
  ];
  const listRef = useRef<HTMLDivElement>(null);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (el) {
      setShowScroll(el.scrollHeight > el.clientHeight);
    }
  }, []);

  const handleScrollToMore = () => {
    const el = listRef.current;
    if (el) {
      el.scrollBy({ top: 120, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[1.1rem] 2xl:text-[1.1vw] font-medium text-black">Staff Conversion Performance</span>
      </div>
      <div
        ref={listRef}
        className="flex flex-col gap-6 max-h-60 overflow-y-auto pr-2"
        style={{ scrollBehavior: "smooth" }}
      >
        {staffData?.length > 0 && staffData.map((staff, idx) => (
          <div key={idx} className="flex items-center gap-4 w-full">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow">
                {staff.initials}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="underline text-lg font-medium text-[#1a2341] cursor-pointer">{staff.name}</span>
                <span className="text-lg font-medium text-[#1a2341]">{staff.percent}%</span>
              </div>
              <div className="mt-2 w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#6C2BD7] to-[#3B1ED7]"
                  style={{ width: `${staff.percent}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showScroll && (
        <div className="mt-6">
          <button
            className="text-[#1a2341] underline cursor-pointer text-lg font-medium focus:outline-none"
            onClick={handleScrollToMore}
            type="button"
          >
            Scroll to View More
          </button>
        </div>
      )}
    </div>
  );
}; 