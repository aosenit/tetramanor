"use client";

import { useState, useEffect } from "react";
import { useFetchData, usePutData } from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, TrendingUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

// Validation schema
const capitalAppreciationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  launchValue: z.number().min(0, "Launch value must be positive"),
  currentValue: z.number().min(0, "Current value must be positive"),
  currency: z.enum(["USD", "NGN", "EUR", "GBP"]),
});

type CapitalAppreciationData = z.infer<typeof capitalAppreciationSchema>;

export default function CapitalAppreciation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<CapitalAppreciationData>({
    name: "",
    launchValue: 0,
    currentValue: 0,
    currency: "NGN",
  });
  const [errors, setErrors] = useState<Partial<CapitalAppreciationData>>({});

  // Fetch capital appreciation data
  const { data, isLoading, refetch } = useFetchData(
    "miscs/capital-appreciation"
  );

  // Update mutation
  const { mutateAsync: updateCapitalAppreciation, isPending } = usePutData(
    "miscs/capital-appreciation"
  );

  const appreciationData = data?.data;

  // Load existing data when component mounts or data changes
  useEffect(() => {
    if (appreciationData) {
      setFormData({
        name: appreciationData.name || "",
        launchValue: appreciationData.launchValue || 0,
        currentValue: appreciationData.currentValue || 0,
        currency: appreciationData.currency || "NGN",
      });
    }
  }, [appreciationData]);

  // Calculate appreciation percentage
  const calculateAppreciation = () => {
    if (!appreciationData) return 0;
    const { launchValue, currentValue } = appreciationData;
    if (launchValue === 0) return 0;
    return ((currentValue - launchValue) / launchValue) * 100;
  };

  const appreciationPercentage = calculateAppreciation();

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    const currencySymbols: { [key: string]: string } = {
      NGN: "₦",
      USD: "$",
      EUR: "€",
      GBP: "£",
    };
    return `${currencySymbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  // Get currency symbol
  const getCurrencySymbol = (currency: string) => {
    const currencySymbols: { [key: string]: string } = {
      NGN: "₦",
      USD: "$",
      EUR: "€",
      GBP: "£",
    };
    return currencySymbols[currency] || "$";
  };

  // Handle input change
  const handleInputChange = (
    field: keyof CapitalAppreciationData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    try {
      capitalAppreciationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<CapitalAppreciationData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            const fieldName = err.path[0] as keyof CapitalAppreciationData;
            (newErrors as any)[fieldName] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      // add id to the form data
      const formDataWithId = { ...formData, id: appreciationData?.id };
      const response = await updateCapitalAppreciation(formDataWithId);
      toast.success(
        response?.data?.message || "Capital appreciation updated successfully"
      );
      setIsModalOpen(false);
      refetch();
    } catch (error: any) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#116114]" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#116114]" />
            <h2 className="text-lg font-semibold text-gray-900">
              Proven Capital Appreciation
            </h2>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            Update
          </Button>
        </div>

        {/* Content */}
        {appreciationData ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Property Name */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Property</p>
                <p className="text-lg font-semibold text-gray-900">
                  {appreciationData.name}
                </p>
              </div>

              {/* Launch Value */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Launch Value</p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatCurrency(
                    appreciationData.launchValue,
                    appreciationData.currency
                  )}
                </p>
              </div>

              {/* Current Value */}
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Current Value</p>
                <p className="text-lg font-semibold text-green-600">
                  {formatCurrency(
                    appreciationData.currentValue,
                    appreciationData.currency
                  )}
                </p>
              </div>
            </div>

            {/* Appreciation Stats */}
            <div className="mt-6 bg-gradient-to-r from-[#116114] to-green-700 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">
                    Capital Appreciation
                  </p>
                  <p className="text-4xl font-bold">
                    {appreciationPercentage.toFixed(2)}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90 mb-1">Value Increase</p>
                  <p className="text-2xl font-semibold">
                    {formatCurrency(
                      appreciationData.currentValue -
                        appreciationData.launchValue,
                      appreciationData.currency
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm mb-4">
              No capital appreciation data available
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#116114] hover:bg-green-700"
            >
              Add Capital Appreciation
            </Button>
          </div>
        )}
      </div>

      {/* Update Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Update Capital Appreciation
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Update the property capital appreciation details
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Property Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Property Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter property name"
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Currency */}
            <div>
              <Label
                htmlFor="currency"
                className="text-sm font-medium text-gray-700"
              >
                Currency *
              </Label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) =>
                  handleInputChange(
                    "currency",
                    e.target.value as "USD" | "NGN" | "EUR" | "GBP"
                  )
                }
                className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#116114] ${
                  errors.currency ? "border-red-500" : "border-gray-300"
                }`}
                required
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
              {errors.currency && (
                <p className="text-red-500 text-xs mt-1">{errors.currency}</p>
              )}
            </div>

            {/* Launch Value */}
            <div>
              <Label
                htmlFor="launchValue"
                className="text-sm font-medium text-gray-700"
              >
                Launch Value *
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">
                  {getCurrencySymbol(formData.currency)}
                </span>
                <Input
                  id="launchValue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.launchValue}
                  onChange={(e) =>
                    handleInputChange(
                      "launchValue",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="Enter launch value"
                  className={`pl-10 ${errors.launchValue ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.launchValue && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.launchValue}
                </p>
              )}
            </div>

            {/* Current Value */}
            <div>
              <Label
                htmlFor="currentValue"
                className="text-sm font-medium text-gray-700"
              >
                Current Value *
              </Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-semibold">
                  {getCurrencySymbol(formData.currency)}
                </span>
                <Input
                  id="currentValue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.currentValue}
                  onChange={(e) =>
                    handleInputChange(
                      "currentValue",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  placeholder="Enter current value"
                  className={`pl-10 ${errors.currentValue ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.currentValue && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.currentValue}
                </p>
              )}
            </div>

            {/* Preview Appreciation */}
            {formData.launchValue > 0 && formData.currentValue > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Preview Appreciation:
                </p>
                <p className="text-2xl font-bold text-[#116114]">
                  {(
                    ((formData.currentValue - formData.launchValue) /
                      formData.launchValue) *
                    100
                  ).toFixed(2)}
                  %
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Increase:{" "}
                  {formatCurrency(
                    formData.currentValue - formData.launchValue,
                    formData.currency
                  )}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-[#116114] hover:bg-green-700"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
