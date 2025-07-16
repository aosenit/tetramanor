"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BsCloudArrowUp } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useFetchData, useUploadData } from "@/hooks/useApi";
import { axiosInstance } from "@/services/axiosInstance";
import { ErrorState, LoadingState } from "./NoDataStates";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";

interface GalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
}

export default function Gallery() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const unitId = searchParams.get("unitId");
  const userId = searchParams.get("userId");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, error, refetch } = useFetchData(
    unitId && userId
      ? `admin/purchases/property-detail/${unitId}/user/${userId}`
      : null
  );

  const propertyData = data?.data;

  const { mutateAsync: uploadImages, isPending } =
    useUploadData("upload/images");

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });
    formData.append("productId", unitId || "");
    formData.append("productType", "UNIT");

    try {
      await uploadImages(formData);
      refetch();
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.log(error, "gallery upload error");
    }
  };

  const handleDeleteImage = async (id: string) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`upload/images/${id}`);
      refetch();
      toast.success("Image deleted successfully");
    } catch (error) {
      console.log(error, "gallery delete error");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    setImages(propertyData?.gallery || []);
  }, [propertyData]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleReplace = (id: string) => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.dataset.replaceId = id;
  //     fileInputRef.current.click();
  //   }
  // };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading || isPending || isDeleting) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen space-y-8 p-6">
      <div className="border-b flex justify-between items-center flex-wrap py-4 gap-2">
        <div className="py-2">
          <Breadcrumb
            items={[
              { label: "User", href: "/main-admin/customers" },
              {
                label: "View Profile",
                href: `/main-admin/customers/view-profile?id=${userId}`,
              },
              {
                label: "View Property",
                href: `/main-admin/customers/properties-details/?unitId=${unitId}&userId=${userId}`,
              },
              {
                label: `${propertyData?.name || "Property"} Gallery`,
                href: "#",
                isActive: true,
              },
            ]}
          />
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleImageUpload(e.target.files)}
      />

      <div className="grid grid-cols-1 bg-white p-6 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {images?.map((image) => (
          <div key={image.id}>
            <div className="flex justify-between p-2">
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReplace(image.id)}
                className="text-[#323539]"
              >
                Replace <FaCloudUploadAlt className="ml-1" />
              </Button> */}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteImage(image.id)}
                className="text-[#E33B32]"
                disabled={isDeleting}
              >
                Remove
                <RiDeleteBinLine className="" />
              </Button>
            </div>

            <div className="aspect-[4/3] relative">
              <Image
                src={image.imageUrl}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}

        {/* Upload Box Centered if < 6 images */}
        {images?.length < 6 && (
          <div className="w-full col-span-full flex ">
            <button
              onClick={handleUploadClick}
              className="w-[200px] h-[100px] max-w-sm bg-[#E8E7E7] hover:bg-[#E8E7E7] transition-colors cursor-pointer rounded-lg flex items-center justify-center"
            >
              <div className="flex gap-4 items-center justify-center text-[#323539] ">
                <p className="text-sm  font-medium">Upload</p>
                <BsCloudArrowUp className="  text-[#323539]" size={20} />
              </div>
            </button>
          </div>
        )}
      </div>

      <button
        className="text-[#323539] flex items-center gap-2 hover:text-black text-sm mt-6"
        onClick={() => navigate.back()}
      >
        <MdArrowBackIosNew />
        Back
      </button>
    </div>
  );
}
