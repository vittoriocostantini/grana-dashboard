"use client";

import { useState } from "react";
import { SelectField } from "@/components/ui/button-select-field";
import {
  accountOptions,
  industryOptions,
  periodOptions,
  stateOptions,
  type Period,
} from "@/lib/invoices";

const filters = [
  {
    id: "period",
    label: "Period",
    options: periodOptions,
  },
  {
    id: "account",
    label: "Account",
    options: accountOptions,
  },
  {
    id: "industry",
    label: "Industry",
    options: industryOptions,
  },
  {
    id: "state",
    label: "State",
    options: stateOptions,
  },
] as const;

export function FilterSelect() {
  const [period, setPeriod] = useState<Period>("7d");
  const [account, setAccount] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [stateName, setStateName] = useState("all");

  const values = {
    period,
    account,
    industry,
    state: stateName,
  };

  function updateFilter(id: (typeof filters)[number]["id"], value: string) {
    if (id === "period") setPeriod(value as Period);
    if (id === "account") setAccount(value);
    if (id === "industry") setIndustry(value);
    if (id === "state") setStateName(value);
  }

  return (
    <div className="flex shrink-0 items-center gap-2.5">
      {filters.map((filter) => (
        <SelectField
          key={filter.id}
          label={filter.label}
          value={values[filter.id]}
          options={filter.options}
          onChange={(value) => updateFilter(filter.id, value)}
        />
      ))}
    </div>
  );
}
