import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type WhyInvestSectionProps = {
  formData: any;
  advantageDialogOpen: boolean;
  editingAdvantageIndex: number | null;
  advantageDraft: { title: string; description: string };
  setAdvantageDialogOpen: (v: boolean) => void;
  setAdvantageDraft: (d: { title: string; description: string }) => void;
  openAddAdvantageDialog: () => void;
  openEditAdvantageDialog: (idx: number) => void;
  handleAdvantageDialogSave: () => void;
  handleAdvantageDialogCancel: () => void;
  handleRemoveAdvantage: (idx: number) => void;
  errors: any;
};

export default function WhyInvestSection({
  formData,
  advantageDialogOpen,
  editingAdvantageIndex,
  advantageDraft,
  setAdvantageDialogOpen,
  setAdvantageDraft,
  openAddAdvantageDialog,
  openEditAdvantageDialog,
  handleAdvantageDialogSave,
  handleAdvantageDialogCancel,
  handleRemoveAdvantage,
  errors,
}: WhyInvestSectionProps) {
  console.log(formData);
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-base font-medium text-[#116114]">Why Invest</h3>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Button
            type="button"
            onClick={openAddAdvantageDialog}
            className="bg-[#116114] text-white w-fit"
          >
            Add Why Invest
          </Button>
        </div>
        {/* List of advantages as cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData?.whyInvest?.map((adv: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-lg border bg-[#F8F9FA] cursor-pointer hover:shadow-md transition"
              onClick={() => openEditAdvantageDialog(idx)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#116114]">
                  {adv.title}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveAdvantage(idx);
                  }}
                >
                  Remove
                </Button>
              </div>
              <p className="text-sm text-[#323539]">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Dialog for add/edit advantage */}
      <Dialog open={advantageDialogOpen} onOpenChange={setAdvantageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAdvantageIndex !== null
                ? "Edit Why Invest"
                : "Add Why Invest"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={advantageDraft.title}
              onChange={(e) =>
                setAdvantageDraft({ ...advantageDraft, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={advantageDraft.description}
              onChange={(e) =>
                setAdvantageDraft({
                  ...advantageDraft,
                  description: e.target.value,
                })
              }
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleAdvantageDialogCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#116114] text-white"
              onClick={handleAdvantageDialogSave}
            >
              {editingAdvantageIndex !== null ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
