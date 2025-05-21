import React from "react";
import Header from "./Header";

import PropertiesTable from "./PropertiesTable";
import PendingPayments from "./PendingPayment";
import RecentActivity from "./RecentActivity";
import { mockData } from "../data";
import StatisticsSection from "../StatisticsSession";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Header
        userName={mockData.user.name}
        isVerified={mockData.user.isVerified}
      />

      <StatisticsSection
        totalProperties={mockData.statistics.totalProperties}
        rentedProperties={mockData.statistics.rentedProperties}
        pendingPayments={mockData.statistics.pendingPayments}
      />

      {/* <div className="mt-8">
        <PropertiesTable properties={mockData.properties} />
      </div> */}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PendingPayments payments={mockData.pendingPayments} />
        <RecentActivity activities={mockData.recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
