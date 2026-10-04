export type InvoiceType = "withdraw" | "deposit";
export type InvoiceFilter = "all" | InvoiceType;

export type Invoice = {
  id: string;
  account: string;
  date: string;
  industry: string;
  state: string;
  amount: string;
  currency: string;
  type: InvoiceType;
};

export const summary = {
  earning: "R$ 4,274,192",
  income: "R$ 2,874,592",
  expense: "R$ 1,374,492",
  pending: "0",
};

export const periodOptions = [
  { value: "7d", label: "7d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
  { value: "1y", label: "1y" },
] as const;

export type Period = (typeof periodOptions)[number]["value"];

const accounts = [
  { account: "Wynn Resorts", industry: "Hotels", state: "NV" },
  { account: "MGM Resorts", industry: "Hotels", state: "NV" },
  { account: "Caesars", industry: "Gaming", state: "NV" },
  { account: "Marriott", industry: "Hotels", state: "FL" },
  { account: "Hilton", industry: "Hotels", state: "CA" },
  { account: "Sands", industry: "Gaming", state: "NV" },
  { account: "Hyatt Hotels", industry: "Hotels", state: "IL" },
  { account: "Four Seasons", industry: "Hotels", state: "TX" },
  { account: "Accor", industry: "Hotels", state: "IL" },
  { account: "Wyndham Worldwide", industry: "Hotels", state: "NJ" },
  { account: "General Mills", industry: "Food Consumer Products", state: "MN" },
  { account: "Mondelez International", industry: "Food Consumer Products", state: "IL" },
  { account: "Baker Hughes", industry: "Oil and Gas Equipment", state: "TX" },
  { account: "Fossil Group", industry: "Apparel", state: "TX" },
  { account: "Delta Air Lines", industry: "Airlines", state: "GA" },
  { account: "Adobe", industry: "Computer Software", state: "CA" },
  { account: "AutoNation", industry: "Automotive Retailing", state: "FL" },
  { account: "Education Management", industry: "Education", state: "PA" },
] as const;

function withAllOption(label: string, values: string[]) {
  return [
    { value: "all", label },
    ...values.map((value) => ({ value, label: value })),
  ];
}

export const accountOptions = withAllOption(
  "All Accounts",
  accounts.map((item) => item.account),
);

export const industryOptions = withAllOption(
  "All Industries",
  [...new Set(accounts.map((item) => item.industry))].sort((a, b) =>
    a.localeCompare(b),
  ),
);

export const stateOptions = withAllOption(
  "All State",
  [...new Set(accounts.map((item) => item.state))].sort((a, b) =>
    a.localeCompare(b),
  ),
);

const transactionCount = 160;

function formatDate(date: Date) {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = String(date.getUTCFullYear()).slice(2);
  return `${month}/${day}/${year}`;
}

function formatAmount(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const invoices: Invoice[] = Array.from(
  { length: transactionCount },
  (_, index) => {
    const account = accounts[index % accounts.length];
    const type: InvoiceType = index % 3 === 0 ? "deposit" : "withdraw";
    const date = new Date(Date.UTC(2026, 7, 16));
    date.setUTCDate(date.getUTCDate() - index);
    const amount = 40 + ((index * 137) % 4800) + (index % 2 === 0 ? 0.5 : 0.8);

    return {
      id: `${type}-${index + 1}`,
      ...account,
      date: formatDate(date),
      amount: formatAmount(amount),
      currency: "brl",
      type,
    };
  },
);

export const pageSizes = [25, 50, 75] as const;
export type PageSize = (typeof pageSizes)[number];
