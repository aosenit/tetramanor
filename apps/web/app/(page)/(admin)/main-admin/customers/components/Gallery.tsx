"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Link, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCloudArrowUp } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import { useSearchParams } from "next/navigation";

interface GalleryImage {
  id: string;
  src: string; // Now string instead of StaticImageData to support uploaded images
  alt: string;
}

export default function Gallery() {
  const searchParams = useSearchParams();
  const propertyName = searchParams.get("property");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemove = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleReplace = (id: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.replaceId = id;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newImageUrl = URL.createObjectURL(file);
    const replaceId = e.target.dataset.replaceId;

    if (replaceId) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === replaceId ? { ...img, src: newImageUrl } : img
        )
      );
      delete e.target.dataset.replaceId;
    } else {
      setImages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          src: newImageUrl,
          alt: file.name,
        },
      ]);
    }
    e.target.value = "";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen space-y-8 p-6">
      <p className="text-xs text-[#4C5560] font-medium">
        Admin /{" "}
        <span className="text-[#116114] text-sm font-medium">
          User / view profile / view property / view {propertyName} gallery
        </span>
      </p>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-1 bg-white p-6 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id}>
            <div className="flex justify-between p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReplace(image.id)}
                className="text-[#323539]"
              >
                Replace <FaCloudUploadAlt className="ml-1" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(image.id)}
                className="text-[#E33B32"
              >
                Remove <RiDeleteBinLine className="ml-1" />
              </Button>
            </div>

            <div className="aspect-[4/3] relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}

        {/* Upload Box Centered if < 6 images */}
        {images.length < 6 && (
          <div className="w-full col-span-full flex justify-center">
            <div
              onClick={handleUploadClick}
              className="aspect-[4/3] w-full max-w-sm bg-[#E8E7E7] hover:bg-[#E8E7E7] transition-colors cursor-pointer rounded-lg flex items-center justify-center"
            >
              <div className="flex gap-4 items-center justify-center text-[#323539]">
                <p className="text-sm  font-medium">Upload</p>
                <BsCloudArrowUp className="  text-[#323539]" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Link href="/main-admin/customers/properties-details">
                <button className="text-[#323539] flex items-center gap-2 hover:text-black text-sm mt-6">
                  <MdArrowBackIosNew />
                  Back
        </button>
      </Link>
    </div>
  );
}
