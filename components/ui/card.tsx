import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SlotProps = {
  children: ReactNode;
  className?: string;
};

const titleSizes = {
  md: "text-base font-semibold",
  chart: "text-lg font-medium",
} as const;

const labelSizes = {
  sm: "text-[11px] leading-4 text-quiet",
  md: "text-[15px] font-medium leading-5 text-ink",
} as const;

const valueSizes = {
  md: "text-lg font-semibold leading-6",
  lg: "text-[1.7rem] font-semibold leading-9 tracking-tight",
  xl: "text-[1.75rem] font-semibold leading-none tracking-tight",
} as const;

const accentTones = {
  earning: "bg-highlight",
  income: "bg-income",
  expense: "bg-expense",
  pending: "bg-pending",
} as const;

const accentLengths = {
  full: "w-full",
  short: "w-[70%]",
} as const;

const accentWeights = {
  bar: "h-[3px]",
  line: "h-0.5",
} as const;

function CardRoot({
  children,
  className,
  plain = false,
}: SlotProps & { plain?: boolean }) {
  return (
    <div
      className={cn(
        plain
          ? "flex flex-col"
          : "flex flex-col border-l-2 border-l-gray-200 px-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Header({ children, className }: SlotProps) {
  return <header className={cn(className)}>{children}</header>;
}

function Title({
  children,
  className,
  size = "md",
}: SlotProps & { size?: keyof typeof titleSizes }) {
  return (
    <h2 className={cn("text-ink", titleSizes[size], className)}>{children}</h2>
  );
}

function Label({
  children,
  className,
  size = "sm",
}: SlotProps & { size?: keyof typeof labelSizes }) {
  return <p className={cn(labelSizes[size], className)}>{children}</p>;
}

function Value({
  children,
  className,
  size = "md",
}: SlotProps & { size?: keyof typeof valueSizes }) {
  return (
    <p className={cn("text-ink tabular-nums", valueSizes[size], className)}>
      {children}
    </p>
  );
}

function Accent({
  tone,
  length = "full",
  weight = "bar",
  className,
}: {
  tone: keyof typeof accentTones;
  length?: keyof typeof accentLengths;
  weight?: keyof typeof accentWeights;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-2 block rounded-full",
        accentTones[tone],
        accentLengths[length],
        accentWeights[weight],
        className,
      )}
    />
  );
}

function Body({ children, className }: SlotProps) {
  return <div className={cn("min-w-0", className)}>{children}</div>;
}

export const Card = Object.assign(CardRoot, {
  Header,
  Title,
  Label,
  Value,
  Accent,
  Body,
});
