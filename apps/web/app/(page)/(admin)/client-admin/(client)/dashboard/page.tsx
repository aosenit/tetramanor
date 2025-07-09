"use client";

import { ActiveProperties } from "./ActiveProperty";
import { VerifyBanner } from "./VerifyBanner";

import { DashboardStats } from "./DashboardStat";
import { PendingPayments } from "./PendingPayment";
import { RecentActivity } from "./RecentActivity";
import { useFetchData } from "@/hooks/useApi";
import Loader from "@/components/Loader";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data, isLoading, isError, error, refetch } =
    useFetchData("customer/dashboard");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data: getKYCStatus, isPending: isKYCStatusPending } =
    useFetchData("kyc");

  console.log(getKYCStatus?.data?.status);

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen">
        <section className="p-4 md:p-6 mx-auto">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome, {user?.name}.
            </h1>
            <p className="text-gray-500">
              Here's a quick overview of your account.
            </p>
          </div>

          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Failed to load dashboard
                </h2>
                <p className="text-sm text-gray-600 mb-4 max-w-md">
                  {error?.message ||
                    "An error occurred while loading your dashboard data. Please try again."}
                </p>
                <Button
                  onClick={() => refetch()}
                  className="bg-[#116114] text-white hover:bg-[#116114]/90"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try again
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Empty state - no data available
  if (!data?.data) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen">
        <section className="p-4 md:p-6 mx-auto">
          <div className="space-y-2 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome, {user?.name}.
            </h1>
            <p className="text-gray-500">
              Here's a quick overview of your account.
            </p>
          </div>

          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <Home className="h-12 w-12 text-gray-400" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  No dashboard data available
                </h2>
                <p className="text-sm text-gray-600 mb-4 max-w-md">
                  We couldn't find any data for your dashboard. This might be
                  because you haven't made any purchases yet or there's a
                  temporary issue.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => refetch()}
                    variant="outline"
                    className="border-gray-300"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button className="bg-[#116114] text-white hover:bg-[#116114]/90">
                    Explore Properties
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] ">
      <section className="p-4 md:p-6 mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome, {user?.name}.
          </h1>
          <p className="text-gray-500">
            Here's a quick overview of your account.
          </p>
        </div>

        {isKYCStatusPending && <Skeleton className="w-full h-10" />}
        {getKYCStatus?.data?.status?.toLowerCase() !== "verified" &&
          !isKYCStatusPending && <VerifyBanner />}
        <DashboardStats data={data?.data} />

        <div className="w-screen lg:w-full overflow-x-hidden h-fit">
          <ActiveProperties data={data?.data} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PendingPayments />
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}
