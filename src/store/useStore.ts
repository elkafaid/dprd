import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RegisterMasuk = {
  id: string;
  tanggal: string;
  nomorRegister: string;
  uraian: string;
  sumberDana: string;
  jumlah: number;
};

export type RegisterKeluar = {
  id: string;
  tanggal: string;
  uraian: string;
  jumlah: number;
  kategori: string;
};

export type ArsipSPJ = {
  id: string;
  nomorSPJ: string;
  perjalananDinas: string;
  pegawai: string;
  tanggal: string;
  totalBiaya: number;
  status: 'Draft' | 'Menunggu Verifikasi' | 'Disetujui';
};

export type Pegawai = {
  id: string;
  nama: string;
  nip: string;
  jabatan: string;
  fraksi: string;
};

export type JenisAnggaran = {
  id: string;
  nama: string;
  keterangan: string;
  alokasi: number;
};

export type User = {
  username: string;
  name: string;
};

// Tata Usaha
export type SuratMasuk = {
  id: string;
  nomorSurat: string;
  tanggal: string;
  pengirim: string;
  perihal: string;
  status: 'Belum Dibaca' | 'Diproses' | 'Selesai';
};

export type SuratKeluar = {
  id: string;
  nomorSurat: string;
  tanggal: string;
  penerima: string;
  perihal: string;
};

export type Agenda = {
  id: string;
  tanggalWaktu: string;
  namaKegiatan: string;
  lokasi: string;
  keterangan: string;
};

// Aspirasi
export type Pengaduan = {
  id: string;
  tanggal: string;
  namaPelapor: string;
  kategori: string;
  masalah: string;
  status: 'Diterima' | 'Diproses' | 'Selesai';
};

export type Pokir = {
  id: string;
  pengusul: string;
  dapil: string;
  programUsulan: string;
  estimasiAnggaran: number;
};

export type CarouselSlide = {
  id: string;
  imageUrl: string;
  textLine1: string;
  textLine2: string;
};

export type Berita = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
};

export type AppState = {
  registerMasuk: RegisterMasuk[];
  registerKeluar: RegisterKeluar[];
  arsipSPJ: ArsipSPJ[];
  pegawai: Pegawai[];
  jenisAnggaran: JenisAnggaran[];

  // New States
  suratMasuk: SuratMasuk[];
  suratKeluar: SuratKeluar[];
  agenda: Agenda[];
  pengaduan: Pengaduan[];
  pokir: Pokir[];
  carousel: CarouselSlide[];
  berita: Berita[];

  isAuthenticated: boolean;
  user: User | null;
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (isOpen: boolean) => void;
  settings: {
    instansiName: string;
    adminName: string;
    systemTahun: string;
  };

  login: (user: User) => void;
  logout: () => void;
  toggleSidebar: () => void;

  // Master Actions
  addRegisterMasuk: (data: Omit<RegisterMasuk, 'id'>) => void;
  addRegisterKeluar: (data: Omit<RegisterKeluar, 'id'>) => void;
  addArsipSPJ: (data: Omit<ArsipSPJ, 'id'>) => void;
  updateSPJStatus: (id: string, status: ArsipSPJ['status']) => void;
  deleteSPJ: (id: string) => void;

  addPegawai: (data: Omit<Pegawai, 'id'>) => void;
  updatePegawai: (id: string, data: Partial<Pegawai>) => void;
  deletePegawai: (id: string) => void;

  addJenisAnggaran: (data: Omit<JenisAnggaran, 'id'>) => void;
  updateJenisAnggaran: (id: string, data: Partial<JenisAnggaran>) => void;
  deleteJenisAnggaran: (id: string) => void;

  // TU Actions
  addSuratMasuk: (data: Omit<SuratMasuk, 'id'>) => void;
  updateSuratMasukStatus: (id: string, status: SuratMasuk['status']) => void;
  addSuratKeluar: (data: Omit<SuratKeluar, 'id' | 'nomorSurat'>) => void;
  addAgenda: (data: Omit<Agenda, 'id'>) => void;

  // Aspirasi Actions
  addPengaduan: (data: Omit<Pengaduan, 'id'>) => void;
  updatePengaduanStatus: (id: string, status: Pengaduan['status']) => void;
  addPokir: (data: Omit<Pokir, 'id'>) => void;

  // CMS Actions
  addCarouselSlide: (data: Omit<CarouselSlide, 'id'>) => void;
  updateCarouselSlide: (id: string, data: Partial<CarouselSlide>) => void;
  deleteCarouselSlide: (id: string) => void;

  addBerita: (data: Omit<Berita, 'id'>) => void;
  updateBerita: (id: string, data: Partial<Berita>) => void;
  deleteBerita: (id: string) => void;

  updateSettings: (settings: AppState['settings']) => void;
};

