import { InvoiceFilters } from "@/components/ui/invoice-filters";
import { InvoiceMetrics } from "@/components/dashboard/invoice-metrics";
import { InvoicePagination } from "@/components/dashboard/invoice-pagination";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { Card } from "@/components/ui/card";
import type { DashboardData } from "@/lib/dashboard";

export function InvoicesPanel({ data }: { data: DashboardData }) {
  return (
    <Card
      plain
      className="h-full min-h-0   min-w-0 flex-1 overflow-hidden p-2 sm:py-2 px-5 bg-red border border-[#EAEAEA] rounded-3xl"
    >
      <Card.Header className="shrink-0">
        <Card.Title>Invoices</Card.Title>
      </Card.Header>

      <InvoiceMetrics summary={data.summary} />

      <InvoiceFilters value={data.filters.type} />

      <InvoicePagination
        page={data.page}
        pageCount={data.pageCount}
        pageSize={data.pageSize}
      >
        <TransactionsTable rows={data.invoices} />
      </InvoicePagination>
    </Card>
  );
}
