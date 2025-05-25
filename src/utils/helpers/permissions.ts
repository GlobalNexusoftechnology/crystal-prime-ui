import { TOptionItem } from "@/constants";

export function decodePermissions(encodedPermissions: string[]) {
  const result: Record<string, Set<string>> = {};

  for (const code of encodedPermissions) {
    const moduleCode = code.slice(0, 2); // e.g. '10'
    const permissionCodes = code.slice(2).split(""); // e.g. ['1', '2', '3']

    if (!result[moduleCode]) {
      result[moduleCode] = new Set();
    }

    permissionCodes.forEach((permCode) => result[moduleCode].add(permCode));
  }

  return result;
}

export function getLabelFromValue(list: TOptionItem[], value: string): string {
  return list.find((item) => item.value === value)?.label || `Unknown (${value})`;
}