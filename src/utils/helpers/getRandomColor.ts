  export function getRandomColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  }

  const STATUS_COLORS = [
  "#60A5FA", // blue-400
  "#34D399", // green-400
  "#FBBF24", // yellow-400
  "#F87171", // red-400
  "#A78BFA", // purple-400
  "#F472B6", // pink-400
  "#38BDF8", // sky-400
  "#FDBA74", // orange-400
  "#4ADE80", // emerald-400
  "#818CF8", // indigo-400
];

/**
 * Simple hash function to convert string to number
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get a consistent color for a status name
 */
export function getColorForStatus(status: string): string {
  const index = hashString(status.toLowerCase()) % STATUS_COLORS.length;
  return STATUS_COLORS[index];
}
