import { cn } from "@/lib/cn";
import type { DashboardData } from "@/lib/dashboard";

const metricLayout = [
  {
    label: "Income",
    subtitle: "Total Income",
    icon: "/icons/income-logo.svg",
    color: "text-[#000000]",
    key: "income",
  },
  {
    label: "Expense",
    subtitle: "Total Expense",
    icon: "/icons/expense-logo.svg",
    color: "text-[#000000]",
    flip: true,
    key: "expense",
  },
  {
    label: "Pending Transactions",
    icon: "/icons/pending-logo.svg",
    color: "text-[#000000]",
    key: "pending",
  },
] as const;

export function InvoiceMetrics({
  summary,
}: {
  summary: DashboardData["summary"];
}) {
  return (
    <div className="mt-4 flex shrink-0 flex-col sm:flex-row sm:items-stretch  gap-4">
      {metricLayout.map((metric, index) => (
        <div
          key={metric.label}
          className="flex min-w-0 flex-1 flex-col sm:flex-row border border-[#EAEAEA] p-4 rounded-3xl"
        >
          {index > 0 && (
            <span
              aria-hidden
              className="mx-5 my-3 h-px  sm:mx-0 sm:my-1 sm:h-auto sm:w-px"
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
              {summary[metric.key]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
