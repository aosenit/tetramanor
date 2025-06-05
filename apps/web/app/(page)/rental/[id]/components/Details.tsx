"use client";
import Image from "next/image";
import two from "@/assets/rental/two.webp";
import three from "@/assets/rental/three.webp";
import four from "@/assets/rental/four.webp";
import five from "@/assets/rental/five.webp";
import six from "@/assets/rental/six.webp";
import seven from "@/assets/rental/seven.webp";
import eleven from "@/assets/rental/eleven.jpg";
import twelve from "@/assets/rental/twelve.jpg";
import thirteen from "@/assets/rental/thirteen.jpg";
import fourteen from "@/assets/rental/fourteen.jpg";
import fifteen from "@/assets/rental/fifteen.jpg";
import sixteen from "@/assets/rental/sixteen.jpg";
import {
  FaDog,
  FaParking,
  FaWindowMaximize,
  FaShieldAlt,
  FaWater,
  FaWind,
  FaUtensils,
  FaToilet,
  FaDoorOpen,
  FaLeaf,
  FaTrash,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import Header from "@/app/(page)/portfolio/components/header";
import { useParams } from "next/navigation";
import { properties } from "../../components/ShortletProperty";

// Image mapping based on furnishing status
const furnishingImages = {
  UNFURNISHED: [two, three, four],
  'LUXURY FURNISHED': [eleven, twelve, thirteen],
  'STANDARD FURNISHED': [fourteen, fifteen, sixteen],
  FURNISHED: [five, six, seven],
};

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = params.id as string;
  
  // Find the property details
  const property = properties.find(p => p.id === propertyId);
  
  if (!property) {
    return <div>Property not found</div>;
  }

  // Extract furnishing status from description
  const getFurnishingStatus = (desc: string) => {
    if (desc.toLowerCase().includes('unfurnished')) return 'UNFURNISHED';
    if (desc.toLowerCase().includes('luxury furnished')) return 'LUXURY FURNISHED';
    if (desc.toLowerCase().includes('standard furnished')) return 'STANDARD FURNISHED';
    if (desc.toLowerCase().includes('furnished')) return 'FURNISHED';
    return 'UNFURNISHED';
  };

  const furnishingStatus = getFurnishingStatus(property.description);
  const propertyImages = furnishingImages[furnishingStatus as keyof typeof furnishingImages] || furnishingImages.UNFURNISHED;

  // Format price for display
  const formatPrice = (price: string) => {
    return price.replace('m', ' million');
  };

  // Calculate agency fee (10% of rental price)
  const calculateAgencyFee = (price: string) => {
    const numericPrice = parseFloat(price.replace('₦', '').replace('m', ''));
    return `₦${(numericPrice * 0.1).toFixed(3)}m`;
  };

  return (
    <div className="font-sans">
      <Header />
      <div className="container mx-auto px-4 md:px-6 lg:px-16 py-8 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-2 p-4">
          <div className="flex items-center text-xs text-[#646464] font-medium space-x-2">
            <a href="/rental" className="hover:text-gray-700">
              Rentals
            </a>
            <span>/</span>
            <span className="text-[#0C0C0C] font-semibold">{property.title}</span>
          </div>
          <button className="flex items-center text-[#151515] font-medium text-sm hover:text-gray-900">
            <FiShare2 className="mr-1" />
            <span>Share</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="w-full md:w-2/3 relative">
            <div className="absolute top-4 left-4 bg-gray-700 bg-opacity-70 text-white px-3 py-1 rounded-lg text-xs">
              {furnishingStatus}
            </div>
            <Image
              src={propertyImages[0]}
              alt={`${property.title} main view`}
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded"
              width={800}
              height={600}
            />
          </div>
          <div className="w-full md:w-1/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-4">
            <Image
              src={propertyImages[1]}
              alt={`${property.title} view 1`}
              className="w-full h-[100px] sm:h-[120px] object-cover rounded"
              width={400}
              height={300}
            />
            <Image
              src={propertyImages[2]}
              alt={`${property.title} view 2`}
              className="w-full h-[100px] sm:h-[120px] object-cover rounded"
              width={400}
              height={300}
            />
            <div className="relative w-full h-[100px] sm:h-[120px]">
              <Image
                src={propertyImages[0]}
                alt={`${property.title} view 3`}
                className="w-full h-full object-cover rounded"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                <p className="text-white font-semibold text-sm">3+ Photos</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 p-4">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center text-sm font-medium text-[#4D4E53] mb-2">
              <MdLocationOn className="mr-1" />
              <span>{property.location}</span>
            </div>
            <h1 className="text-2xl font-semibold mb-4">{property.title}</h1>
            <p className="text-[#0C0C0C] leading-relaxed text-sm mb-6">
              {property.description}
            </p>
            <div className="mb-8 mt-10">
              <h2 className="text-xl font-semibold text-[#000000] mb-4">
                Property Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-[#0B0A0A]">
                {[
                  [<FaDog />, "Pet-friendly"],
                  [<FaParking />, "Visitor & ample free parking"],
                  [<FaWindowMaximize />, "Wooden PVC French Windows"],
                  [<FaShieldAlt />, "24/7 Security"],
                  [<FaWater />, "Borehole Water Supply"],
                  [<FaWind />, "Treated Water System"],
                  [<FaUtensils />, "High-Quality Kitchen Cabinets & Wardrobes"],
                  [<FaToilet />, "Premium Sanitary Fittings"],
                  [<FaDoorOpen />, "Walk-in Closets"],
                  [<FaLeaf />, "Landscaping & Green Spaces"],
                  [
                    <FaTrash />,
                    "Efficient Waste Disposal & Central Sewage Management",
                  ],
                ].map(([Icon, label], i) => (
                  <div className="flex items-center" key={i}>
                    <span className="text-green-600 mr-2">{Icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-fit lg:w-1/3 bg-gray-50 border border-[#ECECEC] rounded">
            <h2 className="text-lg border-b border-[#ECECEC] text-[#151515] py-4 px-6 font-semibold">
              Pricing Details
            </h2>
            <div className="space-y-4 p-6">
              {[
                ["Rental Price", `${property.price}/${property.period}`],
                ...property.features.map(feature => {
                  const [label, value] = feature.split(': ');
                  return [label, value];
                }),
              ].map(([label, value], i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-[#5C5C5C] font-medium">{label}</span>
                  <span className="text-[#000000] font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
