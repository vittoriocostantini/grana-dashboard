"use client";

import { SelectField } from "@/components/ui/button-select-field";
import {
  periodOptions,
  type DashboardFilters,
  type Period,
} from "@/lib/dashboard-filters";
import type { FilterOption } from "@/lib/dashboard";
import { useDashboardQuery } from "@/lib/use-dashboard-query";
import { defaultScopeFilters, scopeFiltersEqual } from "@/lib/user-filters";

const fields = [
  { id: "period", label: "Period" },
  { id: "account", label: "Account" },
  { id: "industry", label: "Industry" },
  { id: "state", label: "State" },
] as const;

type FilterId = (typeof fields)[number]["id"];

function isPeriod(value: string): value is Period {
  return periodOptions.some((option) => option.value === value);
}

export function FilterSelect({
  values,
  options,
}: {
  values: Pick<DashboardFilters, FilterId>;
  options: {
    accounts: FilterOption[];
    industries: FilterOption[];
    states: FilterOption[];
  };
}) {
  const { setFilters, pending } = useDashboardQuery();
  const choices = {
    period: periodOptions,
    account: options.accounts,
    industry: options.industries,
    state: options.states,
  };

  const defaults = defaultScopeFilters();
  const filtersAreDefault = scopeFiltersEqual(values, defaults);

  function updateFilter(id: FilterId, value: string) {
    if (id === "period" && !isPeriod(value)) return;
    setFilters({ [id]: value });
  }

  function resetFilters() {
    setFilters(defaults);
  }

  return (
    <div className="flex shrink-0 items-center gap-2.5" aria-busy={pending}>
      {fields.map((field) => (
        <SelectField
          key={field.id}
          label={field.label}
          value={values[field.id]}
          options={choices[field.id]}
          onChange={(value) => updateFilter(field.id, value)}
        />
      ))}
      <button
        type="button"
        onClick={resetFilters}
        disabled={filtersAreDefault || pending}
        className="h-9 cursor-pointer rounded-lg  bg-[#054971] px-3 text-sm text-white hover:border-[#c8c8c8] disabled:cursor-default disabled:opacity-40"
      >
        Reset
      </button>
    </div>
  );
}
