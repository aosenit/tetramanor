"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function PropertyGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const userId = searchParams.get("userId");

  const { data, isLoading, error } = useFetchData(
    propertyId && userId
      ? `admin/purchases/property/${propertyId}/user/${userId}`
      : null
  );

  const unit = data?.data?.[0];
  const images = unit?.images || [];
  const maxImages = 6;
  const emptySlots = Math.max(0, maxImages - images.length);

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error || !unit) {
    return (
      <div className="p-8 text-center text-red-500">Error loading gallery.</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-[#858C95] flex items-center gap-2">
        <span className="font-medium">Admin</span>
        <span>/</span>
        <span className="text-[#116114] font-semibold">view profile</span>
        <span>/</span>
        <span className="text-[#116114] font-semibold">view property</span>
        <span>/</span>
        <span className="text-[#116114] font-semibold">
          view property gallery
        </span>
      </div>
      <h2 className="text-xl font-semibold mb-6">
        Gallery - {unit.propertyName} - Unit {unit.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 bg-white p-8 rounded-xl">
        {images.map((img: any, idx: number) => (
          <div key={img.id} className="flex flex-col items-center gap-2">
            <Image
              src={img.imageUrl}
              alt={img.name || `Image ${idx + 1}`}
              width={220}
              height={160}
              className="rounded-lg object-cover w-full h-40"
            />
            <div className="flex gap-4 mt-2">
              <Button
                variant="ghost"
                className="text-[#116114] flex items-center gap-1"
              >
                Replace{" "}
                <span role="img" aria-label="replace">
                  📤
                </span>
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 flex items-center gap-1"
              >
                Remove{" "}
                <span role="img" aria-label="remove">
                  🗑️
                </span>
              </Button>
            </div>
          </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E5E5E7] rounded-lg w-full h-40 bg-[#fafafa]"
          >
            <Button
              variant="ghost"
              className="text-[#858C95] flex flex-col items-center"
            >
              <span className="text-2xl">⬆️</span>
              Upload
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-[#858C95]"
        >
          &lt; Back
        </Button>
      </div>
    </div>
  );
}
