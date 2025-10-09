"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyImage } from "@/types/property";

interface ImageGalleryProps {
  images: PropertyImage[];
  propertyName: string;
}

export default function ImageGallery({
  images,
  propertyName,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const mainImage = images[selectedIndex]?.imageUrl || "";
  const thumbnails = images.slice(0, 6);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div
          className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setShowLightbox(true)}
        >
          <Image
            src={mainImage}
            alt={propertyName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Grid */}
        {thumbnails.length > 1 && (
          <div className="grid grid-cols-6 gap-2">
            {thumbnails.map((image, index) => (
              <div
                key={image.id}
                className={`relative h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                  index === selectedIndex
                    ? "border-[#116114] ring-2 ring-[#116114]/20"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image.imageUrl}
                  alt={`${propertyName} ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 5 && images.length > 6 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      +{images.length - 6}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Main Image */}
          <div className="relative w-[90vw] h-[80vh] max-w-6xl">
            <Image
              src={images[selectedIndex].imageUrl}
              alt={`${propertyName} ${selectedIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

