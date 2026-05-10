"use client";
import { useStore } from "@/store/useStore";
import { Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SuratMasukPage() {
  const { suratMasuk, updateSuratMasukStatus, addSuratMasuk } = useStore();
  const [open, setOpen] = useState(false);
  const [nomor, setNomor] = useState("");
  const [pengirim, setPengirim] = useState("");
  const [perihal, setPerihal] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addSuratMasuk({
      nomorSurat: nomor,
      pengirim,
      perihal,
      tanggal: new Date().toISOString().split('T')[0],
      status: 'Belum Dibaca'
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Surat Masuk</h2>
          <p className="text-slate-500 mt-1">Kelola data surat masuk.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Surat Masuk</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Nomor Surat</Label>
                <Input value={nomor} onChange={(e) => setNomor(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Pengirim</Label>
                <Input value={pengirim} onChange={(e) => setPengirim(e.target.value)} required />
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
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-4 py-3">No. Surat</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Pengirim</th>
                <th className="px-4 py-3">Perihal</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {suratMasuk.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.nomorSurat}</td>
                  <td className="px-4 py-3 text-slate-500">{item.tanggal}</td>
                  <td className="px-4 py-3 text-slate-900">{item.pengirim}</td>
                  <td className="px-4 py-3 text-slate-900">{item.perihal}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 text-xs rounded-full \${
                      item.status === 'Selesai' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'Diproses' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                       {item.status !== 'Selesai' && (
                         <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600" onClick={() => updateSuratMasukStatus(item.id, 'Selesai')}>
                           <CheckCircle className="h-4 w-4" />
                         </Button>
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
