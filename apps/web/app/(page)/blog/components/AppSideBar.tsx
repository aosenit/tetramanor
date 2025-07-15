"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";
import placeholder from "@/assets/placeholder.jpg";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  children?: ReactNode;
}

const AppSideBar: React.FC<Props> = ({ children }) => {
  // Fetch featured blogs
  const { data, isLoading, error } = useFetchData("blogs", { featured: true });
  const blogs = data?.data || [];

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <main className="flex-1">{children}</main>
      <aside className="lg:w-1/3 space-y-4">
        <h1 className="text-xl font-semibold mb-4">Featured Post</h1>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 max-w-md items-start p-3 bg-[#f3f5f3] rounded-md shadow-sm"
              >
                <Skeleton className="w-[100px] h-[60px] rounded-md flex-shrink-0" />
                <div className="flex flex-col gap-2 line-clamp-3 w-full">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((item: any) => (
            <Link
              key={item.id}
              href={{ pathname: "/blog/blog-id", query: { slug: item.id } }}
              className="flex gap-4 max-w-md items-start p-3 bg-[#f3f5f3] rounded-md shadow-sm hover:bg-gray-200 transition"
            >
              <div className="relative w-[100px] h-[60px] flex-shrink-0">
                <Image
                  src={item.coverImage?.imageUrl || placeholder}
                  alt={`Image for ${item.title}`}
                  fill
                  className="rounded-md object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex flex-col gap-2 line-clamp-3">
                <p className="text-sm truncate text-gray-600 ">{item.title}</p>
                <p
                  className="text-sm truncate text-gray-600"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </Link>
          ))
        ) : null}
      </aside>
    </div>
  );
};

export default AppSideBar;
