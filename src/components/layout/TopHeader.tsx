"use client";

import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import { useStore } from "@/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const TopHeader = () => {
  const pathname = usePathname();
  const settings = useStore((state) => state.settings);

  // Generate breadcrumbs from pathname
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const label = path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return {
      label,
      isLast: index === paths.length - 1,
    };
  });

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center text-sm">
        <span className="text-slate-500">Dashboard</span>
        {breadcrumbs.length > 0 && (
          <>
            <span className="mx-2 text-slate-300">/</span>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center">
                <span
                  className={
                    crumb.isLast ? "font-medium text-slate-900" : "text-slate-500"
                  }
                >
                  {crumb.label}
                </span>
                {!crumb.isLast && <span className="mx-2 text-slate-300">/</span>}
              </span>
            ))}
          </>
        )}
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-slate-700 leading-none">
                  {settings.adminName}
                </p>
                <p className="text-xs text-slate-500 mt-1">Administrator</p>
              </div>
            </Button>} />
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};