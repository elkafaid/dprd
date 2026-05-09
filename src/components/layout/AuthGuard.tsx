"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    // Only redirect if explicitly not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Optionally show a loading state here while checking persistence
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}