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
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
}: {
  icon?: any;
  label: string;
  href?: string;
  active?: boolean;
}) => {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
        active
          ? "bg-blue-600 text-white font-medium"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

const SidebarGroup = ({
  title,
  icon: Icon,
  defaultExpanded = false,
  children,
  activeGroup = false,
}: {
  title: string;
  icon?: any;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  activeGroup?: boolean;
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || activeGroup);

  return (
    <div className="mb-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors",
          activeGroup
            ? "text-white font-medium"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        )}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4" />}
          <span>{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            expanded ? "rotate-180" : ""
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-6 pr-2 py-1 space-y-1">{children}</div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-20">
      <div className="p-6 border-b border-slate-800">
        <h1 className="font-bold text-lg tracking-tight">DPRD KAB. MOJOKERTO</h1>
      </div>

      <div className="p-4 flex-1">
        <div className="mb-6">
          <p className="px-4 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
            Menu Utama
          </p>
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/keuangan"
            active={pathname === "/keuangan"}
          />
        </div>

        <div className="space-y-1 mb-6">
          <SidebarGroup title="PERSIDANGAN" icon={Briefcase}>
            <SidebarItem label="Input SPPD" />
            <SidebarItem label="Surat Tugas" />
            <SidebarItem label="Bukti Perjalanan" />
            <SidebarItem label="Data Pegawai / Anggota" />
          </SidebarGroup>

          <SidebarGroup
            title="KEUANGAN"
            icon={Wallet}
            defaultExpanded={pathname.startsWith("/keuangan")}
            activeGroup={pathname.startsWith("/keuangan")}
          >
            <SidebarItem
              icon={ArrowDownToLine}
              label="Register Masuk"
              href="/keuangan/register-masuk"
              active={pathname === "/keuangan/register-masuk"}
            />
            <SidebarItem
              icon={ArrowUpFromLine}
              label="Register Keluar"
              href="/keuangan/register-keluar"
              active={pathname === "/keuangan/register-keluar"}
            />
            <SidebarItem
              icon={Archive}
              label="Arsip SPJ"
              href="/keuangan/arsip-spj"
              active={pathname === "/keuangan/arsip-spj"}
            />
            <SidebarItem
              icon={BarChart}
              label="Dashboard Keuangan"
              href="/keuangan"
              active={pathname === "/keuangan"}
            />
          </SidebarGroup>

          <SidebarGroup title="LAPORAN" icon={FileText}>
            <SidebarItem icon={FileText} label="Laporan Keuangan" />
            <SidebarItem icon={PieChart} label="Rekap Anggaran" />
          </SidebarGroup>

          <SidebarGroup
            title="MASTER DATA"
            icon={Database}
            defaultExpanded={pathname.startsWith("/master-data")}
          >
            <SidebarItem
              icon={User}
              label="Akun"
              href="/master-data/akun"
              active={pathname === "/master-data/akun"}
            />
            <SidebarItem
              icon={Users}
              label="Data Pegawai / Anggota"
              href="/master-data/pegawai"
              active={pathname === "/master-data/pegawai"}
            />
            <SidebarItem
              icon={Tags}
              label="Jenis Anggaran"
              href="/master-data/anggaran"
              active={pathname === "/master-data/anggaran"}
            />
          </SidebarGroup>

          <div className="mt-4">
             <SidebarItem
                icon={Settings}
                label="PENGATURAN"
                href="/pengaturan"
                active={pathname === "/pengaturan"}
              />
          </div>
        </div>
      </div>
    </aside>
  );
};
