"use client";

import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { TopHeader } from "./TopHeader";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Newspaper, ImageIcon, LogOut } from "lucide-react";

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
    <div className="flex min-h-screen bg-slate-50 relative">
      <Sidebar />
      <MobileSidebar />
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out w-full md:w-auto",
        isSidebarCollapsed ? "md:ml-[80px] md:w-[calc(100%-80px)]" : "md:ml-[260px] md:w-[calc(100%-260px)]"
      )}>
        <TopHeader />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full pb-24 md:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 w-full z-50 bg-white border-t border-slate-200 md:hidden pb-safe">
        <div className="grid grid-cols-4 h-16">
          <Link href="/dashboard" className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-colors">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </Link>
          <Link href="/manajemen-web/berita" className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-colors">
            <Newspaper className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Posting</span>
          </Link>
          <Link href="/manajemen-web/carousel" className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-colors">
            <ImageIcon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Edit Banner</span>
          </Link>
          <button onClick={() => { useStore.getState().logout(); router.push('/'); }} className="flex flex-col items-center justify-center text-slate-500 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}