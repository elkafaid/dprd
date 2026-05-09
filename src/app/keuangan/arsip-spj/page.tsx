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
      </div>
      <DataTable columns={columns} data={arsipSPJ} />
    </div>
  );
}
