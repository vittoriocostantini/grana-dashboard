"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export interface SidebarButtonProps {
  logo: string;
  route: string;
  label: string;
  active?: boolean;
  variant?: "nav" | "solid" | "plain";
}

const variants = {
  nav: "relative flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1 rounded-lg text-ink transition-colors duration-200 hover:bg-[#D4D4D4]",
  navActive: "bg-[#D4D4D4]",
  solid:
    "grid size-8 place-items-center rounded-lg bg-black cursor-pointer hover:scale-105 transition-all duration-300",
  plain:
    "grid size-7 place-items-center rounded-full cursor-pointer hover:scale-105 transition-all duration-300",
} as const;

export function SidebarButton({
  logo,
  route,
  label,
  active,
  variant = "nav",
}: SidebarButtonProps) {
  const pathname = usePathname();
  const isActive = active ?? pathname === route;
  const iconOnly = variant !== "nav";

  return (
    <Link
      href={route}
      aria-current={isActive ? "page" : undefined}
      aria-label={iconOnly ? label : undefined}
      className={cn(
        variants[variant],
        variant === "nav" && isActive && variants.navActive,
      )}
    >
      <img
        src={logo}
        alt={label}
        className={variant === "plain" ? undefined : "size-4"}
      />
      {variant === "nav" ? (
        <span className="text-[10px] leading-none">{label}</span>
      ) : null}
    </Link>
  );
}
