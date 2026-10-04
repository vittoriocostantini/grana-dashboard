import { SectionCharts } from "@/components/dashboard/section-charts";
import { Header } from "@/components/layout/header";
import { InvoicesPanel } from "@/components/dashboard/invoices-panel";
import { Sidebar } from "@/components/layout/sidebar";

export function Dashboard() {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <Sidebar />
      <div className="m-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[20px] sm:m-3 lg:my-3 lg:mr-3 lg:ml-0 lg:h-[calc(100dvh-1.5rem)]">
        <Header />
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row rounded-lg bg-white">
          <SectionCharts />
          <InvoicesPanel />
        </div>
      </div>
    </div>
  );
}
