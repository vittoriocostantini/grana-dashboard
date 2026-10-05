import { cn } from "@/lib/cn";
import type { InvoiceFilter } from "@/lib/invoices";

const filters: Array<{ id: InvoiceFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "withdraw", label: "Withdraw" },
  { id: "deposit", label: "Deposit" },
];

export function InvoiceFilters({
  value,
  onChange,
}: {
  value: InvoiceFilter;
  onChange: (next: InvoiceFilter) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Invoice type"
      className="mt-5 flex shrink-0 items-center gap-1 text-sm"
    >
      {filters.map((item) => {
        const selected = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={cn(
              "rounded-md px-3 py-1",
              selected
                ? "bg-zinc-100 font-medium text-ink"
                : "text-quiet hover:text-ink",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
