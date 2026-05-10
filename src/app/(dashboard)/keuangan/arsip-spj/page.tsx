"use client";

import { useStore } from "@/store/useStore";
import { Plus, Check, X, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function ArsipSPJPage() {
  const { arsipSPJ, registerKeluar, addArsipSPJ, updateSPJStatus } = useStore();
  const [open, setOpen] = useState(false);
  const [perjalanan, setPerjalanan] = useState("");
  const [pegawai, setPegawai] = useState("");
  const [totalBiaya, setTotalBiaya] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addArsipSPJ({
      nomorSPJ: `SPJ/\${new Date().getFullYear()}/\${Math.floor(Math.random()*1000)}`,
      perjalananDinas: perjalanan,
      pegawai,
      tanggal: new Date().toISOString().split('T')[0],
      totalBiaya: Number(totalBiaya),
      status: 'Draft'
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Arsip SPJ</h2>
          <p className="text-slate-500 mt-1">Daftar Surat Pertanggungjawaban (SPJ).</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
            <Plus className="w-4 h-4 mr-2" />
            Buat SPJ
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat SPJ Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Link Register Keluar</Label>
                <Select onValueChange={(v) => {
                  const reg = registerKeluar.find(r => r.id === v);
                  if (reg) {
                     setPerjalanan(reg.uraian);
                     setTotalBiaya(reg.jumlah.toString());
                  }
                }}>
                  <SelectTrigger><SelectValue placeholder="Pilih Register Keluar" /></SelectTrigger>
                  <SelectContent>
                    {registerKeluar.map(r => (
                       <SelectItem key={r.id} value={r.id}>{r.uraian} - {formatCurrency(r.jumlah)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nama Pegawai</Label>
                <Input value={pegawai} onChange={(e) => setPegawai(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Upload Dokumen Pendukung (Mock)</Label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer">
                  <Upload className="h-6 w-6 mb-2" />
                  <span className="text-sm">Klik untuk upload file</span>
                </div>
              </div>
              <Button type="submit" className="w-full">Simpan SPJ</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <div className="p-4 overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3">No. SPJ</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Perjalanan Dinas</th>
                <th className="px-4 py-3">Pegawai</th>
                <th className="px-4 py-3 text-right">Total Biaya</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {arsipSPJ.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.nomorSPJ}</td>
                  <td className="px-4 py-3 text-slate-500">{item.tanggal}</td>
                  <td className="px-4 py-3 text-slate-900">{item.perjalananDinas}</td>
                  <td className="px-4 py-3 text-slate-900">{item.pegawai}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(item.totalBiaya)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs rounded-full \${
                      item.status === 'Disetujui' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'Menunggu Verifikasi' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-slate-600" title="Detail">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {item.status === 'Draft' && (
                         <Button variant="outline" size="sm" onClick={() => updateSPJStatus(item.id, 'Menunggu Verifikasi')}>
                           Ajukan Verifikasi
                         </Button>
                      )}
                      {item.status === 'Menunggu Verifikasi' && (
                         <>
                           <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600" title="Setujui" onClick={() => updateSPJStatus(item.id, 'Disetujui')}>
                             <Check className="h-4 w-4" />
                           </Button>
                           <Button variant="outline" size="icon" className="h-8 w-8 text-rose-600" title="Tolak" onClick={() => updateSPJStatus(item.id, 'Draft')}>
                             <X className="h-4 w-4" />
                           </Button>
                         </>
                      )}
                    </div>
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
