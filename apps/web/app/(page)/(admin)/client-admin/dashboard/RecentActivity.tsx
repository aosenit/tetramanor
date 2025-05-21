import React from "react";
import { Activity } from "./types";
import { FaFile, FaCheckSquare, FaFileContract } from "react-icons/fa";

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FaFileContract className="text-blue-500" />;
      case "deed":
        return <FaFile className="text-purple-500" />;
      case "receipt":
        return <FaCheckSquare className="text-green-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
          View all
        </button>
      </div>

      <div className="overflow-hidden">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                {getIcon(activity.type)}
              </div>

              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="text-md font-medium text-gray-900">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
