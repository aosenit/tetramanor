"use client";
import React from "react";
import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Pagination from "./Pagination";

const BlogSkeleton = () => (
  <div className="space-y-10">
    <div className="h-full overflow-y-auto rounded-md animate-pulse">
      <div className="w-full h-60 bg-gray-200 rounded" />
      <div className="space-y-4 py-12">
        <div className="h-6 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export default function SingleBlog() {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("slug");
  const { data, isLoading } = useFetchData(blogId ? `blogs/${blogId}` : null);
  let blog: any = {};
  const router = useRouter();
  if (data?.data) {
    blog = {
      id: data.data.id,
      title: data.data.title,
      content: data.data.content,
      image:
        data.data.coverImage?.imageUrl ||
        data.data.images?.[0]?.imageUrl ||
        placeholder,
      date: new Date(data.data.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      images: (data.data.images || []).filter(
        (img: any) => img.imageUrl !== data.data.coverImage?.imageUrl
      ),
    };
  }

  return (
    <div>
      {isLoading ? (
        <BlogSkeleton />
      ) : blog.images && blog.images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {blog.images.map((img: any) => (
            <Image
              key={img.id}
              src={img.imageUrl}
              alt={img.name || "Blog image"}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          No images uploaded for this blog.
        </div>
      )}
      {/* go back to the previous page */}
      <button
        className="flex items-center gap-2 mt-4 px-3 py-2 bg-white border border-gray-100 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => router.back()}
      >
        <MdKeyboardArrowLeft />
        Back
      </button>
      {/* <div className="mt-6">
        <Pagination />
      </div> */}
    </div>
  );
}
