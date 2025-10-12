import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./providers";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Web App",
  description: "Web application",
};

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>{children}</Providers>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
