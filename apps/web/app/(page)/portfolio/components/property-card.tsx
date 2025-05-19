import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  slug: string;
  image: StaticImageData;
  title: string;
  location: string;
  status: string;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  slug,
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
          pathname: "portfolio/view-property",
          query: { slug },
  }}
  className="absolute bottom-4 right-4 bg-white text-black text-sm px-4 py-2 rounded-full font-medium shadow hover:bg-gray-200"
>
  View Property
</Link>


    </div>
  );
};

export default PropertyCard;
