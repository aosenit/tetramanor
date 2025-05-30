import { Building, Building2, CreditCard } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Properties",
      value: "36",
      icon: Building,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rented Properties",
      value: "04",
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending Payments",
      value: "08",
      icon: CreditCard,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500 text-sm">{stat.title}</p>
            <p className="text-3xl font-semibold mt-1">{stat.value}</p>
          </div>
          <div className={`${stat.color} p-3 rounded-full`}>
            <stat.icon className="h-6 w-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
