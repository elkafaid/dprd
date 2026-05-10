"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ArrowDownToLine, ArrowUpFromLine, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function DashboardKeuanganPage() {
  const { isAuthenticated, registerMasuk, registerKeluar, arsipSPJ, jenisAnggaran } = useStore();

  const totalAnggaran = jenisAnggaran.reduce((sum, item) => sum + item.alokasi, 0);
  const totalMasuk = registerMasuk.reduce((sum, item) => sum + item.jumlah, 0);
  const totalKeluar = registerKeluar.reduce((sum, item) => sum + item.jumlah, 0);
  const realisasiPercentage = totalAnggaran > 0 ? (totalKeluar / totalAnggaran) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const donutData = [
    { name: "Total Masuk", value: totalMasuk },
    { name: "Total Keluar", value: totalKeluar },
  ];
  const COLORS = ["#10b981", "#ef4444"];

  const [searchMasuk, setSearchMasuk] = useState("");
  const [searchKeluar, setSearchKeluar] = useState("");
  const [searchSPJ, setSearchSPJ] = useState("");

  const filteredMasuk = registerMasuk.filter(r => r.uraian.toLowerCase().includes(searchMasuk.toLowerCase()) || r.nomorRegister.toLowerCase().includes(searchMasuk.toLowerCase()));
  const filteredKeluar = registerKeluar.filter(r => r.uraian.toLowerCase().includes(searchKeluar.toLowerCase()) || r.kategori.toLowerCase().includes(searchKeluar.toLowerCase()));
  const filteredSPJ = arsipSPJ.filter(r => r.nomorSPJ.toLowerCase().includes(searchSPJ.toLowerCase()) || r.perjalananDinas.toLowerCase().includes(searchSPJ.toLowerCase()) || r.pegawai.toLowerCase().includes(searchSPJ.toLowerCase()));

  const [pageMasuk, setPageMasuk] = useState(1);
  const [pageKeluar, setPageKeluar] = useState(1);
  const [pageSPJ, setPageSPJ] = useState(1);
  const itemsPerPage = 5;

  const paginatedMasuk = filteredMasuk.slice((pageMasuk - 1) * itemsPerPage, pageMasuk * itemsPerPage);
  const paginatedKeluar = filteredKeluar.slice((pageKeluar - 1) * itemsPerPage, pageKeluar * itemsPerPage);
  const paginatedSPJ = filteredSPJ.slice((pageSPJ - 1) * itemsPerPage, pageSPJ * itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Keuangan</h2>
          <p className="text-slate-500 mt-1">Manage Dashboard Keuangan data and records.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white shadow-sm border-slate-200">
           <CardHeader>
             <CardTitle className="text-lg font-semibold text-slate-900">Total Arus Kas</CardTitle>
           </CardHeader>
           <CardContent className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => typeof value === 'number' ? formatCurrency(value) : value} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                 <span className="text-xs text-slate-500">Total Masuk</span>
                 <span className="text-sm font-bold text-slate-900">{formatCurrency(totalMasuk)}</span>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-slate-200">
           <CardHeader>
             <CardTitle className="text-lg font-semibold text-slate-900">Realisasi Anggaran</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col justify-center h-[250px]">
              <div className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Terserap</span>
                   <span className="font-medium">{realisasiPercentage.toFixed(1)}%</span>
                 </div>
                 <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(realisasiPercentage, 100)}%` }} />
                 </div>
                 <div className="flex justify-between text-xs text-slate-500 mt-1">
                   <span>{formatCurrency(totalKeluar)}</span>
                   <span>dari {formatCurrency(totalAnggaran)}</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-slate-200">
           <CardHeader>
             <CardTitle className="text-lg font-semibold text-slate-900">Aksi Cepat</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <ArrowDownToLine className="w-4 h-4 text-blue-500"/> Tambah Register Masuk
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <ArrowUpFromLine className="w-4 h-4 text-rose-500"/> Tambah Register Keluar
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4 text-blue-500"/> Buat SPJ Baru
              </Button>
           </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-900 border-b pb-2">Tabel Keuangan</h3>

        {/* Register Masuk Table */}
        <div className="bg-white rounded-md border shadow-sm overflow-hidden flex flex-col">
           <div className="px-4 py-3 bg-slate-50 border-b flex justify-between items-center">
             <span className="font-medium text-slate-900">Register Masuk</span>
             <Input placeholder="Cari..." className="w-64 h-8 text-sm" value={searchMasuk} onChange={(e) => setSearchMasuk(e.target.value)} />
           </div>
           <div className="p-4 overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">No. Register</th>
                    <th className="px-4 py-3">Uraian</th>
                    <th className="px-4 py-3">Sumber Dana</th>
                    <th className="px-4 py-3 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMasuk.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3">{item.tanggal}</td>
                      <td className="px-4 py-3">{item.nomorRegister}</td>
                      <td className="px-4 py-3">{item.uraian}</td>
                      <td className="px-4 py-3">{item.sumberDana}</td>
                      <td className="px-4 py-3 text-right font-medium text-blue-600">+{formatCurrency(item.jumlah)}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
           <div className="px-4 py-3 border-t bg-slate-50 flex items-center justify-between text-sm text-slate-500">
             <span>Menampilkan {paginatedMasuk.length} dari {filteredMasuk.length} data</span>
             <div className="flex gap-2">
               <Button variant="outline" size="sm" onClick={() => setPageMasuk(Math.max(1, pageMasuk - 1))} disabled={pageMasuk === 1}>Sebelumnya</Button>
               <Button variant="outline" size="sm" onClick={() => setPageMasuk(pageMasuk + 1)} disabled={pageMasuk * itemsPerPage >= filteredMasuk.length}>Selanjutnya</Button>
             </div>
           </div>
        </div>

        {/* Register Keluar Table */}
        <div className="bg-white rounded-md border shadow-sm overflow-hidden flex flex-col">
           <div className="px-4 py-3 bg-slate-50 border-b flex justify-between items-center">
             <span className="font-medium text-slate-900">Register Keluar</span>
             <Input placeholder="Cari..." className="w-64 h-8 text-sm" value={searchKeluar} onChange={(e) => setSearchKeluar(e.target.value)} />
           </div>
           <div className="p-4 overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Uraian</th>
                    <th className="px-4 py-3">Kategori</th>
                    <th className="px-4 py-3 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedKeluar.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3">{item.tanggal}</td>
                      <td className="px-4 py-3">{item.uraian}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-slate-100 rounded-full text-xs">{item.kategori}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-rose-600">-{formatCurrency(item.jumlah)}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
           <div className="px-4 py-3 border-t bg-slate-50 flex items-center justify-between text-sm text-slate-500">
             <span>Menampilkan {paginatedKeluar.length} dari {filteredKeluar.length} data</span>
             <div className="flex gap-2">
               <Button variant="outline" size="sm" onClick={() => setPageKeluar(Math.max(1, pageKeluar - 1))} disabled={pageKeluar === 1}>Sebelumnya</Button>
               <Button variant="outline" size="sm" onClick={() => setPageKeluar(pageKeluar + 1)} disabled={pageKeluar * itemsPerPage >= filteredKeluar.length}>Selanjutnya</Button>
             </div>
           </div>
        </div>

        {/* Arsip SPJ Table */}
        <div className="bg-white rounded-md border shadow-sm overflow-hidden flex flex-col">
           <div className="px-4 py-3 bg-slate-50 border-b flex justify-between items-center">
             <span className="font-medium text-slate-900">Arsip SPJ</span>
             <Input placeholder="Cari..." className="w-64 h-8 text-sm" value={searchSPJ} onChange={(e) => setSearchSPJ(e.target.value)} />
           </div>
           <div className="p-4 overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3">No. SPJ</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Perjalanan Dinas</th>
                    <th className="px-4 py-3">Pegawai</th>
                    <th className="px-4 py-3 text-right">Total Biaya</th>
                    <th className="px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSPJ.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{item.nomorSPJ}</td>
                      <td className="px-4 py-3">{item.tanggal}</td>
                      <td className="px-4 py-3">{item.perjalananDinas}</td>
                      <td className="px-4 py-3">{item.pegawai}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(item.totalBiaya)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'Disetujui' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'Menunggu Verifikasi' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
           <div className="px-4 py-3 border-t bg-slate-50 flex items-center justify-between text-sm text-slate-500">
             <span>Menampilkan {paginatedSPJ.length} dari {filteredSPJ.length} data</span>
             <div className="flex gap-2">
               <Button variant="outline" size="sm" onClick={() => setPageSPJ(Math.max(1, pageSPJ - 1))} disabled={pageSPJ === 1}>Sebelumnya</Button>
               <Button variant="outline" size="sm" onClick={() => setPageSPJ(pageSPJ + 1)} disabled={pageSPJ * itemsPerPage >= filteredSPJ.length}>Selanjutnya</Button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
