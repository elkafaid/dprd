"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ArrowDownToLine, ArrowUpFromLine, PieChart as PieChartIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  const { jenisAnggaran, registerMasuk, registerKeluar } = useStore();

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
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-1">Overview of financial performance and budget allocation.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Anggaran
            </CardTitle>
            <Wallet className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalAnggaran)}</div>
            <p className="text-xs text-slate-500 mt-1">Based on Master Data</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Register Masuk
            </CardTitle>
            <ArrowDownToLine className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalMasuk)}</div>
            <p className="text-xs text-slate-500 mt-1">Total revenue recorded</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Total Register Keluar
            </CardTitle>
            <ArrowUpFromLine className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(totalKeluar)}</div>
            <p className="text-xs text-slate-500 mt-1">Total expenses recorded</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">
              Sisa Anggaran
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{formatCurrency(sisaAnggaran)}</div>
            <p className="text-xs text-slate-500 mt-1">Total + Masuk - Keluar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white shadow-sm border-slate-200">
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                No expense data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-white shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {registerKeluar.slice(-5).reverse().map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                      <ArrowUpFromLine className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.uraian}</p>
                      <p className="text-xs text-slate-500">{item.kategori} • {item.tanggal}</p>
                    </div>
                  </div>
                  <div className="font-medium text-rose-600 text-sm">
                    -{formatCurrency(item.jumlah)}
                  </div>
                </div>
              ))}
              {registerKeluar.length === 0 && (
                <div className="text-center text-slate-500 py-4 text-sm">
                  No recent transactions
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
