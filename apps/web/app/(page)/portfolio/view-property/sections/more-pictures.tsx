"use client";
import type { PropertyItem } from "@/types/property";
import Image from "next/image";
import React from "react";
import placeholder from "@/assets/placeholder.jpg";


interface MorePicturesProps {
  property: PropertyItem;
}

function MorePictures({ property }: MorePicturesProps) {
  const images = property.images?.filter(img => !img.isPrimary) || [];
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 ">
      {images.length > 0 ? (
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
