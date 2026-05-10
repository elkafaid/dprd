"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Building2, Search, Calendar, FileText, CheckCircle, PieChart, Info, Wallet, ArrowDownToLine, ArrowUpToLine, ArrowUpFromLine } from "lucide-react";
import { BATIK_KAWUNG_SVG } from "@/lib/batik-kawung";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginModal } from "@/components/LoginModal";
import { useStore } from "@/store/useStore";

export default function LandingPage() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [searchStatus, setSearchStatus] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const { carousel, jenisAnggaran, registerMasuk, registerKeluar, agenda, berita } = useStore();

  useEffect(() => {
    if (carousel.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % carousel.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carousel.length]);

  const handleSearchAspirasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNumber.trim()) return;

    // Simulate a mock search that shows a Toast/Alert
    setSearchStatus("Nomor Tiket Ditemukan. Status: Sedang dibahas oleh Komisi III");

    // Auto-hide after 5 seconds
    setTimeout(() => setSearchStatus(null), 5000);
  };

  const scrollToAgenda = () => {
    const agendaSection = document.getElementById("agenda-publik");
    if (agendaSection) {
      agendaSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate dynamic metrics
  const totalAnggaran = jenisAnggaran.reduce((sum, item) => sum + item.alokasi, 0);
  const totalPemasukan = registerMasuk.reduce((sum, item) => sum + item.jumlah, 0);
  const totalPengeluaran = registerKeluar.reduce((sum, item) => sum + item.jumlah, 0);
  const sisaAnggaran = totalAnggaran - totalPengeluaran;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  };

  // Modern government colors for the chart
  const COLORS = ['#1d4ed8', '#0ea5e9', '#0369a1', '#1e40af', '#3b82f6'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm h-16 flex items-center px-4 md:px-8">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 md:w-10 md:h-10 relative">
             <Image src="/logo-mojokerto.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-[12px] md:text-base text-slate-800 tracking-tight">DPRD MOJOKERTO</span>
        </div>
        <div className="flex-none">
          <Button
            variant="outline"
            className="border-blue-700 text-blue-700 hover:bg-blue-50 text-[10px] md:text-sm h-8 md:h-9"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login Admin
          </Button>
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* 2. HERO SECTION & TEXTURE LAYERING */}
      <section className="relative w-full aspect-[2/1] md:aspect-[4/1] mt-16 overflow-hidden bg-slate-900">
        {carousel.map((slide, index) => (
           <div
             key={slide.id}
             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
           >
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url('${slide.imageUrl}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 z-20">
                 <div className="max-w-4xl">
                   <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
                     {slide.textLine1}
                   </h1>
                   <p className="text-sm md:text-lg lg:text-xl text-blue-50 font-medium drop-shadow-md line-clamp-2">
                     {slide.textLine2}
                   </p>
                 </div>
              </div>
           </div>
        ))}
        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
           {carousel.map((_, index) => (
             <button
                key={index}
                onClick={() => setCurrentSlideIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentSlideIndex ? 'bg-blue-500 w-4' : 'bg-white/50 hover:bg-white/80'}`}
             />
           ))}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16">

        {/* 3. DYNAMIC METRIC CARDS */}
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
           <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <Wallet className="w-4 h-4 md:w-5 md:h-5" />
                 </div>
                 <h3 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider line-clamp-2">Total Anggaran</h3>
              </div>
              <p className="text-[14px] md:text-2xl font-bold text-slate-800 break-words">{formatRupiah(totalAnggaran)}</p>
           </div>

           <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                    <ArrowDownToLine className="w-4 h-4 md:w-5 md:h-5" />
                 </div>
                 <h3 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider line-clamp-2">Total Pemasukan</h3>
              </div>
              <p className="text-[14px] md:text-2xl font-bold text-slate-800 break-words">{formatRupiah(totalPemasukan)}</p>
           </div>

           <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600 shrink-0">
                    <ArrowUpFromLine className="w-4 h-4 md:w-5 md:h-5" />
                 </div>
                 <h3 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider line-clamp-2">Total Pengeluaran</h3>
              </div>
              <p className="text-[14px] md:text-2xl font-bold text-slate-800 break-words">{formatRupiah(totalPengeluaran)}</p>
           </div>

           <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                 <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                    <PieChart className="w-4 h-4 md:w-5 md:h-5" />
                 </div>
                 <h3 className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider line-clamp-2">Sisa Anggaran</h3>
              </div>
              <p className="text-[14px] md:text-2xl font-bold text-slate-800 break-words">{formatRupiah(sisaAnggaran)}</p>
           </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column */}
          <div className="space-y-12">
            {/* 4. "LACAK ASPIRASI" MODULE */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 relative">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <h2 className="text-[15px] md:text-2xl font-bold text-slate-800">Lacak Status Aspirasi Anda</h2>
              </div>
              <form onSubmit={handleSearchAspirasi} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Masukkan Nomor Tiket..."
                  className="flex-1 h-11 md:h-12 text-[12px] md:text-base border-slate-200 focus-visible:ring-blue-500"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                />
                <Button type="submit" className="h-11 md:h-12 px-4 md:px-6 bg-slate-800 hover:bg-slate-900 text-white font-medium text-[12px] md:text-base shadow-sm">
                  Cari
                </Button>
              </form>

              {/* Custom Toast Alert */}
              {searchStatus && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-[12px] md:text-sm text-blue-800 font-medium">{searchStatus}</p>
                </div>
              )}
            </section>

            {/* 5. TRANSPARANSI ANGGARAN */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-8">
                <PieChart className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <h2 className="text-[15px] md:text-2xl font-bold text-slate-800">Transparansi Anggaran</h2>
              </div>
              <div className="h-[250px] md:h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={jenisAnggaran}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="alokasi"
                      stroke="none"
                    >
                      {jenisAnggaran.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: string | number) => [formatRupiah(Number(value)), 'Alokasi']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                 {jenisAnggaran.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-[11px] md:text-sm text-slate-600 font-medium line-clamp-1">{item.nama}</span>
                  </div>
                 ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          {/* 6. AGENDA PUBLIK */}
          <section id="agenda-publik" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <h2 className="text-[15px] md:text-2xl font-bold text-slate-800">Agenda Publik</h2>
              </div>
              <div className="space-y-4 flex-1">
                {agenda.slice(0, 4).map((ag) => (
                  <div key={ag.id} className="p-4 md:p-5 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors group">
                    <h3 className="text-[13px] md:text-base font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">{ag.namaKegiatan}</h3>
                    <div className="flex flex-col gap-1.5 text-[11px] md:text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600/70" />
                        <span>{ag.tanggalWaktu}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600/70" />
                        <span>{ag.lokasi}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {agenda.length === 0 && (
                   <p className="text-sm text-slate-500 text-center py-8">Belum ada agenda publik.</p>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                 <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-[12px] md:text-sm font-medium">
                   Lihat Semua Agenda
                 </Button>
              </div>
          </section>

        </div>

        {/* 7. BERITA & PUBLIKASI */}
        <section className="space-y-6">
           <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Berita & Publikasi</h2>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {berita.map((item) => (
                 <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all flex flex-col">
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                       {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                       ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-slate-400">No Image</div>
                       )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                       <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.date}</span>
                       </div>
                       <h3 className="font-bold text-slate-800 text-base mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                          {item.title}
                       </h3>
                       <p className="text-sm text-slate-600 line-clamp-3 flex-1">
                          {item.content}
                       </p>
                       <div className="mt-4 pt-4 border-t border-slate-100">
                          <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">Baca Selengkapnya &rarr;</span>
                       </div>
                    </div>
                 </div>
              ))}
              {berita.length === 0 && (
                 <div className="col-span-full text-center py-12 bg-white rounded-xl border border-slate-100">
                    <p className="text-slate-500">Belum ada berita yang dipublikasikan.</p>
                 </div>
              )}
           </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-[11px] md:text-sm border-t border-slate-800">
        <p>&copy; 2026 elkafa.com. All rights reserved.</p>
        <p className="mt-1">Portal Transparansi dan Aspirasi Publik.</p>
      </footer>
    </div>
  );
}
