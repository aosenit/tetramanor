import React from "react";
import StatCard from "./StatCard";
import { FaBuilding, FaHome, FaCreditCard } from "react-icons/fa";

interface StatisticsSectionProps {
  totalProperties: number;
  rentedProperties: number;
  pendingPayments: number;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  totalProperties,
  rentedProperties,
  pendingPayments,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Properties"
        value={totalProperties}
        icon={<FaBuilding className="text-green-600" />}
      />
      <StatCard
        title="Rented Properties"
        value={rentedProperties}
        icon={<FaHome className="text-blue-600" />}
      />
      <StatCard
        title="Pending Payments"
        value={pendingPayments}
        icon={<FaCreditCard className="text-orange-500" />}
      />
    </div>
  );
};

export default StatisticsSection;
