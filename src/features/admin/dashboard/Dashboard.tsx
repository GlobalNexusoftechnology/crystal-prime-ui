import { analyticalCards } from "@/constants";
import { AnalyticalCard, LeadsListTable } from "./components";

/**
 * Renders the Dashboard section including a welcome message and 
 * a set of analytical summary cards using data from `analyticalCards`.
 */
export function Dashboard() {
  return (
    <section className="flex flex-col gap-2 2xl:gap-[0.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <h1 className="text-xl 2xl:text-[1.25vw] font-medium">Welcome</h1>
        <span className="text-sm 2xl:text-[0.875vw] text-[#918F8F]">
          Wishing you a productive and fulfilling day ahead!
        </span>
      </div>
      <section className="flex gap-4 2xl:gap-[1vw] flex-wrap px-4 2xl:px-[1vw]">
        {analyticalCards.map((card, index) => (
          <AnalyticalCard key={index} data={card} />
        ))}
      </section>
      <LeadsListTable/>
    </section>
  );
}
