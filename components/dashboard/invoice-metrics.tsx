import { cn } from "@/lib/cn";
import { summary } from "@/lib/invoices";

const metrics = [
  {
    label: "Income",
    subtitle: "Total Income",
    value: summary.income,
    icon: "/icons/income-logo.svg",
    color: "text-[#000000]",
  },
  {
    label: "Expense",
    subtitle: "Total Expense",
    value: summary.expense,
    icon: "/icons/expense-logo.svg",
    color: "text-[#000000]",
    flip: true,
  },
  {
    label: "Pending Transactions",
    value: summary.pending,
    icon: "/icons/pending-logo.svg",
    color: "text-[#000000]",
  },
] as const;

export function InvoiceMetrics() {
  return (
    <div className="mt-4 flex shrink-0 flex-col rounded-[10px] border border-[#b7b7b7]  py-4 sm:flex-row sm:items-stretch sm:py-5 ">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="flex min-w-0 flex-1 flex-col sm:flex-row"
        >
          {index > 0 && (
            <span
              aria-hidden
              className="mx-5 my-3 h-px bg-[#e6e6e6] sm:mx-0 sm:my-1 sm:h-auto sm:w-px"
            />
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-2 px-5 sm:px-6">
            <p
              className={cn(
                "flex items-center gap-2 text-sm font-medium",
                metric.color,
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={metric.icon}
                alt=""
                className={cn(
                  "size-3.5 shrink-0",
                  "flip" in metric && metric.flip && "rotate-180",
                )}
              />
              <span className="truncate">{metric.label}</span>
            </p>
            {"subtitle" in metric && (
              <p className="text-[12px] text-[#8a8a8a]">{metric.subtitle}</p>
            )}
            <p className="text-[1.65rem] leading-none font-bold tracking-tight text-ink tabular-nums">
              {metric.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
