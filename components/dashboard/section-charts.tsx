import { FloatingBarChart } from "@/components/dashboard/floating-bar-chart";
import { LineChart } from "@/components/dashboard/line-chart";
import type { IndustryTotal, VolumePoint } from "@/lib/dashboard";
import type { Period } from "@/lib/dashboard-filters";

export function SectionCharts({
  industries,
  volume,
  period,
}: {
  industries: IndustryTotal[];
  volume: VolumePoint[];
  period: Period;
}) {
  return (
    <section className="flex min-h-0 flex-col gap-5 px-5 sm:px-6 lg:h-full lg:w-[44%] lg:shrink-0 lg:overflow-y-auto ">
      <div className="relative min-h-96 w-full flex-1 border rounded-3xl border-[#EAEAEA]">
      <div className="absolute inset-0 p-5">
          <FloatingBarChart rows={industries} />
        </div>
      </div>

      <div className="relative h-56 w-full sm:h-64">
        <div className="absolute inset-0">
          <LineChart
            points={volume}
            axisTitle={period === "7d" || period === "30d" ? "Days" : "Months"}
          />
        </div>
      </div>
    </section>
  );
}
