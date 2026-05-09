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
  tanggal: z.string().min(1, { message: "Tanggal wajib diisi" }),
  nomorRegister: z.string().min(1, { message: "Nomor Register wajib diisi" }),
  uraian: z.string().min(1, { message: "Uraian wajib diisi" }),
  sumberDana: z.string().min(1, { message: "Sumber Dana wajib dipilih" }),
  jumlah: z.coerce.number().min(0, { message: "Jumlah tidak boleh negatif" }),
});

export function TambahRegisterMasukModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addRegisterMasuk = useStore((state) => state.addRegisterMasuk);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal: new Date().toISOString().split("T")[0],
      nomorRegister: "",
      uraian: "",
      sumberDana: "",
      jumlah: 0,
    },
  });

  function onSubmit(values: any) {
    addRegisterMasuk(values);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Register Masuk</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="nomorRegister"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Register</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: RM-003" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uraian"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uraian</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan uraian pendapatan..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sumberDana"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sumber Dana</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih sumber dana" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="APBD">APBD</SelectItem>
                      <SelectItem value="PAD">PAD</SelectItem>
                      <SelectItem value="Lainnya">Lain-lain Pendapatan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jumlah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} value={field.value as number} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-4">
              <Button type="button" variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}