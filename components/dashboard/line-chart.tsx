"use client";

import { useEffect, useRef } from "react";
import {
  CategoryScale,
  Chart,
  type ChartConfiguration,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  type ScriptableContext,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
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

const accounts = [
  { account: "General Mills", industry: "Food Consumer Products", state: "MN" },
  { account: "Hyatt Hotels", industry: "Hotels", state: "IL" },
  { account: "Baker Hughes", industry: "Oil and Gas Equipment", state: "TX" },
  { account: "Adobe", industry: "Computer Software", state: "CA" },
  { account: "Delta Air Lines", industry: "Airlines", state: "GA" },
  { account: "Fossil Group", industry: "Apparel", state: "TX" },
  { account: "AutoNation", industry: "Automotive Retailing", state: "FL" },
];

const monthlyCounts = [
  { deposits: 78, withdrawals: 52 },
  { deposits: 108, withdrawals: 70 },
  { deposits: 94, withdrawals: 78 },
  { deposits: 116, withdrawals: 66 },
  { deposits: 132, withdrawals: 82 },
  { deposits: 148, withdrawals: 98 },
  { deposits: 124, withdrawals: 86 },
  { deposits: 175, withdrawals: 108 },
  { deposits: 162, withdrawals: 80 },
  { deposits: 145, withdrawals: 88 },
  { deposits: 128, withdrawals: 92 },
  { deposits: 172, withdrawals: 98 },
];

const depositColor = "#1abc9c";
const withdrawalColor = "#f15a24";

function areaBackground(hex: string) {
  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);

  return (context: ScriptableContext<"line">) => {
    const { chart } = context;
    const { ctx, chartArea } = chart;
    const solid = `rgba(${red}, ${green}, ${blue}, 0.22)`;
    if (!chartArea) return solid;

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 0.34)`);
    gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
    return gradient;
  };
}

function mockTransactions(): Transaction[] {
  const rows: Transaction[] = [];

  monthlyCounts.forEach((counts, month) => {
    pushMonth(rows, month, "deposit", counts.deposits);
    pushMonth(rows, month, "withdraw", counts.withdrawals);
  });

  return rows;
}

function pushMonth(
  rows: Transaction[],
  month: number,
  transactionType: Transaction["transaction_type"],
  count: number,
) {
  for (let index = 0; index < count; index += 1) {
    const sample = accounts[(month + index) % accounts.length];
    rows.push({
      date: Date.UTC(2023, month, (index % 27) + 1),
      amount: String(400 + ((index * 83) % 5000)),
      transaction_type: transactionType,
      currency: "brl",
      ...sample,
    });
  }
}

function volumeByMonth(rows: Transaction[]) {
  const buckets = Array.from({ length: 12 }, (_, month) => ({
    label: new Date(Date.UTC(2023, month, 1)).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }),
    deposits: 0,
    withdrawals: 0,
  }));

  for (const row of rows) {
    const date = new Date(row.date);
    if (date.getUTCFullYear() !== 2023) continue;

    const bucket = buckets[date.getUTCMonth()];
    if (row.transaction_type === "deposit") bucket.deposits += 1;
    else bucket.withdrawals += 1;
  }

  return buckets;
}

const volume = volumeByMonth(mockTransactions());

const config = {
  type: "line",
  data: {
    labels: volume.map((month) => month.label),
    datasets: [
      {
        label: "Deposits",
        data: volume.map((month) => month.deposits),
        borderColor: depositColor,
        backgroundColor: areaBackground(depositColor),
        fill: "origin",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.25,
      },
      {
        label: "Withdrawals",
        data: volume.map((month) => month.withdrawals),
        borderColor: withdrawalColor,
        backgroundColor: areaBackground(withdrawalColor),
        fill: "origin",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.25,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
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
          generateLabels(chart) {
            return Chart.defaults.plugins.legend.labels.generateLabels(chart).map((item) => {
              const color = chart.data.datasets[item.datasetIndex ?? -1]?.borderColor;
              return typeof color === "string" ? { ...item, fillStyle: color } : item;
            });
          },
        },
      },
      title: {
        display: true,
        text: "Transaction Volume Over Time",
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
            return `${label}: ${context.parsed.y ?? 0}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: "#1c1c1c",
          font: { size: 13, weight: 600 },
        },
        grid: { display: false },
        ticks: {
          color: "#5c6570",
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          font: { size: 11 },
        },
      },
      y: {
        beginAtZero: true,
        max: 200,
        title: {
          display: true,
          text: "Transaction Count",
          color: "#1c1c1c",
          font: { size: 13, weight: 600 },
        },
        grid: { color: "#eef1f4" },
        ticks: {
          color: "#5c6570",
          stepSize: 50,
        },
      },
    },
  },
} satisfies ChartConfiguration<"line">;

export function LineChart() {
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
      aria-label="Transaction volume over time"
      className="block h-full w-full"
    />
  );
}
