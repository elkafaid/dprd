"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, Search, Calendar, FileText, CheckCircle, PieChart, Info } from "lucide-react";
import { BATIK_KAWUNG_SVG } from "@/lib/batik-kawung";
import { budgetAllocation, publicAgendas, macroStats } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LandingPage() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

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

  // Modern government colors for the chart
  const COLORS = ['#0f766e', '#1d4ed8', '#0369a1', '#b45309']; // Emerald-700, Blue-700, Sky-700, Amber-700

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm h-16 flex items-center px-4 md:px-8">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-700 rounded-full flex items-center justify-center">
            <Building2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="font-bold text-[12px] md:text-base text-slate-800 tracking-tight">DPRD MOJOKERTO</span>
        </div>
        <div className="flex-none">
          <Link href="/login">
            <Button variant="outline" className="border-emerald-700 text-emerald-700 hover:bg-emerald-50 text-[10px] md:text-sm h-8 md:h-9">
              Login Admin
            </Button>
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION & TEXTURE LAYERING */}
      <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&q=80&w=1920')` }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-900/80 via-emerald-900/70 to-slate-900/90" />

        {/* Batik Texture Layer Overlay (Fixed) */}
        <div
          className="absolute inset-0 z-20 bg-fixed bg-repeat opacity-30"
          style={{ backgroundImage: `url('${BATIK_KAWUNG_SVG}')`, backgroundSize: '60px 60px' }}
        />

        {/* Hero Content */}
        <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-4xl w-full h-full">
          <h1 className="text-[15px] md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4 md:mb-6 leading-tight">
            Suara Rakyat, Pembangunan Bersama.
          </h1>
          <p className="text-[12px] md:text-xl lg:text-2xl text-emerald-50 drop-shadow-md mb-8 md:mb-12 font-medium max-w-2xl">
            Portal Transparansi & Aspirasi DPRD Kabupaten Mojokerto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Dialog>
              <DialogTrigger render={
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg h-12 md:h-14 px-6 md:px-8 text-[13px] md:text-base font-semibold w-full sm:w-auto">
                  Sampaikan Aspirasi
                </Button>
              }>
                Sampaikan Aspirasi
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-[15px] md:text-xl font-bold text-slate-800">Form Pengaduan Publik</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 py-4" onSubmit={(e) => { e.preventDefault(); alert("Mock Submit"); }}>
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input id="nama" placeholder="Masukkan nama Anda" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori</Label>
                    <select id="kategori" className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required>
                      <option value="">Pilih Kategori</option>
                      <option value="infrastruktur">Infrastruktur</option>
                      <option value="pelayanan">Pelayanan Publik</option>
                      <option value="kesehatan">Kesehatan</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="laporan">Isi Laporan</Label>
                    <textarea id="laporan" className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Jelaskan aspirasi Anda..." required></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Kirim Aspirasi</Button>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              onClick={scrollToAgenda}
              className="bg-transparent border-white/80 text-white hover:bg-white/10 hover:text-white h-12 md:h-14 px-6 md:px-8 text-[13px] md:text-base font-semibold backdrop-blur-sm w-full sm:w-auto transition-colors"
            >
              Lihat Agenda Dewan
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20 space-y-20">

        {/* 3. MACRO STATISTICS SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
          {macroStats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
                {idx === 0 && <PieChart className="w-6 h-6 md:w-8 md:h-8" />}
                {idx === 1 && <CheckCircle className="w-6 h-6 md:w-8 md:h-8" />}
                {idx === 2 && <FileText className="w-6 h-6 md:w-8 md:h-8" />}
              </div>
              <h3 className="text-[12px] md:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{stat.title}</h3>
              <p className="text-[15px] md:text-4xl font-bold text-slate-800 mb-1">{stat.value}</p>
              <p className="text-[11px] md:text-sm text-slate-400">{stat.description}</p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column */}
          <div className="space-y-12">
            {/* 4. "LACAK ASPIRASI" MODULE */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 relative">
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                <h2 className="text-[15px] md:text-2xl font-bold text-slate-800">Lacak Status Aspirasi Anda</h2>
              </div>
              <form onSubmit={handleSearchAspirasi} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Masukkan Nomor Tiket..."
                  className="flex-1 h-11 md:h-12 text-[12px] md:text-base border-slate-200 focus-visible:ring-emerald-500"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                />
                <Button type="submit" className="h-11 md:h-12 px-4 md:px-6 bg-slate-800 hover:bg-slate-900 text-white font-medium text-[12px] md:text-base shadow-sm">
                  Cari
                </Button>
              </form>

              {/* Custom Toast Alert */}
              {searchStatus && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <Info className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-[12px] md:text-sm text-emerald-800 font-medium">{searchStatus}</p>
                </div>
              )}
            </section>

            {/* 5. TRANSPARANSI ANGGARAN */}
            <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-8">
                <PieChart className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                <h2 className="text-[15px] md:text-2xl font-bold text-slate-800">Transparansi Anggaran</h2>
              </div>
              <div className="h-[250px] md:h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={budgetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {budgetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: unknown) => [`${value}%`, 'Alokasi']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                 {budgetAllocation.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-[11px] md:text-sm text-slate-600 font-medium">{item.name} ({item.value}%)</span>
                  </div>
                 ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          {/* 6. AGENDA PUBLIK */}
          <section id="agenda-publik" className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                <h2 className="text-[15px] md:text-2xl font-bold text-slate-800">Agenda Publik</h2>
              </div>
              <div className="space-y-4 flex-1">
                {publicAgendas.map((agenda) => (
                  <div key={agenda.id} className="p-4 md:p-5 border border-slate-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors group">
                    <h3 className="text-[13px] md:text-base font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{agenda.title}</h3>
                    <div className="flex flex-col gap-1.5 text-[11px] md:text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600/70" />
                        <span>{agenda.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600/70" />
                        <span>{agenda.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                 <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-[12px] md:text-sm font-medium">
                   Lihat Semua Agenda
                 </Button>
              </div>
          </section>

        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-[11px] md:text-sm border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} DPRD Kabupaten Mojokerto. Hak Cipta Dilindungi.</p>
        <p className="mt-1">Portal Transparansi dan Aspirasi Publik.</p>
      </footer>
    </div>
  );
}
