"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, EyeOff } from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: "delete" | "unpublish";
  investmentName?: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  action,
  investmentName,
  isLoading = false,
}: ConfirmationModalProps) {
  if (!open) return null;

  const isDelete = action === "delete";
  const isUnpublish = action === "unpublish";

  const getModalContent = () => {
    if (isDelete) {
      return {
        title: "Delete Investment",
        description: `Are you sure you want to delete "${investmentName}"? This action cannot be undone and will permanently remove the investment from the system.`,
        icon: <Trash2 className="w-12 h-12 text-red-500" />,
        confirmText: "Delete Investment",
        confirmVariant: "destructive" as const,
        confirmClass: "bg-red-600 hover:bg-red-700 text-white",
      };
    }

    if (isUnpublish) {
      return {
        title: "Unpublish Investment",
        description: `Are you sure you want to unpublish "${investmentName}"? This will hide the investment from public view but can be republished later.`,
        icon: <EyeOff className="w-12 h-12 text-orange-500" />,
        confirmText: "Unpublish Investment",
        confirmVariant: "outline" as const,
        confirmClass: "border-orange-500 text-orange-600 hover:bg-orange-50",
      };
    }

    return {
      title: "Confirm Action",
      description: "Are you sure you want to proceed with this action?",
      icon: <AlertTriangle className="w-12 h-12 text-gray-500" />,
      confirmText: "Confirm",
      confirmVariant: "default" as const,
      confirmClass: "",
    };
  };

  const content = getModalContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Icon and Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-4">{content.icon}</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {content.title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant={content.confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 ${content.confirmClass}`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                {isDelete ? "Deleting..." : "Unpublishing..."}
              </>
            ) : (
              content.confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
