"use client";
import { useFetchData } from "./useApi";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

// Global notification state
const unreadNotificationsAtom = atom<number>(0);

// Hook for all notifications
const useNoti = () => {
  const { data, isLoading, refetch } = useFetchData("notifications");

  const notifications = data?.data;

  // Calculate unread count
  const unreadCount =
    notifications?.items?.filter(
      (notification: any) => notification.status === "UNREAD"
    )?.length || 0;

  return {
    notifications,
    isLoading,
    refetch,
    unreadCount,
  };
};

// Hook specifically for unread notifications count with global state
const useUnreadNotifications = () => {
  const [unreadCount, setUnreadCount] = useAtom(unreadNotificationsAtom);

  const { data, isLoading, refetch } = useFetchData(
    "notifications?page=1&limit=100&status=UNREAD"
  );

  // Update global state when data changes
  useEffect(() => {
    const count = data?.data?.items?.length || 0;
    setUnreadCount(count);
  }, [data, setUnreadCount]);

  return {
    unreadNotifications: data?.data?.items || [],
    unreadCount,
    isLoading,
    refetch,
  };
};

// Hook to update global unread count
const useUpdateUnreadCount = () => {
  const [, setUnreadCount] = useAtom(unreadNotificationsAtom);

  const updateCount = (count: number) => {
    setUnreadCount(count);
  };

  return { updateCount };
};

export default useNoti;
export { useUnreadNotifications, useUpdateUnreadCount };
