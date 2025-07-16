"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@chakra-ui/react";
import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdArrowBackIosNew } from "react-icons/md";
import { PiFunnel } from "react-icons/pi";
import { useRouter, useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { useQueryClient } from "@tanstack/react-query";
import { purchasePropertyData } from "./PropertiesDetails";
import { useUploadData, useFetchData } from "@/hooks/useApi";
import { LoadingState, ErrorState, EmptyState } from "./NoDataStates";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { axiosInstance } from "@/services/axiosInstance";

interface Document {
  id: string;
  name: string;
  docType: string;
  imageUrl: string;
  createdAt: string;
  purchasedUnitId: string;
  publicId: string;
}

export default function Documents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unitId = searchParams.get("unitId");
  const userId = searchParams.get("userId");
  const propertyData = useAtomValue(purchasePropertyData);
  const { mutateAsync: uploadDocuments, isPending } =
    useUploadData("upload/document");

  const { data, isLoading, error, refetch } = useFetchData(
    unitId && userId
      ? `admin/purchases/property-detail/${unitId}/user/${userId}`
      : null
  );

  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDocumentUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("document", file);
    });
    formData.append("productId", unitId || "");
    formData.append("productType", "UNIT");

    try {
      await uploadDocuments(formData);
      refetch();
      toast.success("Documents uploaded successfully");
    } catch (error) {
      console.log(error, "document upload error");
    }
  };

  const handleRemove = async (id: string) => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`upload/document/${id}`);
      refetch();
      toast.success("Document removed successfully");
    } catch (error) {
      console.log(error, "document delete error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Update documents when data changes
  useEffect(() => {
    if (data?.data?.documents) {
      setDocuments(data.data.documents);
    }
  }, [data]);

  // Filter documents based on search
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.docType.toLowerCase().includes(search.toLowerCase())
  );

  // Loading state
  if (isLoading || isPending || isDeleting) {
    return <LoadingState message="Loading documents..." />;
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        message="Failed to load documents"
        description="An error occurred while loading documents"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen space-y-8 p-6">
      <div className="border-b flex justify-between items-center flex-wrap py-4 gap-2">
        <div className="py-2">
          <Breadcrumb
            items={[
              { label: "User", href: "/main-admin/customers" },
              {
                label: "View Profile",
                href: `/main-admin/customers/view-profile?id=${userId}`,
              },
              {
                label: "View Property",
                href: `/main-admin/customers/properties-details/?unitId=${unitId}&userId=${userId}`,
              },
              {
                label: `${propertyData?.name || "Property"} Documents`,
                href: "#",
                isActive: true,
              },
            ]}
          />
        </div>
      </div>

      <div className="flex justify-between items-start flex-wrap">
        <h2 className="text-lg font-medium text-gray-800">Documents</h2>
        <Button
          rightIcon={<FaCloudUploadAlt />}
          variant={"outline"}
          size="sm"
          className="text-white text-sm"
          onClick={handleUploadClick}
          disabled={isPending}
        >
          {isPending ? "Uploading..." : "Upload documents"}
        </Button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleDocumentUpload(e.target.files)}
      />

      <div className="overflow-hidden">
        {/* Table Header */}
        <div className="bg-white space-y-4 p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-800">
                View documents
              </div>
              <p className="text-[#4D4E53] text-xs">
                Documents of customer's properties.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* <span className="text-sm flex items-center gap-1 text-[#252525]">
                <PiFunnel />
                Filter
              </span> */}
              <Input
                type="text"
                placeholder="Search..."
                className="w-48 h-9 rounded-md text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Empty state */}
          {filteredDocuments.length === 0 && !isLoading && (
            <EmptyState
              message="No documents found"
              description={
                search
                  ? "No documents match your search criteria."
                  : "No documents have been uploaded yet."
              }
              actionText="Upload Documents"
              onAction={handleUploadClick}
              variant="card"
            />
          )}

          {/* Table Body */}
          {filteredDocuments.length > 0 && (
            <>
              <div className="grid grid-cols-4 px-4 py-4 font-medium mt-6 text-xs text-[#847A8D] border rounded-md bg-[#F5F5F5]">
                <div>Document name</div>
                <div>Issued Date</div>
                <div>Type</div>
                {/* <div>Size</div> */}
                <div>Action</div>
              </div>

              {filteredDocuments.map((doc, index) => (
                <div
                  key={doc.id}
                  className={`grid grid-cols-4 px-4 py-4 text-xs text-[#2E2E2E] border-b ${
                    index % 2 === 1 ? "bg-[#FAFAFA]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{doc.name}</span>
                  </div>
                  <div>{new Date(doc.createdAt).toLocaleDateString()}</div>
                  <div>{doc.docType}</div>
                  {/* <div className="text-[#116114]">{doc.size}</div> */}
                  <div>
                    <div className="flex gap-2">
                      <a
                        href={doc.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                      >
                        View
                      </a>
                      {/* <button
                        onClick={() => handleRemove(doc.id)}
                        className="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Removing..." : "Remove"}
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Back Button */}
      <button
        className="text-[#323539] flex items-center gap-2 hover:text-black text-sm mt-6"
        onClick={() => router.back()}
      >
        <MdArrowBackIosNew />
        Back
      </button>
    </div>
  );
}
