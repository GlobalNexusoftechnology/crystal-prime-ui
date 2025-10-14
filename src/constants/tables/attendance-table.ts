export const generateMonthDates = (year: number, month: number): string[] => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dates: string[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const formatted = new Date(year, month - 1, day)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
    dates.push(formatted);
  }
  return dates;
};
