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
import dynamic from 'next/dynamic';

// Import react-quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

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

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.url);
      } else {
        alert(data.error || 'Failed to upload file');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
    }
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
                <Label>Upload Gambar Thumbnail</Label>
                <div>
                  <Label
                    htmlFor="imageUpload"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
                  >
                    Pilih File Gambar
                  </Label>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </div>
                {isUploading && <p className="text-xs text-blue-500">Mengunggah...</p>}
                {imageUrl && (
                  <div className="mt-2 text-xs text-green-600 break-all">
                    Gambar tersimpan: {imageUrl}
                  </div>
                )}
                <input type="hidden" value={imageUrl} required />
              </div>
              <div className="space-y-2 pb-12">
                <Label htmlFor="content">Isi Berita</Label>
                <div className="bg-white rounded-md">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    placeholder="Tulis isi berita di sini..."
                    className="h-48 mb-4"
                  />
                </div>
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
              <div className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1" dangerouslySetInnerHTML={{ __html: item.content }} />

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
              <Label>Upload Gambar Thumbnail Baru</Label>
              <div>
                <Label
                  htmlFor="edit-imageUpload"
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2"
                >
                  Pilih File Gambar
                </Label>
                <Input
                  id="edit-imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </div>
              {isUploading && <p className="text-xs text-blue-500">Mengunggah...</p>}
              {imageUrl && (
                <div className="mt-2 text-xs text-green-600 break-all">
                  Gambar tersimpan: {imageUrl}
                </div>
              )}
              <input type="hidden" value={imageUrl} required />
            </div>
            <div className="space-y-2 pb-12">
              <Label htmlFor="edit-content">Isi Berita</Label>
              <div className="bg-white rounded-md">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className="h-48 mb-4"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Update Berita</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}