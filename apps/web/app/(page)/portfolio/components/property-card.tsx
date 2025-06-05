// components/PropertyCard.tsx
import { FC } from "react";
// import { MapPin } from "lucide-react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  image: string | StaticImageData;
  title: string;
  location: string;
  status: string;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  image,
  title,
  location,
  status,
  className = "",
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-md group ${className}`}
    >
      <Image
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        fill
      />

      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="absolute top-4 left-4 bg-white/20 text-white text-xs font-semibold px-4 py-1 rounded-full">
        {status.toUpperCase()}
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm mt-1">{location}</p>
      </div>

      <Link 
        href={{
          pathname: '/portfolio/view-property',
          query: { 
            title,
            location,
            status,
            image: typeof image === 'string' ? image : image.src
          }
        }} 
        className="absolute bottom-4 right-4"
      >
        <button className="bg-white text-black text-sm px-4 py-2 rounded-full font-medium shadow hover:bg-gray-200 transition-colors">
          View property
        </button>
      </Link>
    </div>
  );
};

export default PropertyCard;