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
import type { IndustryTotal } from "@/lib/dashboard";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
);

const revenueColor = "#00ABE9";
const expenseColor = "#00649D";

function formatBrl(value: number) {
  return `R$ ${value.toLocaleString("en-US")}`;
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

function barConfig(rows: IndustryTotal[]): ChartConfiguration<"bar"> {
  return {
    type: "bar",
    data: {
      labels: rows.map((row) => row.industry),
      datasets: [
        {
          label: "Revenue",
          data: rows.map((row) => row.revenue),
          backgroundColor: revenueColor,
          borderRadius: 2,
          maxBarThickness: 36,
        },
        {
          label: "Expenses",
          data: rows.map((row) => row.expenses),
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
  };
}

export function FloatingBarChart({ rows }: { rows: IndustryTotal[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const chart = new Chart(canvas, barConfig(rows));
    return () => chart.destroy();
  }, [rows]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Revenue versus expenses by industry"
      className="block h-full w-full  rounded-lg"
    />
  );
}
