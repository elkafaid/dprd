"use client";

import { useStore } from "@/store/useStore";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, FileText } from "lucide-react";
import { useEffect, useState } from "react";

export default function SingleBeritaPage() {
  const { id } = useParams();
  const router = useRouter();
  const { berita } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const currentPost = berita.find((b) => b.id === id);

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Berita tidak ditemukan</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Button>
      </div>
    );
  }

  // Process Berita for recommendations
  const sortedBerita = [...berita]
    .filter(b => b.id !== id) // Exclude current
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const heroNews = sortedBerita[0];
  const gridNews = sortedBerita.slice(1, 7);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. NAVBAR (Re-used for simplicity without modal state) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-[3px] border-blue-900 shadow-sm h-16 flex items-center px-4 md:px-8 lg:px-[15%]">
        <div className="flex items-center gap-3 flex-1">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 relative">
               <Image src="/logo-mojokerto.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-[12px] md:text-base text-slate-800 tracking-tight">DPRD KAB. MOJOKERTO</span>
          </Link>
        </div>
        <div className="flex-none">
          {useStore.getState().isAuthenticated ? (
            <Link href="/dashboard">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 text-[10px] md:text-sm h-8 md:h-9"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
             <Link href="/">
               <Button
                 variant="outline"
                 className="border-blue-700 text-blue-700 hover:bg-blue-50 text-[10px] md:text-sm h-8 md:h-9"
               >
                 Masuk
               </Button>
             </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-0 md:px-8 lg:px-[15%] pt-24 pb-16">
        <div className="px-4 md:px-0 mb-4 md:mb-8 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Beranda</Link> / <Link href="/" className="hover:text-blue-600">Berita</Link> / <span className="text-slate-800">{currentPost.title}</span>
        </div>

        <article className="bg-white md:rounded-3xl md:shadow-sm md:border md:border-slate-100 overflow-hidden mb-16">
          <div className="relative w-full aspect-video bg-slate-100">
            {currentPost.imageUrl ? (
              <Image src={currentPost.imageUrl} alt={currentPost.title} fill className="object-cover" priority />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">No Image</div>
            )}
          </div>
          <div className="p-6 md:p-12">
            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-6">
              <Calendar className="w-4 h-4" />
              <span>{currentPost.date}</span>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-8 leading-tight">
              {currentPost.title}
            </h1>
            <div
              className="prose prose-slate prose-lg max-w-none prose-img:rounded-xl prose-a:text-blue-600"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />
          </div>
        </article>
      </main>

      {/* Recommendations */}
      <div className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <section className="space-y-6">
             <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-slate-800">Berita Lainnya</h2>
             </div>

             {sortedBerita.length === 0 ? (
               <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
                  <p className="text-slate-500">Belum ada berita lain yang dipublikasikan.</p>
               </div>
             ) : (
               <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {/* Hero News - Full width */}
                  {heroNews && (
                    <Link href={`/berita/${heroNews.id}`} className="col-span-2 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all flex flex-col md:flex-row min-h-[300px]">
                      <div className="relative h-64 md:h-auto md:w-1/2 lg:w-3/5 bg-slate-100 overflow-hidden">
                         {heroNews.imageUrl ? (
                            <Image src={heroNews.imageUrl} alt={heroNews.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                         ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">No Image</div>
                         )}
                      </div>
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                         <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>{heroNews.date}</span>
                         </div>
                         <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors line-clamp-3">
                            {heroNews.title}
                         </h3>
                         <div className="text-slate-600 line-clamp-3 mb-6 flex-1 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: heroNews.content }} />
                         <div className="mt-auto">
                            <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                              Baca Selengkapnya <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </span>
                         </div>
                      </div>
                    </Link>
                  )}

                  {/* Grid News - 2 Columns */}
                  {gridNews.map((item) => (
                     <Link href={`/berita/${item.id}`} key={item.id} className="bg-slate-50 rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all flex flex-col col-span-1">
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
                           <div className="text-sm text-slate-600 line-clamp-3 flex-1 mb-4" dangerouslySetInnerHTML={{ __html: item.content }} />
                           <div className="mt-auto pt-4 border-t border-slate-100">
                              <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">Baca Selengkapnya &rarr;</span>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
             )}
          </section>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-[11px] md:text-sm border-t border-slate-800 lg:px-[15%] mt-auto">
        <p>&copy; 2026 elkafa.com. All rights reserved.</p>
        <p className="mt-1">Portal Transparansi dan Aspirasi Publik.</p>
      </footer>
    </div>
  );
}
