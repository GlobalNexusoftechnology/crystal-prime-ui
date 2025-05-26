  export function getRandomColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 20%)`;
  }

const STATUS_COLORS = [
  "#60A5FA", "#34D399", "#FBBF24", "#F87171",
  "#A78BFA", "#F472B6", "#38BDF8", "#FDBA74", "#4ADE80",
];

const statusColorMap = new Map<string, string>();
let availableColors = [...STATUS_COLORS];

export function getColorForStatus(status: string): string {
  const key = status.toLowerCase();

  if (statusColorMap.has(key)) {
    // Return the existing color for the same status
    return statusColorMap.get(key)!;
  }

  if (availableColors.length === 0) {
    availableColors = [...STATUS_COLORS]; // Reset pool
  }

  const randomIndex = Math.floor(Math.random() * availableColors.length);
  const color = availableColors[randomIndex];

  statusColorMap.set(key, color); // Remember the color for this status
  availableColors.splice(randomIndex, 1); // Remove used color

  return color;
}

