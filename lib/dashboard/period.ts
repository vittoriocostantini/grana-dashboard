import type { Period } from "@/lib/dashboard-filters";

export const DAY = 24 * 60 * 60 * 1000;

const periodDays = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  "1y": 365,
} as const satisfies Record<Period, number>;

export function periodStart(latest: number, period: Period) {
  return latest - periodDays[period] * DAY;
}

export function startOfUtcDay(timestamp: number) {
  const date = new Date(timestamp);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}
