"use client";
import Image from "next/image";
import tmlogo from "@/assets/tmlogo.png";
import { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { IoImageOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { FaRegFileLines } from "react-icons/fa6";
import { RiFileEditLine } from "react-icons/ri";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDeleteData, usePutData } from "@/hooks/useApi";
import { toast } from "sonner";
import ConfirmationModal from "../../components/ConfirmationModal";

export default function InvestmentModal({
  post,
  open,
  onClose,
  refetch,
}: {
  open: boolean;
  post?: any;
  onClose: () => void;
  refetch?: () => void;
}) {
  const router = useRouter();

  const [contractName, setContractName] = useState("Contract (PDF)");
  const [brochureName, setBrochureName] = useState("Brochure (PDF)");
  const [imageName, setImageName] = useState("Featured Image");
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    action: "delete" | "unpublish";
  }>({ open: false, action: "delete" });

  // Delete investment mutation
  const { mutateAsync: deleteInvestment, isPending: isDeleting } =
    useDeleteData(`investments/${post?.id}`);

  // Unpublish investment mutation
  const { mutateAsync: unpublishInvestment, isPending: isUnpublishing } =
    usePutData(`investments/${post?.id}`);

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

  // Set file names when post data is available
  useEffect(() => {
    if (post) {
      if (post.contractPDF) {
        setContractName("Current Contract (PDF)");
      }
      if (post.brochurePDF) {
        setBrochureName("Current Brochure (PDF)");
      }
      if (post.featuredImage) {
        setImageName("Current Featured Image");
      }
    }
  }, [post]);

  if (!open) return null;

  const handleEdit = () => {
    if (post?.id) {
      router.push(`/main-admin/investments/add-investment?id=${post.id}`);
      onClose();
    } else {
      toast.error("Investment ID not found");
    }
  };

  const handleUnpublish = () => {
    setConfirmationModal({ open: true, action: "unpublish" });
  };

  const handleDelete = () => {
    setConfirmationModal({ open: true, action: "delete" });
  };

  const handleConfirmAction = async () => {
    if (confirmationModal.action === "delete") {
      try {
        const response = await deleteInvestment();
        if (response) {
          toast.success("Investment deleted successfully");
          refetch?.();
          onClose();
          setConfirmationModal({ open: false, action: "delete" });
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    } else if (confirmationModal.action === "unpublish") {
      const updateData = {
        ...post,
        status: "UNPUBLISHED",
      };
      try {
        const response = await unpublishInvestment(updateData);
        if (response) {
          toast.success("Investment unpublished successfully");
          refetch?.();
          onClose();
          setConfirmationModal({ open: false, action: "unpublish" });
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationModal({ open: false, action: "delete" });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "NGN" ? "NGN" : currency === "USD" ? "USD" : "EUR",
    });
    return formatter.format(amount);
  };

  const getInvestmentTypeLabel = (type: string) => {
    switch (type) {
      case "FIXED_ROI":
        return "Fixed ROI";
      case "EQUITY_SHARE":
        return "Equity Share";
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "Draft";
      case "PUBLISHED":
        return "Published";
      case "UNPUBLISHED":
        return "Unpublished";
      default:
        return status;
    }
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

          <div className="space-y-4 text-[#181818] font-medium border-b border-gray-300 p-6">
            <h1>Investment Details</h1>
            <div className="flex items-center justify-between">
              <p>Project Name</p>
              <p>{post?.projectName || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Investment type</p>
              <p>{getInvestmentTypeLabel(post?.investmentType)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Status</p>
              <p>{getStatusLabel(post?.status)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Currency</p>
              <p>{post?.currency || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-4 border-b text-[#181818] font-medium border-gray-300 p-6">
            <div className="flex items-center justify-between">
              <p>Estimated ROI</p>
              <p>{post?.estimatedROI ? `${post.estimatedROI}%` : "N/A"}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Duration</p>
              <p>{post?.duration || "N/A"}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Min Investment</p>
              <p>
                {post?.minAmount && post?.currency
                  ? formatCurrency(post.minAmount, post.currency)
                  : "N/A"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p>Date created</p>
              <p>{formatDate(post?.createdAt)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Offer End date</p>
              <p>{formatDate(post?.offerEndDate)}</p>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <div>
              <p className="text-sm text-[#323539] font-medium mb-2">
                Description
              </p>
              <p className="text-[#4C5560] text-sm">
                {post?.description || "No description available"}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-[#323539] font-medium">Files</p>

              {/* <FileUpload
                label={imageName}
                icon={<IoImageOutline />}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImageName(file.name);
                }}
                onDelete={() => setImageName("Featured Image")}
              /> */}
              <Image
                src={post?.image?.[0].imageUrl}
                alt="Featured Image"
                width={100}
                height={100}
              />
            </div>

            <div className="flex justify-center gap-6 items-center pt-4">
              <Button
                variant="outline"
                onClick={handleEdit}
                disabled={isDeleting || isUnpublishing}
              >
                Edit
              </Button>
              {/* <Button
                variant="outline"
                onClick={handleUnpublish}
                disabled={isDeleting || isUnpublishing}
              >
                Unpublish
              </Button> */}
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
                disabled={isDeleting || isUnpublishing}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-6 bg-white">
            <MdArrowBackIos className="text-[#323539] hover:text-[#323539] text-sm" />
            <button
              onClick={onClose}
              className="text-[#323539] hover:text-[#323539] text-sm"
            >
              Back to Investments
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationModal.open}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmAction}
        action={confirmationModal.action}
        investmentName={post?.projectName}
        isLoading={isDeleting || isUnpublishing}
      />
    </>
  );
}

function FileUpload({
  label,
  icon,
  onChange,
  onDelete,
}: {
  label: string;
  icon: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}) {
  return (
    <div className="w-72 flex rounded-md overflow-hidden">
      <label className="flex items-center w-full bg-[#E5E5E7] px-3 py-2 cursor-pointer">
        <span className="text-gray-700 flex items-center gap-2 text-sm truncate">
          {label} {icon}
        </span>
        <input type="file" className="hidden" onChange={onChange} />
      </label>
      <div className="bg-[#116114] px-3 flex items-center justify-center border-l border-gray-300 gap-2">
        <label className="cursor-pointer">
          <RiFileEditLine className="text-white" />
          <input type="file" className="hidden" onChange={onChange} />
        </label>
        <GoTrash
          className="text-white cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        />
      </div>
    </div>
  );
}
