"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import NotificationModal from "./(client)/notifications/NotificationModal";
import Image from "next/image";
import logo from "@/assets/full-logo.png";
import LogoutModal from "@/components/LogoutModal";
import Header from "./(client)/component/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isActive = (href: string) => {
    const currentPath = pathname?.replace("/client-admin", "") || "";
    return (
      currentPath === href ||
      (href !== "/dashboard" && currentPath.startsWith(href))
    );
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Properties",
      href: "/properties",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Payments",
      href: "/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
  ];

  const bottomNavItems = [
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Sign Out",
      href: "/sign-out",
      icon: <LogOut className="h-5 w-5" />,
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-[#323539] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 h-screen",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-screen">
          {/* Logo */}
          <div className="flex items-center p-4 h-16 border-b border-gray-700">
            <Image
              src={logo}
              alt="Tetramanor Logo"
              width={100}
              height={100}
              className="w-40 object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-3 overflow-y-auto">
            {navItems.map((item) => {
              // if notfication return notifcation modal
              if (item.name === "Notifications") {
                return <NotificationModal key={item.name} />;
              }

              return (
                <Link
                  key={item.name}
                  href={`/client-admin/${item.href}`}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-[#2B2D2F] text-white font-semibold shadow-md"
                      : "hover:bg-[#404346] text-gray-300"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom navigation */}
          <div className="py-6 px-4 space-y-3 border-t border-gray-700">
            {bottomNavItems.map((item) => {
              if (item.name === "Sign Out") {
                return (
                  <Button
                    key={item.name}
                    onClick={() => {
                      setOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm rounded-lg justify-start  bg-transparent text-white w-full"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Button>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={`/client-admin/${item.href}`}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-[#2B2D2F] text-white font-semibold shadow-md"
                      : "hover:bg-[#404346] text-gray-300"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 lg:ml-64">
        {/* Header */}
        <Header setOpen={setOpen} />

        {/* Page content */}
        <main className="flex-1 overflow-y-scroll p-4 lg:p-6 h-[100vdh] overflow-x-hidden ">
          {children}
        </main>
      </div>
      <LogoutModal
        onLogout={() => {
          console.log("logout");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
        }}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
