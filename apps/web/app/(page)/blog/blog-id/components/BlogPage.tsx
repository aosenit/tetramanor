"use client";
import React from "react";
import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { useFetchData } from "@/hooks/useApi";
import { MdKeyboardArrowLeft } from "react-icons/md";

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
    };
  }

  return (
    <div>
      {isLoading ? (
        <BlogSkeleton />
      ) : (
        <div className="space-y-10">
          <div className="h-full overflow-y-auto rounded-md">
            <Image
              src={blog?.image}
              alt={blog?.title}
              className="w-full object-cover"
              width={1000}
              height={1000}
            />
            <div className="space-y-4 py-12">
              <h5 className="text-xl font-semibold">{blog?.title}</h5>
              <div
                className="text-black text-justify leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog?.content }}
              />
            </div>
          </div>
        </div>
      )}
      {/* go back to the previous page */}
      <button
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => router.back()}
      >
        <MdKeyboardArrowLeft />
        Back
      </button>
      {/* <div className="">
        <Pagination />
      </div> */}
    </div>
  );
}
