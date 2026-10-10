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
import type { VolumePoint } from "@/lib/dashboard";

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

const depositColor = "#00ABE9";
const withdrawalColor = "#054971";

function areaBackground(hex: string) {
  const red = Number.parseInt(hex.slice(1, 3), 16);
  const green = Number.parseInt(hex.slice(3, 5), 16);
  const blue = Number.parseInt(hex.slice(5, 7), 16);

  return (context: ScriptableContext<"line">) => {
    const { chart } = context;
    const { ctx, chartArea } = chart;
    const solid = `rgba(${red}, ${green}, ${blue}, 0.22)`;
    if (!chartArea) return solid;

    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    );
    gradient.addColorStop(0, `rgba(${red}, ${green}, ${blue}, 0.34)`);
    gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue}, 0)`);
    return gradient;
  };
}

function lineConfig(
  points: VolumePoint[],
  axisTitle: string,
): ChartConfiguration<"line"> {
  return {
    type: "line",
    data: {
      labels: points.map((point) => point.label),
      datasets: [
        {
          label: "Deposits",
          data: points.map((point) => point.deposits),
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
          data: points.map((point) => point.withdrawals),
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
              return Chart.defaults.plugins.legend.labels
                .generateLabels(chart)
                .map((item) => {
                  const color =
                    chart.data.datasets[item.datasetIndex ?? -1]?.borderColor;
                  return typeof color === "string"
                    ? { ...item, fillStyle: color }
                    : item;
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
            text: axisTitle,
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
          title: {
            display: true,
            text: "Transaction Count",
            color: "#1c1c1c",
            font: { size: 13, weight: 600 },
          },
          grid: { color: "#eef1f4" },
          ticks: {
            color: "#5c6570",
          },
        },
      },
    },
  };
}

export function LineChart({
  points,
  axisTitle,
}: {
  points: VolumePoint[];
  axisTitle: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const chart = new Chart(canvas, lineConfig(points, axisTitle));
    return () => chart.destroy();
  }, [points, axisTitle]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Transaction volume over time"
      className="block h-full w-full border border-[#EAEAEA] p-4 rounded-3xl"
    />
  );
}
