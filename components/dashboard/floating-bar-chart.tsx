"use client";

import { useEffect, useRef } from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  type ChartConfiguration,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
);

type Transaction = {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
};

const transactions: Transaction[] = [
  {
    date: 1673216606378,
    amount: "1800",
    transaction_type: "deposit",
    currency: "brl",
    account: "General Mills",
    industry: "Food Consumer Products",
    state: "MN",
  },
  {
    date: 1637751477490,
    amount: "1092",
    transaction_type: "deposit",
    currency: "brl",
    account: "Mondelez International",
    industry: "Food Consumer Products",
    state: "IL",
  },
  {
    date: 1661438596457,
    amount: "2220",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Kraft Heinz",
    industry: "Food Consumer Products",
    state: "IL",
  },
  {
    date: 1671293734303,
    amount: "3200",
    transaction_type: "deposit",
    currency: "brl",
    account: "Hyatt Hotels",
    industry: "Hotels",
    state: "IL",
  },
  {
    date: 1680029910838,
    amount: "2100",
    transaction_type: "deposit",
    currency: "brl",
    account: "Wynn Resorts",
    industry: "Hotels",
    state: "NV",
  },
  {
    date: 1669009703807,
    amount: "1900",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Wyndham Worldwide",
    industry: "Hotels",
    state: "NJ",
  },
  {
    date: 1671305218364,
    amount: "2400",
    transaction_type: "deposit",
    currency: "brl",
    account: "Adobe",
    industry: "Computer Software",
    state: "CA",
  },
  {
    date: 1657918597564,
    amount: "1500",
    transaction_type: "deposit",
    currency: "brl",
    account: "Intuit",
    industry: "Computer Software",
    state: "CA",
  },
  {
    date: 1645123456789,
    amount: "1600",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Autodesk",
    industry: "Computer Software",
    state: "CA",
  },
  {
    date: 1682698259192,
    amount: "4100",
    transaction_type: "deposit",
    currency: "brl",
    account: "Baker Hughes",
    industry: "Oil and Gas Equipment",
    state: "TX",
  },
  {
    date: 1670000000000,
    amount: "2000",
    transaction_type: "deposit",
    currency: "brl",
    account: "Halliburton",
    industry: "Oil and Gas Equipment",
    state: "TX",
  },
  {
    date: 1665000000000,
    amount: "1780",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Schlumberger",
    industry: "Oil and Gas Equipment",
    state: "TX",
  },
  {
    date: 1650000000000,
    amount: "2400",
    transaction_type: "deposit",
    currency: "brl",
    account: "Delta Air Lines",
    industry: "Airlines",
    state: "GA",
  },
  {
    date: 1648000000000,
    amount: "1320",
    transaction_type: "withdraw",
    currency: "brl",
    account: "United Airlines",
    industry: "Airlines",
    state: "IL",
  },
  {
    date: 1642000000000,
    amount: "2400",
    transaction_type: "deposit",
    currency: "brl",
    account: "Fossil Group",
    industry: "Apparel",
    state: "TX",
  },
  {
    date: 1639000000000,
    amount: "1515",
    transaction_type: "withdraw",
    currency: "brl",
    account: "Nike",
    industry: "Apparel",
    state: "OR",
  },
  {
    date: 1635000000000,
    amount: "4800",
    transaction_type: "deposit",
    currency: "brl",
    account: "AutoNation",
    industry: "Automotive Retailing",
    state: "FL",
  },
  {
    date: 1632000000000,
    amount: "2100",
    transaction_type: "withdraw",
    currency: "brl",
    account: "CarMax",
    industry: "Automotive Retailing",
    state: "VA",
  },
];

const revenueColor = "#1abc9c";
const expenseColor = "#f5a623";

function formatBrl(value: number) {
  return `R$ ${value.toLocaleString("en-US")}`;
}

function totalsByIndustry(rows: Transaction[]) {
  const totals = new Map<string, { revenue: number; expenses: number }>();

  for (const row of rows) {
    const current = totals.get(row.industry) ?? { revenue: 0, expenses: 0 };
    const amount = Number(row.amount);
    if (row.transaction_type === "deposit") current.revenue += amount;
    else current.expenses += amount;
    totals.set(row.industry, current);
  }

  return [...totals.entries()].map(([industry, amounts]) => ({
    industry,
    ...amounts,
  }));
}

function wrapLabel(label: string) {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 12 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

const industryTotals = totalsByIndustry(transactions);

const config = {
  type: "bar",
  data: {
    labels: industryTotals.map((row) => row.industry),
    datasets: [
      {
        label: "Revenue",
        data: industryTotals.map((row) => row.revenue),
        backgroundColor: revenueColor,
        borderRadius: 2,
        maxBarThickness: 36,
      },
      {
        label: "Expenses",
        data: industryTotals.map((row) => row.expenses),
        backgroundColor: expenseColor,
        borderRadius: 2,
        maxBarThickness: 36,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          boxWidth: 12,
          boxHeight: 12,
          useBorderRadius: true,
          borderRadius: 2,
          color: "#1c1c1c",
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Revenue vs Expenses by Industry",
        position: "top",
        align: "start",
        color: "#1c1c1c",
        font: { size: 16, weight: 600 },
        padding: { bottom: 8 },
      },
      tooltip: {
        callbacks: {
          label(context) {
            const label = context.dataset.label ?? "";
            return `${label}: ${formatBrl(context.parsed.y ?? 0)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Industries",
          color: "#1c1c1c",
          font: { size: 13, weight: 600 },
        },
        grid: { display: false },
        ticks: {
          color: "#5c6570",
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          font: { size: 11 },
          callback(value) {
            const label = this.getLabelForValue(Number(value));
            return wrapLabel(label);
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount",
          color: "#1c1c1c",
          font: { size: 13, weight: 600 },
        },
        grid: { color: "#eef1f4" },
        ticks: {
          color: "#5c6570",
          callback(value) {
            return formatBrl(Number(value));
          },
        },
      },
    },
  },
} satisfies ChartConfiguration<"bar">;

export function FloatingBarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const chart = new Chart(canvas, config);
    return () => chart.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Revenue versus expenses by industry"
      className="block h-full w-full  rounded-lg"
    />
  );
}
