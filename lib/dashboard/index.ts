import type { DashboardFilters } from "@/lib/dashboard-filters";
import type { Transaction } from "@/lib/get-transactions";
import { industrySeries, volumeSeries } from "@/lib/dashboard/charts";
import { formatSummary } from "@/lib/dashboard/format";
import { collectOptions } from "@/lib/dashboard/options";
import { periodStart } from "@/lib/dashboard/period";
import { selectScoped } from "@/lib/dashboard/scope";
import { pageInvoices } from "@/lib/dashboard/table";
import type { DashboardData } from "@/lib/dashboard/types";

export type {
  DashboardData,
  FilterOption,
  IndustryTotal,
  InvoiceRow,
  VolumePoint,
} from "@/lib/dashboard/types";

export function buildDashboard(
  transactions: readonly Transaction[],
  filters: DashboardFilters,
): DashboardData {
  const { latest, options } = collectOptions(transactions);
  const from = periodStart(latest, filters.period);
  const scoped = selectScoped(transactions, filters, from);
  const page = pageInvoices(scoped.rows, filters);

  return {
    filters: { ...filters, page: page.page },
    options,
    summary: {
      earning: formatSummary(scoped.income - scoped.expense),
      income: formatSummary(scoped.income),
      expense: formatSummary(scoped.expense),
      pending: "0",
    },
    industries: industrySeries(scoped.rows),
    volume: volumeSeries(scoped.rows, from, latest, filters.period),
    invoices: page.invoices,
    page: page.page,
    pageCount: page.pageCount,
    pageSize: filters.pageSize,
  };
}
