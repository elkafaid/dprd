"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { RegisterMasuk } from "@/store/useStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  tanggal: z.string().min(1, "Tanggal is required"),
  nomorRegister: z.string().min(1, "No. Register is required"),
  uraian: z.string().min(1, "Uraian is required"),
  sumberDana: z.string().min(1, "Sumber Dana is required"),
  jumlah: z.number().min(1, "Jumlah must be greater than 0"),
});

export default function RegisterMasukPage() {
  const { isAuthenticated, registerMasuk, addRegisterMasuk } = useStore();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tanggal: new Date().toISOString().split('T')[0],
      nomorRegister: "",
      uraian: "",
      sumberDana: "",
      jumlah: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addRegisterMasuk(values);
    setOpen(false);
    form.reset();
  }

  const columns: ColumnDef<RegisterMasuk>[] = [
    { accessorKey: "tanggal", header: "Tanggal" },
    { accessorKey: "nomorRegister", header: "No. Register" },
    { accessorKey: "uraian", header: "Uraian" },
    { accessorKey: "sumberDana", header: "Sumber Dana" },
    {
      accessorKey: "jumlah",
      header: "Jumlah",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("jumlah"));
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Register Masuk</h2>
          <p className="text-slate-500 mt-1">Manage incoming funds and revenues.</p>
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
                <DialogTitle>Tambah Data Register Masuk</DialogTitle>
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
                          <Input placeholder="RM-00X" {...field} />
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
                          <Input placeholder="Deskripsi pemasukan" {...field} />
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
                        <FormControl>
                          <Input placeholder="Contoh: APBD, PAD" {...field} />
                        </FormControl>
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
      <DataTable columns={columns} data={registerMasuk} />
    </div>
  );
}
