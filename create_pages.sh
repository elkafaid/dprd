#!/bin/bash

# Utility to create directories and basic pages
function create_page {
    DIR="src/app/$1"
    mkdir -p "$DIR"
    TITLE="$2"
    cat << PAGE > "$DIR/page.tsx"
"use client";

import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ${TITLE}Page() {
  const { isAuthenticated } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">${TITLE}</h2>
          <p className="text-slate-500 mt-1">Manage ${TITLE} data and records.</p>
        </div>
        {isAuthenticated && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        )}
      </div>
      <div className="bg-white rounded-md border p-8 text-center text-slate-500">
        Data table for ${TITLE} will be implemented here.
      </div>
    </div>
  );
}
PAGE
}

create_page "keuangan/register-masuk" "RegisterMasuk"
create_page "keuangan/register-keluar" "RegisterKeluar"
create_page "keuangan/arsip-spj" "ArsipSPJ"
create_page "keuangan/dashboard-keuangan" "DashboardKeuangan"
create_page "laporan/laporan-keuangan" "LaporanKeuangan"
create_page "laporan/rekap-anggaran" "RekapAnggaran"
create_page "master-data/akun" "Akun"
create_page "master-data/pegawai" "Pegawai"
create_page "master-data/jenis-anggaran" "JenisAnggaran"
create_page "pengaturan" "Pengaturan"

# Redirect root page to dashboard
cat << 'PAGE' > src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}
PAGE
