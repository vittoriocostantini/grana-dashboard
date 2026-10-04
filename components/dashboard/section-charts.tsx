import { FloatingBarChart } from "@/components/dashboard/floating-bar-chart";
import { LineChart } from "@/components/dashboard/line-chart";

export function SectionCharts() {
  return (
    <section className="flex min-h-0 flex-col gap-5 px-5 pb-5 sm:px-6 lg:h-full lg:w-[44%] lg:shrink-0 lg:overflow-y-auto  rounded-3xl shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)] p-2">
      <div className="relative min-h-96 w-full flex-1">
        <div className="absolute inset-0">
          <FloatingBarChart />
        </div>
      </div>

      <div className="relative h-56 w-full sm:h-64">
        <div className="absolute inset-0">
          <LineChart />
        </div>
      </div>
    </section>
  );
}
