"use client";

import { useStore } from "@/store/useStore";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function PegawaiPage() {
  const { pegawai, deletePegawai, addPegawai } = useStore();
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [fraksi, setFraksi] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addPegawai({ nama, nip, jabatan, fraksi });
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Data Pegawai & Anggota</h2>
          <p className="text-slate-500 mt-1">Kelola data pegawai, pimpinan, dan anggota DPRD.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pegawai/Anggota</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input value={nama} onChange={(e) => setNama(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>NIP / ID</Label>
                <Input value={nip} onChange={(e) => setNip(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Jabatan</Label>
                <Input value={jabatan} onChange={(e) => setJabatan(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Fraksi</Label>
                <Input value={fraksi} onChange={(e) => setFraksi(e.target.value)} />
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
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">NIP / ID</th>
                <th className="px-4 py-3">Jabatan</th>
                <th className="px-4 py-3">Fraksi</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pegawai.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-3 font-medium text-slate-900">{item.nama}</td>
                  <td className="px-4 py-3 text-slate-500">{item.nip}</td>
                  <td className="px-4 py-3 text-slate-900">{item.jabatan}</td>
                  <td className="px-4 py-3 text-slate-900">
                    <span className="px-2 py-1 bg-slate-100 rounded-full text-xs font-medium">{item.fraksi || '-'}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-600" onClick={() => deletePegawai(item.id)}>
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
