import React from "react";
import { Payment } from "./types";
import { FaCalendar } from "react-icons/fa";

interface PendingPaymentsProps {
  payments: Payment[];
}

const PendingPayments: React.FC<PendingPaymentsProps> = ({ payments }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Pending Payments
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200">
          View all
        </button>
      </div>

      <div className="overflow-hidden">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-center">
              <img
                src={payment.propertyImage}
                alt={payment.propertyName}
                className="h-16 w-16 rounded-md object-cover"
              />

              <div className="ml-4 flex-1">
                <h3 className="text-md font-medium text-gray-900">
                  {payment.propertyName}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <FaCalendar size={14} className="mr-1" />
                  <span>{payment.dueDate}</span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Balance Due</p>
                <p className="text-red-600 font-semibold">
                  ₦{payment.amount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingPayments;
