import type React from "react";

import type { Metadata } from "next";

import AuthMianLayout from "./AuthMianLayout";

export const metadata: Metadata = {
  title: "Authentication - Property Management",
  description: "Authentication pages for the property management system",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <AuthMianLayout>{children}</AuthMianLayout>
    </div>
  );
}
