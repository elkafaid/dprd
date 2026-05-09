import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Building2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Portal Publik DPRD Kab. Mojokerto
        </h1>
        <p className="text-lg text-slate-600">
          Selamat datang di portal informasi dan transparansi publik Dewan Perwakilan Rakyat Daerah Kabupaten Mojokerto.
        </p>
        <div className="pt-8">
          <Link href="/login">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 h-12 text-lg rounded-full shadow-md transition-all hover:shadow-lg">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} DPRD Kabupaten Mojokerto. Hak Cipta Dilindungi.
      </div>
    </div>
  );
}