"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { FilterSelect } from "@/components/dashboard/utils/filter-select";
import { Card } from "@/components/ui/card";
import type { DashboardData } from "@/lib/dashboard";

export function Header({ data }: { data: DashboardData }) {
  const { user } = useAuth();

  return (
    <header className="mb-5 flex min-w-0 shrink-0 flex-col gap-4 border-t border-b border-[#EAEAEA] lg:gap-5">
      <h1 className="p-2 text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl">
        Welcome back, {user?.name} <span aria-hidden>👋</span>
      </h1>

      <Card plain className="min-w-0">
        <div className="flex min-w-0 flex-col gap-4 border-t border-[#EAEAEA] p-2 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
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
