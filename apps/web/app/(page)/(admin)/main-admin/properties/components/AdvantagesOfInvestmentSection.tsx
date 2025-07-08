import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

type AdvantagesOfInvestmentSectionProps = {
  formData: any;
  advantageInvestmentDialogOpen: boolean;
  editingAdvantageInvestmentIndex: number | null;
  advantageInvestmentDraft: { title: string; description: string };
  setAdvantageInvestmentDialogOpen: (v: boolean) => void;
  setAdvantageInvestmentDraft: (d: {
    title: string;
    description: string;
  }) => void;
  openAddAdvantageInvestmentDialog: () => void;
  openEditAdvantageInvestmentDialog: (idx: number) => void;
  handleAdvantageInvestmentDialogSave: () => void;
  handleAdvantageInvestmentDialogCancel: () => void;
  handleRemoveAdvantageInvestment: (idx: number) => void;
  errors: any;
};

export default function AdvantagesOfInvestmentSection({
  formData,
  advantageInvestmentDialogOpen,
  editingAdvantageInvestmentIndex,
  advantageInvestmentDraft,
  setAdvantageInvestmentDialogOpen,
  setAdvantageInvestmentDraft,
  openAddAdvantageInvestmentDialog,
  openEditAdvantageInvestmentDialog,
  handleAdvantageInvestmentDialogSave,
  handleAdvantageInvestmentDialogCancel,
  handleRemoveAdvantageInvestment,
  errors,
}: AdvantagesOfInvestmentSectionProps) {
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-base font-medium text-[#116114]">
        Advantages of investment
      </h3>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Button
            type="button"
            onClick={openAddAdvantageInvestmentDialog}
            className="bg-[#116114] text-white w-fit"
          >
            Add Advantage
          </Button>
        </div>
        {/* List of advantages as cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.investmentAdvantages.map((adv: any, idx: number) => (
            <div
              key={idx}
              className="p-4 rounded-lg border bg-[#F8F9FA] cursor-pointer hover:shadow-md transition"
              onClick={() => openEditAdvantageInvestmentDialog(idx)}
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
                    handleRemoveAdvantageInvestment(idx);
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
      <Dialog
        open={advantageInvestmentDialogOpen}
        onOpenChange={setAdvantageInvestmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAdvantageInvestmentIndex !== null
                ? "Edit Advantage"
                : "Add Advantage"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={advantageInvestmentDraft.title}
              onChange={(e) =>
                setAdvantageInvestmentDraft({
                  ...advantageInvestmentDraft,
                  title: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Description"
              value={advantageInvestmentDraft.description}
              onChange={(e) =>
                setAdvantageInvestmentDraft({
                  ...advantageInvestmentDraft,
                  description: e.target.value,
                })
              }
              className="w-full min-h-[80px] bg-[#E5E5E7] border border-[#116114]"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleAdvantageInvestmentDialogCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#116114] text-white"
              onClick={handleAdvantageInvestmentDialogSave}
            >
              {editingAdvantageInvestmentIndex !== null ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
