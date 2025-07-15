"use client";

import { Search, Bell, Menu, AlignJustify } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "./sidebar";
import { useFetchData } from "@/hooks/useApi";

export function TopHeader() {
  const { toggleSidebar, setOpenMobile } = useSidebar();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data: notifications } = useFetchData("notifications");

  return (
    <header className="bg-[#323539] border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-gray-700"
            onClick={() => setOpenMobile(true)}
          >
            <AlignJustify size={32} />
          </Button>
          <div>
            <h1 className="text-sm md:text-2xl font-semibold text-white">
              Hello {user?.name},
            </h1>
            <p className="text-xs md:text-base text-gray-300">Welcome back</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search properties, users or payments"
              className="pl-10 w-[300px] lg:w-[400px] bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="block relative text-white hover:bg-gray-700"
          >
            <Bell className="" />
            {notifications?.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {notifications?.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
