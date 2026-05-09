"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PegawaiForm } from "@/components/forms/PegawaiForm";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function MasterPegawaiPage() {
  const { pegawai, addPegawai, updatePegawai, deletePegawai } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleOpenAdd = () => {
    setEditingData(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data pegawai ini?")) {
      deletePegawai(id);
    }
  };

  const handleSubmit = (data: any) => {
    if (editingData) {
      updatePegawai(editingData.id, data);
    } else {
      addPegawai(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Data Pegawai / Anggota</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola data seluruh pegawai dan anggota dewan.</p>
        </div>
        <Button onClick={handleOpenAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Pegawai
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 font-medium">Nama Lengkap</th>
                <th className="px-5 py-3 font-medium">NIP / NIK</th>
                <th className="px-5 py-3 font-medium">Jabatan</th>
                <th className="px-5 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {pegawai.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-900">{item.nama}</td>
                  <td className="px-5 py-3 text-slate-600">{item.nip}</td>
                  <td className="px-5 py-3 text-slate-600">{item.jabatan}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenEdit(item)} className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {pegawai.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-slate-500">Belum ada data pegawai.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingData ? "Edit Pegawai" : "Tambah Pegawai"}</DialogTitle>
          </DialogHeader>
          <PegawaiForm
            initialData={editingData}
            onSubmitData={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}