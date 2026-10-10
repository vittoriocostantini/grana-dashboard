"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { periodOptions, type Period } from "@/lib/dashboard-filters";
import {
  defaultScopeFilters,
  isScopeFilterKey,
  readUserFilters,
  saveUserFilters,
  type UserScopeFilters,
} from "@/lib/user-filters";

function isPeriod(value: string): value is Period {
  return periodOptions.some((option) => option.value === value);
}

export function useDashboardQuery() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function setFilters(
    patch: Record<string, string | number>,
    keepPage = false,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(patch)) {
      params.set(key, String(value));
    }

    if (!keepPage) params.delete("page");

    if (user && Object.keys(patch).some(isScopeFilterKey)) {
      const next: UserScopeFilters = readUserFilters(user.email) ?? defaultScopeFilters();

      for (const [key, value] of Object.entries(patch)) {
        if (!isScopeFilterKey(key)) continue;
        const text = String(value);
        if (key === "period") {
          if (!isPeriod(text)) continue;
          next.period = text;
          continue;
        }
        if (!text) continue;
        next[key] = text;
      }

      saveUserFilters(user.email, next);
      params.set("period", next.period);
      params.set("account", next.account);
      params.set("industry", next.industry);
      params.set("state", next.state);
    }

    const query = params.toString();
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname);
    });
  }

  return { setFilters, pending };
}
