"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Filter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LaporanKeuanganPage() {
  const { registerMasuk, registerKeluar, arsipSPJ } = useStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Laporan Keuangan</h2>
          <p className="text-slate-500 mt-1">Cetak dan tinjau laporan keuangan komprehensif.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter Laporan
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Unduh PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
         <Card className="bg-white shadow-sm border-slate-200">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-slate-500">Total Transaksi Masuk</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-emerald-600">{registerMasuk.length} Trx</div>
           </CardContent>
         </Card>
         <Card className="bg-white shadow-sm border-slate-200">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-slate-500">Total Transaksi Keluar</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-rose-600">{registerKeluar.length} Trx</div>
           </CardContent>
         </Card>
         <Card className="bg-white shadow-sm border-slate-200">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-slate-500">SPJ Disetujui</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-blue-600">{arsipSPJ.filter(s => s.status === 'Disetujui').length} Dokumen</div>
           </CardContent>
         </Card>
      </div>

      <div className="bg-white rounded-md border shadow-sm p-8 text-center text-slate-500 flex flex-col items-center justify-center min-h-[300px]">
        <FileText className="w-12 h-12 text-slate-300 mb-4" />
        <p className="text-lg font-medium text-slate-900">Preview Laporan Belum Tersedia</p>
        <p className="text-sm mt-1">Silahkan pilih rentang tanggal dan kategori filter terlebih dahulu untuk menampilkan data.</p>
      </div>
    </div>
  );
}
