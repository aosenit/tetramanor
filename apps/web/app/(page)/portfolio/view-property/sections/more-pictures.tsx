"use client";
import Image from "next/image";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import placeholder from "@/assets/portfolio/more.webp";

function MorePictures() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  // Fetch property data by title
  const {
    data: propertyResponse,
    isLoading,
    error,
  } = useFetchData("property", {
    page: 1,
    limit: 1,
    search: title,
  });

  const property = propertyResponse?.data?.items?.[0];
  const images = property?.images?.slice(1) || [];

  return (
    <div>
      {isLoading ? (
        <div>Loading more pictures...</div>
      ) : error ? (
        <div className="text-red-500">Failed to load pictures.</div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <Image
              key={idx}
              src={img?.imageUrl || placeholder}
              alt={`More picture ${idx + 1}`}
              className="w-full rounded"
              width={400}
              height={300}
            />
          ))}
        </div>
      ) : (
        <Image
          src={placeholder}
          alt="More Pictures"
          className="w-full"
          width={1200}
          height={800}
        />
      )}
    </div>
  );
}

export default MorePictures;
