"use client";
import { Button } from "@/components/ui/button";
import four from "@/assets/admin/home/four.webp";
import Image from "next/image";
import tmlogo from "@/assets/tmlogo.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Loader2,
  Trash2,
  Star,
  AlertTriangle,
} from "lucide-react";
import { RiEdit2Line } from "react-icons/ri";
import { toast } from "sonner";
import { usePutData, useDeleteData } from "@/hooks/useApi";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured?: boolean;
  coverImages: string[];
  galleryImages: string[];
  createdAt: string;
  updatedAt: string;
  status?: string;
  author?: string;
  images?: {
    id: string;
    imageUrl: string;
    name: string;
    publicId: string;
    createdAt: string;
  }[];
}

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  blogTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  blogTitle: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Delete Blog Post
            </h3>
            <p className="text-sm text-gray-500">
              This action cannot be undone
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-medium">"{blogTitle}"</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This will permanently remove the blog post and all associated data.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
            className="min-w-[80px]"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="min-w-[80px]"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      await updateBlog({ status: newStatus.toUpperCase() });
      toast.success(`Blog post ${newStatus.toLowerCase()} successfully`);
      setSelected(newStatus);
      onUpdate?.();
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error("Failed to update blog post");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteBlog();
      toast.success("Blog post deleted successfully");
      onUpdate?.();
      onClose();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleSelect = (value: string) => {
    if (value === "Status") return;
    handleStatusChange(value);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
        <div className="w-full max-w-5xl overflow-hidden bg-white">
          <header className="bg-[#323539] text-white px-6 py-4">
            <div className="flex justify-center items-center gap-4">
              <Image src={tmlogo} alt="Logo" width={40} height={40} />
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
            <div className="flex items-center gap-3">
              <Link href="/main-admin/blog-posts/edit-blog">
                <Button className="bg-white border border-[#E5E5E7] text-[#323539] flex items-center gap-2 text-sm hover:bg-white">
                  <Plus className="" />
                  Add New post
                </Button>
              </Link>
              <Button
                onClick={handleDeleteClick}
                disabled={isDeleting}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex items-center">
                  {/* <p className="text-[#979AA0]">Featured</p> */}
                  {/* <p className="text-[#000000]">;</p> */}
                  {/* <div className="flex items-center gap-1">
                    {post.featured ? (
                      <>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-[#116114]">Yes</span>
                      </>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </div> */}
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
              {/* <div className="relative inline-block w-32 text-sm font-medium text-[#323539]">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => !isLoading && setIsOpen(!isOpen)}
                >
                  <span>Status</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
                {isOpen && (
                  <div className="absolute mt-1 z-10 w-full rounded shadow text-[#323539] bg-white">
                    {["Published", "Draft"].map((item) => (
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
              </div> */}
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-[#858C95] font-medium">
              <div>
                <p>Blog Images</p>
              </div>
              <div className="flex items-center gap-4">
                {/* <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.status === "PUBLISHED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {post.status}
                </span> */}
                <Link href={`/main-admin/blog-posts/edit-blog?id=${post.id}`}>
                  <p className="flex items-center gap-1 cursor-pointer">
                    Edit <RiEdit2Line />
                  </p>
                </Link>
              </div>
            </div>
            <div className="pb-8 border-b border-gray-300 flex flex-col md:flex-row gap-10">
              {post?.images?.length > 0 ? (
                post?.images
                  .slice(0, 4)
                  .map((image, index) => (
                    <Image
                      key={index}
                      src={image?.imageUrl || four}
                      alt={`Blog image ${index + 1}`}
                      width={200}
                      height={150}
                      className="md:w-[200px] w-full h-[150px] object-cover"
                    />
                  ))
              ) : (
                // Show placeholder images if no images
                //  show empty state
                <div className="flex justify-center items-center h-full">
                  <p className="text-[#858C95]">No images available</p>
                </div>
              )}
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        blogTitle={post.title}
      />
    </>
  );
}
