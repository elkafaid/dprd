#!/bin/bash

# Implement Register Masuk table
cat << 'PAGE' > src/app/keuangan/register-masuk/page.tsx
"use client";

import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { RegisterMasuk } from "@/store/useStore";

export default function RegisterMasukPage() {
  const { isAuthenticated, registerMasuk } = useStore();

  const columns: ColumnDef<RegisterMasuk>[] = [
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "nomorRegister", header: "No. Register" },
    { accessorKey: "uraian", header: "Uraian" },
    { accessorKey: "sumberDana", header: "Sumber Dana" },
    {
      accessorKey: "jumlah",
      header: "Jumlah",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("jumlah"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Register Masuk</h2>
          <p className="text-slate-500 mt-1">Manage incoming funds and revenues.</p>
        </div>
        {isAuthenticated && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={registerMasuk} />
    </div>
  );
}
PAGE

# Implement Register Keluar table
cat << 'PAGE' > src/app/keuangan/register-keluar/page.tsx
"use client";

import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { RegisterKeluar } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";

export default function RegisterKeluarPage() {
  const { isAuthenticated, registerKeluar } = useStore();

  const columns: ColumnDef<RegisterKeluar>[] = [
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "uraian", header: "Uraian" },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => {
        return <Badge variant="secondary">{row.getValue("kategori")}</Badge>;
      }
    },
    {
      accessorKey: "jumlah",
      header: "Jumlah",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("jumlah"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
        return <div className="font-medium text-rose-600">-{formatted}</div>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Register Keluar</h2>
          <p className="text-slate-500 mt-1">Manage outgoing funds and expenses.</p>
        </div>
        {isAuthenticated && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={registerKeluar} />
    </div>
  );
}
PAGE

# Implement Arsip SPJ table
cat << 'PAGE' > src/app/keuangan/arsip-spj/page.tsx
"use client";

import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { ArsipSPJ } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";

export default function ArsipSPJPage() {
  const { isAuthenticated, arsipSPJ } = useStore();

  const columns: ColumnDef<ArsipSPJ>[] = [
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "nomorSPJ", header: "No. SPJ" },
    { accessorKey: "perjalananDinas", header: "Perjalanan Dinas" },
    { accessorKey: "pegawai", header: "Pegawai" },
    {
      accessorKey: "totalBiaya",
      header: "Total Biaya",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalBiaya"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant =
          status === "Disetujui" ? "default" :
          status === "Menunggu Verifikasi" ? "outline" : "destructive";
        return <Badge variant={variant as any}>{status}</Badge>;
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Arsip SPJ</h2>
          <p className="text-slate-500 mt-1">Manage Surat Pertanggungjawaban documents.</p>
        </div>
        {isAuthenticated && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={arsipSPJ} />
    </div>
  );
}
PAGE

# Implement Master Data Jenis Anggaran
cat << 'PAGE' > src/app/master-data/jenis-anggaran/page.tsx
"use client";

import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { JenisAnggaran } from "@/store/useStore";

export default function JenisAnggaranPage() {
  const { isAuthenticated, jenisAnggaran } = useStore();

  const columns: ColumnDef<JenisAnggaran>[] = [
    { accessorKey: "nama", header: "Nama Anggaran" },
    { accessorKey: "keterangan", header: "Keterangan" },
    {
      accessorKey: "alokasi",
      header: "Total Alokasi",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("alokasi"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
        return <div className="font-medium text-blue-600">{formatted}</div>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Master Jenis Anggaran</h2>
          <p className="text-slate-500 mt-1">Manage budget categories and total allocations.</p>
        </div>
        {isAuthenticated && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={jenisAnggaran} />
    </div>
  );
}
PAGE

# Implement Master Data Pegawai
cat << 'PAGE' > src/app/master-data/pegawai/page.tsx
"use client";

import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Pegawai } from "@/store/useStore";

export default function PegawaiPage() {
  const { isAuthenticated, pegawai } = useStore();

  const columns: ColumnDef<Pegawai>[] = [
    { accessorKey: "nama", header: "Nama Lengkap" },
    { accessorKey: "nip", header: "NIP" },
    { accessorKey: "jabatan", header: "Jabatan" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Pegawai / Anggota</h2>
          <p className="text-slate-500 mt-1">Manage personnel records.</p>
        </div>
        {isAuthenticated && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        )}
      </div>
      <DataTable columns={columns} data={pegawai} />
    </div>
  );
}
PAGE
