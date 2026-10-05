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

type FilterId = (typeof filters)[number]["id"];

type FilterValues = {
  period: Period;
  account: string;
  industry: string;
  state: string;
};
// verifica que el valor sea uno de los periodos validos
function isPeriod(value: string): value is Period {
  return periodOptions.some((option) => option.value === value);
}

export function FilterSelect() {
  const [values, setValues] = useState<FilterValues>({
    period: "7d",
    account: "all",
    industry: "all",
    state: "all",
  });
// si id es period, verifica que el valor sea uno de los periodos validos
// si no, evita que se actualice el valor
  function updateFilter(id: FilterId, value: string) {
    if (id === "period") {
      if (!isPeriod(value)) return;
      setValues((current) => ({ ...current, period: value }));
      return;
    }
// setValues actualiza el valor del filtro
    setValues((current) => ({ ...current, [id]: value }));
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
