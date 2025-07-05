"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  Receipt,
  CheckCircle,
  AlertTriangle,
  FileUp,
  Bell,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
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
import { Input } from "@/components/ui/input";
import { useFetchData, usePutData } from "@/hooks/useApi";
import { axiosInstance } from "@/services/axiosInstance";
import { toast } from "sonner";
import { RiCheckDoubleLine } from "react-icons/ri";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  status: "READ" | "UNREAD";
  createdAt: string;
  metadata?: any[];
}

export function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isMarkingOne, setIsMarkingOne] = useState(false);

  // Fetch notifications based on filter and search
  const {
    data: notificationsResponse,
    isLoading,
    error,
    refetch,
  } = useFetchData(
    `notifications?page=${page}&limit=${limit}${filter === "unread" ? "&status=UNREAD" : ""}${search ? `&search=${search}` : ""}`,
    { page, filter, search }
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
  const currentPage = page;

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
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read");
    } finally {
      setIsMarkingOne(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Get the date parts for comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const notificationDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // For today's notifications, show relative time
    if (notificationDay.getTime() === today.getTime()) {
      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600)
        return `${Math.floor(diffInSeconds / 60)}min ago`;
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}hr ago`;
    }

    // For yesterday's notifications, show "Yesterday" with time
    if (notificationDay.getTime() === yesterday.getTime()) {
      return `Yesterday at ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`;
    }

    // For older notifications, show the actual date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Reset page when filter or search changes
  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  const getNotificationIcon = (type: string) => {
    switch (type?.toLowerCase()) {
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
      case "purchase_alert":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  const groupedNotifications = groupNotificationsByDate(notifications);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-4 py-3 text-sm rounded-lg transition-colors"
        >
          <Bell />
          <span className="font-medium ml-3">Notifications</span>
          {totalUnread > 0 && (
            <Badge className="ml-2 bg-red-500 hover:bg-red-600 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs">
              {totalUnread}
            </Badge>
          )}
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

        {/* Search Bar */}
        <div className="px-4 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4"
              disabled={isLoading}
            />
            {isLoading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
            )}
          </div>
        </div>

        <Tabs
          value={filter}
          onValueChange={(value) =>
            handleFilterChange(value as "all" | "unread")
          }
          className="w-full"
        >
          <div className="flex items-center justify-between px-4 pt-4">
            <TabsList>
              <TabsTrigger value="all" className="px-6" disabled={isLoading}>
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="px-6 flex items-center gap-2"
                disabled={isLoading}
              >
                Unread
                {totalUnread > 0 && (
                  <Badge className="bg-green-600 hover:bg-green-700 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {totalUnread}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={isMarkingAll || totalUnread === 0}
              className="text-sm"
            >
              {isMarkingAll ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <RiCheckDoubleLine className="mr-2" />
              )}
              Mark all as read
            </Button>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading notifications...</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="px-4 py-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Unable to load notifications
                </h3>
                <p className="text-gray-500 mb-4 max-w-md mx-auto">
                  There was an error loading your notifications. Please try
                  again.
                </p>
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  className="flex items-center space-x-2 mx-auto"
                >
                  <Loader2 className="w-4 h-4" />
                  <span>Retry</span>
                </Button>
              </div>
            </div>
          )}

          <TabsContent value="all" className="mt-0">
            <div className="max-h-[70vh] overflow-y-auto">
              {!isLoading &&
              !error &&
              Object.keys(groupedNotifications).length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notifications found
                  </h3>
                  <p className="text-gray-500">
                    {search
                      ? `No notifications match "${search}"`
                      : "You're all caught up! No new notifications."}
                  </p>
                </div>
              ) : (
                ["today", "yesterday", "older"].map((category) => {
                  const list = groupedNotifications[category] || [];
                  if (list.length === 0) return null;
                return (
                    <div key={category} className="mt-4">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                        {category}
                    </div>
                    <div className="divide-y">
                        {list.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 flex gap-3 hover:bg-gray-50 transition-colors",
                              notification.status === "UNREAD" && "bg-gray-50"
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
                                <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                    {formatTime(notification.createdAt)}
                              </span>
                                  {notification.status === "UNREAD" && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleMarkAsRead(notification.id)
                                      }
                                      disabled={isMarkingOne}
                                      className="text-xs text-green-600 hover:text-green-700 h-auto p-1"
                                    >
                                      {isMarkingOne ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                      ) : (
                                        "Mark as read"
                                      )}
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <div className="max-h-[70vh] overflow-y-auto">
              {!isLoading &&
              !error &&
              Object.keys(groupedNotifications).length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    All caught up!
                  </h3>
                  <p className="text-gray-500">
                    No unread notifications. You're all up to date.
                  </p>
                </div>
              ) : (
                ["today", "yesterday", "older"].map((category) => {
                  const list =
                    groupedNotifications[category]?.filter(
                      (n) => n.status === "UNREAD"
                    ) || [];
                  if (list.length === 0) return null;
                return (
                    <div key={category} className="mt-4">
                    <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase">
                        {category}
                    </div>
                    <div className="divide-y">
                        {list.map((notification) => (
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
                                <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">
                                    {formatTime(notification.createdAt)}
                              </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleMarkAsRead(notification.id)
                                    }
                                    disabled={isMarkingOne}
                                    className="text-xs text-green-600 hover:text-green-700 h-auto p-1"
                                  >
                                    {isMarkingOne ? (
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                      "Mark as read"
                                    )}
                                  </Button>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 p-4">
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages} •{" "}
              {notificationsResponse?.data?.total || 0} total notifications
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-sm text-gray-500 px-2">{currentPage}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
