export function formattingDate(inputDate: string, mode: string) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  if (mode === "toISO") {
    const date = new Date(inputDate);
    return date.toISOString(); // ISO format (UTC)
  }

  if (mode === "toReadable") {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  }

  throw new Error("Invalid mode. Use 'toISO' or 'toReadable'.");
}
