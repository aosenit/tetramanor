import {
  FaFileAlt,
  FaShippingFast,
  FaFileContract,
  FaMoneyBillWave,
  FaPassport,
  FaKey,
} from "react-icons/fa";

interface EconomicAdvantagesProps {
  location?: string;
}

export default function EconomicAdvantages({ location = "Eko Atlantic, Lagos, Nigeria" }: EconomicAdvantagesProps) {
  // Extract the main location (e.g., "Eko Atlantic" from "Eko Atlantic, Lagos, Nigeria")
  const mainLocation = location.split(',')[0];
  
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 bg-white">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0b0a0a]">
          {mainLocation} Economic Free Zone Offers
          <br className="hidden md:block" />
          Unmatched Investment Advantages
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
        {/* Tax-Free Living */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-[#f0f7f0] p-4 rounded-full mb-6">
            <FaFileAlt className="h-6 w-6 text-[#116114]" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#0b0a0a]">
            Tax-Free Living
          </h3>
          <p className="text-[#5c5c5c] text-center md:text-left">
            Enjoy a complete holiday from all federal, state, and local taxes.
          </p>
        </div>

        {/* Duty-Free Importation */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-[#f0f7f0] p-4 rounded-full mb-6">
            <FaShippingFast className="h-6 w-6 text-[#116114]" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#0b0a0a]">
            Duty-Free Importation
          </h3>
          <p className="text-[#5c5c5c] text-center md:text-left">
            No import duties on capital goods, machinery, raw materials, or
            consumables.
          </p>
        </div>

        {/* Hassle-Free Approvals */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-[#f0f7f0] p-4 rounded-full mb-6">
            <FaFileContract className="h-6 w-6 text-[#116114]" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#0b0a0a]">
            Hassle-Free Approvals
          </h3>
          <p className="text-[#5c5c5c] text-center md:text-left">
            One-stop permits and operating licenses for businesses.
          </p>
        </div>

        {/* 100% Repatriation of Capital & Profits */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-[#f0f7f0] p-4 rounded-full mb-6">
            <FaMoneyBillWave className="h-6 w-6 text-[#116114]" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#0b0a0a]">
            100% Repatriation of Capital & Profits
          </h3>
          <p className="text-[#5c5c5c] text-center md:text-left">
            Withdraw earnings with ease.
          </p>
        </div>

        {/* No Expatriate Quota Restrictions */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-[#f0f7f0] p-4 rounded-full mb-6">
            <FaPassport className="h-6 w-6 text-[#116114]" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#0b0a0a]">
            No Expatriate Quota Restrictions
          </h3>
          <p className="text-[#5c5c5c] text-center md:text-left">
            Ideal for international investors and businesses.
          </p>
        </div>

        {/* 100% Foreign Ownership */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-[#f0f7f0] p-4 rounded-full mb-6">
            <FaKey className="h-6 w-6 text-[#116114]" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-[#0b0a0a]">
            100% Foreign Ownership
          </h3>
          <p className="text-[#5c5c5c] text-center md:text-left">
            Your investment is yours, no restrictions.
          </p>
        </div>
      </div>
    </div>
  );
}
