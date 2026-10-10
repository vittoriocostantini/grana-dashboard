import type { Transaction } from "@/lib/get-transactions";

export type InvoiceRow = {
  id: string;
  account: string;
  date: string;
  industry: string;
  state: string;
  amount: string;
  currency: string;
  type: Transaction["type"];
};
