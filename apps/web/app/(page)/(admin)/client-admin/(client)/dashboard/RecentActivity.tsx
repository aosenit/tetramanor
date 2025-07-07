"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  FileUp,
  Receipt,
  Loader2,
  AlertCircle,
  RefreshCw,
  Bell,
  ShoppingCart,
  CreditCard,
  FileCheck,
} from "lucide-react";
import Link from "next/link";
import { useFetchData } from "@/hooks/useApi";

type NotificationMetadata = {
  id: string;
  name: string;
  floor: number;
  price: number;
};

type ActivityItem = {
  id: string;
  status: "READ" | "UNREAD";
  title: string;
  message: string;
  type: string;
  createdAt: string;
  metadata: NotificationMetadata[];
};

export function RecentActivity() {
  // Fetch notifications from API
  const {
    data: notificationsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData("notifications");

  const notifications: ActivityItem[] = notificationsData?.data?.items || [];
  console.log(notifications);

  // Get icon and color based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "purchase_alert":
        return { icon: ShoppingCart, color: "bg-green-100 text-green-600" };
      case "payment_alert":
        return { icon: CreditCard, color: "bg-blue-100 text-blue-600" };
      case "contract":
        return { icon: FileUp, color: "bg-purple-100 text-purple-600" };
      case "deed":
        return { icon: FileText, color: "bg-orange-100 text-orange-600" };
      case "receipt":
        return { icon: Receipt, color: "bg-emerald-100 text-emerald-600" };
      case "document":
        return { icon: FileCheck, color: "bg-indigo-100 text-indigo-600" };
      default:
        return { icon: Bell, color: "bg-gray-100 text-gray-600" };
    }
  };

  // Format time
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4 bg-white rounded-lg border h-fit">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm" disabled>
            View all
          </Button>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#116114]" />
            <p className="text-sm text-gray-600">
              Loading recent activities...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="space-y-4 bg-white rounded-lg border h-fit">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm" disabled>
            View all
          </Button>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Failed to load recent activities
              </p>
              <p className="text-xs text-gray-500 mb-4">
                {error?.message || "An error occurred while fetching data"}
              </p>
              <Button
                size="sm"
                onClick={() => refetch()}
                className="bg-[#116114] text-white hover:bg-[#116114]/90"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!notifications || notifications.length === 0) {
    return (
      <div className="space-y-4 bg-white rounded-lg border h-fit">
        <div className="flex justify-between items-center px-4 pt-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="#">View all</Link>
          </Button>
        </div>
        <div className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Bell className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">No recent activities</p>
              <p className="text-xs text-gray-500">
                You'll see your latest notifications here
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white rounded-lg border divide-y h-fit">
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
      </div>
      <div className="overflow-hidden">
        <div className="divide-y">
          {notifications.slice(0, 3).map((notification) => {
            const { icon: IconComponent, color } = getNotificationIcon(
              notification.type
            );
            const isUnread = notification.status === "UNREAD";

            return (
              <div key={notification.id} className={`p-4 flex gap-4 `}>
                <div
                  className={`${color} p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1`}
                >
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-medium ${isUnread ? "text-blue-900" : ""}`}
                        >
                          {notification.title}
                        </h3>
                        {isUnread && (
                          <div className="w-2 h-2 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      {notification.metadata &&
                        notification.metadata.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {notification.metadata.map((item) => (
                              <div
                                key={item.id}
                                className="text-xs bg-gray-100 px-2 py-1 rounded"
                              >
                                {item.name} • Floor {item.floor} •{" "}
                                {formatCurrency(item.price)}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
