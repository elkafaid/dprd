"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

// Schema specifically for Pegawai Master Data
const formSchema = z.object({
  nama: z.string().min(1, { message: "Nama wajib diisi" }),
  nip: z.string()
    .min(18, { message: "NIP/NIK minimal 18 karakter angka" })
    .regex(/^\d+$/, { message: "NIP/NIK hanya boleh berisi angka" }),
  jabatan: z.string().min(1, { message: "Jabatan wajib diisi" }),
});

export function PegawaiForm({
  initialData,
  onSubmitData,
  onCancel,
}: {
  initialData?: any;
  onSubmitData: (data: any) => void;
  onCancel: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: initialData?.nama || "",
      nip: initialData?.nip || "",
      jabatan: initialData?.jabatan || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSubmitData(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Nama pegawai / anggota..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIP / NIK</FormLabel>
              <FormControl>
                <Input placeholder="18 digit angka..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jabatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jabatan</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Ketua DPRD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="button" variant="outline" className="mr-2" onClick={onCancel}>
            Batal
          </Button>
          <Button type="submit">Simpan Data</Button>
        </div>
      </form>
    </Form>
  );
}
