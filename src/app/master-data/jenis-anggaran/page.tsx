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
