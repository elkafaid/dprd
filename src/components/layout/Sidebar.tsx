"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  FileText,
  Briefcase,
  Users,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Archive,
  BarChart,
  PieChart,
  Database,
  User,
  Tags,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
  onClick,
}: {
  icon?: any;
  label: string;
  href?: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) => {
  const content = (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 py-2.5 rounded-lg text-sm transition-colors relative group",
        collapsed ? "px-0 justify-center w-10 mx-auto" : "px-4 w-full",
        active
          ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      )}
      title={collapsed ? label : undefined}
    >
      {Icon && <Icon className="w-5 h-5 shrink-0" />}
      {!collapsed && <span className="truncate">{label}</span>}
    </div>
  );

  return href ? <Link href={href} className="block w-full">{content}</Link> : <button className="w-full text-left">{content}</button>;
};

const SidebarGroup = ({
  title,
  icon: Icon,
  defaultExpanded = false,
  children,
  activeGroup = false,
  collapsed = false,
}: {
  title: string;
  icon?: any;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  activeGroup?: boolean;
  collapsed?: boolean;
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || activeGroup);

  if (collapsed) {
    return (
      <div className="mb-2 flex flex-col items-center">
        <div
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-colors mb-1",
            activeGroup ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
          )}
          title={title}
        >
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <div className="w-full h-px bg-slate-800/50 my-2" />
      </div>
    );
  }

  return (
    <div className="mb-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors",
          activeGroup || expanded
            ? "text-white font-medium bg-slate-800/50"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        )}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 shrink-0" />}
          <span className="truncate">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 shrink-0 transition-transform duration-200",
            expanded ? "rotate-180" : ""
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-9 pr-2 space-y-0.5">{children}</div>
      </div>
    </div>
  );
};

export const Sidebar = ({
  collapsed,
  onToggle
}: {
  collapsed: boolean;
  onToggle: () => void
}) => {
  const pathname = usePathname();
  const logout = useStore((state) => state.logout);

  return (
    <aside
      className={cn(
        "bg-slate-950 border-r border-slate-800 text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-20 transition-all duration-300 ease-in-out",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="p-6 border-b border-slate-800 flex items-center justify-between h-20">
        <div className={cn("flex items-center gap-3 overflow-hidden", collapsed && "justify-center w-full")}>
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm shadow-blue-500/20">
             D
           </div>
           {!collapsed && <h1 className="font-bold text-[15px] tracking-tight whitespace-nowrap">DPRD KAB. MOJOKERTO</h1>}
        </div>

        {!collapsed && (
          <button
            onClick={onToggle}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <div className="pt-4 flex justify-center">
           <button
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-6">
          {!collapsed && (
            <p className="px-4 text-[10px] font-semibold text-slate-500 mb-3 uppercase tracking-widest">
              Utama
            </p>
          )}
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/dashboard"
            active={pathname === "/dashboard" || pathname === "/keuangan"}
            collapsed={collapsed}
          />
        </div>

        <div className="space-y-2 mb-6 flex-1">
          <SidebarGroup
            title="KEUANGAN"
            icon={Wallet}
            defaultExpanded={pathname.startsWith("/keuangan")}
            activeGroup={pathname.startsWith("/keuangan")}
            collapsed={collapsed}
          >
            <SidebarItem
              label="Register Masuk"
              href="/keuangan/register-masuk"
              active={pathname === "/keuangan/register-masuk"}
              collapsed={collapsed}
            />
            <SidebarItem
              label="Register Keluar"
              href="/keuangan/register-keluar"
              active={pathname === "/keuangan/register-keluar"}
              collapsed={collapsed}
            />
            <SidebarItem
              label="Arsip SPJ"
              href="/keuangan/arsip-spj"
              active={pathname === "/keuangan/arsip-spj"}
              collapsed={collapsed}
            />
          </SidebarGroup>

          <SidebarGroup
             title="LAPORAN"
             icon={FileText}
             collapsed={collapsed}
             defaultExpanded={pathname.startsWith("/laporan")}
             activeGroup={pathname.startsWith("/laporan")}
          >
            <SidebarItem
               label="Laporan Keuangan"
               href="/laporan/laporan-keuangan"
               active={pathname === "/laporan/laporan-keuangan"}
               collapsed={collapsed}
            />
            <SidebarItem
               label="Rekap Anggaran"
               href="/laporan/rekap-anggaran"
               active={pathname === "/laporan/rekap-anggaran"}
               collapsed={collapsed}
            />
          </SidebarGroup>

          <SidebarGroup
            title="MASTER DATA"
            icon={Database}
            defaultExpanded={pathname.startsWith("/master-data")}
            activeGroup={pathname.startsWith("/master-data")}
            collapsed={collapsed}
          >
            <SidebarItem
              label="Akun Admin"
              href="/master-data/akun"
              active={pathname === "/master-data/akun"}
              collapsed={collapsed}
            />
            <SidebarItem
              label="Data Pegawai"
              href="/master-data/pegawai"
              active={pathname === "/master-data/pegawai"}
              collapsed={collapsed}
            />
            <SidebarItem
              label="Jenis Anggaran"
              href="/master-data/anggaran"
              active={pathname === "/master-data/anggaran"}
              collapsed={collapsed}
            />
          </SidebarGroup>
        </div>

        <div className="mt-auto space-y-1 pt-4 border-t border-slate-800/50">
             <SidebarItem
                icon={Settings}
                label="Pengaturan"
                href="/pengaturan"
                active={pathname === "/pengaturan"}
                collapsed={collapsed}
              />
              <SidebarItem
                icon={LogOut}
                label="Keluar"
                onClick={logout}
                collapsed={collapsed}
              />
        </div>
      </div>
    </aside>
  );
};
