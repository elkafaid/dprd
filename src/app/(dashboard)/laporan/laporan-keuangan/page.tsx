"use client";

import { FileText } from "lucide-react";

export default function LaporanKeuanganPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Laporan Keuangan</h1>
        <p className="text-slate-500 text-sm mt-1">Laporan rinci seluruh transaksi masuk dan keluar.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Modul Laporan Keuangan</h2>
        <p className="text-slate-500 max-w-md">Fitur pelaporan keuangan secara mendetail sedang dalam tahap pengembangan. Silakan pantau pembaruan sistem berikutnya.</p>
      </div>
    </div>
  );
}