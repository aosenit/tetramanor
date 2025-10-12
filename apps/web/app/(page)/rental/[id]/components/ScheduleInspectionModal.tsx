"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePostData } from "@/hooks/useApi";
import { useToast } from "@/components/ui/toast-notification";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSpinner } from "react-icons/fa";
import PhoneInputV2 from "@/components/ui/PhoneInputV2";

// Validation schema
const inspectionFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+\d{7,15}$/,
      "Please enter a valid phone number with country code"
    ),
  email: z.string().email("Please enter a valid email address"),
  date: z.string().min(1, "Please select a date"),
});

type InspectionFormData = z.infer<typeof inspectionFormSchema>;

interface ScheduleInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyName?: string;
}

export default function ScheduleInspectionModal({
  isOpen,
  onClose,
  propertyId,
  propertyName,
}: ScheduleInspectionModalProps) {
  const { mutateAsync: scheduleInspection, isPending } = usePostData(
    "property/book-inspection"
  );
  const { showToast } = useToast();
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<InspectionFormData>({
    resolver: zodResolver(inspectionFormSchema),
  });

  // Date validation functions
  const isWeekday = (dateString: string): boolean => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day >= 1 && day <= 6; // Monday to Saturday
  };

  const isDateBlocked = (dateString: string): boolean => {
    return blockedDates.includes(dateString);
  };

  const getMinDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const onSubmit = async (data: InspectionFormData) => {
    // Validate date is a weekday
    if (!isWeekday(data.date)) {
      showToast(
        "Invalid Date",
        "Inspections are only available Monday through Saturday.",
        "error"
      );
      return;
    }

    // Check if date is blocked
    if (isDateBlocked(data.date)) {
      showToast(
        "Date Not Available",
        "This date has already been selected for inspection.",
        "error"
      );
      return;
    }

    try {
      await scheduleInspection({
        name: data.name,
        phone: data.phone,
        email: data.email,
        date: data.date,
        propertyId,
      });

      // Block the date
      setBlockedDates((prev) => [...prev, data.date]);

      showToast(
        "Inspection Scheduled!",
        `Thank you! Your inspection${propertyName ? ` for ${propertyName}` : ""} has been scheduled for ${new Date(data.date).toLocaleDateString()}. We'll contact you shortly to confirm.`,
        "success"
      );
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to schedule inspection:", error);
      showToast(
        "Failed to Schedule",
        "Failed to schedule inspection. Please try again.",
        "error"
      );
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const selectedDate = watch("date");

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Schedule an Inspection
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {propertyName
              ? `Book a personalized tour of ${propertyName} and explore its features and amenities.`
              : "Book a personalized tour and explore the property's features and amenities."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInputV2
                    value={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Enter phone number"
                    error={!!errors.phone}
                    required
                  />
                )}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
              Preferred Inspection Date <span className="text-red-500">*</span>
            </Label>
            <div className="">
              <Input
                id="date"
                type="date"
                {...register("date")}
                min={getMinDate()}
                className={errors.date ? "border-red-500" : ""}
              />
              {/* <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
            </div>
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date.message}</p>
            )}
            <p className="text-sm text-gray-500">
              Inspections available Monday through Saturday only
            </p>
            {blockedDates.length > 0 && (
              <p className="text-sm text-orange-600">
                {blockedDates.length} date{blockedDates.length > 1 ? "s" : ""}{" "}
                already booked
              </p>
            )}
            {selectedDate && !isWeekday(selectedDate) && (
              <p className="text-sm text-red-500">
                Please select a weekday (Monday to Saturday)
              </p>
            )}
            {selectedDate && isDateBlocked(selectedDate) && (
              <p className="text-sm text-red-500">
                This date is already booked
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#116114] hover:bg-[#0d4d10] text-white"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                "Schedule Inspection"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

