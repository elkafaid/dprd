"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  Archive,
  CalendarIcon,
  Search,
  Filter,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { TambahRegisterMasukModal } from "@/components/modals/TambahRegisterMasukModal";
import { TambahRegisterKeluarModal } from "@/components/modals/TambahRegisterKeluarModal";
import { UploadSPJModal } from "@/components/modals/UploadSPJModal";

export default function KeuanganDashboard() {
  const { registerMasuk, registerKeluar, arsipSPJ } = useStore();
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  const [isMasukOpen, setIsMasukOpen] = useState(false);
  const [isKeluarOpen, setIsKeluarOpen] = useState(false);
  const [isSPJOpen, setIsSPJOpen] = useState(false);

  // Calculations
  const totalMasuk = registerMasuk.reduce((sum, item) => sum + item.jumlah, 0);
  const totalKeluar = registerKeluar.reduce((sum, item) => sum + item.jumlah, 0);
  const sisaAnggaran = totalMasuk - totalKeluar;
  const totalArsip = arsipSPJ.length;

  const budgetUsagePercent = totalMasuk > 0 ? (totalKeluar / totalMasuk) * 100 : 0;

  // Chart Data based on actual data
  const aggregatedKeluar = registerKeluar.reduce((acc, curr) => {
    // Assuming uraian acts as a category, could be mapped to jenisAnggaran if linked
    const category = curr.uraian.split(' ')[0] || 'Lainnya'; // Simple grouping strategy for mock purposes
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += curr.jumlah;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(aggregatedKeluar).length > 0
    ? Object.keys(aggregatedKeluar).map(key => ({
        name: key,
        value: aggregatedKeluar[key]
      }))
    : [{ name: "Belum ada pengeluaran", value: 1 }];

  const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899", "#14b8a6"];

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

  const filteredArsipSPJ = arsipSPJ.filter(
    (spj) =>
      spj.nomorSPJ.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spj.perjalananDinas.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spj.pegawai.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Keuangan
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Ringkasan data keuangan, register, dan SPJ.
          </p>
        </div>
        <Popover>
          <PopoverTrigger render={<Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal bg-white shadow-sm",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange ? format(dateRange, "PPP", { locale: idLocale }) : <span>Pilih rentang tanggal</span>}
            </Button>} />
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={dateRange}
              onSelect={setDateRange}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <ArrowDownToLine className="w-6 h-6 text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-500 truncate">Total Register Masuk</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1 truncate">{formatRupiah(totalMasuk)}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <ArrowUpFromLine className="w-6 h-6 text-red-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-500 truncate">Total Register Keluar</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1 truncate">{formatRupiah(totalKeluar)}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-500 truncate">Sisa Anggaran</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1 truncate">{formatRupiah(sisaAnggaran)}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <Archive className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Arsip SPJ</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{totalArsip} Dokumen</h3>
          </div>
        </div>
      </div>

      {/* Split Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-900">Register Masuk</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700" onClick={() => setIsMasukOpen(true)}>Lihat Semua</Button>
          </div>
          <div className="p-0 overflow-x-auto w-full">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Tanggal</th>
                  <th className="px-5 py-3 font-medium">Uraian</th>
                  <th className="px-5 py-3 font-medium text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registerMasuk.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 whitespace-nowrap text-slate-600">{item.tanggal}</td>
                    <td className="px-5 py-3 text-slate-900">{item.uraian}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-right font-medium text-green-600">{formatRupiah(item.jumlah)}</td>
                  </tr>
                ))}
                {registerMasuk.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-slate-500">Tidak ada data register masuk.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-900">Register Keluar</h3>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700" onClick={() => setIsKeluarOpen(true)}>Lihat Semua</Button>
          </div>
          <div className="p-0 overflow-x-auto w-full">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Tanggal</th>
                  <th className="px-5 py-3 font-medium">Uraian</th>
                  <th className="px-5 py-3 font-medium text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registerKeluar.slice(0, 5).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 whitespace-nowrap text-slate-600">{item.tanggal}</td>
                    <td className="px-5 py-3 text-slate-900">{item.uraian}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-right font-medium text-red-600">{formatRupiah(item.jumlah)}</td>
                  </tr>
                ))}
                {registerKeluar.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-slate-500">Tidak ada data register keluar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Width Table (Arsip SPJ) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="font-semibold text-slate-900">Arsip SPJ Terbaru</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Cari SPJ..."
                className="pl-9 w-[200px] h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="w-4 h-4 text-slate-500" />
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 font-medium">No SPJ</th>
                <th className="px-5 py-3 font-medium">Perjalanan Dinas</th>
                <th className="px-5 py-3 font-medium">Pegawai/Anggota</th>
                <th className="px-5 py-3 font-medium">Tanggal</th>
                <th className="px-5 py-3 font-medium text-right">Total Biaya</th>
                <th className="px-5 py-3 font-medium text-center">Status</th>
                <th className="px-5 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredArsipSPJ.slice(0, 5).map((item) => (
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
                  <td className="px-5 py-3 whitespace-nowrap text-right">
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">Detail</Button>
                  </td>
                </tr>
              ))}
               {filteredArsipSPJ.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-slate-500">Tidak ada data Arsip SPJ yang cocok.</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Ringkasan Pengeluaran</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatRupiah(value as number)} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <div className="mb-2 flex justify-between items-end">
            <div>
              <h3 className="font-semibold text-slate-900">Realisasi Anggaran</h3>
              <p className="text-sm text-slate-500 mt-1">Tahun Anggaran 2023</p>
            </div>
            <span className="text-2xl font-bold text-blue-600">{budgetUsagePercent.toFixed(1)}%</span>
          </div>
          <Progress value={budgetUsagePercent > 100 ? 100 : budgetUsagePercent} className="h-3 bg-slate-100" />
          <div className="mt-4 flex justify-between text-sm">
            <div>
              <p className="text-slate-500">Terpakai</p>
              <p className="font-medium text-slate-900">{formatRupiah(totalKeluar)}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500">Total Pagu</p>
              <p className="font-medium text-slate-900">{formatRupiah(totalMasuk)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-900 mb-4">Aksi Cepat</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start font-normal" onClick={() => setIsMasukOpen(true)}>
              <ArrowDownToLine className="w-4 h-4 mr-2 text-green-600" />
              Tambah Register Masuk
            </Button>
            <Button variant="outline" className="w-full justify-start font-normal" onClick={() => setIsKeluarOpen(true)}>
              <ArrowUpFromLine className="w-4 h-4 mr-2 text-red-600" />
              Tambah Register Keluar
            </Button>
            <Button variant="outline" className="w-full justify-start font-normal" onClick={() => setIsSPJOpen(true)}>
              <Archive className="w-4 h-4 mr-2 text-purple-600" />
              Upload SPJ
            </Button>
            <Button variant="outline" className="w-full justify-start font-normal text-slate-600 bg-slate-50">
               Lihat Laporan Keuangan
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TambahRegisterMasukModal open={isMasukOpen} onOpenChange={setIsMasukOpen} />
      <TambahRegisterKeluarModal open={isKeluarOpen} onOpenChange={setIsKeluarOpen} />
      <UploadSPJModal open={isSPJOpen} onOpenChange={setIsSPJOpen} />

    </div>
  );
}
