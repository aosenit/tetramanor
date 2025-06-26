"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { usePostData, usePutData, useFetchData } from "@/hooks/useApi";
import { toast } from "sonner";
import { z } from "zod";

// Validation schema
const userSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function AddNewCustomers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const isEditMode = !!userId;

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch user data if in edit mode
  const { data: userData, isLoading: isLoadingUser } = useFetchData(
    userId ? `users/${userId}` : null
  );

  // API mutations
  const { mutateAsync: createUser, isPending: isCreating } =
    usePostData("users/add");
  const { mutateAsync: updateUser, isPending: isUpdating } = usePutData(
    userId ? `users/update/${userId}` : null
  );

  // Load user data when editing
  useEffect(() => {
    console.log(userData);
    if (userData && isEditMode) {
      setFormData({
        name: userData?.data?.name || "",
        email: userData?.data?.email || "",
        phone: userData?.data?.phone || "",
        password: "",
      });
    }
  }, [userData, isEditMode]);

  // Handle form input changes
  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    try {
      userSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<UserFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof UserFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        // only validate phone number
        if (!formData.phone) {
          toast.error("Phone number is required");
          return;
        }
        // Update existing user
        const updateData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        };

        await updateUser(updateData);
        toast.success("Customer updated successfully");
      } else {
        if (!validateForm()) {
          toast.error("Please fix the errors in the form");
          return;
        }
        // Create new user
        const createData = {
          name: formData.name,
          email: formData.email,
          password: formData.password!,
        };

        await createUser(createData);
        toast.success("Customer created successfully");
      }

      router.push("/main-admin/customers");
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        (isEditMode
          ? "Failed to update customer"
          : "Failed to create customer");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state for edit mode
  if (isEditMode && isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading customer data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="">
        <div className="flex border-b border-[#E5E5E7] pb-4 items-center justify-between">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              {isEditMode ? "Edit customer" : "Add new customer"}
            </span>
          </div>
          <Link href="/main-admin/customers">
            <Button variant="ghost" className="text-sm">
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h5>
          {isEditMode
            ? "Update customer information and details."
            : "Manually create a user account for a buyer, tenant, or investor."}
        </h5>

        <form onSubmit={handleSubmit} className="bg-white p-4 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-[#323539]"
            >
              Full name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full border-none bg-[#E5E5E7] py-4 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-[#323539]"
            >
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full border-none bg-[#E5E5E7] py-4 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-[#323539]"
            >
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`w-full border-none bg-[#E5E5E7] py-4 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {!isEditMode && (
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-[#323539]"
              >
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full border-none bg-[#E5E5E7] py-4 pr-12 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#858C95] hover:text-[#323539] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          )}

          <div className="pt-6 pb-4">
            <p className="text-sm text-[#858C95] mb-4">
              Customer referred by marketing team
            </p>

            <div className="flex justify-between items-center">
              <Button
                type="submit"
                disabled={isSubmitting || isCreating || isUpdating}
                className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
              >
                {isSubmitting || isCreating || isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Update customer"
                ) : (
                  "Add customer"
                )}
              </Button>

              <Link href="/main-admin/customers">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
                >
                  <MdArrowBackIosNew />
                  Back to Customers
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
