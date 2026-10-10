import { SectionCharts } from "@/components/dashboard/section-charts";
import { UserFilterSync } from "@/components/dashboard/utils/user-filter-sync";
import { InvoicesPanel } from "@/components/dashboard/invoices-panel";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import type { DashboardData } from "@/lib/dashboard";

export function Dashboard({ data }: { data: DashboardData }) {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row bg-white">
      <UserFilterSync />
      <Sidebar />
      <div className=" flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden lg:h-[calc(100dvh-1.5rem)]">
        <Header data={data} />
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row rounded-lg ">
          <SectionCharts
            industries={data.industries}
            volume={data.volume}
            period={data.filters.period}
          />
          <InvoicesPanel data={data} />
        </div>
      </div>
    </div>
  );
}
