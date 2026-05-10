"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import {
  Home,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Archive,
  BarChart,
  Users,
  Briefcase,
  Mail,
  CalendarDays,
  MessageSquare,
  ClipboardList,
  BookOpen,
  Scale,
  Gavel,
  FileText,
  Car,
  Building,
  PieChart,
  Database,
  User,
  Tags,
  Settings,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

interface SidebarItemProps {
  icon: any;
  label: string;
  href: string;
  active?: boolean;
  isCollapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active, isCollapsed }: SidebarItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
      active
        ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white",
      isCollapsed && "justify-center px-0 h-10 w-10 mx-auto"
    )}
    title={isCollapsed ? label : undefined}
  >
    <Icon className={cn("w-5 h-5 shrink-0", active ? "text-white" : "text-slate-400")} />
    {!isCollapsed && <span className="truncate">{label}</span>}
  </Link>
);

interface SidebarGroupProps {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  activeGroup?: boolean;
  isCollapsed?: boolean;
}

const SidebarGroup = ({ title, icon: Icon, children, defaultExpanded = false, activeGroup, isCollapsed }: SidebarGroupProps) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  if (isCollapsed) {
    return <div className="py-2 space-y-1">{children}</div>;
  }

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
          activeGroup ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isExpanded ? "rotate-180" : "rotate-0")} />
      </button>
      {isExpanded && <div className="mt-1 ml-4 space-y-1 border-l border-slate-800 pl-2">{children}</div>}
    </div>
  );
};

