"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import unreadIcon from "@/assets/admin/customer/unread.svg";
import readIcon from "@/assets/admin/customer/read.svg";
import { RiCheckDoubleLine } from "react-icons/ri";

const notifications = [
  {
    id: 1,
    category: "today",
    title: "Adebayo uploaded kyc docs",
    description: "Adebayo has uploaded his kyc document for verification",
    time: "8min ago",
    isRead: false,
  },
  {
    id: 2,
    category: "today",
    title: "Tm Meadows-Lease expiry in 2 months",
    description:
      "Grace olabayo lease for unit 3b will expire on the 24th of july",
    time: "2hr ago",
    isRead: false,
  },
  {
    id: 3,
    category: "today",
    title: "Lease agreement uploaded for TM HighGardens – Unit 2A.",
    description:
      "The new lease agreement of sala over has been uploaded by customer",
    time: "4hr ago",
    isRead: false,
  },
  {
    id: 4,
    category: "yesterday",
    title: "Inspection booked",
    description: "Unit 4a queen mary has been booked for an onsite inspection",
    time: "2:50PM",
    isRead: true,
  },
  {
    id: 5,
    category: "yesterday",
    title: "New inquiry submitted via website by Samuel A.",
    description: "Samuel a. has sent a message via contact us",
    time: "9:32AM",
    isRead: true,
  },
  {
    id: 6,
    category: "older",
    title: "Rental payment overdue for TM HighGardens – Unit 4B.",
    description:
      "The lease agreement of adeola najaat has expired and is due foer renewal",
    time: "11:45PM",
    isRead: true,
  },
  {
    id: 7,
    category: "older",
    title: "Reminder: Inspection Tomorrow",
    description: "Jimmy adukoya has renewed his lease for Tm medows unit 5b",
    time: "9:25PM",
    isRead: true,
  },
  {
    id: 8,
    category: "older",
    title: "Title Deed Uploaded",
    description:
      "Your Title Deed for King's Landing has been uploaded and is now available for download.",
    time: "3:04PM",
    isRead: true,
  },
  {
    id: 9,
    category: "older",
    title: "Document uploaded: Sales Agreement for TM King's Landing.",
    description: "Document of sales of kings landing has been uploaded",
    time: "8min ago",
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const groupByCategory = (category: string) =>
    filteredNotifications.filter((n) => n.category === category);

  const renderNotifications = (list: typeof notifications) =>
    list.map((notification) => (
      <div
        key={notification.id}
        className={`flex items-center gap-4 p-4 rounded-lg ${notification.isRead ? "bg-white" : "bg-white"}`}
      >
        <div className="flex-shrink-0">
          <div>
            <Image
              src={notification.isRead ? readIcon : unreadIcon}
              alt={notification.isRead ? "Read" : "Unread"}
              className=""
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-[#181818] text-sm">
            {notification.title}
          </h3>
          <p className="text-[#868686] text-xs mt-1">
            {notification.description}
          </p>
        </div>
        <div className="text-xs text-[#868686] whitespace-nowrap">
          {notification.time}
        </div>
      </div>
    ));
  

  return (
    <div className="space-y-6">
      <div className="text-sm text-[#4C5560]">
        Admin{" "}
        <span className="text-[#116114] text-xl font-medium">
          / Notifications
        </span>
      </div>
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex gap-4">
          <button
            className={`px-2 py-2  text-sm font-medium ${filter === "all" ? " border-b-2 border-[#116114] pb-2 text-[#000000]" : " text-[#737687]"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-2 py-2  text-sm font-medium flex items-center gap-2 ${filter === "unread" ? "border-b-2 border-[#116114] pb-2 text-[#000000]" : "text-[#737687]"}`}
            onClick={() => setFilter("unread")}
          >
            Unread
            <span className="bg-[#116114] text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          </button>
        </div>
        <Button variant="ghost" className="text-[#737687] hover:text-[#737687]">
          <RiCheckDoubleLine className="" />
          Mark all as read
        </Button>
      </div>
      <div className="space-y-8">
        {["today", "yesterday", "older"].map((category) => {
          const list = groupByCategory(category);
          if (list.length === 0) return null;
          return (
            <div key={category}>
              <h2 className="text-sm font-medium text-gray-500 mb-4 uppercase">
                {category}
              </h2>
              <div className="space-y-4">{renderNotifications(list)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
