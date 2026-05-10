"use client";
import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SuratKeluarPage() {
  const { suratKeluar, addSuratKeluar } = useStore();
  const [open, setOpen] = useState(false);
  const [penerima, setPenerima] = useState("");
  const [perihal, setPerihal] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addSuratKeluar({
      penerima,
      perihal,
      tanggal: new Date().toISOString().split('T')[0]
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Surat Keluar</h2>
          <p className="text-slate-500 mt-1">Kelola data surat keluar.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
            <Plus className="w-4 h-4 mr-2" />
            Buat Surat Keluar
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Buat Surat Keluar</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Penerima</Label>
                <Input value={penerima} onChange={(e) => setPenerima(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Perihal</Label>
                <Input value={perihal} onChange={(e) => setPerihal(e.target.value)} required />
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
                <th className="px-4 py-3">No. Surat</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Penerima</th>
                <th className="px-4 py-3">Perihal</th>
              </tr>
            </thead>
            <tbody>
              {suratKeluar.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.nomorSurat}</td>
                  <td className="px-4 py-3 text-slate-500">{item.tanggal}</td>
                  <td className="px-4 py-3 text-slate-900">{item.penerima}</td>
                  <td className="px-4 py-3 text-slate-900">{item.perihal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
