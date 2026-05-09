"use client";

import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RekapAnggaranPage() {
  const { jenisAnggaran, registerKeluar } = useStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate rekap (mocking logic by using general category mapping)
  const rekapData = jenisAnggaran.map(ja => {
     let terpakai = 0;
     // simple mock: if category matches somehow
     if (ja.nama === 'Biaya Rapat') terpakai = registerKeluar.filter(r => r.kategori === 'Makan & Minum').reduce((sum, r) => sum + r.jumlah, 0);
     if (ja.nama === 'Perawatan') terpakai = registerKeluar.filter(r => r.kategori === 'Pemeliharaan').reduce((sum, r) => sum + r.jumlah, 0);
     const sisa = ja.alokasi - terpakai;
     const percentage = ja.alokasi > 0 ? (terpakai / ja.alokasi) * 100 : 0;
     return { ...ja, terpakai, sisa, percentage };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Rekapitulasi Anggaran</h2>
          <p className="text-slate-500 mt-1">Pantau penyerapan dan sisa anggaran per kategori.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Ekspor Excel
        </Button>
      </div>

      <div className="grid gap-4">
        {rekapData.map((item) => (
          <Card key={item.id} className="bg-white shadow-sm border-slate-200">
            <CardHeader className="pb-2">
               <CardTitle className="text-lg font-medium text-slate-900 flex justify-between">
                 <span>{item.nama}</span>
                 <span className="text-sm font-normal text-slate-500">Alokasi: {formatCurrency(item.alokasi)}</span>
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                 <div className="flex justify-between text-sm">
                   <div className="text-emerald-600 font-medium">Terserap: {formatCurrency(item.terpakai)} ({item.percentage.toFixed(1)}%)</div>
                   <div className="text-blue-600 font-medium">Sisa: {formatCurrency(item.sisa)}</div>
                 </div>
                 <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.percentage > 80 ? 'bg-rose-500' : item.percentage > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(item.percentage, 100)}%` }} />
                 </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
