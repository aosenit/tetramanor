import {
  FaFileAlt,
  FaShippingFast,
  FaFileContract,
  FaMoneyBillWave,
  FaPassport,
  FaKey,
} from "react-icons/fa";
import { Property } from "../../types";

interface EconomicAdvantagesProps {
  property: Property;
}

const defaultAdvantages = [
  { icon: FaFileAlt, title: "Tax-Free Living", description: "Enjoy a complete holiday from all federal, state, and local taxes." },
  { icon: FaShippingFast, title: "Duty-Free Importation", description: "No import duties on capital goods, machinery, raw materials, or consumables." },
  { icon: FaFileContract, title: "Hassle-Free Approvals", description: "One-stop permits and operating licenses for businesses." },
  { icon: FaMoneyBillWave, title: "100% Repatriation of Capital & Profits", description: "Withdraw earnings with ease." },
  { icon: FaPassport, title: "No Expatriate Quota Restrictions", description: "Ideal for international investors and businesses." },
  { icon: FaKey, title: "100% Foreign Ownership", description: "Your investment is yours, no restrictions." },
];

export default function EconomicAdvantages({ property }: EconomicAdvantagesProps) {
  const mainLocation = property.address.split(",")[0];

  // Debug: log the data to see what we're actually receiving
  console.log("investmentAdvantages:", property.investmentAdvantages);

  const advantages =
    property.investmentAdvantages?.length > 0
      ? property.investmentAdvantages
      : defaultAdvantages;

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
        {advantages.map((advantage, index) => {
          // Always use icon from defaultAdvantages array, cycling through if needed
          const IconComponent =
            defaultAdvantages[index % defaultAdvantages.length]?.icon ||
            FaFileAlt;

          return (
            <div
              key={index}
              className="flex flex-col items-center md:items-start"
            >
              <div className="bg-[#f0f7f0] p-4 rounded-full mb-6">
                <IconComponent className="h-6 w-6 text-[#116114]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#0b0a0a]">
                {typeof advantage.title === "string" ? advantage.title : ""}
              </h3>
              <p className="text-[#5c5c5c] text-center md:text-left">
                {typeof advantage.description === "string"
                  ? advantage.description
                  : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
