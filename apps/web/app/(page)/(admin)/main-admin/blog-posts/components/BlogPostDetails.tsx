"use client";
import { Button } from "@/components/ui/button";
import four from "@/assets/admin/home/four.webp";
import Image from "next/image";
import logo from "@/assets/home/logo.webp";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Plus, Loader2 } from "lucide-react";
import { RiEdit2Line } from "react-icons/ri";
import { toast } from "sonner";
import { usePutData, useDeleteData } from "@/hooks/useApi";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImages: string[];
  galleryImages: string[];
  createdAt: string;
  updatedAt: string;
  status?: string;
  author?: string;
}

export default function BlogPostDetails({
  post,
  open,
  onClose,
  onUpdate,
}: {
  open: boolean;
  post?: BlogPost;
  onClose: () => void;
  onUpdate?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Status");
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: updateBlog } = usePutData(`blogs/${post?.id}`);
  const { mutateAsync: deleteBlog } = useDeleteData(`blogs/${post?.id}`);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open || !post) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    try {
      if (newStatus === "Delete") {
        const confirmed = window.confirm(
          "Are you sure you want to delete this blog post? This action cannot be undone."
        );
        if (!confirmed) {
          setIsLoading(false);
          return;
        }

        await deleteBlog();
        toast.success("Blog post deleted successfully");
        onUpdate?.();
        onClose();
      } else {
        await updateBlog({ status: newStatus.toUpperCase() });
        toast.success(`Blog post ${newStatus.toLowerCase()} successfully`);
        setSelected(newStatus);
        onUpdate?.();
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error("Failed to update blog post");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    if (value === "Status") return;
    handleStatusChange(value);
  };

  // Get all images (cover + gallery)
  const allImages = [
    ...(post.coverImages || []),
    ...(post.galleryImages || []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-5xl overflow-hidden bg-white">
        <header className="bg-[#323539] text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="flex items-center border-b border-gray-300 p-6 justify-between">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <span>Admin</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              View blog post detail
            </span>
          </div>
          <Link href="/main-admin/blog-posts/edit-blog">
            <Button className="bg-white border border-[#E5E5E7] text-[#323539] flex items-center gap-2 text-sm hover:bg-white">
              <Plus className="" />
              Add New post
            </Button>
          </Link>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex items-center">
                <p className="text-[#979AA0]">Status</p>
                <p className="text-[#000000]">;</p>
                <p className="text-[#116114]">{post.status || "Published"}</p>
              </div>
              <div className="flex items-center">
                <p className="text-[#979AA0]">Date posted</p>
                <p className="text-[#000000]">;</p>
                <p className="text-[#116114]">{formatDate(post.createdAt)}</p>
              </div>
              <div className="flex items-center">
                <p className="text-[#979AA0]">Author</p>
                <p className="text-[#000000]">;</p>
                <p className="text-[#116114]">{post.author || "Admin"}</p>
                <p className="text-[#858C95]"> (Admin)</p>
              </div>
            </div>
            <div className="relative inline-block w-32 text-sm font-medium text-[#323539]">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => !isLoading && setIsOpen(!isOpen)}
              >
                <span>{selected}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </div>
              {isOpen && (
                <div className="absolute mt-1 z-10 w-full rounded shadow text-[#323539] bg-white">
                  {["Unpublished", "Delete"].map((item) => (
                    <div
                      key={item}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      onClick={() => handleSelect(item)}
                    >
                      {isLoading && selected === item && (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-[#858C95] font-medium">
            <div>
              <p>Blog Images</p>
            </div>
            <div className="flex items-center gap-4">
              <p>{post.status || "Published"}</p>
              <Link href={`/main-admin/blog-posts/edit-blog?id=${post.id}`}>
                <p className="flex items-center gap-1 cursor-pointer">
                  Edit <RiEdit2Line />
                </p>
              </Link>
            </div>
          </div>
          <div className="pb-8 border-b border-gray-300 flex flex-col md:flex-row gap-10">
            {allImages.length > 0
              ? allImages
                  .slice(0, 4)
                  .map((imageUrl, index) => (
                    <Image
                      key={index}
                      src={imageUrl || four}
                      alt={`Blog image ${index + 1}`}
                      width={200}
                      height={150}
                      className="md:w-[200px] w-full"
                    />
                  ))
              : // Show placeholder images if no images
                Array.from({ length: 4 }).map((_, index) => (
                  <Image
                    key={index}
                    src={four}
                    alt="Placeholder image"
                    width={200}
                    height={150}
                    className="md:w-[200px] w-full"
                  />
                ))}
          </div>
        </div>

        <div className="text-[#323539] leading-relaxed p-6">
          <h3 className="text-[#858C95] text-sm font-medium">Blog title</h3>
          <p className="py-2 text-[#116114]">{post.title}</p>
          <div
            className="text-sm text-[#323539] leading-[20px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <div className="flex justify-center items-center gap-4 p-6 bg-white">
          <button
            onClick={onClose}
            className="text-[#323539] hover:text-[#323539] text-sm"
          >
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
