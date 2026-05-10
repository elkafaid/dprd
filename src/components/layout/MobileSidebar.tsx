"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Globe,
  Image as ImageIcon,
  Newspaper
} from "lucide-react";
import Image from "next/image";

interface SidebarItemProps {
  icon: any;
  label: string;
  href: string;
  active?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, href, active, isCollapsed, onClick }: SidebarItemProps) => (
  <Link
    href={href}
    onClick={onClick}
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

const SidebarGroup = ({
  title,
  icon: Icon,
  defaultExpanded = false,
  children,
  activeGroup = false,
  isCollapsed = false,
  href,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  activeGroup?: boolean;
  isCollapsed?: boolean;
  href?: string;
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded || activeGroup);
  const router = useRouter();

  if (isCollapsed) {
    return <div className="py-2 space-y-1">{children}</div>;
  }

  const handleClick = () => {
    setExpanded(!expanded);
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="mb-2">
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
          activeGroup ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", expanded ? "rotate-180" : "rotate-0")} />
      </button>
      {expanded && <div className="mt-1 ml-4 space-y-1 border-l border-slate-800 pl-2">{children}</div>}
    </div>
  );
};

export const MobileSidebar = () => {
  const pathname = usePathname();
  const { isMobileSidebarOpen, setMobileSidebarOpen, isAuthenticated, logout } = useStore();

  const handleLinkClick = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out overflow-hidden border-r border-slate-800 w-[260px] md:hidden",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16 shrink-0 relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 relative">
               <Image src="/logo-mojokerto.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="font-bold text-sm leading-tight tracking-tight">
              DPRD KAB.<br />MOJOKERTO
            </h1>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
            title="Close Sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style dangerouslySetInnerHTML={{ __html: '.scrollbar-hide::-webkit-scrollbar { display: none; }' }} />

          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Menu Utama
            </p>
            <SidebarItem
              icon={Home}
              label="Dashboard"
              href="/dashboard"
              active={pathname === "/dashboard"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </div>

        <div className="space-y-1 mb-6">
          <SidebarGroup
            title="TATA USAHA"
            icon={Briefcase}
            defaultExpanded={pathname.startsWith("/tata-usaha")}
            activeGroup={pathname.startsWith("/tata-usaha")}
            isCollapsed={false}
          >
            <SidebarItem
              icon={Mail}
              label="Surat Masuk"
              href="/tata-usaha/surat-masuk"
              active={pathname === "/tata-usaha/surat-masuk"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={Mail}
              label="Surat Keluar"
              href="/tata-usaha/surat-keluar"
              active={pathname === "/tata-usaha/surat-keluar"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={CalendarDays}
              label="Agenda"
              href="/tata-usaha/agenda"
              active={pathname === "/tata-usaha/agenda"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <SidebarGroup
            title="ASPIRASI & POKIR"
            icon={MessageSquare}
            defaultExpanded={pathname.startsWith("/aspirasi")}
            activeGroup={pathname.startsWith("/aspirasi")}
            isCollapsed={false}
          >
            <SidebarItem
              icon={ClipboardList}
              label="Pengaduan Masyarakat"
              href="/aspirasi/pengaduan"
              active={pathname === "/aspirasi/pengaduan"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={BookOpen}
              label="Pokok-pokok Pikiran"
              href="/aspirasi/pokir"
              active={pathname === "/aspirasi/pokir"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <SidebarGroup
            title="KEUANGAN"
            icon={Wallet}
            defaultExpanded={pathname.startsWith("/keuangan")}
            activeGroup={pathname.startsWith("/keuangan")}
            isCollapsed={false}
            href="/keuangan/dashboard-keuangan"
          >
            <SidebarItem
              icon={ArrowDownToLine}
              label="Register Masuk"
              href="/keuangan/register-masuk"
              active={pathname === "/keuangan/register-masuk"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={ArrowUpFromLine}
              label="Register Keluar"
              href="/keuangan/register-keluar"
              active={pathname === "/keuangan/register-keluar"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={Archive}
              label="Arsip SPJ"
              href="/keuangan/arsip-spj"
              active={pathname === "/keuangan/arsip-spj"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <SidebarGroup
            title="LEGISLASI"
            icon={Scale}
            defaultExpanded={pathname.startsWith("/legislasi")}
            activeGroup={pathname.startsWith("/legislasi")}
            isCollapsed={false}
          >
            <SidebarItem
              icon={Gavel}
              label="Draft Raperda"
              href="/legislasi/draft-raperda"
              active={pathname === "/legislasi/draft-raperda"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={FileText}
              label="Produk Hukum"
              href="/legislasi/produk-hukum"
              active={pathname === "/legislasi/produk-hukum"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <SidebarGroup
            title="INVENTARIS"
            icon={Archive}
            defaultExpanded={pathname.startsWith("/inventaris")}
            activeGroup={pathname.startsWith("/inventaris")}
            isCollapsed={false}
          >
            <SidebarItem
              icon={Car}
              label="Kendaraan Dinas"
              href="/inventaris/kendaraan-dinas"
              active={pathname === "/inventaris/kendaraan-dinas"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={Building}
              label="Aset & Gedung"
              href="/inventaris/aset-gedung"
              active={pathname === "/inventaris/aset-gedung"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <SidebarGroup
            title="LAPORAN"
            icon={FileText}
            defaultExpanded={pathname.startsWith("/laporan")}
            activeGroup={pathname.startsWith("/laporan")}
            isCollapsed={false}
          >
            <SidebarItem
              icon={FileText}
              label="Laporan Keuangan"
              href="/laporan/laporan-keuangan"
              active={pathname === "/laporan/laporan-keuangan"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={PieChart}
              label="Rekap Anggaran"
              href="/laporan/rekap-anggaran"
              active={pathname === "/laporan/rekap-anggaran"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <SidebarGroup
            title="MASTER DATA"
            icon={Database}
            defaultExpanded={pathname.startsWith("/master-data")}
            activeGroup={pathname.startsWith("/master-data")}
            isCollapsed={false}
          >
            <SidebarItem
              icon={User}
              label="Akun"
              href="/master-data/akun"
              active={pathname === "/master-data/akun"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={Users}
              label="Data Pegawai / Anggota"
              href="/master-data/pegawai"
              active={pathname === "/master-data/pegawai"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={Tags}
              label="Jenis Anggaran"
              href="/master-data/jenis-anggaran"
              active={pathname === "/master-data/jenis-anggaran"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <SidebarGroup
            title="MANAJEMEN WEB"
            icon={Globe}
            defaultExpanded={pathname.startsWith("/manajemen-web")}
            activeGroup={pathname.startsWith("/manajemen-web")}
            isCollapsed={false}
          >
            <SidebarItem
              icon={ImageIcon}
              label="Carousel"
              href="/manajemen-web/carousel"
              active={pathname === "/manajemen-web/carousel"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
            <SidebarItem
              icon={Newspaper}
              label="Berita"
              href="/manajemen-web/berita"
              active={pathname === "/manajemen-web/berita"}
              isCollapsed={false}
              onClick={handleLinkClick}
            />
          </SidebarGroup>

          <div className="mt-4">
             <SidebarItem
                icon={Settings}
                label="PENGATURAN"
                href="/pengaturan"
                active={pathname === "/pengaturan"}
                isCollapsed={false}
                onClick={handleLinkClick}
              />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 space-y-2 shrink-0">
        {isAuthenticated && (
          <button
            onClick={() => { logout(); setMobileSidebarOpen(false); }}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
            title="Logout"
          >
            <User className="w-5 h-5 text-red-400" /> <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
    </>
  );
};
