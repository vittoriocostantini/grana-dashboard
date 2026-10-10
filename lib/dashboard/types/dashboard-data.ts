import type { DashboardFilters, PageSize } from "@/lib/dashboard-filters";
import type { FilterOption } from "@/lib/dashboard/types/filter-option";
import type { IndustryTotal } from "@/lib/dashboard/types/industry-total";
import type { InvoiceRow } from "@/lib/dashboard/types/invoice-row";
import type { VolumePoint } from "@/lib/dashboard/types/volume-point";

export type DashboardData = {
  filters: DashboardFilters;
  options: {
    accounts: FilterOption[];
    industries: FilterOption[];
    states: FilterOption[];
  };
  summary: {
    earning: string;
    income: string;
    expense: string;
    pending: string;
  };
  industries: IndustryTotal[];
  volume: VolumePoint[];
  invoices: InvoiceRow[];
  page: number;
  pageCount: number;
  pageSize: PageSize;
};
