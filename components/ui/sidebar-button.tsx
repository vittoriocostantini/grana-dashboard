"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function SidebarButton({
  logo,
  route,
  label,
  active,
  onPress,
}: {
  logo: string;
  route: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  const pathname = usePathname();
  const isExternal = route.startsWith("http://") || route.startsWith("https://");
  const isActive = active ?? (!isExternal && pathname === route);
  const className = cn(
    "relative flex h-10 w-10 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg text-ink transition-colors duration-200 hover:bg-[#E1E1E1]",
    isActive && "bg-[#E1E1E1]",
  );
  const content = (
    <>
      <img src={logo} alt={label} className="size-4" />
      <span className="text-[10px] leading-none">{label}</span>
    </>
  );

  if (onPress) {
    return (
      <button type="button" onClick={onPress} aria-label={label} className={className}>
        {content}
      </button>
    );
  }

  if (isExternal) {
    return (
      <a
        href={route}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={route}
      aria-current={isActive ? "page" : undefined}
      className={className}
    >
      {content}
    </Link>
  );
}
