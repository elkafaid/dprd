"use client";
import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AgendaPage() {
  const { agenda, addAgenda } = useStore();
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [waktu, setWaktu] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addAgenda({
      namaKegiatan: nama,
      tanggalWaktu: waktu,
      lokasi,
      keterangan
    });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Agenda Kegiatan</h2>
          <p className="text-slate-500 mt-1">Jadwal dan agenda DPRD.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Agenda
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Agenda</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Kegiatan</Label>
                <Input value={nama} onChange={(e) => setNama(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Tanggal & Waktu</Label>
                <Input type="datetime-local" value={waktu} onChange={(e) => setWaktu(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Lokasi</Label>
                <Input value={lokasi} onChange={(e) => setLokasi(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Keterangan</Label>
                <Input value={keterangan} onChange={(e) => setKeterangan(e.target.value)} />
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
                <th className="px-4 py-3">Tanggal & Waktu</th>
                <th className="px-4 py-3">Nama Kegiatan</th>
                <th className="px-4 py-3">Lokasi</th>
                <th className="px-4 py-3">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {agenda.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.tanggalWaktu}</td>
                  <td className="px-4 py-3 text-slate-900">{item.namaKegiatan}</td>
                  <td className="px-4 py-3 text-slate-900">{item.lokasi}</td>
                  <td className="px-4 py-3 text-slate-500">{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
