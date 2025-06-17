"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import four from "@/assets/admin/home/four.webp"
import { Input } from "@/components/ui/input"
import { Search, Plus, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import CampaignModal from "./components/BlogPostDetails"
import { useState } from "react"

const blogPosts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: "Inside tm gardens",
  author: "John ade",
  date: "April 20 2025",
  status: "Published",
  image: four,
}))

export default function BlogPostsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleViewClick = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };
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
          <Link href="/main-admin/properties/add-properties">
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
          />
        </div>

        {/* Filters */}
        <div className="flex py-4 mt-2 gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-32 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-48 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-48 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="Filter by Author" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-ade">John ade</SelectItem>
              <SelectItem value="jane-doe">Jane Doe</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-48 text-[#858C95] hover:text-[#858C95]">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="this-week">This week</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-[#F4F4F4]">
                <div className="relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
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
                    <span className="text-sm">{post.author}</span>
                    <span className="text-xs">{post.date}</span>
                  </div>
                  <div className="flex justify-between text-black items-center">
                    <p className="text-sm">{post.status}</p>
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
            ))}
          </div>

          {selectedPost && (
            <CampaignModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              post={selectedPost} // you'll use this inside modal
            />
          )}
        </>
      </div>
    </div>
  );
}
