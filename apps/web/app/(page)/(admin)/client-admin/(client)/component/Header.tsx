"use client";

import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, LogOut, Search, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutModal from "@/components/LogoutModal";
import useLogOut from "@/hooks/useLogOut";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useNoti from "@/hooks/useNoti";

const Header = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { handleLogout } = useLogOut();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { notifications, isLoading } = useNoti();

  console.log(notifications);

  return (
    <header className="sticky top-0 z-30 bg-white border-b h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex-1 flex justify-center lg:justify-start ">
        <div className="relative lg:w-full max-w-md w-[60%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </Button>
        </div>

        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[var(--primary-green)] text-white uppercase">
            {/* initials of the user name  */}
            {user?.name
              ?.split(" ")
              .map((name) => name.charAt(0))
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span className="hidden md:inline-block">{user?.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-4">
            <div className="flex items-center gap-3 pb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-xl font-semibold text-gray-700 uppercase">
                {user?.name
                  ?.split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
              </div>
              <div>
                <div className="font-semibold text-lg">{user?.name}</div>
                <div className="text-gray-500 text-sm">{user?.email}</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 py-3 cursor-pointer"
              onClick={() => {
                router.push("/client-admin/settings");
              }}
            >
              <User className="h-5 w-5" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 py-3 text-red-600 focus:text-red-700 cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <LogoutModal
        onLogout={handleLogout}
        open={openModal}
        setOpen={setOpenModal}
      />
    </header>
  );
};

export default Header;
