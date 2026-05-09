"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { RegisterKeluar } from "@/store/useStore";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  tanggal: z.string().min(1, "Tanggal is required"),
  uraian: z.string().min(1, "Uraian is required"),
  kategori: z.string().min(1, "Kategori is required"),
  jumlah: z.number().min(1, "Jumlah must be greater than 0"),
});

export default function RegisterKeluarPage() {
  const { isAuthenticated, registerKeluar, addRegisterKeluar } = useStore();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal: new Date().toISOString().split('T')[0],
      uraian: "",
      kategori: "",
      jumlah: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addRegisterKeluar(values);
    setOpen(false);
    form.reset();
  }

  const columns: ColumnDef<RegisterKeluar>[] = [
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "uraian", header: "Uraian" },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => {
        return <Badge variant="secondary">{row.getValue("kategori")}</Badge>;
      }
    },
    {
      accessorKey: "jumlah",
      header: "Jumlah",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("jumlah"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
        return <div className="font-medium text-rose-600">-{formatted}</div>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Register Keluar</h2>
          <p className="text-slate-500 mt-1">Manage outgoing funds and expenses.</p>
        </div>
        {isAuthenticated && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="bg-blue-600 hover:bg-blue-700" />}>
              <>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Data
              </>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Data Register Keluar</DialogTitle>
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
                    name="uraian"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Uraian</FormLabel>
                        <FormControl>
                          <Input placeholder="Deskripsi pengeluaran" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="kategori"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Makan & Minum">Makan & Minum</SelectItem>
                            <SelectItem value="Perjalanan Dinas">Perjalanan Dinas</SelectItem>
                            <SelectItem value="Honorarium">Honorarium</SelectItem>
                            <SelectItem value="Belanja ATK">Belanja ATK</SelectItem>
                            <SelectItem value="Pemeliharaan">Pemeliharaan</SelectItem>
                            <SelectItem value="Lain-lain">Lain-lain</SelectItem>
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
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Simpan Data</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <DataTable columns={columns} data={registerKeluar} />
    </div>
  );
}
