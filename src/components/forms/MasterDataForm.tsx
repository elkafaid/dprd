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

// Schema specifically for Jenis Anggaran Master Data
const formSchema = z.object({
  nama: z.string().min(1, { message: "Nama Anggaran wajib diisi" }),
  keterangan: z.string().optional(),
});

export function MasterDataForm({
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
      keterangan: initialData?.keterangan || "",
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
              <FormLabel>Nama Anggaran / Kategori</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Biaya Rapat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keterangan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan (Opsional)</FormLabel>
              <FormControl>
                <Input placeholder="Penjelasan singkat..." {...field} />
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
