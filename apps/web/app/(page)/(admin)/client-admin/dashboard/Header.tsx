import React from "react";
import { FaBellConcierge, FaUser } from "react-icons/fa6";

interface HeaderProps {
  userName: string;
  isVerified: boolean;
}

const Header: React.FC<HeaderProps> = ({ userName, isVerified }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {userName}.
        </h1>
        <p className="text-gray-600 mt-1">
          Here's a quick overview of your account.
        </p>
      </div>

      <div className="flex items-center mt-4 md:mt-0 space-x-4">
        {!isVerified && (
          <div className="flex items-center bg-orange-50 p-2 rounded-lg border border-orange-200 transition-all duration-300 hover:bg-orange-100">
            <span className="text-orange-600 mr-2">
              <FaBellConcierge size={18} />
            </span>
            <span className="text-sm text-orange-700">
              Verify your identity to unlock full access to your account
              features.
            </span>
            <button className="ml-3 bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
              Start KYC
            </button>
          </div>
        )}

        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200">
          <FaUser size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Header;
