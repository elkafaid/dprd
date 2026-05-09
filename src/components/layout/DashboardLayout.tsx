import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-[260px] flex flex-col w-[calc(100%-260px)]">
        <TopHeader />
        <main className="flex-1 p-6 overflow-y-auto w-full">{children}</main>
      </div>
    </div>
  );
}