const initialRegisterMasuk: RegisterMasuk[] = [
  { id: '1', tanggal: '2023-10-01', nomorRegister: 'RM-001', uraian: 'Dana Alokasi Umum', sumberDana: 'APBD', jumlah: 500000000 },
  { id: '2', tanggal: '2023-10-05', nomorRegister: 'RM-002', uraian: 'Pendapatan Asli Daerah', sumberDana: 'PAD', jumlah: 150000000 },
];

const initialRegisterKeluar: RegisterKeluar[] = [
  { id: '1', tanggal: '2023-10-02', uraian: 'Biaya Rapat Paripurna', jumlah: 25000000, kategori: 'Makan & Minum' },
  { id: '2', tanggal: '2023-10-10', uraian: 'Perawatan Gedung', jumlah: 50000000, kategori: 'Pemeliharaan' },
];

const initialArsipSPJ: ArsipSPJ[] = [
  { id: '1', nomorSPJ: 'SPJ/2023/10/01', perjalananDinas: 'Kunjungan Kerja ke Jakarta', pegawai: 'Budi Santoso', tanggal: '2023-10-15', totalBiaya: 15000000, status: 'Disetujui' },
  { id: '2', nomorSPJ: 'SPJ/2023/10/02', perjalananDinas: 'Studi Banding ke Surabaya', pegawai: 'Siti Aminah', tanggal: '2023-10-20', totalBiaya: 8000000, status: 'Menunggu Verifikasi' },
];

const initialPegawai: Pegawai[] = [
  { id: '1', nama: 'Budi Santoso', nip: '198001012005011001', jabatan: 'Ketua DPRD', fraksi: 'Partai X' },
  { id: '2', nama: 'Siti Aminah', nip: '198502022010022002', jabatan: 'Wakil Ketua DPRD', fraksi: 'Partai Y' },
];

const initialJenisAnggaran: JenisAnggaran[] = [
  { id: '1', nama: 'Biaya Rapat', keterangan: 'Anggaran untuk konsumsi dan akomodasi rapat', alokasi: 100000000 },
  { id: '2', nama: 'Perawatan', keterangan: 'Biaya perawatan gedung dan fasilitas', alokasi: 200000000 },
  { id: '3', nama: 'Operasional', keterangan: 'Biaya operasional sehari-hari', alokasi: 500000000 },
];

// Mock Data
const initialSuratMasuk: SuratMasuk[] = [
  { id: '1', nomorSurat: 'SM-2023/10/01', tanggal: '2023-10-01', pengirim: 'Gubernur', perihal: 'Undangan Rapat', status: 'Belum Dibaca' }
];

const initialSuratKeluar: SuratKeluar[] = [
  { id: '1', nomorSurat: 'SK-2023/10/01', tanggal: '2023-10-02', penerima: 'Dinas PU', perihal: 'Permohonan Data' }
];

const initialAgenda: Agenda[] = [
  { id: '1', tanggalWaktu: '2023-10-10 09:00', namaKegiatan: 'Rapat Paripurna', lokasi: 'Ruang Rapat Utama', keterangan: 'Pembahasan APBD' }
];

const initialPengaduan: Pengaduan[] = [
  { id: '1', tanggal: '2023-10-05', namaPelapor: 'Warga A', kategori: 'Infrastruktur', masalah: 'Jalan Rusak', status: 'Diterima' }
];

const initialPokir: Pokir[] = [
  { id: '1', pengusul: 'Budi Santoso', dapil: 'Dapil 1', programUsulan: 'Perbaikan Jalan Desa', estimasiAnggaran: 200000000 }
];

