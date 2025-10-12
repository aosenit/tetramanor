"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosBriefcase } from "react-icons/io";
import { FaTag, FaNewspaper } from "react-icons/fa";
import Pagination from "./Pagination";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";
import { useFetchData } from "@/hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const POSTS_PER_PAGE = 4;

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  tag: string;
}

interface ApiBlogPost {
  id: string;
  title: string;
  content: string;
  coverImage?: {
    imageUrl: string;
  };
  images?: Array<{
    imageUrl: string;
  }>;
  createdAt: string;
  tag?: string;
}

const Blogs: React.FC = () => {
  const { data, isLoading, error, refetch } = useFetchData("blogs");
  const [currentPage, setCurrentPage] = useState(1);

  let blogPosts: BlogPost[] = [];

  if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    blogPosts = data.data.map((post: ApiBlogPost) => ({
      id: post.id,
      slug: post.id,
      title: post.title,
      description: post.content?.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
      image:
        post.coverImage?.imageUrl || post.images?.[0]?.imageUrl || placeholder,
      date: new Date(post.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      tag: post.tag || "Blog",
    }));
  }

  // Calculate pagination
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="space-y-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-full overflow-y-auto rounded-md">
            <Skeleton className="w-full h-60 mb-4 rounded" />
            <div className="space-y-4 p-4 bg-[#f1f4f1]">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm border-2 border-red-100">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <FaNewspaper className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Failed to Load Blog Posts
        </h3>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We couldn&apos;t load the blog posts right now. Please check your
          internet connection and try again.
        </p>
        <Button
          onClick={() => refetch()}
          className="bg-[#116114] hover:bg-[#0d4d10] text-white"
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Empty state when no blogs are available
  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg shadow-sm">
        <div className="w-24 h-24 bg-[#E8F5E8] rounded-full flex items-center justify-center mb-6">
          <FaNewspaper className="w-12 h-12 text-[#116114]" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No Blog Posts Available
        </h3>
        <p className="text-gray-600 text-center max-w-md mb-6">
          We don&apos;t have any blog posts published at the moment. Check back
          soon for insights, updates, and articles about real estate and
          property investment.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-[#116114] hover:bg-[#0d4d10] text-white"
        >
          Refresh Page
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="space-y-10">
        {currentPosts.map((post: BlogPost) => (
          <div key={post.id} className="h-full overflow-y-auto  rounded-md">
            <Image
              src={post.image}
              alt={post.title}
              className="w-full object-cover"
              width={1000}
              height={1000}
            />
            <div className="space-y-4 p-4 bg-[#f1f4f1]">
              <h5 className="text-xl font-semibold">{post.title}</h5>
              <p className="text-black text-justify leading-relaxed">
                {post.description}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  href={{
                    pathname: `/blog/blog-id`,
                    query: { slug: post.slug },
                  }}
                  className="px-6 py-2 bg-[#116114] text-sm text-white"
                >
                  Continue Reading
                </Link>
                <div className="flex gap-6">
                  <p className="text-sm text-black flex items-center gap-2">
                    <IoIosBriefcase className="text-[#eb8a43]" />
                    {post.date}
                  </p>
                  <p className="text-sm text-black flex items-center gap-2">
                    <FaTag className="text-[#eb8a43]" />
                    {post.tag}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-10 max-w-md mx-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Blogs;
