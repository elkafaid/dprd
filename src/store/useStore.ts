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
};

export type ArsipSPJ = {
  id: string;
  nomorSPJ: string;
  perjalananDinas: string;
  pegawai: string;
  tanggal: string;
  totalBiaya: number;
  status: 'Disetujui' | 'Menunggu Verifikasi' | 'Ditolak';
};

export type Pegawai = {
  id: string;
  nama: string;
  nip: string;
  jabatan: string;
};

export type JenisAnggaran = {
  id: string;
  nama: string;
  totalAnggaran: number;
  keterangan: string;
};

export type AppState = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  registerMasuk: RegisterMasuk[];
  registerKeluar: RegisterKeluar[];
  arsipSPJ: ArsipSPJ[];
  pegawai: Pegawai[];
  jenisAnggaran: JenisAnggaran[];
  settings: {
    instansiName: string;
    adminName: string;
  };
  addRegisterMasuk: (data: Omit<RegisterMasuk, 'id'>) => void;
  addRegisterKeluar: (data: Omit<RegisterKeluar, 'id'>) => void;
  addArsipSPJ: (data: Omit<ArsipSPJ, 'id'>) => void;
  addPegawai: (data: Omit<Pegawai, 'id'>) => void;
  updatePegawai: (id: string, data: Partial<Pegawai>) => void;
  deletePegawai: (id: string) => void;
  addJenisAnggaran: (data: Omit<JenisAnggaran, 'id'>) => void;
  updateJenisAnggaran: (id: string, data: Partial<JenisAnggaran>) => void;
  deleteJenisAnggaran: (id: string) => void;
  updateSettings: (settings: AppState['settings']) => void;
  deleteSPJ: (id: string) => void;
};

const initialRegisterMasuk: RegisterMasuk[] = [
  { id: '1', tanggal: '2023-10-01', nomorRegister: 'RM-001', uraian: 'Dana Alokasi Umum', sumberDana: 'APBD', jumlah: 500000000 },
  { id: '2', tanggal: '2023-10-05', nomorRegister: 'RM-002', uraian: 'Pendapatan Asli Daerah', sumberDana: 'PAD', jumlah: 150000000 },
];

const initialRegisterKeluar: RegisterKeluar[] = [
  { id: '1', tanggal: '2023-10-02', uraian: 'Biaya Rapat Paripurna', jumlah: 25000000 },
  { id: '2', tanggal: '2023-10-10', uraian: 'Perawatan Gedung', jumlah: 50000000 },
];

const initialArsipSPJ: ArsipSPJ[] = [
  { id: '1', nomorSPJ: 'SPJ/2023/10/01', perjalananDinas: 'Kunjungan Kerja ke Jakarta', pegawai: 'Budi Santoso', tanggal: '2023-10-15', totalBiaya: 15000000, status: 'Disetujui' },
  { id: '2', nomorSPJ: 'SPJ/2023/10/02', perjalananDinas: 'Studi Banding ke Surabaya', pegawai: 'Siti Aminah', tanggal: '2023-10-20', totalBiaya: 8000000, status: 'Menunggu Verifikasi' },
];

const initialPegawai: Pegawai[] = [
  { id: '1', nama: 'Budi Santoso', nip: '198001012005011001', jabatan: 'Ketua DPRD' },
  { id: '2', nama: 'Siti Aminah', nip: '198502022010022002', jabatan: 'Wakil Ketua DPRD' },
];

const initialJenisAnggaran: JenisAnggaran[] = [
  { id: '1', nama: 'Biaya Rapat', totalAnggaran: 100000000, keterangan: 'Anggaran untuk konsumsi dan akomodasi rapat' },
  { id: '2', nama: 'Perawatan', totalAnggaran: 200000000, keterangan: 'Biaya perawatan gedung dan fasilitas' },
  { id: '3', nama: 'Operasional', totalAnggaran: 150000000, keterangan: 'Biaya operasional sehari-hari' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      registerMasuk: initialRegisterMasuk,
      registerKeluar: initialRegisterKeluar,
      arsipSPJ: initialArsipSPJ,
      pegawai: initialPegawai,
      jenisAnggaran: initialJenisAnggaran,
      settings: {
        instansiName: 'DPRD KAB. MOJOKERTO',
        adminName: 'Admin Keuangan',
      },
      addRegisterMasuk: (data) =>
        set((state) => ({
          registerMasuk: [
            ...state.registerMasuk,
            { ...data, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      addRegisterKeluar: (data) =>
        set((state) => ({
          registerKeluar: [
            ...state.registerKeluar,
            { ...data, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      addArsipSPJ: (data) =>
        set((state) => ({
          arsipSPJ: [
            ...state.arsipSPJ,
            { ...data, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      addPegawai: (data) =>
        set((state) => ({
          pegawai: [
            ...state.pegawai,
            { ...data, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      updatePegawai: (id, data) =>
        set((state) => ({
          pegawai: state.pegawai.map((p) => (p.id === id ? { ...p, ...data } : p)),
        })),
      deletePegawai: (id) =>
        set((state) => ({
          pegawai: state.pegawai.filter((p) => p.id !== id),
        })),
      addJenisAnggaran: (data) =>
        set((state) => ({
          jenisAnggaran: [
            ...state.jenisAnggaran,
            { ...data, id: Math.random().toString(36).substr(2, 9) },
          ],
        })),
      updateJenisAnggaran: (id, data) =>
        set((state) => ({
          jenisAnggaran: state.jenisAnggaran.map((j) => (j.id === id ? { ...j, ...data } : j)),
        })),
      deleteJenisAnggaran: (id) =>
        set((state) => ({
          jenisAnggaran: state.jenisAnggaran.filter((j) => j.id !== id),
        })),
      updateSettings: (newSettings) => set({ settings: newSettings }),
      deleteSPJ: (id) =>
        set((state) => ({
          arsipSPJ: state.arsipSPJ.filter((spj) => spj.id !== id),
        })),
    }),
    {
      name: 'dprd-dashboard-storage',
    }
  )
);