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
import { usePathname, useRouter } from "next/navigation";
import LogoutModal from "@/components/LogoutModal";
import { useState } from "react";
import { toast } from "sonner";

export const route = "/main-admin";


export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const router = useRouter();
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
      </SidebarHeader>

      <SidebarContent className="px-4 space-y-6">
        {/* Website Section */}
        <div>
          <div className="flex justify-between items-center px-3 mb-2 cursor-pointer"></div>

          <SidebarMenu>
            {[
              { title: "Dashboard", url: route, icon: LayoutDashboard },
              { title: "Homepage", url: `${route}/homepage`, icon: Home },
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
                title: "Customers",
                url: `${route}/customers`,
                icon: Users,
              },
              { title: "Rentals", url: `${route}/rentals`, icon: Car },
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
            ].map((item) => {
              // check if the pathname includes the item.url, except for when item.url ends with main-admin
              const isActive =
                item.url === "/main-admin"
                  ? pathname === item.url
                  : pathname.includes(item.url);
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
        </div>
      </SidebarContent>

      <SidebarFooter className="px-4 space-y-2">
        <SidebarMenu>
          {/* Sign Out */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={`text-gray-300 hover:text-white hover:bg-gray-800 py-6 `}
            >
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-3 px-3 py-3 rounded-md"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <LogoutModal
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          setOpen(false);
          toast.success("Logged out successfully");
        }}
        open={open}
        setOpen={setOpen}
      />
    </Sidebar>
  );
}
