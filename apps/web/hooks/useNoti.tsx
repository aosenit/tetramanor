"use client";
import { useFetchData } from "./useApi";

const useNoti = () => {
  const { data, isLoading, refetch } = useFetchData("notifications");

  const notifications = data?.data;

  return { notifications, isLoading, refetch };
};

export default useNoti;
