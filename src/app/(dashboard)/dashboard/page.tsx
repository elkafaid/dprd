"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowDownToLine, ArrowUpFromLine, PieChart as PieChartIcon, Mail, MailOpen, FileText, ClipboardList, Building2, Trees } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const { jenisAnggaran, registerMasuk, registerKeluar, suratMasuk, suratKeluar, pengaduan } = useStore();

  const totalAnggaran = jenisAnggaran.reduce((sum, item) => sum + item.alokasi, 0);
  const totalMasuk = registerMasuk.reduce((sum, item) => sum + item.jumlah, 0);
  const totalKeluar = registerKeluar.reduce((sum, item) => sum + item.jumlah, 0);
  const sisaAnggaran = totalAnggaran + totalMasuk - totalKeluar;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Group registerKeluar by kategori
  const groupedData = registerKeluar.reduce((acc, item) => {
    const existing = acc.find((d) => d.name === item.kategori);
    if (existing) {
      existing.value += item.jumlah;
    } else {
      acc.push({ name: item.kategori, value: item.jumlah });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-xl p-8 text-white shadow-lg flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Selamat datang Admin DPRD Kab. Mojokerto
          </h2>
          <p className="text-emerald-50 text-lg max-w-xl">
            Sistem Informasi Manajemen Terpadu untuk mengelola administrasi, keuangan, dan aspirasi masyarakat dengan transparan dan efisien.
          </p>
        </div>

        <div className="relative z-10 hidden md:flex items-end gap-2 text-white/20">
          <Trees className="w-16 h-16 mb-2" />
          <Building2 className="w-32 h-32" />
          <Trees className="w-20 h-20" />
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-teal-900/30 rounded-full blur-2xl"></div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-600 text-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Total Anggaran
            </CardTitle>
            <Wallet className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalAnggaran)}</div>
            <p className="text-xs text-white/80 mt-1">Berdasarkan Master Data</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-600 text-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Total Register Masuk
            </CardTitle>
            <ArrowDownToLine className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalMasuk)}</div>
            <p className="text-xs text-white/80 mt-1">Total Pemasukan Tercatat</p>
          </CardContent>
        </Card>
        <Card className="bg-rose-600 text-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Total Register Keluar
            </CardTitle>
            <ArrowUpFromLine className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(totalKeluar)}</div>
            <p className="text-xs text-white/80 mt-1">Total Pengeluaran Tercatat</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-600 text-white shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              Sisa Anggaran
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(sisaAnggaran)}</div>
            <p className="text-xs text-white/80 mt-1">Total + Masuk - Keluar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Surat Masuk
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Mail className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{suratMasuk.length}</div>
            <p className="text-xs text-slate-500 mt-1">Tata Usaha</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Surat Keluar
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
              <MailOpen className="h-4 w-4 text-indigo-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{suratKeluar.length}</div>
            <p className="text-xs text-slate-500 mt-1">Tata Usaha</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Pengaduan
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
              <ClipboardList className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pengaduan.length}</div>
            <p className="text-xs text-slate-500 mt-1">Aspirasi & Pokir</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Riwayat Transaksi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...registerMasuk.map(i => ({...i, type: 'masuk'})), ...registerKeluar.map(i => ({...i, type: 'keluar'}))]
                .sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime())
                .slice(0, 5)
                .map((item) => (
                <div key={item.id + item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center \${item.type === 'masuk' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                      {item.type === 'masuk' ? <ArrowDownToLine className="w-4 h-4" /> : <ArrowUpFromLine className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.uraian}</p>
                      <p className="text-xs text-slate-500">{item.tanggal}</p>
                    </div>
                  </div>
                  <div className={`font-medium text-sm \${item.type === 'masuk' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.type === 'masuk' ? '+' : '-'}{formatCurrency(item.jumlah)}
                  </div>
                </div>
              ))}
              {(registerMasuk.length + registerKeluar.length) === 0 && (
                <div className="text-center text-slate-500 py-4 text-sm">
                  Belum ada transaksi
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-white shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Pengeluaran per Kategori</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {groupedData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={groupedData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {groupedData.map((entry, index) => (
                      <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => typeof value === 'number' ? formatCurrency(value) : value}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                Data tidak tersedia
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg hover:bg-slate-50 transition-colors text-left flex flex-col items-start gap-2">
                 <ArrowDownToLine className="w-6 h-6 text-emerald-500" />
                 <span className="font-medium text-slate-900 text-sm">Tambah Register Masuk</span>
              </button>
              <button className="p-4 border rounded-lg hover:bg-slate-50 transition-colors text-left flex flex-col items-start gap-2">
                 <ArrowUpFromLine className="w-6 h-6 text-rose-500" />
                 <span className="font-medium text-slate-900 text-sm">Tambah Register Keluar</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Register Masuk & Keluar</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {registerMasuk.slice(0,2).map(r => (
                  <div key={r.id} className="flex justify-between items-center text-sm border-b pb-2">
                    <span>{r.nomorRegister} - {r.uraian}</span>
                    <span className="text-emerald-600 font-medium">{formatCurrency(r.jumlah)}</span>
                  </div>
               ))}
               {registerKeluar.slice(0,2).map(r => (
                  <div key={r.id} className="flex justify-between items-center text-sm border-b pb-2">
                    <span>{r.uraian}</span>
                    <span className="text-rose-600 font-medium">-{formatCurrency(r.jumlah)}</span>
                  </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}