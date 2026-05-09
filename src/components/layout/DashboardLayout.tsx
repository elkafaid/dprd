"use client";

import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { AuthGuard } from "./AuthGuard";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div
          className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out",
            collapsed ? "ml-[80px] w-[calc(100%-80px)]" : "ml-[260px] w-[calc(100%-260px)]"
          )}
        >
          <TopHeader />
          <main className="flex-1 p-6 overflow-y-auto w-full">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}