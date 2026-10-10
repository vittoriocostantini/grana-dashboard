export const periodOptions = [
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
  { value: "1y", label: "1y" },
] as const;

export type Period = (typeof periodOptions)[number]["value"];

export const pageSizes = [25, 50, 75] as const;
export type PageSize = (typeof pageSizes)[number];

export type InvoiceType = "withdraw" | "deposit";
export type InvoiceFilter = "all" | InvoiceType;

export type DashboardFilters = {
  period: Period;
  account: string;
  industry: string;
  state: string;
  type: InvoiceFilter;
  page: number;
  pageSize: PageSize;
};

export const defaultFilters: DashboardFilters = {
  period: "7d",
  account: "all",
  industry: "all",
  state: "all",
  type: "all",
  page: 1,
  pageSize: 25,
};

function isPeriod(value: string | undefined): value is Period {
  return periodOptions.some((option) => option.value === value);
}

function isPageSize(value: number): value is PageSize {
  return pageSizes.some((size) => size === value);
}

function isInvoiceFilter(value: string | undefined): value is InvoiceFilter {
  return value === "all" || value === "withdraw" || value === "deposit";
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseDashboardFilters(
  params: Record<string, string | string[] | undefined>,
): DashboardFilters {
  const page = Number(first(params.page));
  const pageSize = Number(first(params.pageSize));
  const period = first(params.period);
  const type = first(params.type);

  return {
    period: isPeriod(period) ? period : defaultFilters.period,
    account: first(params.account) || defaultFilters.account,
    industry: first(params.industry) || defaultFilters.industry,
    state: first(params.state) || defaultFilters.state,
    type: isInvoiceFilter(type) ? type : defaultFilters.type,
    page: Number.isInteger(page) && page >= 1 ? page : defaultFilters.page,
    pageSize: isPageSize(pageSize) ? pageSize : defaultFilters.pageSize,
  };
}
