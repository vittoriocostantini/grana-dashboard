"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { parseDashboardFilters } from "@/lib/dashboard-filters";
import {
  defaultScopeFilters,
  readUserFilters,
  scopeFiltersEqual,
  type UserScopeFilters,
} from "@/lib/user-filters";

function scopeFromSearchParams(searchParams: URLSearchParams): UserScopeFilters {
  const parsed = parseDashboardFilters({
    period: searchParams.get("period") ?? undefined,
    account: searchParams.get("account") ?? undefined,
    industry: searchParams.get("industry") ?? undefined,
    state: searchParams.get("state") ?? undefined,
  });

  return {
    period: parsed.period,
    account: parsed.account,
    industry: parsed.industry,
    state: parsed.state,
  };
}

export function UserFilterSync() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!user) return;

    const saved = readUserFilters(user.email) ?? defaultScopeFilters();
    if (scopeFiltersEqual(saved, scopeFromSearchParams(searchParams))) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("period", saved.period);
    params.set("account", saved.account);
    params.set("industry", saved.industry);
    params.set("state", saved.state);
    params.delete("page");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [user, searchParams, pathname, router]);

  return null;
}
