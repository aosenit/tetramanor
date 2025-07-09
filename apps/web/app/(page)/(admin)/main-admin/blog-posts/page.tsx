"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronDown, Loader2 } from "lucide-react";
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
import placeholder from "@/assets/placeholder.svg";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImages: string[];
  galleryImages: string[];
  createdAt: string;
  updatedAt: string;
  status: string;
  images: {
    id: string;
    imageUrl: string;
    name: string;
    publicId: string;
    createdAt: string;
  }[];
}

export default function BlogPostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Get current URL parameters
  const currentSearch = searchParams.get("search") || "";
  const currentPageParam = parseInt(searchParams.get("page") || "1");
  const currentLimit = parseInt(searchParams.get("limit") || "10");
  const currentStatus = searchParams.get("status") || "";
  const currentAuthor = searchParams.get("author") || "";
  const currentDateFilter = searchParams.get("dateFilter") || "";

  // Build query string for API
  const buildQueryString = () => {
    const params = new URLSearchParams({
      page: currentPageParam.toString(),
      limit: currentLimit.toString(),
    });

    if (currentSearch) params.append("search", currentSearch);
    if (currentStatus && currentStatus !== "all")
      params.append("status", currentStatus.toUpperCase());
    if (currentAuthor && currentAuthor !== "all")
      params.append("author", currentAuthor);
    if (currentDateFilter && currentDateFilter !== "all")
      params.append("dateFilter", currentDateFilter);

    return params.toString();
  };

  // Fetch blog posts data
  const {
    data: blogPostsResponse,
    isLoading,
    refetch,
  } = useFetchData(`blogs/all?${buildQueryString()}`);

  // New API structure
  const response = blogPostsResponse?.data || {
    items: [],
    page: 1,
    total: 0,
    limit: 10,
  };

  const blogPosts: BlogPost[] = response.items || [];
  const totalItems = response.total || 0;
  const currentPage = currentPageParam;
  const totalPages = Math.ceil(totalItems / currentLimit);

  // Update URL parameters
  const updateURLParams = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.replace(`?${newSearchParams.toString()}`);
  };

  // Handle search
  const handleSearch = (value: string) => {
    updateURLParams({ search: value, page: "1" });
  };

  // Handle status filter
  const handleStatusChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    updateURLParams({ status: filterValue, page: "1" });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    updateURLParams({ page: page.toString() });
  };

  // Clear all filters
  const clearAllFilters = () => {
    router.replace("/main-admin/blog-posts");
  };

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

  // Get status display name
  const getStatusDisplayName = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PUBLISHED":
        return "Published";
      case "DRAFT":
        return "Draft";
      case "UNPUBLISHED":
        return "Unpublished";
      default:
        return "Draft";
    }
  };

  // Refetch data when URL parameters change
  useEffect(() => {
    refetch();
  }, [
    currentPageParam,
    currentLimit,
    currentSearch,
    currentStatus,
    currentAuthor,
    currentDateFilter,
    refetch,
  ]);

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
            value={currentSearch}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap py-4 mt-2 gap-4">
          <Button
            variant="outline"
            className="bg-white text-[#858C95]"
            onClick={clearAllFilters}
          >
            All
          </Button>

          <Select
            value={currentStatus || "all"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-32 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="unpublished">Unpublished</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="link"
            className="text-[#858C95] text-sm p-0"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <h2 className="text-[#116114] font-medium">
            Blog posts ({totalItems})
          </h2>
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-[#858C95]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogPosts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-[#858C95]">
              {currentSearch ||
              currentStatus ||
              currentAuthor ||
              currentDateFilter
                ? "No blog posts found matching your filters"
                : "No blog posts available"}
            </div>
          ) : (
            blogPosts?.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-[#F4F4F4]">
                <div className="relative">
                  <Image
                    src={post.images?.[0]?.imageUrl || placeholder}
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
                    <p className="text-sm">
                      {getStatusDisplayName(post.status)}
                    </p>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={
                    currentPage === pageNum ? "bg-[#116114] text-white" : ""
                  }
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

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
