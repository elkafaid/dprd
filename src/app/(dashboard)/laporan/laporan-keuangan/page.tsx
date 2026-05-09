"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Filter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function LaporanKeuanganPage() {
  const { registerMasuk, registerKeluar, arsipSPJ } = useStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredMasuk = registerMasuk.filter(r => (!startDate || r.tanggal >= startDate) && (!endDate || r.tanggal <= endDate));
  const filteredKeluar = registerKeluar.filter(r => (!startDate || r.tanggal >= startDate) && (!endDate || r.tanggal <= endDate));


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
             <div className="text-2xl font-bold text-emerald-600">{filteredMasuk.length} Trx</div>
           </CardContent>
         </Card>
         <Card className="bg-white shadow-sm border-slate-200">
           <CardHeader className="pb-2">
             <CardTitle className="text-sm font-medium text-slate-500">Total Transaksi Keluar</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold text-rose-600">{filteredKeluar.length} Trx</div>
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


      <div className="bg-white rounded-md border shadow-sm mb-6 p-4 flex items-end gap-4">
        <div className="space-y-1 flex-1">
          <label className="text-sm font-medium text-slate-700">Tanggal Mulai</label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="space-y-1 flex-1">
          <label className="text-sm font-medium text-slate-700">Tanggal Selesai</label>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <Button variant="outline" onClick={() => { setStartDate(""); setEndDate(""); }}>Reset</Button>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
         <div className="px-4 py-3 bg-slate-50 border-b font-medium text-slate-900">Data Transaksi (Masuk & Keluar)</div>
         <div className="p-4 overflow-x-auto">
           <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-4 py-3">Tanggal</th>
                  <th className="px-4 py-3">Tipe</th>
                  <th className="px-4 py-3">Uraian</th>
                  <th className="px-4 py-3 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {[...filteredMasuk.map(i => ({...i, type: 'Masuk'})), ...filteredKeluar.map(i => ({...i, type: 'Keluar'}))]
                  .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
                  .map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-3">{item.tanggal}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'Masuk' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.uraian}</td>
                    <td className={`px-4 py-3 text-right font-medium ${item.type === 'Masuk' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.type === 'Masuk' ? '+' : '-'}{formatCurrency(item.jumlah)}
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
         </div>
      </div>

    </div>
  );
}
