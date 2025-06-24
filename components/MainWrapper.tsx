"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noPadding = pathname === "/" || pathname === "/login";
  return (
    <main className={`flex-1 ${noPadding ? "" : "p-8"}`}>
      {children}
    </main>
  );
}