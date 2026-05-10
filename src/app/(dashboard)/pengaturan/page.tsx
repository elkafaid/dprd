"use client";

import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";

export default function PengaturanPage() {
  const { settings, updateSettings } = useStore();
  const [instansiName, setInstansiName] = useState(settings.instansiName || "DPRD KAB. MOJOKERTO");
  const [adminName, setAdminName] = useState(settings.adminName || "Admin Keuangan");
  const [systemTahun, setSystemTahun] = useState(settings.systemTahun || "2023");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateSettings({ instansiName, adminName, systemTahun });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Pengaturan Sistem</h2>
        <p className="text-slate-500 mt-1">Kelola preferensi dan pengaturan aplikasi.</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Profil Instansi & Admin</CardTitle>
            <CardDescription>
              Informasi ini akan ditampilkan pada laporan dan dokumen cetak.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instansi">Nama Instansi</Label>
              <Input
                id="instansi"
                value={instansiName}
                onChange={(e) => setInstansiName(e.target.value)}
                placeholder="Contoh: DPRD KAB. MOJOKERTO"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin">Nama Admin Utama</Label>
              <Input
                id="admin"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tahun">Tahun Anggaran Berjalan</Label>
              <Input
                id="tahun"
                value={systemTahun}
                onChange={(e) => setSystemTahun(e.target.value)}
                placeholder="Contoh: 2024"
              />
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Simpan Pengaturan
              </Button>
              {isSaved && (
                <span className="text-sm text-blue-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Berhasil disimpan
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
