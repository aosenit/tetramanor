import type React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

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
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">TM</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About us
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-gray-900"
            >
              Services
            </Link>
            <Link
              href="/properties"
              className="text-gray-600 hover:text-gray-900"
            >
              Properties
            </Link>
            <Link
              href="/investments"
              className="text-gray-600 hover:text-gray-900"
            >
              Investments
            </Link>
            <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
              Blogs
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact us
            </Link>
          </nav>
          <Link
            href="/client-admin/dashboard"
            className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            View dashboard
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex">
        <div className="w-full md:w-1/2 p-4 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto">{children}</div>
        </div>
        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/authBg.svg"
            alt="Property building"
            fill
            className="object-cover"
            priority
          />
        </div>
      </main>
    </div>
  );
}
