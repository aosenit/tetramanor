import type React from "react";
import type { Metadata } from "next";
import { MainLayout } from "../MainLayout";

export const metadata: Metadata = {
  title: "Client Admin Dashboard",
  description: "Clients management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
