"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { FilterSelect } from "@/components/dashboard/utils/filter-select";
import { Card } from "@/components/ui/card";
import type { DashboardData } from "@/lib/dashboard";

export function Header({ data }: { data: DashboardData }) {
  const { user } = useAuth();

  return (
    <header className="flex shrink-0 flex-col gap-5 mb-5 border-t border-b border-[#EAEAEA]">
      <h1 className="text-3xl font-semibold tracking-tight text-ink p-2">
        Welcome back, {user?.name} <span aria-hidden>👋</span>
      </h1>

      <Card plain>
        <div className="flex items-center justify-between gap-6 border-t border-[#EAEAEA] p-2">
          <div className="shrink-0 p-2">
            <Card.Label size="md">Total earning</Card.Label>

            <Card.Value size="xl" className="mt-1">
              {data.summary.earning}
            </Card.Value>
          </div>

          <FilterSelect values={data.filters} options={data.options} />
        </div>
      </Card>
    </header>
  );
}
