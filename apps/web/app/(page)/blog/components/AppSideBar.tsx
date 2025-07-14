"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";
import placeholder from "@/assets/placeholder.jpg";

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
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Failed to load featured posts.</div>
        ) : blogs.length > 0 ? (
          blogs.map((item: any) => (
            <a
              key={item.id}
              href={`/blog/${item.id}`}
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
            </a>
          ))
        ) : (
          <div className="text-gray-500">No featured posts found.</div>
        )}
      </aside>
    </div>
  );
};

export default AppSideBar;
