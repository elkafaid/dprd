"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  instansiName: z.string().min(2, {
    message: "Nama Instansi harus minimal 2 karakter.",
  }),
  adminName: z.string().min(2, {
    message: "Nama Admin harus minimal 2 karakter.",
  }),
});

export default function PengaturanPage() {
  const { settings, updateSettings } = useStore();
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instansiName: settings.instansiName,
      adminName: settings.adminName,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateSettings(values);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pengaturan Sistem</h1>
        <p className="text-slate-500 text-sm mt-1">
          Kelola konfigurasi sistem dan preferensi akun Anda.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b border-slate-100 pb-2">Profil Instansi</h3>
              <FormField
                control={form.control}
                name="instansiName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Instansi</FormLabel>
                    <FormControl>
                      <Input placeholder="DPRD KAB. MOJOKERTO" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nama ini akan ditampilkan pada header aplikasi dan laporan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium border-b border-slate-100 pb-2 pt-4">Pengaturan Akun Admin</h3>
              <FormField
                control={form.control}
                name="adminName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Tampilan Admin</FormLabel>
                    <FormControl>
                      <Input placeholder="Admin Keuangan" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nama yang muncul di pojok kanan atas layar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                 <FormLabel>Role Pengguna</FormLabel>
                 <FormControl>
                    <Input value="Administrator" disabled className="bg-slate-50" />
                 </FormControl>
                 <FormDescription>Role tidak dapat diubah pada akun ini.</FormDescription>
              </FormItem>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                {isSaved && (
                  <p className="text-sm font-medium text-green-600 animate-in fade-in">
                    Pengaturan berhasil disimpan!
                  </p>
                )}
              </div>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}