"use client";

import { useMemo, useState } from "react";
import { pageSizes, type PageSize } from "@/lib/invoices";

// define el tipo de la ventana de paginación
type PageWindow<T> = {
  rows: T[];
  currentPage: number;
  pageCount: number;
};

export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number,
): PageWindow<T> {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    rows: items.slice(start, start + pageSize),
    currentPage,
    pageCount,
  };
}

// verifica que el valor sea uno de los tamaños de página validos
function isPageSize(value: number): value is PageSize {
  return pageSizes.some((size) => size === value);
}

export function useInvoicePagination<T>(items: readonly T[]) {
  const [pageSize, setPageSize] = useState<PageSize>(25);
  const [page, setPage] = useState(1);

  // useMemo para calcular las filas de la página actual
  const { rows, currentPage, pageCount } = useMemo(
    () => paginate(items, page, pageSize),
    [items, page, pageSize],
  );

  // verifica que el valor sea uno de los tamaños de página validos
  function selectPageSize(next: number) {
    if (!isPageSize(next)) return;
    setPageSize(next);
    setPage(1);
  }

  function goToPage(next: number) {
    setPage(Math.min(Math.max(1, next), pageCount));
  }

  return {
    pageSize,
    rows,
    currentPage,
    pageCount,
    selectPageSize,
    goToPage,
  };
}
