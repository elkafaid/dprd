"use client";

import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarCollapsed, isAuthenticated } = useStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isMounted, router]);

  if (!isMounted || !isAuthenticated) {
    return null; // Prevent flash of unauthenticated content
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "ml-[80px] w-[calc(100%-80px)]" : "ml-[260px] w-[calc(100%-260px)]"
      )}>
        <TopHeader />
        <main className="flex-1 p-6 overflow-y-auto w-full">{children}</main>
      </div>
    </div>
  );
}