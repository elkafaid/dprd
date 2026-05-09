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
