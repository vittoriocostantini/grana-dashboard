import {
  defaultFilters,
  periodOptions,
  type DashboardFilters,
  type Period,
} from "@/lib/dashboard-filters";

export type UserScopeFilters = Pick<
  DashboardFilters,
  "period" | "account" | "industry" | "state"
>;

const STORAGE_KEY = "grana_user_filters";

const scopeKeys = ["period", "account", "industry", "state"] as const;

function isPeriod(value: unknown): value is Period {
  return periodOptions.some((option) => option.value === value);
}

export function defaultScopeFilters(): UserScopeFilters {
  return {
    period: defaultFilters.period,
    account: defaultFilters.account,
    industry: defaultFilters.industry,
    state: defaultFilters.state,
  };
}

export function isScopeFilterKey(key: string): key is (typeof scopeKeys)[number] {
  return scopeKeys.some((item) => item === key);
}

function emailKey(email: string) {
  return email.trim().toLowerCase();
}

function readStore(): Record<string, unknown> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function readUserFilters(email: string): UserScopeFilters | null {
  const value = readStore()[emailKey(email)];
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const saved = value as Partial<UserScopeFilters>;
  if (
    !isPeriod(saved.period) ||
    typeof saved.account !== "string" ||
    !saved.account ||
    typeof saved.industry !== "string" ||
    !saved.industry ||
    typeof saved.state !== "string" ||
    !saved.state
  ) {
    return null;
  }

  return {
    period: saved.period,
    account: saved.account,
    industry: saved.industry,
    state: saved.state,
  };
}

export function saveUserFilters(email: string, filters: UserScopeFilters) {
  const store = readStore();
  store[emailKey(email)] = filters;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function homePathForUser(email: string) {
  const saved = readUserFilters(email);
  if (!saved) return "/home";

  const params = new URLSearchParams({
    period: saved.period,
    account: saved.account,
    industry: saved.industry,
    state: saved.state,
  });
  return `/home?${params.toString()}`;
}

export function scopeFiltersEqual(left: UserScopeFilters, right: UserScopeFilters) {
  return (
    left.period === right.period &&
    left.account === right.account &&
    left.industry === right.industry &&
    left.state === right.state
  );
}
