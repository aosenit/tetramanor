"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import four from "@/assets/admin/home/four.webp";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import BlogPostDetails from "./components/BlogPostDetails";
import { useState, useEffect } from "react";
import { useFetchData } from "@/hooks/useApi";
import Loader from "@/components/Loader";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImages: string[];
  galleryImages: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Fetch blog posts data
  const { data: blogPostsResponse, isLoading, refetch } = useFetchData("blogs");

  const blogPosts: BlogPost[] = blogPostsResponse?.data || [];

  // Filter blog posts based on search
  const filteredBlogPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewClick = (post: BlogPost) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  // Refetch data when component mounts or when returning from create/edit
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen space-y-8">
      <div className="">
        <div className="flex items-center border-b border-gray-300 pb-4 justify-between">
          <div>
            <div className="flex items-center space-x-1  text-[#858C95]">
              <span>Admin</span>
              <span className="text-xl text-[#858C95]">/</span>
              <span className="font-medium text-xl text-[#116114]">
                Blog Posts
              </span>
            </div>
            <p className="mt-2 text-[#444444] text-sm">
              Manage all articles and updates shared with the public
            </p>
          </div>
          <Link href="/main-admin/blog-posts/edit-blog">
            <Button className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800">
              <Plus className="" />
              Add New post
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858C95] w-4 h-4" />
          <Input
            placeholder="Search by blog title"
            className="pl-10 bg-[#E5E5E7] border-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex py-4 mt-2 gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={authorFilter} onValueChange={setAuthorFilter}>
            <SelectTrigger className="w-48 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="Filter by Author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Authors</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-48 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBlogPosts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#858C95]">
              {searchTerm
                ? "No blog posts found matching your search"
                : "No blog posts available"}
            </div>
          ) : (
            filteredBlogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-[#F4F4F4]">
                <div className="relative">
                  <Image
                    src={post.coverImages?.[0] || four}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-[#000000] text-sm mb-2">
                    {post.title}
                  </h3>
                  <div className="flex justify-between items-center text-[#000000] mb-3">
                    <span className="text-sm">Admin</span>
                    <span className="text-xs">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between text-black items-center">
                    <p className="text-sm">Published</p>
                    <Button
                      onClick={() => handleViewClick(post)}
                      className="text-[#858C95] hover:text-[#858C95] flex items-center gap-1"
                      variant="outline"
                      size="sm"
                    >
                      View
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {selectedPost && (
          <BlogPostDetails
            open={openModal}
            onClose={() => setOpenModal(false)}
            post={selectedPost}
            onUpdate={refetch}
          />
        )}
      </div>
    </div>
  );
}
