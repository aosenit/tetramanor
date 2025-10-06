"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { MdArrowBackIosNew } from "react-icons/md";
import { Loader2 } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostData, usePutData, useFetchData } from "@/hooks/useApi";

// Validation schema
const userSchema = z.object({
	name: z.string().min(1, "Full name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().min(1, "Phone number is required"),
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
	});

	const [errors, setErrors] = useState<Partial<UserFormData>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// ✅ Fetch user data if in edit mode
	const { data: userData, isLoading: isLoadingUser } = useFetchData(
		userId ? `users/${userId}` : null
	);

	// ✅ API mutations
	const { mutateAsync: createUser, isPending: isCreating } =
		usePostData("users/add");
	const { mutateAsync: updateUser, isPending: isUpdating } = usePutData(
		userId ? `users/update/${userId}` : null
	);

	// ✅ Load user data when editing
	useEffect(() => {
		if (userData && isEditMode) {
			setFormData({
				name: userData?.data?.name || "",
				email: userData?.data?.email || "",
				phone: userData?.data?.phone || "",
			});
		}
	}, [userData, isEditMode]);

	// ✅ Validate form using Zod.safeParse
	const validateForm = (): boolean => {
		const result = userSchema.safeParse(formData);
		if (!result.success) {
			const newErrors: Partial<UserFormData> = {};
			result.error.errors.forEach((err) => {
				newErrors[err.path[0] as keyof UserFormData] = err.message;
			});
			setErrors(newErrors);
			return false;
		}
		setErrors({});
		return true;
	};

	// ✅ Handle input changes
	const handleInputChange = (field: keyof UserFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
	};

	// ✅ Handle form submit
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isSubmitting || isCreating || isUpdating) return;
		setIsSubmitting(true);

		try {
			if (!validateForm()) {
				toast.error("Please fix the errors in the form");
				return;
			}

			const payload = {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
			};

			if (isEditMode) {
				await updateUser(payload);
				toast.success("Customer updated successfully");
			} else {
				await createUser(payload);
				toast.success("Customer created successfully");
			}

			setTimeout(() => router.push("/main-admin/customers"), 800);
		} catch (error: any) {
			const message = error?.response?.data?.message || "Something went wrong";
			toast.error(message);
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isLoading = isSubmitting || isCreating || isUpdating;

	
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

		
			<div className="space-y-4">
				<h5>
					{isEditMode ?
						"Update customer information and details."
					:	"Manually create a user account for a buyer, tenant, or investor."}
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

					{/* Email */}
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

					{/* Phone */}
					<div className="space-y-2">
						<Label
							htmlFor="phone"
							className="text-sm font-medium text-[#323539]"
						>
							Phone number *
						</Label>
						<div
							className={`border rounded-lg bg-[#E5E5E7] ${
								errors.phone ? "border-red-500" : "border-transparent"
							}`}
						>
							<PhoneInput
								country="ng"
								value={formData.phone}
								onChange={(e) => handleInputChange("phone", e as string)}
								inputClass="!w-full !bg-transparent !border-none !py-3"
								containerClass="!w-full"
								placeholder="Enter phone number"
							/>
						</div>
						{errors.phone && (
							<p className="text-red-500 text-sm">{errors.phone}</p>
						)}
					</div>

					
					<div className="pt-6 pb-4">
						<p className="text-sm text-[#858C95] mb-4">
							Customer referred by marketing team
						</p>

						<div className="flex justify-between items-center">
							<Button
								type="submit"
								disabled={isLoading}
								className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
							>
								{isLoading ?
									<>
										<Loader2 className="w-4 h-4 animate-spin mr-2" />
										{isEditMode ? "Updating..." : "Creating..."}
									</>
								: isEditMode ?
									"Update customer"
								:	"Add customer"}
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
