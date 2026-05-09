import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardLayout from "@/components/layout/DashboardLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DPRD KAB. MOJOKERTO - Dashboard Admin",
  description: "Dashboard Admin Keuangan DPRD Kabupaten Mojokerto",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}