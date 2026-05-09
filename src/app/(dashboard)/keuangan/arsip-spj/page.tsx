"use client";

import { useStore } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ArsipSPJPage() {
  const { arsipSPJ } = useStore();

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disetujui":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Menunggu Verifikasi":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Ditolak":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Arsip SPJ</h1>
        <p className="text-slate-500 text-sm mt-1">Daftar arsip Surat Pertanggungjawaban (SPJ).</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 font-medium">No SPJ</th>
                <th className="px-5 py-3 font-medium">Perjalanan Dinas</th>
                <th className="px-5 py-3 font-medium">Pegawai/Anggota</th>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium text-right">Total Biaya</th>
                <th className="px-5 py-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {arsipSPJ.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-900">{item.nomorSPJ}</td>
                  <td className="px-5 py-3 text-slate-600">{item.perjalananDinas}</td>
                  <td className="px-5 py-3 text-slate-600">{item.pegawai}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-500">{item.tanggal}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-right font-medium">{formatRupiah(item.totalBiaya)}</td>
                  <td className="px-5 py-3 whitespace-nowrap text-center">
                    <Badge className={cn("font-normal border-transparent", getStatusColor(item.status))}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
               {arsipSPJ.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-slate-500">Tidak ada data Arsip SPJ.</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}