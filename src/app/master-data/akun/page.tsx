"use client";

import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";

export default function MasterAkunPage() {
  const { settings } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Master Data Akun</h1>
          <p className="text-slate-500 text-sm mt-1">Daftar pengguna dengan akses admin sistem.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 font-medium">Nama Admin</th>
                  <th className="px-5 py-3 font-medium">Instansi</th>
                  <th className="px-5 py-3 font-medium text-center">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3 text-slate-900 font-medium">{settings.adminName}</td>
                    <td className="px-5 py-3 text-slate-600">{settings.instansiName}</td>
                    <td className="px-5 py-3 text-center">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Aktif</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                       <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">Edit</Button>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}