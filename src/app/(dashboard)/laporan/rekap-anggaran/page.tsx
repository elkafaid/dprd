"use client";

import { PieChart } from "lucide-react";

export default function RekapAnggaranPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Rekap Anggaran</h1>
        <p className="text-slate-500 text-sm mt-1">Rekapitulasi sisa dan penggunaan setiap pos anggaran.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <PieChart className="w-8 h-8" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Modul Rekap Anggaran</h2>
        <p className="text-slate-500 max-w-md">Fitur rekapitulasi performa per jenis anggaran sedang dalam tahap penyempurnaan.</p>
      </div>
    </div>
  );
}