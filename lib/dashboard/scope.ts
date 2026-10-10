import type { DashboardFilters } from "@/lib/dashboard-filters";
import type { Transaction } from "@/lib/get-transactions";

function matches(row: Transaction, filters: DashboardFilters, from: number) {
  if (row.date < from) return false;
  if (filters.account !== "all" && row.account !== filters.account) return false;
  if (filters.industry !== "all" && row.industry !== filters.industry) return false;
  if (filters.state !== "all" && row.state !== filters.state) return false;
  return true;
}

export function selectScoped(
  transactions: readonly Transaction[],
  filters: DashboardFilters,
  from: number,
) {
  const rows: Transaction[] = [];
  let income = 0;
  let expense = 0;

  for (const row of transactions) {
    if (!matches(row, filters, from)) continue;
    rows.push(row);
    if (row.type === "deposit") income += row.amount;
    else expense += row.amount;
  }

  return { rows, income, expense };
}
