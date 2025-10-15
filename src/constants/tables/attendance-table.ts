// constants.ts or wherever your generateMonthDates is
export const generateMonthDates = (year: number, month: number): string[] => {
  const dates: string[] = [];
  // Note: month is 1-indexed (1=January, 12=December)
  const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-indexed
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    dates.push(dateString);
  }
  
  return dates;
};