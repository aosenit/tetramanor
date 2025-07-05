"use client";

import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Save } from "lucide-react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  usePostData,
  useUploadData,
  useFetchData,
  usePutData,
} from "@/hooks/useApi";
import Image from "next/image";
import RichTextEditor from "./RichTextEditor";

interface UploadedImage {
  id: string;
  imageUrl: string;
  name: string;
  publicId: string;
  createdAt: string;
  isPrimary: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImage?: {
    id: string;
    imageUrl: string;
    name: string;
    publicId: string;
    createdAt: string;
  };
  images?: {
    id: string;
    imageUrl: string;
    name: string;
    publicId: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  status?: string;
  author?: string;
}

export default function EditBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");
  const isEditing = !!blogId;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImages, setCoverImages] = useState<UploadedImage[]>([]);
  const [galleryImages, setGalleryImages] = useState<UploadedImage[]>([]);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const { mutateAsync: uploadImages } = useUploadData("upload/images");
  const { mutateAsync: createBlog, isPending: isCreating } =
    usePostData("blogs");
  const { mutateAsync: updateBlog, isPending: isUpdating } = usePutData(
    `blogs/${blogId}`
  );

  // Fetch blog post data if editing
  const { data: blogPostResponse, isLoading: isLoadingBlog } = useFetchData(
    blogId ? `blogs/${blogId}` : null
  );

  const isPending = isCreating || isUpdating;

  // Load existing blog post data when editing
  useEffect(() => {
    if (isEditing && blogPostResponse?.data) {
      const blogPost: BlogPost = blogPostResponse.data;
      setTitle(blogPost.title || "");
      setContent(blogPost.content || "");

      // Handle coverImage (single object)
      const coverImagesData = blogPost.coverImage
        ? [
            {
              id: blogPost.coverImage.id,
              imageUrl: blogPost.coverImage.imageUrl,
              name: blogPost.coverImage.name,
              publicId: blogPost.coverImage.publicId,
              createdAt:
                blogPost.coverImage.createdAt || new Date().toISOString(),
              isPrimary: true,
            },
          ]
        : [];

      // Handle images array (gallery images)
      const galleryImagesData = (blogPost.images || []).map((image) => ({
        id: image.id,
        imageUrl: image.imageUrl,
        name: image.name,
        publicId: image.publicId,
        createdAt: image.createdAt || new Date().toISOString(),
          isPrimary: false,
      }));

      setCoverImages(coverImagesData);
      setGalleryImages(galleryImagesData);
    }
  }, [isEditing, blogPostResponse]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        title: title.trim(),
        content: content.trim(),
        coverImage: coverImages.length > 0 ? coverImages[0].id : null,
        images: galleryImages.map((img) => img.id),
      };

      if (isEditing) {
        await updateBlog(payload);
        toast.success("Blog post updated successfully");
      } else {
        await createBlog(payload);
        toast.success("Blog post created successfully");
      }

      router.push("/main-admin/blog-posts");
    } catch (error) {
      console.error("Error saving blog post:", error);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const payload = {
        title: title.trim() || "Untitled Draft",
        content: content.trim() || "",
        coverImage: coverImages.length > 0 ? coverImages[0].id : null,
        images: galleryImages.map((img) => img.id),
        status: "DRAFT",
      };

      if (isEditing) {
        await updateBlog(payload);
        toast.success("Draft updated successfully");
      } else {
        await createBlog(payload);
        toast.success("Draft saved successfully");
      }

      router.push("/main-admin/blog-posts");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleImageUpload = async (
    files: FileList | null,
    type: "cover" | "gallery"
  ) => {
    if (!files || files.length === 0) return;

    const setIsUploading =
      type === "cover" ? setIsUploadingCover : setIsUploadingGallery;
    const setImages = type === "cover" ? setCoverImages : setGalleryImages;
    const currentImages = type === "cover" ? coverImages : galleryImages;

    setIsUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      const response = await uploadImages(formData);

      if (response.success) {
        const newImages = [...currentImages, ...response.data];
        setImages(newImages);
        toast.success("Images uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (imageId: string, type: "cover" | "gallery") => {
    const setImages = type === "cover" ? setCoverImages : setGalleryImages;
    const currentImages = type === "cover" ? coverImages : galleryImages;

    const newImages = currentImages.filter((img) => img.id !== imageId);
    setImages(newImages);
  };

  // Show loading state while fetching blog post data
  if (isEditing && isLoadingBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading blog post...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Admin</span>
            <span>/</span>
            <span className="text-[#116114] font-medium">Blog Posts</span>
            <span>/</span>
            <span className="text-[#116114] font-medium">
              {isEditing ? "Edit Blog Post" : "Create New"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/main-admin/blog-posts")}
              disabled={isPending}
              className="text-gray-600"
            >
              <MdArrowBackIosNew className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Blog Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border-gray-300 focus:border-[#116114] focus:ring-[#116114]"
                placeholder="Enter a compelling blog title..."
                disabled={isPending}
              />
            </div>

            {/* Rich Text Editor */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Content *
              </Label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your blog content..."
                disabled={isPending}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cover Images */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Cover Images
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#116114] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files, "cover")}
                  className="hidden"
                  id="cover-images"
                  disabled={isUploadingCover || isPending}
                />
                <label htmlFor="cover-images" className="cursor-pointer">
                  {isUploadingCover ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Upload cover images
                        </p>
                        <p className="text-xs text-gray-500">
                          Drag and drop or click to select
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* Display cover images */}
              {coverImages.length > 0 && (
                <div className="mt-4 space-y-2">
                  {coverImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <Image
                        src={image.imageUrl}
                        alt={image.name}
                        width={200}
                        height={120}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        onClick={() => removeImage(image.id, "cover")}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isPending}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Gallery Images
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#116114] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files, "gallery")}
                  className="hidden"
                  id="gallery-images"
                  disabled={isUploadingGallery || isPending}
                />
                <label htmlFor="gallery-images" className="cursor-pointer">
                  {isUploadingGallery ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Upload gallery images
                        </p>
                        <p className="text-xs text-gray-500">
                          Add additional images
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              {/* Display gallery images */}
              {galleryImages.length > 0 && (
                <div className="mt-4 space-y-2">
                  {galleryImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <Image
                        src={image.imageUrl}
                        alt={image.name}
                        width={200}
                        height={120}
                        className="w-full h-20 object-cover rounded border"
                      />
                      <button
                        onClick={() => removeImage(image.id, "gallery")}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isPending}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Publish Button */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="w-full bg-[#116114] hover:bg-[#116114]/90 text-white"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isEditing ? "Updating..." : "Publishing..."}
                    </>
                  ) : isEditing ? (
                    "Update Blog Post"
                  ) : (
                    "Publish Blog Post"
                  )}
                </Button>
                <Button
                  onClick={handleSaveDraft}
                  disabled={isPending}
                  variant="outline"
                  className="w-full"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </>
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  {isEditing
                    ? "Your changes will be saved immediately"
                    : "Your blog post will be published immediately"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
