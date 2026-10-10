import type { DashboardFilters } from "@/lib/dashboard-filters";
import type { Transaction } from "@/lib/get-transactions";
import { DAY, startOfUtcDay } from "@/lib/dashboard/period";
import type { IndustryTotal, VolumePoint } from "@/lib/dashboard/types";

export function industrySeries(rows: readonly Transaction[]): IndustryTotal[] {
  const totals = new Map<string, { revenue: number; expenses: number }>();

  for (const row of rows) {
    const current = totals.get(row.industry) ?? { revenue: 0, expenses: 0 };
    if (row.type === "deposit") current.revenue += row.amount;
    else current.expenses += row.amount;
    totals.set(row.industry, current);
  }

  return [...totals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([industry, amounts]) => ({ industry, ...amounts }));
}

export function volumeSeries(
  rows: readonly Transaction[],
  from: number,
  to: number,
  period: DashboardFilters["period"],
): VolumePoint[] {
  const daily = period === "7d" || period === "30d";
  const buckets = new Map<number, VolumePoint>();

  if (daily) {
    const start = startOfUtcDay(from);
    const end = startOfUtcDay(to);
    for (let time = start; time <= end; time += DAY) {
      buckets.set(time, {
        label: new Date(time).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        }),
        deposits: 0,
        withdrawals: 0,
      });
    }
  } else {
    const startDate = new Date(from);
    const endDate = new Date(to);
    let year = startDate.getUTCFullYear();
    let month = startDate.getUTCMonth();
    const endKey = endDate.getUTCFullYear() * 12 + endDate.getUTCMonth();

    while (year * 12 + month <= endKey) {
      const time = Date.UTC(year, month, 1);
      buckets.set(time, {
        label: new Date(time).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        }),
        deposits: 0,
        withdrawals: 0,
      });
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
    }
  }

  for (const row of rows) {
    const date = new Date(row.date);
    const key = daily
      ? Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      : Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    if (row.type === "deposit") bucket.deposits += 1;
    else bucket.withdrawals += 1;
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, bucket]) => bucket);
}
