const metrics = [
  {
    label: "Conversion Rate",
    value: "26.6%",
    underline: true,
  },
  {
    label: "Avg Lead Age",
    value: "5.5 Days",
    underline: true,
  },
  {
    label: "Avg Follow-ups Lead",
    value: "3.1",
    underline: false,
  },
  {
    label: "Top Performing Source",
    value: "Referral",
    underline: true,
  },
  {
    label: "Avg Time to Convert",
    value: "54 Days",
    underline: true,
  },
  {
    label: "Pending Follow-ups",
    value: "18",
    underline: true,
  },
  {
    label: "Hot Leads Count",
    value: "22",
    underline: true,
  },
  {
    label: "Average Response Time",
    value: "4.5 Hrs",
    underline: true,
  },
];

export const LeadMetrics: React.FC = () => {
  return (
    <div className="border-b 2xl:border-b-[0.1vw] pr-6 2xl:pr-[1.5vw] pb-6 2xl:pb-[1.5vw]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 w-full">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div>
              <div className="2xl:text-[1vw] font-light text-gray-800">
                {metric.label}
              </div>
              <div
                className={
                  `text-[1rem] 2xl:text-[1vw] font-medium text-[#1a2341] mt-1` +
                  (metric.underline ? " underline cursor-pointer" : "")
                }
              >
                {metric.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
