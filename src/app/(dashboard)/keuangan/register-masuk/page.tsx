"use client";

import { useStore } from "@/store/useStore";

export default function RegisterMasukPage() {
  const { registerMasuk } = useStore();

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Register Masuk</h1>
        <p className="text-slate-500 text-sm mt-1">Daftar seluruh pendapatan dan pemasukan anggaran.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium">Nomor Register</th>
                <th className="px-5 py-3 font-medium">Uraian</th>
                <th className="px-5 py-3 font-medium">Sumber Dana</th>
                <th className="px-5 py-3 font-medium text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {registerMasuk.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 text-slate-600">{item.tanggal}</td>
                  <td className="px-5 py-3 font-medium text-slate-900">{item.nomorRegister}</td>
                  <td className="px-5 py-3 text-slate-900">{item.uraian}</td>
                  <td className="px-5 py-3 text-slate-600">{item.sumberDana}</td>
                  <td className="px-5 py-3 text-right font-medium text-green-600">{formatRupiah(item.jumlah)}</td>
                </tr>
              ))}
              {registerMasuk.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">Tidak ada data register masuk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}