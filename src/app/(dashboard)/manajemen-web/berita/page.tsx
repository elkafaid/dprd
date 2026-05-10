"use client";

import { useState } from "react";
import { useStore, Berita } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Calendar, ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BeritaManagementPage() {
  const { berita, addBerita, updateBerita, deleteBerita } = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentBerita, setCurrentBerita] = useState<Berita | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageUrl("");
    setDate("");
    setCurrentBerita(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addBerita({ title, content, imageUrl, date });
    setIsAddOpen(false);
    resetForm();
  };

  const handleEdit = (item: Berita) => {
    setCurrentBerita(item);
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.imageUrl);
    setDate(item.date);
    setIsEditOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBerita) {
      updateBerita(currentBerita.id, { title, content, imageUrl, date });
    }
    setIsEditOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      deleteBerita(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Berita</h1>
          <p className="text-sm text-slate-500">Kelola artikel berita dan publikasi untuk Landing Page</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if(!open) resetForm(); }}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Berita
            </Button>}>
            Tambah Berita
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Berita Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Berita</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan judul..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL Gambar Thumbnail</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Isi Berita</Label>
                <textarea
                  id="content"
                  className="flex min-h-[150px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis isi berita di sini..."
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Simpan Berita</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {berita.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="relative h-48 bg-slate-100 shrink-0">
               {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
               ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-400">
                     <ImageIcon className="w-10 h-10" />
                  </div>
               )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center text-xs text-slate-500 mb-2">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {item.date}
              </div>
              <h3 className="font-bold text-slate-800 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">{item.content}</p>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 mt-auto">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if(!open) resetForm(); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Berita</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Judul Berita</Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Tanggal</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-imageUrl">URL Gambar Thumbnail</Label>
              <Input
                id="edit-imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Isi Berita</Label>
              <textarea
                id="edit-content"
                className="flex min-h-[150px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Update Berita</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}