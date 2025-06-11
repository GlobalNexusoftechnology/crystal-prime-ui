// utils/date.ts or wherever your formatting utils are

export const formatIndiaTime = (
  value: string | Date | null | undefined,
  formatType: "toReadable" | "dateOnly" = "toReadable"
): string => {
  if (!value) return "";

  const date = new Date(value);
  if (isNaN(date.getTime())) return ""; // Handles invalid date

  const options: Intl.DateTimeFormatOptions =
    formatType === "dateOnly"
      ? { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Kolkata" }
      : {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        };

  return new Intl.DateTimeFormat("en-IN", options).format(date);
};
