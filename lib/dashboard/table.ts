import type { DashboardFilters } from "@/lib/dashboard-filters";
import type { Transaction } from "@/lib/get-transactions";
import { formatAmount, formatDate } from "@/lib/dashboard/format";
import type { InvoiceRow } from "@/lib/dashboard/types";

function toInvoiceRow(row: Transaction): InvoiceRow {
  return {
    id: row.id,
    account: row.account,
    date: formatDate(row.date),
    industry: row.industry,
    state: row.state,
    amount: formatAmount(row.amount),
    currency: row.currency,
    type: row.type,
  };
}

export function pageInvoices(
  rows: readonly Transaction[],
  filters: DashboardFilters,
) {
  const table =
    filters.type === "all" ? rows : rows.filter((row) => row.type === filters.type);
  const pageCount = Math.max(1, Math.ceil(table.length / filters.pageSize));
  const page = Math.min(filters.page, pageCount);
  const start = (page - 1) * filters.pageSize;

  return {
    invoices: table.slice(start, start + filters.pageSize).map(toInvoiceRow),
    page,
    pageCount,
  };
}