export const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, isAuthenticated, logout } = useStore();

  return (
    <aside
      className={cn(
        "bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-20 transition-all duration-300 ease-in-out overflow-hidden border-r border-slate-800",
        isSidebarCollapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className={cn("flex items-center p-4 border-b border-slate-800 h-16 shrink-0", isSidebarCollapsed ? "justify-center" : "justify-between")}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">
            D
          </div>
          {!isSidebarCollapsed && (
             <h1 className="font-bold text-sm leading-tight tracking-tight">
               DPRD KAB.<br />MOJOKERTO
             </h1>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{ __html: '.scrollbar-hide::-webkit-scrollbar { display: none; }' }} />


        <div className="mb-6">
          {!isSidebarCollapsed && (
            <p className="px-4 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Menu Utama
            </p>
          )}
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/dashboard"
            active={pathname === "/dashboard"}
            isCollapsed={isSidebarCollapsed}
          />
        </div>

        <div className="space-y-1 mb-6">
          <SidebarGroup
            title="TATA USAHA"
            icon={Briefcase}
            defaultExpanded={pathname.startsWith("/tata-usaha")}
            activeGroup={pathname.startsWith("/tata-usaha")}
            isCollapsed={isSidebarCollapsed}
          >
            <SidebarItem
              icon={Mail}
              label="Surat Masuk"
              href="/tata-usaha/surat-masuk"
              active={pathname === "/tata-usaha/surat-masuk"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={Mail}
              label="Surat Keluar"
              href="/tata-usaha/surat-keluar"
              active={pathname === "/tata-usaha/surat-keluar"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={CalendarDays}
              label="Agenda"
              href="/tata-usaha/agenda"
              active={pathname === "/tata-usaha/agenda"}
              isCollapsed={isSidebarCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup
            title="ASPIRASI & POKIR"
            icon={MessageSquare}
            defaultExpanded={pathname.startsWith("/aspirasi")}
            activeGroup={pathname.startsWith("/aspirasi")}
            isCollapsed={isSidebarCollapsed}
          >
            <SidebarItem
              icon={ClipboardList}
              label="Pengaduan Masyarakat"
              href="/aspirasi/pengaduan"
              active={pathname === "/aspirasi/pengaduan"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={BookOpen}
              label="Pokok-pokok Pikiran"
              href="/aspirasi/pokir"
              active={pathname === "/aspirasi/pokir"}
              isCollapsed={isSidebarCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup
            title="KEUANGAN"
            icon={Wallet}
            defaultExpanded={pathname.startsWith("/keuangan")}
            activeGroup={pathname.startsWith("/keuangan")}
            isCollapsed={isSidebarCollapsed}
          >
            <SidebarItem
              icon={ArrowDownToLine}
              label="Register Masuk"
              href="/keuangan/register-masuk"
              active={pathname === "/keuangan/register-masuk"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={ArrowUpFromLine}
              label="Register Keluar"
              href="/keuangan/register-keluar"
              active={pathname === "/keuangan/register-keluar"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={Archive}
              label="Arsip SPJ"
              href="/keuangan/arsip-spj"
              active={pathname === "/keuangan/arsip-spj"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={BarChart}
              label="Dashboard Keuangan"
              href="/keuangan/dashboard-keuangan"
              active={pathname === "/keuangan/dashboard-keuangan"}
              isCollapsed={isSidebarCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup
            title="LEGISLASI"
            icon={Scale}
            defaultExpanded={pathname.startsWith("/legislasi")}
            activeGroup={pathname.startsWith("/legislasi")}
            isCollapsed={isSidebarCollapsed}
          >
            <SidebarItem
              icon={Gavel}
              label="Draft Raperda"
              href="/legislasi/draft-raperda"
              active={pathname === "/legislasi/draft-raperda"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={FileText}
              label="Produk Hukum"
              href="/legislasi/produk-hukum"
              active={pathname === "/legislasi/produk-hukum"}
              isCollapsed={isSidebarCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup
            title="INVENTARIS"
            icon={Archive}
            defaultExpanded={pathname.startsWith("/inventaris")}
            activeGroup={pathname.startsWith("/inventaris")}
            isCollapsed={isSidebarCollapsed}
          >
            <SidebarItem
              icon={Car}
              label="Kendaraan Dinas"
              href="/inventaris/kendaraan-dinas"
              active={pathname === "/inventaris/kendaraan-dinas"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={Building}
              label="Aset & Gedung"
              href="/inventaris/aset-gedung"
              active={pathname === "/inventaris/aset-gedung"}
              isCollapsed={isSidebarCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup
            title="LAPORAN"
            icon={FileText}
            defaultExpanded={pathname.startsWith("/laporan")}
            activeGroup={pathname.startsWith("/laporan")}
            isCollapsed={isSidebarCollapsed}
          >
            <SidebarItem
              icon={FileText}
              label="Laporan Keuangan"
              href="/laporan/laporan-keuangan"
              active={pathname === "/laporan/laporan-keuangan"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={PieChart}
              label="Rekap Anggaran"
              href="/laporan/rekap-anggaran"
              active={pathname === "/laporan/rekap-anggaran"}
              isCollapsed={isSidebarCollapsed}
            />
          </SidebarGroup>

          <SidebarGroup
            title="MASTER DATA"
            icon={Database}
            defaultExpanded={pathname.startsWith("/master-data")}
            activeGroup={pathname.startsWith("/master-data")}
            isCollapsed={isSidebarCollapsed}
          >
            <SidebarItem
              icon={User}
              label="Akun"
              href="/master-data/akun"
              active={pathname === "/master-data/akun"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={Users}
              label="Data Pegawai / Anggota"
              href="/master-data/pegawai"
              active={pathname === "/master-data/pegawai"}
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={Tags}
              label="Jenis Anggaran"
              href="/master-data/jenis-anggaran"
              active={pathname === "/master-data/jenis-anggaran"}
              isCollapsed={isSidebarCollapsed}
            />
          </SidebarGroup>

          <div className="mt-4">
             <SidebarItem
                icon={Settings}
                label="PENGATURAN"
                href="/pengaturan"
                active={pathname === "/pengaturan"}
                isCollapsed={isSidebarCollapsed}
              />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 space-y-2 shrink-0">
        {isAuthenticated ? (
          <button
            onClick={logout}
            className={cn(
              "w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors",
              isSidebarCollapsed && "px-0"
            )}
            title="Logout"
          >
            {isSidebarCollapsed ? <User className="w-5 h-5 text-red-400" /> : <span>Logout</span>}
          </button>
        ) : (
          <Link href="/login" className="w-full">
            <div className={cn(
              "flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg text-sm text-blue-400 hover:bg-slate-800 hover:text-blue-300 transition-colors",
              isSidebarCollapsed && "px-0"
            )} title="Login Admin">
              {isSidebarCollapsed ? <User className="w-5 h-5 text-blue-400" /> : <span>Login Admin</span>}
            </div>
          </Link>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            "w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-300 transition-colors",
            isSidebarCollapsed && "px-0"
          )}
          title="Toggle Sidebar"
        >
          {isSidebarCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          {!isSidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
};
