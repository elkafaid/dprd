"use client";
import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PokirPage() {
  const { pokir, addPokir } = useStore();
  const [open, setOpen] = useState(false);
  const [pengusul, setPengusul] = useState("");
  const [dapil, setDapil] = useState("");
  const [program, setProgram] = useState("");
  const [estimasi, setEstimasi] = useState("");

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
    addPokir({
      pengusul,
      dapil,
      programUsulan: program,
      estimasiAnggaran: Number(estimasi)
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Pokok-Pokok Pikiran (Pokir)</h2>
          <p className="text-slate-500 mt-1">Usulan program dan kegiatan.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Usulan Pokir</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Pengusul (Nama Anggota)</Label>
                <Input value={pengusul} onChange={(e) => setPengusul(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Dapil</Label>
                <Input value={dapil} onChange={(e) => setDapil(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Program Usulan</Label>
                <Input value={program} onChange={(e) => setProgram(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Estimasi Anggaran</Label>
                <Input type="number" value={estimasi} onChange={(e) => setEstimasi(e.target.value)} required />
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
                <th className="px-4 py-3">Pengusul</th>
                <th className="px-4 py-3">Dapil</th>
                <th className="px-4 py-3">Program Usulan</th>
                <th className="px-4 py-3 text-right">Estimasi Anggaran</th>
              </tr>
            </thead>
            <tbody>
              {pokir.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.pengusul}</td>
                  <td className="px-4 py-3 text-slate-500">{item.dapil}</td>
                  <td className="px-4 py-3 text-slate-900">{item.programUsulan}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-900">{formatCurrency(item.estimasiAnggaran)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
