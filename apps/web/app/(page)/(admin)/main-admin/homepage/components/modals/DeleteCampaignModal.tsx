"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { useDeleteData } from "@/hooks/useApi";
import { toast } from "sonner";

interface DeleteCampaignModalProps {
  open: boolean;
  onClose: () => void;
  campaignId?: string;
  campaignTitle?: string;
  onSuccess: () => void;
}

export default function DeleteCampaignModal({
  open,
  onClose,
  campaignId,
  campaignTitle,
  onSuccess,
}: DeleteCampaignModalProps) {
  const { mutateAsync: deleteCampaign, isPending: isDeletingCampaign } =
    useDeleteData(campaignId ? `campaigns/${campaignId}` : null);

  const handleDelete = async () => {
    if (!campaignId) return;

    try {
      await deleteCampaign();
      toast.success("Campaign deleted successfully");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Failed to delete campaign:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Campaign
              </h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete this campaign?
            </p>
            {campaignTitle && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm font-medium text-gray-900">
                  {campaignTitle}
                </p>
              </div>
            )}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">Warning</p>
                <p className="text-sm text-red-700">
                  This will permanently delete the campaign and all associated
                  data. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between  gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeletingCampaign}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeletingCampaign}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeletingCampaign ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Campaign
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
