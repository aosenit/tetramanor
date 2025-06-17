import type React from "react";

import "@/app/globals.css";
import { TopHeader } from "./components/top-header";
import { AppSidebar } from "./components/app-sidebar";
import { MobileNav } from "./components/mobile-nav";
import { SidebarProvider } from "./components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <MobileNav />
        <div className="flex-1 flex flex-col">
          <TopHeader />
          <main className="flex-1 p-4 bg-[#f4f4f4]">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