const initialCarousel: CarouselSlide[] = [
  { id: '1', imageUrl: 'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&fit=crop&q=80&w=1920', textLine1: 'Transparansi Anggaran', textLine2: 'Mewujudkan DPRD Kab. Mojokerto yang Bersih dan Akuntabel' },
  { id: '2', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920', textLine1: 'Sinergi Pembangunan', textLine2: 'Bersama Rakyat Membangun Infrastruktur Daerah yang Berkelanjutan' },
  { id: '3', imageUrl: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=1920', textLine1: 'Pelayanan Publik', textLine2: 'Mendengarkan dan Menindaklanjuti Setiap Aspirasi Masyarakat' },
];

const loremText = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.</p>
<p>Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor, sanguis elit accumsan lacus, eu feugiat ligula orci id quam.</p>
<p>Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.</p>
`;

const initialBerita: Berita[] = [
  { id: '1', title: 'Rapat Paripurna RAPBD 2024', content: loremText, imageUrl: '/uploads/dummy-1.jpg', date: '2023-11-10' },
  { id: '2', title: 'Kunjungan Kerja ke Desa ABC', content: loremText, imageUrl: '/uploads/dummy-2.jpg', date: '2023-11-12' },
  { id: '3', title: 'Sosialisasi Perda Ketertiban', content: loremText, imageUrl: '/uploads/dummy-3.jpg', date: '2023-11-15' },
  { id: '4', title: 'Tinjauan Infrastruktur Jalan', content: loremText, imageUrl: '/uploads/dummy-4.jpg', date: '2023-11-16' },
  { id: '5', title: 'Penyusunan Program Kerja', content: loremText, imageUrl: '/uploads/dummy-5.jpg', date: '2023-11-18' },
  { id: '6', title: 'Audiensi dengan Kelompok Tani', content: loremText, imageUrl: '/uploads/dummy-6.jpg', date: '2023-11-20' },
  { id: '7', title: 'Sidang Komisi III', content: loremText, imageUrl: '/uploads/dummy-7.jpg', date: '2023-11-22' },
  { id: '8', title: 'Kunjungan Industri Lokal', content: loremText, imageUrl: '/uploads/dummy-8.jpg', date: '2023-11-25' }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      registerMasuk: initialRegisterMasuk,
      registerKeluar: initialRegisterKeluar,
      arsipSPJ: initialArsipSPJ,
      pegawai: initialPegawai,
      jenisAnggaran: initialJenisAnggaran,

      suratMasuk: initialSuratMasuk,
      suratKeluar: initialSuratKeluar,
      agenda: initialAgenda,
      pengaduan: initialPengaduan,
      pokir: initialPokir,
      carousel: initialCarousel,
      berita: initialBerita,

      isAuthenticated: false,
      user: null,
      isSidebarCollapsed: false,
      isMobileSidebarOpen: false,
      settings: {
        instansiName: 'DPRD KAB. MOJOKERTO',
        adminName: 'Admin Keuangan',
        systemTahun: '2023',
      },

      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
      setMobileSidebarOpen: (isOpen) => set({ isMobileSidebarOpen: isOpen }),

      addRegisterMasuk: (data) => set((state) => ({ registerMasuk: [...state.registerMasuk, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      addRegisterKeluar: (data) => set((state) => ({ registerKeluar: [...state.registerKeluar, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      addArsipSPJ: (data) => set((state) => ({ arsipSPJ: [...state.arsipSPJ, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      updateSPJStatus: (id, status) => set((state) => ({ arsipSPJ: state.arsipSPJ.map((s) => s.id === id ? { ...s, status } : s) })),
      deleteSPJ: (id) => set((state) => ({ arsipSPJ: state.arsipSPJ.filter((s) => s.id !== id) })),

      addPegawai: (data) => set((state) => ({ pegawai: [...state.pegawai, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      updatePegawai: (id, data) => set((state) => ({ pegawai: state.pegawai.map((p) => p.id === id ? { ...p, ...data } : p) })),
      deletePegawai: (id) => set((state) => ({ pegawai: state.pegawai.filter((p) => p.id !== id) })),

      addJenisAnggaran: (data) => set((state) => ({ jenisAnggaran: [...state.jenisAnggaran, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      updateJenisAnggaran: (id, data) => set((state) => ({ jenisAnggaran: state.jenisAnggaran.map((j) => j.id === id ? { ...j, ...data } : j) })),
      deleteJenisAnggaran: (id) => set((state) => ({ jenisAnggaran: state.jenisAnggaran.filter((j) => j.id !== id) })),

      addSuratMasuk: (data) => set((state) => ({ suratMasuk: [...state.suratMasuk, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      updateSuratMasukStatus: (id, status) => set((state) => ({ suratMasuk: state.suratMasuk.map((s) => s.id === id ? { ...s, status } : s) })),
      addSuratKeluar: (data) => set((state) => ({ suratKeluar: [...state.suratKeluar, { ...data, id: Math.random().toString(36).substr(2, 9), nomorSurat: `SK-${new Date().getFullYear()}/${Math.floor(Math.random()*1000)}` }] })),
      addAgenda: (data) => set((state) => ({ agenda: [...state.agenda, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),

      addPengaduan: (data) => set((state) => ({ pengaduan: [...state.pengaduan, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      updatePengaduanStatus: (id, status) => set((state) => ({ pengaduan: state.pengaduan.map((p) => p.id === id ? { ...p, status } : p) })),
      addPokir: (data) => set((state) => ({ pokir: [...state.pokir, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),

      addCarouselSlide: (data) => set((state) => ({ carousel: [...state.carousel, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      updateCarouselSlide: (id, data) => set((state) => ({ carousel: state.carousel.map((c) => c.id === id ? { ...c, ...data } : c) })),
      deleteCarouselSlide: (id) => set((state) => ({ carousel: state.carousel.filter((c) => c.id !== id) })),

      addBerita: (data) => set((state) => ({ berita: [...state.berita, { ...data, id: Math.random().toString(36).substr(2, 9) }] })),
      updateBerita: (id, data) => set((state) => ({ berita: state.berita.map((b) => b.id === id ? { ...b, ...data } : b) })),
      deleteBerita: (id) => set((state) => ({ berita: state.berita.filter((b) => b.id !== id) })),

      updateSettings: (newSettings) => set({ settings: newSettings }),
    }),
    {
      name: 'dprd-dashboard-storage',
    }
  )
);
