  export function getRandomColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 20%)`;
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
];

const statusColorMap = new Map<string, string>();
let nextColorIndex = 0;

/**
 * Get a unique color for a status name.
 * Guarantees the same status always gets the same color, and no two statuses get the same color until pool exhausted.
 */
export function getColorForStatus(status: string): string {
  const key = status.toLowerCase();

  // Return if already assigned
  if (statusColorMap.has(key)) {
    return statusColorMap.get(key)!;
  }

  // Assign next color
  const color = STATUS_COLORS[nextColorIndex % STATUS_COLORS.length];
  statusColorMap.set(key, color);
  nextColorIndex++;

  return color;
}