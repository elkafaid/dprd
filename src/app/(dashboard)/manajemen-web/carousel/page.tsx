"use client";

import { useState } from "react";
import { useStore, CarouselSlide } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function CarouselManagementPage() {
  const { carousel, addCarouselSlide, updateCarouselSlide, deleteCarouselSlide } = useStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<CarouselSlide | null>(null);

  // Form State
  const [imageUrl, setImageUrl] = useState("");
  const [textLine1, setTextLine1] = useState("");
  const [textLine2, setTextLine2] = useState("");

  const resetForm = () => {
    setImageUrl("");
    setTextLine1("");
    setTextLine2("");
    setCurrentSlide(null);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addCarouselSlide({ imageUrl, textLine1, textLine2 });
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

  const handleEdit = (slide: CarouselSlide) => {
    setCurrentSlide(slide);
    setImageUrl(slide.imageUrl);
    setTextLine1(slide.textLine1);
    setTextLine2(slide.textLine2);
    setIsEditOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSlide) {
      updateCarouselSlide(currentSlide.id, { imageUrl, textLine1, textLine2 });
    }
    setIsEditOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus slide ini?")) {
      deleteCarouselSlide(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Carousel</h1>
          <p className="text-sm text-slate-500">Kelola gambar dan teks slide untuk Landing Page</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if(!open) resetForm(); }}>
          <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Slide
            </Button>}>
            Tambah Slide
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Slide Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUpload">Upload Gambar</Label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                {isUploading && <p className="text-xs text-blue-500">Mengunggah...</p>}
                {imageUrl && (
                  <div className="mt-2 text-xs text-green-600 break-all">
                    Gambar tersimpan: {imageUrl}
                  </div>
                )}
                {/* Keep hidden input for form validity if needed or remove required */}
                <input type="hidden" value={imageUrl} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textLine1">Teks Baris 1 (Judul)</Label>
                <Input
                  id="textLine1"
                  value={textLine1}
                  onChange={(e) => setTextLine1(e.target.value)}
                  placeholder="Judul Slide"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textLine2">Teks Baris 2 (Subjudul)</Label>
                <Input
                  id="textLine2"
                  value={textLine2}
                  onChange={(e) => setTextLine2(e.target.value)}
                  placeholder="Subjudul Slide"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Simpan</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carousel.map((slide) => (
          <div key={slide.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
            <div className="relative aspect-video bg-slate-100">
               {slide.imageUrl ? (
                  <img src={slide.imageUrl} alt={slide.textLine1} className="w-full h-full object-cover" />
               ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-400">
                     <ImageIcon className="w-10 h-10" />
                  </div>
               )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg truncate">{slide.textLine1}</h3>
                <p className="text-slate-300 text-sm truncate">{slide.textLine2}</p>
              </div>
            </div>
            <div className="p-4 flex justify-end gap-2 bg-slate-50 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => handleEdit(slide)} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(slide.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={(open) => { setIsEditOpen(open); if(!open) resetForm(); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Slide</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-imageUpload">Upload Gambar Baru</Label>
              <Input
                id="edit-imageUpload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              {isUploading && <p className="text-xs text-blue-500">Mengunggah...</p>}
              {imageUrl && (
                <div className="mt-2 text-xs text-green-600 break-all">
                  Gambar tersimpan: {imageUrl}
                </div>
              )}
              <input type="hidden" value={imageUrl} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-textLine1">Teks Baris 1 (Judul)</Label>
              <Input
                id="edit-textLine1"
                value={textLine1}
                onChange={(e) => setTextLine1(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-textLine2">Teks Baris 2 (Subjudul)</Label>
              <Input
                id="edit-textLine2"
                value={textLine2}
                onChange={(e) => setTextLine2(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Update</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}