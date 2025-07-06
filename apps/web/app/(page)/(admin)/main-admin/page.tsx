"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

import Image from "next/image";
import three from "@/assets/admin/home/three.webp";
import one from "@/assets/admin/dashboard/one.webp";
import two from "@/assets/admin/dashboard/two.webp";
import four from "@/assets/admin/dashboard/four.webp";
import PropertyStatisticsChart from "@/components/Chart";
import {
  IoMdArrowRoundForward,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { Suspense, useEffect } from "react";
import Loader from "@/components/Loader";
import { useFetchData } from "@/hooks/useApi";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/navigation";

// Notification atom
const notificationsAtom = atom([]);

function useNotifications() {
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const { data, isLoading, isError } = useFetchData("admin/notifications");

  useEffect(() => {
    if (data?.data) setNotifications(data.data);
  }, [data, setNotifications]);

  return { notifications, setNotifications, isLoading, isError };
}

function NotificationList() {
  const { notifications, setNotifications, isLoading, isError } =
    useNotifications();

  const toggleRead = (id: string) => {
    setNotifications((prev: any) =>
      prev.map((n: any) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  if (isLoading)
    return <div className="p-4 text-center">Loading notifications...</div>;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load notifications.
      </div>
    );
  if (!notifications.length)
    return (
      <div className="p-4 text-center text-gray-400">No notifications.</div>
    );

  return (
    <div className="divide-y">
      {notifications.map((n: any) => (
        <div key={n.id} className="flex items-center gap-3 py-2 px-1">
          <input
            type="checkbox"
            checked={!!n.read}
            onChange={() => toggleRead(n.id)}
            className="accent-green-600"
          />
          <div className="flex-1">
            <div className="font-medium text-sm text-[#181818]">{n.title}</div>
            <div className="text-xs text-gray-500">{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { data, isLoading, isError, error } = useFetchData("admin/stats");
  const stats = data?.data || {};
  const router = useRouter();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        {error?.message || "Failed to load dashboard stats."}
      </div>
    );
  }
  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Image
          src={three}
          alt="empty"
          width={64}
          height={64}
          className="mb-4 opacity-60"
        />
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          No Data Available
        </h2>
        <p className="text-gray-500 mb-4 max-w-xs mx-auto">
          There is currently no dashboard data to display. Please check back
          later.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="space-y-4">
        <div className="text-lg md:text-xl  font-medium text-[#858C95]">
          Admin /{" "}
          <span className="text-[#116114] text-lg md:text-xl font-medium">
            Dashboard
          </span>
        </div>
        <div className="bg-white p-1"></div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] h-4 w-4" />
          <Input
            placeholder="Search properties, users and transactions"
            className="pl-10 max-w-full bg-[#E5E5E7] rounded-lg py-6"
          />
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <Button
            variant="outline"
            className="h-12 text-sm text-[#858C95] rounded-lg w-fit justify-start"
            onClick={() => router.push("/main-admin/properties/add-properties")}
          >
            Add new property
            <IoMdArrowRoundForward className="h-4 w-4  mr-2" />
          </Button>
          <Button
            variant="outline"
            className="h-12 w-fit text-sm text-[#858C95] rounded-lg justify-start"
            onClick={() =>
              router.push("/main-admin/investments/add-investment")
            }
          >
            Add new investment
            <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
          </Button>
          <Button
            variant="outline"
            className="h-12 w-fit text-sm text-[#858C95] rounded-lg justify-start"
            onClick={() => router.push("/main-admin/rentals/edit-rentals")}
          >
            Add new rental
            <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
          </Button>
          <Button
            variant="outline"
            className="h-12 text-sm w-fit text-[#858C95] rounded-lg justify-start"
            onClick={() => router.push("/main-admin/blog-posts/edit-blog")}
          >
            Add new blog post
            <IoMdArrowRoundForward className="h-4 w-4 mr-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ">
          <Card className="w-full max-w-sm ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-[#4C5560] font-medium">
                Total properties listed
              </CardTitle>
              <Image src={three} alt="property" width={35} height={35} />
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="text-xl text-[#116114] font-bold">
                {stats.totalProperties ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-[#116114] font-medium text-sm">
                  ({stats.totalUnitPurchased ?? 0}
                </span>{" "}
                for rent{" "}
                <span className="text-[#116114] font-medium text-sm ml-5">
                  {stats.totalRented ?? 0}
                </span>{" "}
                for sale{" "}
                <span className="text-[#116114] font-medium text-sm">)</span>
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-[#4C5560] font-medium">
                Total investments
              </CardTitle>
              <Image src={one} alt="property" width={35} height={35} />
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="text-xl text-[#116114] font-bold">
                ₦{stats.totalInvestments?.toLocaleString() ?? 0}
              </div>
              <p className="text-xs text-[#4C5560] text-muted-foreground">
                {stats.liveCampaign ?? 0} live campaigns
              </p>
            </CardContent>
          </Card>

          <Card className="w-full max-w-sm ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-[#4C5560] font-medium">
                Total customers
              </CardTitle>
              <Image src={two} alt="property" width={35} height={35} />
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="text-xl text-[#116114] font-bold">
                {stats.totalCustomers ?? 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Tetramanor customers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4">
            <div className="flex items-center gap-2">
              <p className=" font-medium text-[#181818]">Properties overview</p>
              <Image src={three} alt="property" width={35} height={35} />
            </div>
            <div className="flex border rounded-lg overflow-hidden">
              <button className="px-4 py-2 text-sm font-semibold bg-white text-[#858C95] border-r">
                All
              </button>
              <button className="px-4 py-2 font-semibold text-sm bg-[#F8F9FB] text-[#323539] border-r">
                Recent
              </button>
              <button className="px-3 py-2 text-sm bg-white text-[#858C95]">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="w-full bg-white rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-4 bg-[#e5e5e7]  p-4 text-sm font-medium text-[#116114]">
              <p>Property</p>
              <p>Price</p>
              <p>Date Added</p>
              <p>Status</p>
            </div>
            {stats.recentProperties && stats.recentProperties.length > 0 ? (
              stats.recentProperties.map((property: any, index: number) => (
                <div
                  key={property.id || index}
                  className="grid grid-cols-4 text-[#181818] gap-4 p-4 border-t text-xs"
                >
                  <p className="font-medium">{property.name}</p>
                  <p>₦{property.price?.toLocaleString() ?? 0}</p>
                  <p>{new Date(property.createdAt).toLocaleDateString()}</p>
                  <p className="text-green-600">New</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">
                No recent properties.
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=" w-full flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <p className=" font-medium text-[#181818]">
                  Recent Investments
                </p>
                <Image src={one} alt="property" width={35} height={35} />
              </div>
              <div className="flex rounded-lg overflow-hidden">
                <button className="px-4 py-2 text-sm font-semibold bg-white text-[#858C95] border-r">
                  All
                </button>
                <button className="px-4 py-2 font-semibold text-sm bg-[#F8F9FB] text-[#323539] border-r">
                  Recent
                </button>
                <button className="px-3 py-2 text-sm bg-white text-[#858C95]">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="w-full border rounded-lg  bg-white ">
              <div className="grid grid-cols-3 bg-[#e5e5e7]  p-4 text-sm font-medium text-[#116114]">
                <p>Property</p>
                <p>Price</p>
                <p>Date</p>
              </div>
              {stats.recentInvestments && stats.recentInvestments.length > 0 ? (
                stats.recentInvestments.map((item: any, index: number) => (
                  <div
                    key={item.id || index}
                    className="grid grid-cols-3 text-[#181818] gap-4 p-4 border-t text-xs"
                  >
                    <p className="text-xs">{item.propertyName}</p>
                    <p className="text-xs">
                      ₦{item.price?.toLocaleString() ?? 0}
                    </p>
                    <p className="text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400">
                  No recent investments.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-[#181818]">Notifications</h2>
                  <div className="bg-blue-500 rounded-md p-1 inline-flex items-center justify-center">
                    <IoMdNotificationsOutline className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex rounded-lg overflow-hidden">
                  <button className="px-4 py-2 text-sm font-semibold bg-white text-[#858C95] border-r">
                    All
                  </button>
                  <button className="px-4 py-2 font-semibold text-sm bg-[#F8F9FB] text-[#323539] border-r">
                    Recent
                  </button>
                </div>
              </div>
              <NotificationList />
            </div>
          </div>
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={four} alt="property" width={35} height={35} />
                  <CardTitle className="text-[#181818] text-base">
                    Inventory breakdown
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <PropertyStatisticsChart
                  total={stats.totalProperties ?? 0}
                  forSale={
                    Math.ceil(stats.inventoryBreakdown?.percentageSold) ?? 0
                  }
                  forRent={
                    Math.ceil(stats.inventoryBreakdown?.percentageRentedOut) ??
                    0
                  }
                  rentedOut={stats.totalRented ?? 0}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
