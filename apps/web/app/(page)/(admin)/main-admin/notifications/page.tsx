"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import unreadIcon from "@/assets/admin/customer/unread.svg";
import readIcon from "@/assets/admin/customer/read.svg";
import { RiCheckDoubleLine } from "react-icons/ri";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useFetchData, usePutData } from "@/hooks/useApi";
import { axiosInstance } from "@/services/axiosInstance";
import { Input } from "@/components/ui/input";
import Loader from "@/components/Loader";
import { useUpdateUnreadCount } from "@/hooks/useNoti";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  status: "READ" | "UNREAD";
  createdAt: string;
  metadata?: any[];
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isMarkingOne, setIsMarkingOne] = useState(false);

  const { updateCount } = useUpdateUnreadCount();

  // Fetch notifications based on filter and search
  const {
    data: notificationsResponse,
    isLoading,
    refetch,
  } = useFetchData(
    `notifications?page=${page}&limit=${limit}${filter === "unread" ? "&status=UNREAD" : ""}${search ? `&search=${search}` : ""}`,
    { page, filter, search } // Add dependencies to trigger re-fetch
  );

  const { mutateAsync: markAllAsRead, isPending: isMarkingAll } = usePutData(
    "notifications/read-all"
  );

  const notifications: Notification[] =
    notificationsResponse?.data?.items || [];
  const totalUnread = notifications.filter((n) => n.status === "UNREAD").length;
  const totalPages = Math.ceil(
    (notificationsResponse?.data?.total || 0) / limit
  );
  const currentPage = page; // Use local state instead of API response

  // Reset page when filter changes
  const handleFilterChange = (newFilter: "all" | "unread") => {
    setFilter(newFilter);
    setPage(1);
  };

  // Group notifications by date
  const groupNotificationsByDate = (notifications: Notification[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    return notifications.reduce(
      (groups, notification) => {
        const notificationDate = new Date(notification.createdAt);
        const notificationDay = new Date(
          notificationDate.getFullYear(),
          notificationDate.getMonth(),
          notificationDate.getDate()
        );

        let category = "older";
        if (notificationDay.getTime() === today.getTime()) {
          category = "today";
        } else if (notificationDay.getTime() === yesterday.getTime()) {
          category = "yesterday";
        }

        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(notification);
        return groups;
      },
      {} as Record<string, Notification[]>
    );
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead({});
      toast.success("All notifications marked as read");
      refetch();
      // Update global unread count
      updateCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    setIsMarkingOne(true);
    try {
      await axiosInstance.put(`notifications/${notificationId}/read`, {});
      toast.success("Notification marked as read");
      refetch();
      // Update global unread count
      const newUnreadCount = Math.max(0, totalUnread - 1);
      updateCount(newUnreadCount);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    } finally {
      setIsMarkingOne(false);
    }
  };

  // Update global unread count when data changes
  useEffect(() => {
    if (notificationsResponse?.data?.items) {
      const unreadCount = notificationsResponse.data.items.filter(
        (n: Notification) => n.status === "UNREAD"
      ).length;
      updateCount(unreadCount);
    }
  }, [notificationsResponse, updateCount]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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

  const renderNotifications = (list: Notification[]) =>
    list.map((notification) => (
      <div
        key={notification.id}
        className={`flex items-center gap-4 p-4 rounded-lg ${notification.status === "READ" ? "bg-white" : "bg-white"}`}
      >
        <div className="flex-shrink-0">
          <div>
            <Image
              src={notification.status === "READ" ? readIcon : unreadIcon}
              alt={notification.status === "READ" ? "Read" : "Unread"}
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
          <p className="text-[#868686] text-xs mt-1">{notification.message}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-[#868686] whitespace-nowrap">
            {formatTime(notification.createdAt)}
          </div>
          {notification.status === "UNREAD" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMarkAsRead(notification.id)}
              disabled={isMarkingOne}
              className="text-xs text-[#116114] hover:text-[#116114]/80"
            >
              {isMarkingOne ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
              ) : null}
              Mark as read
            </Button>
          )}
        </div>
      </div>
    ));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-[#4C5560]">
        Admin{" "}
        <span className="text-[#116114] text-xl font-medium">
          / Notifications
        </span>
      </div>

      {/* Search Bar */}
      {/* <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4"
        />
      </div> */}

      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="flex gap-4">
          <button
            className={`px-2 py-2  text-sm font-medium ${filter === "all" ? " border-b-2 border-[#116114] pb-2 text-[#000000]" : " text-[#737687]"}`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`px-2 py-2  text-sm font-medium flex items-center gap-2 ${filter === "unread" ? "border-b-2 border-[#116114] pb-2 text-[#000000]" : "text-[#737687]"}`}
            onClick={() => handleFilterChange("unread")}
          >
            Unread
            <span className="bg-[#116114] text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
              {totalUnread}
            </span>
          </button>
        </div>
        <Button
          variant="ghost"
          className="text-[#737687] hover:text-[#737687]"
          onClick={handleMarkAllAsRead}
          disabled={isMarkingAll || totalUnread === 0}
        >
          {isMarkingAll ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <RiCheckDoubleLine className="mr-2" />
          )}
          Mark all as read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filter === "all" ? (
          <>
            {Object.keys(groupNotificationsByDate(notifications)).length ===
            0 ? (
              <div className="text-center py-8 text-gray-500">
                No notifications found.
              </div>
            ) : (
              Object.entries(groupNotificationsByDate(notifications)).map(
                ([category, list]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-gray-500 mb-2 capitalize">
                      {category}
                    </h3>
                    <div className="space-y-2">{renderNotifications(list)}</div>
                  </div>
                )
              )
            )}
          </>
        ) : (
          <>
            {notifications.filter((n) => n.status === "UNREAD").length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No unread notifications.
              </div>
            ) : (
              <div className="space-y-2">
                {renderNotifications(
                  notifications.filter((n) => n.status === "UNREAD")
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
