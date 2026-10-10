import type { Transaction } from "@/lib/get-transactions";
import type { FilterOption } from "@/lib/dashboard/types";

function withAllOption(label: string, values: Set<string>): FilterOption[] {
  return [
    { value: "all", label },
    ...[...values]
      .sort((a, b) => a.localeCompare(b))
      .map((value) => ({ value, label: value })),
  ];
}

export function collectOptions(transactions: readonly Transaction[]) {
  const accounts = new Set<string>();
  const industries = new Set<string>();
  const states = new Set<string>();
  let latest = 0;

  for (const row of transactions) {
    accounts.add(row.account);
    industries.add(row.industry);
    states.add(row.state);
    if (row.date > latest) latest = row.date;
  }

  return {
    latest,
    options: {
      accounts: withAllOption("All Accounts", accounts),
      industries: withAllOption("All Industries", industries),
      states: withAllOption("All State", states),
    },
  };
}
