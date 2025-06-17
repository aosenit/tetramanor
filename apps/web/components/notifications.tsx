import React from "react";
import { IoIosCheckboxOutline } from "react-icons/io";

const activities = [
    "Queen Mary Unit 3 marked as Sold",
    "New booking for TM meadows",
    "Inspection scheduled for Tm gardens",
    "Ayoka registered as an investor",
    "Construction update for Tm gardens",
];

export default function PropertyActivity() {
    return (
      <div className="w-full p-4 border rounded-md bg-white space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className=" text-[#181818]">Property Activity</h2>
          <p className="text-sm text-[#181818] cursor-pointer">View all</p>
        </div>
        <ul className="space-y-3">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="flex text-[#181818] font-medium justify-between items-center"
            >
              <span className="text-xs  text-gray-700">{activity}</span>
              <IoIosCheckboxOutline className="text-black text-xl" />
            </li>
          ))}
        </ul>
      </div>
    );
}
