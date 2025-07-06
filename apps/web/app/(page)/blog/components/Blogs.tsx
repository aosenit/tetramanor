"use client";
import React from "react";
import Image from "next/image";
import { IoIosBriefcase } from "react-icons/io";
import { FaTag } from "react-icons/fa";
import Pagination from "./Pagination";
import Link from "next/link";
import placeholder from "@/assets/placeholder.svg";
import { useFetchData } from "@/hooks/useApi";

const BlogSkeleton = () => (
  <div className="space-y-10">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-full overflow-y-auto rounded-md animate-pulse">
        <div className="w-full h-60 bg-gray-200 rounded" />
        <div className="space-y-4 p-4 bg-[#f1f4f1]">
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
          <div className="flex justify-between items-center mt-4">
            <div className="h-8 w-32 bg-gray-200 rounded" />
            <div className="flex gap-6">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Blogs: React.FC = () => {
  const { data, isLoading } = useFetchData("blogs");
  let blogPosts = [];

  if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
    blogPosts = data.data.map((post: any) => ({
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

  return (
    <div>
      {isLoading ? (
        <BlogSkeleton />
      ) : (
        <div className="space-y-10">
          {blogPosts.map((post) => (
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
      )}
      <div className="flex justify-between items-center mt-10 max-w-md mx-auto">
        <Pagination />
      </div>
    </div>
  );
};

export default Blogs;
