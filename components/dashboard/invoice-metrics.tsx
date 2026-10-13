import { cn } from "@/lib/cn";
import type { DashboardData } from "@/lib/dashboard";

const metricLayout = [
  {
    label: "Income",
    subtitle: "Total Income",
    icon: "/icons/income-logo.svg",
    key: "income",
  },
  {
    label: "Expense",
    subtitle: "Total Expense",
    icon: "/icons/expense-logo.svg",
    flip: true,
    key: "expense",
  },
  {
    label: "Pending Transactions",
    icon: "/icons/pending-logo.svg",
    key: "pending",
  },
] as const;

export function InvoiceMetrics({
  summary,
}: {
  summary: DashboardData["summary"];
}) {
  return (
    <div className="mt-4 grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-3">
      {metricLayout.map((metric) => (
        <div
          key={metric.label}
          className="flex min-w-0 flex-col gap-2 rounded-3xl border border-[#EAEAEA] p-4"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
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
            <p className="text-xs text-[#8a8a8a]">{metric.subtitle}</p>
          )}
          <p className="mt-auto text-2xl leading-none font-bold tracking-tight text-ink tabular-nums whitespace-nowrap sm:text-xl">
            {summary[metric.key]}
          </p>
        </div>
      ))}
    </div>
  );
}
