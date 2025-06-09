"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebar } from "./sidebar";
import {
  LayoutDashboard,
  Home,
  Building2,
  TrendingUp,
  Users,
  Car,
  FileText,
  CreditCard,
  MessageSquare,
  Bell,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { route } from "./app-sidebar";
import Image from "next/image";
import logo from "@/assets/full-logo.png";

const menuItems = [
  {
    title: "Dashboard",
    url: route,
    icon: LayoutDashboard,
  },
  {
    title: "Homepage",
    url: `${route}/homepage`,
    icon: Home,
  },
  {
    title: "Properties",
    url: `${route}/properties`,
    icon: Building2,
  },
  {
    title: "Investments",
    url: `${route}/investments`,
    icon: TrendingUp,
  },
  {
    title: "Customer",
    url: `${route}/customers`,
    icon: Users,
  },
  {
    title: "Rentals",
    url: `${route}/rentals`,
    icon: Car,
  },
  {
    title: "Blog posts",
    url: `${route}/blog-posts`,
    icon: FileText,
  },
  {
    title: "Payments",
    url: `${route}/payments`,
    icon: CreditCard,
  },
  {
    title: "Contact inquiries",
    url: `${route}/contact-inquiries`,
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    url: `${route}/notifications`,
    icon: Bell,
  },
];

export function MobileNav() {
  const { openMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        side="left"
        className="w-[280px] p-0 bg-[#323539] text-white"
      >
        <SheetHeader className="p-6 border-b border-gray-700">
          <SheetTitle className="flex items-center gap-2 text-white">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-40 object-contain"
            />
          </SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="text-sm text-gray-400 uppercase tracking-wider p-4">
            ADMIN
          </div>
          <nav className="space-y-2 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm ${
                    isActive
                      ? "bg-[#2B2D2F] text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setOpenMobile(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-4 left-0 right-0 px-6">
          <Link
            href="/logout"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
