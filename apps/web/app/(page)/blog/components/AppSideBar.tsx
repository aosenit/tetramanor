"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";
import placeholder from "@/assets/placeholder.jpg";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import DOMPurify from "dompurify"; // <-- sanitize HTML
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}
const BlogSkeletonCard = () => (
  <div className="flex gap-4 max-w-md items-start p-3 bg-[#f3f5f3] rounded-md shadow-sm">
    <Skeleton className="w-[100px] h-[60px] rounded-md flex-shrink-0" />
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="h-4 w-1/2 mb-2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  </div>
);

const AppSideBar: React.FC<Props> = ({ children }) => {
  const { data, isLoading, error, refetch } = useFetchData("blogs", {
    featured: true,
  });
  const blogs = data?.data || [];

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <main className="flex-1">{children}</main>

      <aside className="lg:w-1/3 space-y-4">
        <h1 className="text-xl font-semibold mb-4">Featured Post</h1>

        {error ? (
          <div className="text-center space-y-3">
            <p className="text-red-500 text-sm">
              Failed to load featured posts.
            </p>
            <Button onClick={() => refetch()} variant="default" size="sm">
              Try Again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <BlogSkeletonCard key={i} />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((item: any) => (
            <Link
              key={item.id}
              href={{ pathname: "/blog/blog-id", query: { slug: item.id } }}
              className="flex gap-4 max-w-md items-start p-3 bg-[#f3f5f3] rounded-md shadow-sm hover:bg-gray-200 transition"
            >
              {/* ✅ Blog image */}
              <div className="relative w-[100px] h-[60px] flex-shrink-0">
                <Image
                  src={item.coverImage?.imageUrl || placeholder}
                  alt={`Image for ${item.title}`}
                  fill
                  className="rounded-md object-cover"
                  sizes="80px"
                />
              </div>

              {/* ✅ Safe content */}
              <div className="flex flex-col gap-2 line-clamp-3">
                <p className="text-sm truncate text-gray-600">{item.title}</p>
                <p
                  className="text-sm truncate text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.content),
                  }}
                />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No featured posts found.</p>
        )}
      </aside>
    </div>
  );
};

export default AppSideBar;
