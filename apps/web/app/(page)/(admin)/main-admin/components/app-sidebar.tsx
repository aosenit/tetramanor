"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import Image from "next/image";
import logo from "@/assets/full-logo.png";
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
import LogoutModal from "@/components/LogoutModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const route = "/main-admin";

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

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <Sidebar className="border-r bg-[#323539] text-white">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-40 object-contain"
          />
        </div>
        <div className="mt-4 text-sm text-gray-400 uppercase tracking-wider">
          ADMIN
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className={`text-gray-300 hover:text-white hover:bg-gray-800 py-6 ${isActive ? "bg-[#2B2D2F] text-white" : ""}`}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-3 px-3 py-3 rounded-md"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                className="flex items-center gap-3 px-3 py-6 rounded-md "
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <LogoutModal
        onLogout={() => {
          console.log("logout");
        }}
        open={open}
        setOpen={setOpen}
      />
    </Sidebar>
  );
}
