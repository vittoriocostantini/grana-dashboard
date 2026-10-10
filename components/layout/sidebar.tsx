"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { ButtonMember } from "@/components/ui/button-member";
import { SidebarButton } from "@/components/ui/sidebar-button";
import { MemberPopUp } from "@/components/ui/member-pop-up";
import { cn } from "@/lib/cn";

export function Sidebar() {
  const [memberOpen, setMemberOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <aside className="relative z-40 flex items-center justify-between overflow-visible px-3 py-2 lg:w-15 lg:flex-col lg:items-center lg:justify-between lg:px-0 lg:py-4 border-r border-[#EAEAEA]">
      <div className="flex items-center gap-4 lg:flex-col lg:gap-5">
        <div className="relative overflow-hidden rounded-full bg-[#879abc] p-2">
          <img src="/avatar.svg" alt="Avatar" className="size-6" />
        </div>
        <SidebarButton logo="/icons/home-logo.svg" route="/home" label="Home" />
        <SidebarButton
          logo="/icons/help-logo.svg"
          route="https://www.cs.virginia.edu/~evans/cs216/guides/x86.html"
          label="Help"
        />
        <SidebarButton
          logo="/icons/logout-logo.svg"
          route="/logout"
          label="logout"
          onPress={logout}
        />
      </div>

      <div
        className="relative"
        onMouseEnter={() => setMemberOpen(true)}
        onMouseLeave={() => setMemberOpen(false)}
        onFocus={() => setMemberOpen(true)}
        onBlur={() => setMemberOpen(false)}
      >
        <ButtonMember expanded={memberOpen} />
        <div
          className={cn(
            "absolute top-full right-0 z-40 origin-top-right pt-2 transition duration-300 ease-out lg:top-auto lg:right-auto lg:bottom-0 lg:left-full lg:origin-bottom-left lg:pt-0 lg:pl-3",
            memberOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-2 scale-95 opacity-0",
          )}
        >
          <MemberPopUp open={memberOpen} />
        </div>
      </div>
    </aside>
  );
}
