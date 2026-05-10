"use client";

import { useStore } from "@/store/useStore";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function JenisAnggaranPage() {
  const { jenisAnggaran, deleteJenisAnggaran, addJenisAnggaran } = useStore();
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [alokasi, setAlokasi] = useState("");

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
    addJenisAnggaran({
      nama, keterangan, alokasi: Number(alokasi)
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Jenis Anggaran</h2>
          <p className="text-slate-500 mt-1">Kelola master data jenis anggaran.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Jenis Anggaran</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Anggaran</Label>
                <Input value={nama} onChange={(e) => setNama(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Keterangan</Label>
                <Input value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Alokasi (Nominal Budget)</Label>
                <Input type="number" value={alokasi} onChange={(e) => setAlokasi(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Simpan</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <div className="p-4 overflow-x-auto w-full">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3">Nama Anggaran</th>
                <th className="px-4 py-3">Keterangan</th>
                <th className="px-4 py-3 text-right">Alokasi Total</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jenisAnggaran.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.nama}</td>
                  <td className="px-4 py-3 text-slate-500">{item.keterangan}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(item.alokasi)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-600" onClick={() => deleteJenisAnggaran(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
