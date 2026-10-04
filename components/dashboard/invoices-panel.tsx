"use client";

import { useMemo, useState } from "react";
import { InvoiceFilters } from "@/components/dashboard/invoice-filters";
import { InvoiceMetrics } from "@/components/dashboard/invoice-metrics";
import { InvoicePagination } from "@/components/dashboard/invoice-pagination";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { Card } from "@/components/ui/card";
import { invoices, type InvoiceFilter } from "@/lib/invoices";

export function InvoicesPanel() {
  const [filter, setFilter] = useState<InvoiceFilter>("withdraw");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? invoices
        : invoices.filter((invoice) => invoice.type === filter),
    [filter],
  );

  return (
    <Card
      plain
      className="h-full min-h-0 min-w-0 flex-1 overflow-hidden p-2 sm:py-2 px-5 bg-red"
    >
      <Card.Header className="shrink-0">
        <Card.Title>Invoices</Card.Title>
      </Card.Header>

      <InvoiceMetrics />

      <InvoiceFilters value={filter} onChange={setFilter} />

      <InvoicePagination key={filter} items={filtered}>
        {(rows) => <TransactionsTable rows={rows} />}
      </InvoicePagination>
    </Card>
  );
}
