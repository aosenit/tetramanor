import { ActiveProperties } from "./ActiveProperty";
import { VerifyBanner } from "./VerifyBanner";

import { DashboardStats } from "./DashboardStat";
import { PendingPayments } from "./PendingPayment";
import { RecentActivity } from "./RecentActivity";

export default function DashboardPage() {
  return (
    <div className="bg-gray-50">
      <section className="p-4 md:p-6 mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome, Damian.
          </h1>
          <p className="text-gray-500">
            Here's a quick overview of your account.
          </p>
        </div>

        <VerifyBanner />
        <DashboardStats />

        <div className="w-screen lg:w-full overflow-x-hidden h-fit">
          <ActiveProperties />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PendingPayments />
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}
