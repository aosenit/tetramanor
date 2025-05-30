"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  Receipt,
  CheckCircle,
  AlertTriangle,
  FileUp,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type NotificationType =
  | "document"
  | "payment"
  | "verification"
  | "inspection"
  | "reminder";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
  date: "today" | "yesterday" | "older";
}

export function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "document",
      title: "Title Deed Uploaded",
      description:
        "Your Title Deed for Comfy Burrows has been uploaded and is now available for download.",
      time: "8min ago",
      read: false,
      date: "today",
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Receipt Available",
      description:
        "A new payment receipt for Unit A2 in Comfy Burrows is now available.",
      time: "2hr ago",
      read: false,
      date: "today",
    },
    {
      id: "3",
      type: "verification",
      title: "KYC Verification Complete",
      description:
        "Congratulations, your identity has been verified. You now have full access to all platform features.",
      time: "10:34AM",
      read: false,
      date: "today",
    },
    {
      id: "4",
      type: "inspection",
      title: "Inspection Confirmed",
      description:
        "Your property inspection for Unit B3 in Prime Courts has been scheduled for Oct 2, 2025 at 12:00 PM.",
      time: "2:56PM",
      read: false,
      date: "yesterday",
    },
    {
      id: "5",
      type: "reminder",
      title: "Upcoming Payment Due",
      description:
        "You have an outstanding rent balance of ₦250,000 for Unit C1 in Royal Terrace. Due in 3 days.",
      time: "6:32AM",
      read: false,
      date: "yesterday",
    },
    {
      id: "6",
      type: "document",
      title: "New Contract Uploaded",
      description:
        "Your updated lease agreement for Unit D2 in TM HighGardens is now available.",
      time: "11:45PM",
      read: true,
      date: "older",
    },
    {
      id: "7",
      type: "reminder",
      title: "Reminder: Inspection Tomorrow",
      description:
        "Don't forget: Your inspection for Unit F4 is scheduled for tomorrow at 10:00 AM.",
      time: "9:25PM",
      read: true,
      date: "older",
    },
    {
      id: "8",
      type: "document",
      title: "Title Deed Uploaded",
      description:
        "Your Title Deed for King's Landing has been uploaded and is now available for download.",
      time: "3:04PM",
      read: true,
      date: "older",
    },
    {
      id: "9",
      type: "payment",
      title: "Payment Receipt Available",
      description:
        "A new payment receipt for Unit A2 in TM Meadows is now available.",
      time: "8min ago",
      read: true,
      date: "older",
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "document":
        return <FileUp className="h-5 w-5 text-blue-500" />;
      case "payment":
        return <Receipt className="h-5 w-5 text-blue-500" />;
      case "verification":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "inspection":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "reminder":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-4 py-3 text-sm rounded-lg transition-colors"
        >
          <Bell />
          <span className=" font-medium ml-3">Notifications</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Notifications
            </DialogTitle>
            <DialogClose asChild></DialogClose>
          </div>
        </DialogHeader>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between px-4 pt-4">
            <TabsList>
              <TabsTrigger value="all" className="px-6">
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="px-6 flex items-center gap-2"
              >
                Unread
                {unreadCount > 0 && (
                  <Badge className="bg-green-600 hover:bg-green-700 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-sm"
            >
              Mark all as read
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="max-h-[70vh] overflow-y-auto">
              {["today", "yesterday", "older"].map((date) => {
                const dateNotifications = notifications.filter(
                  (notification) => notification.date === date
                );
                if (dateNotifications.length === 0) return null;

                return (
                  <div key={date} className="mt-4">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                      {date === "today"
                        ? "TODAY"
                        : date === "yesterday"
                          ? "YESTERDAY"
                          : "OLDER"}
                    </div>
                    <div className="divide-y">
                      {dateNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors",
                            !notification.read && "bg-gray-50"
                          )}
                        >
                          <div className="bg-gray-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h3 className="font-medium">
                                {notification.title}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <div className="max-h-[70vh] overflow-y-auto">
              {["today", "yesterday", "older"].map((date) => {
                const dateNotifications = notifications.filter(
                  (notification) =>
                    notification.date === date && !notification.read
                );
                if (dateNotifications.length === 0) return null;

                return (
                  <div key={date} className="mt-4">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                      {date === "today"
                        ? "TODAY"
                        : date === "yesterday"
                          ? "YESTERDAY"
                          : "OLDER"}
                    </div>
                    <div className="divide-y">
                      {dateNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors bg-gray-50"
                        >
                          <div className="bg-gray-100 rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h3 className="font-medium">
                                {notification.title}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {notifications.filter((n) => !n.read).length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  <p>No unread notifications</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
