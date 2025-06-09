import type React from "react";
import { Button } from "@/components/ui/button";
import { FileText, FileUp, Receipt } from "lucide-react";
import Link from "next/link";

type ActivityItem = {
  id: string;
  type: "contract" | "deed" | "receipt";
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
};

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "contract",
      title: "New Contract Uploaded",
      description:
        "Your updated lease agreement for Unit D2 in TM HighGardens is now available.",
      time: "8min ago",
      icon: FileUp,
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: "2",
      type: "deed",
      title: "Title Deed Uploaded",
      description:
        "Your Title Deed for King's Landing has been uploaded and is now available for download.",
      time: "3:04PM",
      icon: FileText,
      iconColor: "bg-purple-100 text-purple-600",
    },
    {
      id: "3",
      type: "receipt",
      title: "Payment Receipt Available",
      description:
        "Your Title Deed for King's Landing has been uploaded and is now available for download.",
      time: "11:42AM",
      icon: Receipt,
      iconColor: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="space-y-4 bg-white rounded-lg border divide-y h-fit">
      <div className="flex justify-between items-center px-4 pt-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="#">View all</Link>
        </Button>
      </div>
      <div className=" overflow-hidden">
        <div className="divide-y">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 flex gap-4">
              <div
                className={`${activity.iconColor} p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1`}
              >
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <h3 className="font-medium">{activity.title}</h3>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
