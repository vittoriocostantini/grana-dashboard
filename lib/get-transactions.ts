import { readFile } from "node:fs/promises";
import path from "node:path";

export type Transaction = {
  id: string;
  date: number;
  amount: number;
  type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
};

type RawTransaction = {
  date: number;
  amount: string;
  transaction_type: Transaction["type"];
  currency: string;
  account: string;
  industry: string;
  state: string;
};

export async function getTransactions(): Promise<Transaction[]> {
  const filePath = path.join(process.cwd(), "data", "Transacciones.json");
  const rawData = await readFile(filePath, "utf8");
  const parsed = JSON.parse(rawData) as RawTransaction[];

  return parsed.map((item, index) => ({
    id: String(index),
    date: item.date,
    amount: Number(item.amount) / 100,
    type: item.transaction_type,
    currency: item.currency,
    account: item.account,
    industry: item.industry,
    state: item.state,
  }));
}
