"use client";

import type { ReactNode } from "react";
import { useInvoicePagination } from "@/hooks/use-invoice-pagination";
import { pageSizes } from "@/lib/invoices";

export function InvoicePagination<T>({
  items,
  children,
}: {
  items: readonly T[];
  children: (rows: T[]) => ReactNode;
}) {
  const {
    pageSize,
    rows,
    currentPage,
    pageCount,
    selectPageSize,
    goToPage,
  } = useInvoicePagination(items);

  return (
    <>
      {children(rows)}
      <div className="mt-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-xs text-quiet">
          Show by
          <select
            value={pageSize}
            onChange={(event) => selectPageSize(Number(event.target.value))}
            className="rounded border border-zinc-200 bg-white px-2 py-1 text-xs text-ink"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2 text-xs text-quiet">
          <button
            type="button"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="px-1 enabled:text-ink disabled:opacity-30"
          >
            ‹
          </button>
          <span className="rounded border border-zinc-200 px-2 py-0.5 text-ink">
            {currentPage}
          </span>
          <span>/ {pageCount}</span>
          <button
            type="button"
            aria-label="Next page"
            disabled={currentPage === pageCount}
            onClick={() => goToPage(currentPage + 1)}
            className="px-1 enabled:text-ink disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}
