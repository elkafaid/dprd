"use client";

import { useStore } from "@/store/useStore";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardKeuanganPage() {
  const { isAuthenticated } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">DashboardKeuangan</h2>
          <p className="text-slate-500 mt-1">Manage DashboardKeuangan data and records.</p>
        </div>
        {isAuthenticated && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        )}
      </div>
      <div className="bg-white rounded-md border p-8 text-center text-slate-500">
        Data table for DashboardKeuangan will be implemented here.
      </div>
    </div>
  );
}
