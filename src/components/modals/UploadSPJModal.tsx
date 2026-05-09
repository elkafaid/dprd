"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStore } from "@/store/useStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  nomorSPJ: z.string().min(1, { message: "Nomor SPJ wajib diisi" }),
  perjalananDinas: z.string().min(1, { message: "Perjalanan Dinas wajib diisi" }),
  pegawai: z.string().min(1, { message: "Pegawai/Anggota wajib diisi" }),
  tanggal: z.string().min(1, { message: "Tanggal wajib diisi" }),
  totalBiaya: z.coerce.number().min(0, { message: "Total Biaya tidak boleh negatif" }),
  status: z.enum(["Disetujui", "Menunggu Verifikasi", "Ditolak"]),
});

export function UploadSPJModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addArsipSPJ = useStore((state) => state.addArsipSPJ);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomorSPJ: "",
      perjalananDinas: "",
      pegawai: "",
      tanggal: new Date().toISOString().split("T")[0],
      totalBiaya: 0,
      status: "Menunggu Verifikasi",
    },
  });

  function onSubmit(values: any) {
    addArsipSPJ(values);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload / Tambah Arsip SPJ</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="nomorSPJ"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor SPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="SPJ/2023/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="perjalananDinas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Perjalanan Dinas</FormLabel>
                  <FormControl>
                    <Input placeholder="Tujuan / Acara..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pegawai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pegawai / Anggota</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama pelaksana..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
               <FormField
                control={form.control}
                name="totalBiaya"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Biaya (Rp)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} value={field.value as number} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Disetujui">Disetujui</SelectItem>
                        <SelectItem value="Menunggu Verifikasi">Menunggu Verifikasi</SelectItem>
                        <SelectItem value="Ditolak">Ditolak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button" variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit">Upload & Simpan</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}