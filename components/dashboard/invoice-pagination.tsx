"use client";

import type { ReactNode } from "react";
import { pageSizes, type PageSize } from "@/lib/dashboard-filters";
import { useDashboardQuery } from "@/lib/use-dashboard-query";

function isPageSize(value: number): value is PageSize {
  return pageSizes.some((size) => size === value);
}

export function InvoicePagination({
  page,
  pageCount,
  pageSize,
  children,
}: {
  page: number;
  pageCount: number;
  pageSize: PageSize;
  children: ReactNode;
}) {
  const { setFilters, pending } = useDashboardQuery();

  function selectPageSize(next: number) {
    if (!isPageSize(next)) return;
    setFilters({ pageSize: next });
  }

  function goToPage(next: number) {
    setFilters({ page: next }, true);
  }

  return (
    <>
      {children}
      <div
        aria-busy={pending}
        className="mt-4 flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <label className="flex items-center gap-2 text-xs text-quiet">
          Show by
          <select
            value={pageSize}
            onChange={(event) => selectPageSize(Number(event.target.value))}
            className="rounded border border-zinc-200 bg-white p-1 text-xs text-ink"
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
            disabled={page === 1 || pending}
            onClick={() => goToPage(page - 1)}
            className="px-1 enabled:text-ink disabled:opacity-30"
          >
            ‹
          </button>
          <span className="rounded border border-zinc-200 px-2 py-0.5 text-ink">
            {page}
          </span>
          <span>/ {pageCount}</span>
          <button
            type="button"
            aria-label="Next page"
            disabled={page === pageCount || pending}
            onClick={() => goToPage(page + 1)}
            className="px-1 enabled:text-ink disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}
