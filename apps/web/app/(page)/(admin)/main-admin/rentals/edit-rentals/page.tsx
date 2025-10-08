// "use client";
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { MdArrowBackIosNew } from "react-icons/md";
// import Link from "next/link";
// import TagInputGroup from "../../properties/components/PropertyFeaturesForm";
// import Dropdown from "./components/Dropdown";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   useFetchData,
//   useUploadPutData,
//   useUploadData,
//   useDeleteData,
// } from "@/hooks/useApi";
// import { toast } from "sonner";
// import { z } from "zod";
// import { Breadcrumb } from "../../customers/components/Breadcrumb";
// import { Switch } from "@/components/ui/switch";
// import { X } from "lucide-react";

// // Validation schema
// const rentalSchema = z.object({
//   propertyId: z.string().min(1, "Property is required"),
//   apartmentType: z.string().min(1, "Apartment type is required"),
//   location: z.string().min(1, "Location is required"),
//   rent: z.number().min(0, "Rent must be a positive number"),
//   frequency: z.enum(["MONTHLY", "YEARLY", "QUARTERLY"]),
//   agencyFee: z.number().min(0, "Agency fee must be a positive number"),
//   cautionFee: z.number().min(0, "Caution fee must be a positive number"),
//   // unitAmount: z.number().min(1, "Unit amount must be at least 1"),
//   status: z.enum(["RENTED", "NOT_RENTED"]),
//   images: z.array(z.string()).optional(),
//   isFurnished: z.boolean().optional(),
// });

// type RentalFormData = z.infer<typeof rentalSchema>;

// interface Property {
//   id: string;
//   name: string;
//   address: string;
//   unitTypes: string[];
//   amenities: string[];
//   features: string[];
//   about: string;
//   status: string;
//   constructionStatus: string;
// }

// interface UploadedImage {
//   id: string;
//   imageUrl: string;
//   name: string;
//   file: File; // Store the actual file
// }

// export default function EditRental() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const rentalId = searchParams.get("id");
//   const isEditMode = !!rentalId;

//   const [formData, setFormData] = useState<RentalFormData>({
//     propertyId: "",
//     apartmentType: "",
//     location: "",
//     rent: 0,
//     frequency: "MONTHLY",
//     agencyFee: 0,
//     cautionFee: 0,
//     // unitAmount: 1,
//     status: "NOT_RENTED",
//     images: [],
//     isFurnished: false,
//   });
//   const [errors, setErrors] = useState<Partial<RentalFormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
//   const [selectedProperty, setSelectedProperty] = useState<Property | null>(
//     null
//   );
//   const [features, setFeatures] = useState<string[]>([]);
//   const [amenities, setAmenities] = useState<string[]>([]);

//   // state for id of image to delete
//   const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);

//   // Fetch rental data if in edit mode
//   const { data: rentalData, isLoading: isLoadingRental } = useFetchData(
//     rentalId ? `rentals/${rentalId}/details` : null
//   );

//   // Fetch properties for dropdown
//   const { data: propertiesResponse } = useFetchData(
//     "admin/properties?limit=100"
//   );

//   // API mutations
//   const { mutateAsync: createRental, isPending: isCreating } =
//     useUploadData("rentals");

//   const { mutateAsync: updateRental, isPending: isUpdating } = useUploadPutData(
//     rentalId ? `rentals/${rentalId}` : null
//   );

//   const { mutateAsync: deleteRentalImage, isPending: isDeletingImage } =
//     useDeleteData(
//       rentalId && imageIdToDelete ? `upload/images/${imageIdToDelete}` : null
//     );

//   // Extract properties from response
//   const properties: Property[] = propertiesResponse?.data?.items || [];

//   // Load rental data when editing
//   useEffect(() => {
//     if (rentalData && isEditMode) {
//       setFormData({
//         propertyId: rentalData?.data?.propertyId || "",
//         apartmentType: rentalData?.data?.apartmentType || "",
//         location: rentalData?.data?.location || "",
//         rent: rentalData?.data?.rent || 0,
//         frequency: rentalData?.data?.frequency || "MONTHLY",
//         agencyFee: rentalData?.data?.agencyFee || 0,
//         cautionFee: rentalData?.data?.cautionFee || "",
//         // unitAmount: rentalData?.data?.unitAmount || 1,
//         status: rentalData?.data?.status || "NOT_RENTED",
//         images: rentalData?.data?.images || [],
//         isFurnished: rentalData?.data?.isFurnished || false,
//       });

//       // Convert API images to UploadedImage format for display
//       if (rentalData?.data?.images && rentalData.data.images.length > 0) {
//         const existingImages: UploadedImage[] = rentalData.data.images.map(
//           (image: any) => ({
//             id: image.id,
//             imageUrl: image.imageUrl,
//             name: image.name,
//             file: null, // We don't have the original file for existing images
//           })
//         );
//         setUploadedImages(existingImages);
//       } else {
//         setUploadedImages([]);
//       }

//       const propertyFeatures = rentalData?.data?.property?.features || [];
//       const propertyAmenities = rentalData?.data?.property?.amenities || [];

//       console.log("Loading features:", propertyFeatures);
//       console.log("Loading amenities:", propertyAmenities);

//       setFeatures(propertyFeatures);
//       setAmenities(propertyAmenities);
//     }
//   }, [rentalData, isEditMode]);

//   // Cleanup object URLs on unmount
//   useEffect(() => {
//     return () => {
//       uploadedImages.forEach((image) => {
//         if (image.imageUrl.startsWith("blob:")) {
//           URL.revokeObjectURL(image.imageUrl);
//         }
//       });
//     };
//   }, []);

//   // Handle form input changes
//   const handleInputChange = (field: keyof RentalFormData, value: any) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }));
//     }
//   };

//   // Handle property selection
//   const handlePropertyChange = (propertyName: string) => {
//     const property = properties.find((p) => p.name === propertyName);
//     if (property) {
//       setSelectedProperty(property);
//       // Update property ID
//       handleInputChange("propertyId", property.id);

//       // Prefill form fields with property data
//       setFormData((prev) => ({
//         ...prev,
//         propertyId: property.id,
//         apartmentType: property.unitTypes?.[0] || "",
//         location: property.address || "",
//       }));
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     // Convert files to UploadedImage format for display
//     const newImages: UploadedImage[] = Array.from(files).map((file, index) => {
//       return {
//         id: `temp-${Date.now()}-${index}`,
//         imageUrl: URL.createObjectURL(file),
//         name: file.name,
//         file: file,
//       };
//     });

//     setUploadedImages((prev) => [...prev, ...newImages]);
//     toast.success(`${files.length} image(s) added successfully`);
//   };

//   // Remove image
//   const removeImage = async (imageId: string) => {
//     setImageIdToDelete(imageId);

//     const handleUploadedImages = (imageId: string) => {
//       setUploadedImages((prev) => {
//         const imageToRemove = prev.find((img) => img.id === imageId);
//         if (imageToRemove) {
//           URL.revokeObjectURL(imageToRemove.imageUrl);
//         }
//         return prev.filter((img) => img.id !== imageId);
//       });
//     };

//     if (isEditMode) {
//       try {
//         await deleteRentalImage();
//         handleUploadedImages(imageId);
//         toast.success("Image deleted successfully");
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       handleUploadedImages(imageId);
//     }
//   };

//   // Validate form data
//   const validateForm = (): boolean => {
//     try {
//       rentalSchema.parse(formData);
//       setErrors({});
//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Partial<RentalFormData> = {};
//         error.errors.forEach((err) => {
//           if (err.path[0]) {
//             const fieldName = err.path[0] as string;
//             if (fieldName in formData) {
//               (newErrors as any)[fieldName] = err.message;
//             }
//           }
//         });
//         setErrors(newErrors);
//       }
//       return false;
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Only validate form when creating new rental, not when editing
//     if (!isEditMode && !validateForm()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Create FormData for multipart/form-data submission
//       const formDataToSubmit = new FormData();

//       // Add all form fields as strings
//       formDataToSubmit.append("propertyId", formData.propertyId);
//       formDataToSubmit.append("apartmentType", formData.apartmentType);
//       formDataToSubmit.append("location", formData.location);
//       formDataToSubmit.append("rent", formData.rent.toString());
//       formDataToSubmit.append("frequency", formData.frequency);
//       formDataToSubmit.append("agencyFee", formData.agencyFee.toString());
//       formDataToSubmit.append("cautionFee", formData.cautionFee.toString());
//       formDataToSubmit.append("status", formData.status);
//       formDataToSubmit.append(
//         "isFurnished",
//         JSON.stringify(formData.isFurnished)
//       );

//       // Add features and amenities
//       console.log("Submitting features:", features);
//       console.log("Submitting amenities:", amenities);
//       formDataToSubmit.append("features", JSON.stringify(features));
//       formDataToSubmit.append("amenities", JSON.stringify(amenities));
//       // Add images as binary files directly to the array
//       console.log("Uploaded images:", uploadedImages);

//       // Handle images for edit vs create mode
//       if (isEditMode) {
//         // In edit mode, we need to handle existing images and new images separately
//         uploadedImages.forEach((image) => {
//           if (image.file) {
//             console.log(
//               "Adding new image to FormData:",
//               image.name,
//               image.file
//             );
//             formDataToSubmit.append("images", image.file);
//           }
//         });
//       } else {
//         // In create mode, all images are new
//         uploadedImages.forEach((image) => {
//           if (image.file) {
//             console.log("Adding image to FormData:", image.name, image.file);
//             formDataToSubmit.append("images", image.file);
//           }
//         });
//       }

//       // Debug: Log FormData contents
//       for (let [key, value] of formDataToSubmit.entries()) {
//         console.log(`${key}:`, value);
//       }

//       if (isEditMode) {
//         await updateRental(formDataToSubmit);
//         toast.success("Rental updated successfully");
//       } else {
//         await createRental(formDataToSubmit);
//         toast.success("Rental created successfully");
//       }

//       // Trigger refetch of rentals and stats
//       window.dispatchEvent(new CustomEvent("refetch-rentals-stats"));

//       // Navigate back with refresh parameter
//       router.push("/main-admin/rentals?refresh=true");
//     } catch (error: any) {
//       console.error("Error:", error);
//       toast.error(error?.response?.data?.message || "Failed to save rental");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Loading state for edit mode
//   if (isEditMode && isLoadingRental) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
//           <span>Loading rental data...</span>
//         </div>
//       </div>
//     );
//   }

//   // Convert properties to dropdown options
//   const propertyOptions = properties.map((property) => property.name);
//   const apartmentTypeOptions = selectedProperty?.unitTypes || [];
//   const frequencyOptions = ["Monthly", "Yearly", "Quarterly"];
//   const statusOptions = ["Available", "Not Available"];

//   return (
//     <div className="">
//       {/* Breadcrumb */}
//       <div className="border-b border-[#E5E5E7] pb-4">
//         <Breadcrumb
//           items={[
//             { label: "Rental Management", href: "/main-admin/rentals" },
//             { label: isEditMode ? "Edit" : "Add", href: "#" },
//           ]}
//         />
//       </div>

//       {/* Basic Info */}
//       <form onSubmit={handleSubmit} className="space-y-6 mt-4 bg-white p-6">
//         {/* Title */}
//         <h2 className="text-2xl font-medium text-[#116114] mb-4">
//           {isEditMode ? "Edit rental" : "Add / Edit rental"}
//         </h2>

//         <p className="text-[#4C5560] font-medium">Property info</p>

//         <div>
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Property name
//           </label>
//           {/* disabled if edit mode */}
//           <Dropdown
//             options={propertyOptions}
//             value={
//               properties.find((p) => p.id === formData.propertyId)?.name || ""
//             }
//             onChange={handlePropertyChange}
//             disabled={isEditMode}
//           />
//           {errors.propertyId && (
//             <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Apartment type
//           </label>
//           <Dropdown
//             options={apartmentTypeOptions}
//             value={formData.apartmentType}
//             onChange={(value) => handleInputChange("apartmentType", value)}
//           />
//           {errors.apartmentType && (
//             <p className="text-red-500 text-sm mt-1">{errors.apartmentType}</p>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Address
//           </label>
//           <Input
//             value={formData.location}
//             onChange={(e) => handleInputChange("location", e.target.value)}
//             placeholder=""
//             className={`bg-[#E5E5E7] border ${
//               errors.location ? "border-red-500" : "border-[#116114]"
//             }`}
//             readOnly
//           />
//           {errors.location && (
//             <p className="text-red-500 text-sm mt-1">{errors.location}</p>
//           )}
//         </div>

//         {/* <div>
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Unit Amount *
//           </label>
//           <Input
//             type="number"
//             value={formData.unitAmount}
//             onChange={(e) =>
//               handleInputChange("unitAmount", parseInt(e.target.value) || "")
//             }
//             placeholder="Enter unit amount"
//             className={`bg-[#E5E5E7] border ${
//               errors.unitAmount ? "border-red-500" : "border-[#116114]"
//             }`}
//             min="1"
//             required
//           />
//           {errors.unitAmount && (
//             <p className="text-red-500 text-sm mt-1">{errors.unitAmount}</p>
//           )}
//         </div> */}

//         <div>
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Rental frequency
//           </label>
//           <Dropdown
//             options={frequencyOptions}
//             value={
//               frequencyOptions.find(
//                 (f) => f.toUpperCase() === formData.frequency
//               ) || ""
//             }
//             onChange={(value) => {
//               const frequency = value.toUpperCase() as
//                 | "MONTHLY"
//                 | "YEARLY"
//                 | "QUARTERLY";
//               handleInputChange("frequency", frequency);
//             }}
//           />
//         </div>

//         <p className="text-[#4C5560] font-medium">Fees</p>

//         <div>
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Rent
//           </label>
//           <Input
//             type="number"
//             value={formData.rent}
//             onChange={(e) =>
//               handleInputChange("rent", parseFloat(e.target.value) || "")
//             }
//             placeholder="Enter rent"
//             className={`bg-[#E5E5E7] border ${
//               errors.rent ? "border-red-500" : "border-[#116114]"
//             }`}
//           />
//           {errors.rent && (
//             <p className="text-red-500 text-sm mt-1">{errors.rent}</p>
//           )}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <label className="block mb-1 text-sm text-[#323539] font-medium">
//               Agency fee
//             </label>
//             <Input
//               type="number"
//               value={formData.agencyFee}
//               placeholder="Enter agency fee"
//               onChange={(e) =>
//                 handleInputChange("agencyFee", parseFloat(e.target.value) || "")
//               }
//               className={`bg-[#E5E5E7] border ${
//                 errors.agencyFee ? "border-red-500" : "border-[#116114]"
//               }`}
//             />
//             {errors.agencyFee && (
//               <p className="text-red-500 text-sm mt-1">{errors.agencyFee}</p>
//             )}
//           </div>
//           <div>
//             <label className="block mb-1 text-sm text-[#323539] font-medium">
//               Caution fee
//             </label>
//             <Input
//               type="number"
//               value={formData.cautionFee}
//               onChange={(e) =>
//                 handleInputChange(
//                   "cautionFee",
//                   parseFloat(e.target.value) || ""
//                 )
//               }
//               placeholder="Enter caution fee"
//               className={`bg-[#E5E5E7] border ${
//                 errors.cautionFee ? "border-red-500" : "border-[#116114]"
//               }`}
//             />
//             {errors.cautionFee && (
//               <p className="text-red-500 text-sm mt-1">{errors.cautionFee}</p>
//             )}
//           </div>
//         </div>

//         {/* Images Upload */}
//         <div
//           className={`${isDeletingImage ? "opacity-50 cursor-not-allowed" : ""}`}
//         >
//           {isDeletingImage && (
//             <div className="flex items-center gap-2">
//               <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
//               <span>Deleting image...</span>
//             </div>
//           )}
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Property Images
//           </label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={(e) => handleFileUpload(e.target.files)}
//             className="hidden"
//             id="file-upload"
//           />
//           <button
//             type="button"
//             onClick={() => document.getElementById("file-upload")?.click()}
//             className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#116114] transition-colors"
//           >
//             <div className="flex flex-col items-center">
//               <svg
//                 className="w-8 h-8 text-gray-400 mb-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                 />
//               </svg>
//               <span className="text-sm text-gray-600">
//                 Click to upload images or drag and drop
//               </span>
//               <span className="text-xs text-gray-400 mt-1">
//                 PNG, JPG, JPEG up to 10MB each
//               </span>
//             </div>
//           </button>

//           {/* Display uploaded images */}
//           {uploadedImages.length > 0 && (
//             <div className="mt-4">
//               <p className="text-sm text-gray-600 mb-2">
//                 {uploadedImages.length} image(s) selected
//               </p>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {uploadedImages.map((image) => (
//                   <div key={image.id} className="relative group">
//                     <img
//                       src={image.imageUrl}
//                       alt={image.name}
//                       className="w-full h-32 object-cover rounded-lg"
//                     />
//                     <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
//                       <X
//                         className="w-4 h-4"
//                         onClick={() => removeImage(image.id)}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Status
//           </label>
//           <Dropdown
//             options={statusOptions}
//             value={
//               formData.status === "NOT_RENTED"
//                 ? "Available"
//                 : formData.status === "RENTED"
//                   ? "Not Available"
//                   : ""
//             }
//             onChange={(value) => {
//               const status = value === "Available" ? "NOT_RENTED" : "RENTED";
//               handleInputChange("status", status);
//             }}
//           />
//         </div>

//         <div>
//           {/* Switch */}
//           <label className="block mb-1 text-sm text-[#323539] font-medium">
//             Furnished Status
//           </label>
//           <Switch
//             checked={formData.isFurnished}
//             color="green"
//             onCheckedChange={() =>
//               handleInputChange("isFurnished", !formData.isFurnished)
//             }
//           />
//           {errors.isFurnished && (
//             <p className="text-red-500 text-sm mt-1">{errors.isFurnished}</p>
//           )}
//         </div>

//         <h3 className="text-base py-4 font-medium text-[#116114]">
//           Property features and amenities
//         </h3>
//         <TagInputGroup
//           label="Features"
//           value={features}
//           onChange={setFeatures}
//         />
//         <TagInputGroup
//           label="Amenities"
//           value={amenities}
//           onChange={setAmenities}
//         />

//         <div className="flex justify-between items-center py-8">
//           <button
//             type="submit"
//             disabled={isSubmitting || isCreating || isUpdating}
//             className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
//           >
//             {isSubmitting || isCreating || isUpdating ? "Saving..." : "Save"}
//           </button>

//           <Link href="/main-admin/rentals">
//             <button
//               type="button"
//               className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
//             >
//               <MdArrowBackIosNew /> Back to rentals
//             </button>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import TagInputGroup from "../../properties/components/PropertyFeaturesForm";
import Dropdown from "./components/Dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import {
	useFetchData,
	useUploadPutData,
	useUploadData,
	useDeleteData,
} from "@/hooks/useApi";
import { toast } from "sonner";
import { z } from "zod";
import { Breadcrumb } from "../../customers/components/Breadcrumb";
import { X } from "lucide-react";
import { unitSchema } from "../../properties/components/new/AddPropertiesNew";

// Validation schema
const rentalSchema = z.object({
	propertyId: z.string().min(1, "Property is required"),
	apartmentType: z.string().min(1, "Apartment type is required"),
	location: z.string().min(1, "Location is required"),
	rent: z.number().min(0, "Rent must be a positive number"),
	frequency: z.enum(["MONTHLY", "YEARLY", "QUARTERLY"]),
	agencyFee: z.number().min(0, "Agency fee must be a positive number"),
	cautionFee: z.number().min(0, "Caution fee must be a positive number"),
	status: z.enum(["AVAILABLE", "NOT_AVAILABLE"]),
	images: z.array(z.string()).optional(),
	isFurnished: z.boolean().optional(),
	availableUnits: z
		.number()
		.min(0, "Available units must be a non-negative number"),
	currency: z.enum(["NGN", "USD", "EUR", "GBP"]),
	unitCategory: z.enum([
		"STANDARD_FURNISHED",
		"LUXURY_FURNISHED",
		"UNFURNISHED",
	]),
});

type RentalFormData = z.infer<typeof rentalSchema>;
type UnitsFormProp = z.infer<typeof unitSchema>;
type UnitsFormProps = UnitsFormProp & {
	id?: string;
};

interface Property {
	id: string;
	name: string;
	address: string;
	units: UnitsFormProps[];
	amenities: string[];
	features: string[];
	about: string;
	status: string;
	constructionStatus: string;
	availableUnits: number | string;
	currency: "NGN" | "USD" | "EUR" | "GBP";
	unitCategory: "STANDARD_FURNISHED" | "LUXURY_FURNISHED" | "UNFURNISHED";
}

interface UploadedImage {
	id: string;
	imageUrl: string;
	name: string;
	file: File | null;
}

export default function EditRental() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const rentalId = searchParams.get("id");
	const isEditMode = !!rentalId;

	const [formData, setFormData] = useState<RentalFormData>({
		propertyId: "",
		apartmentType: "",
		location: "",
		rent: 0,
		frequency: "MONTHLY",
		agencyFee: 0,
		cautionFee: 0,
		status: "NOT_AVAILABLE",
		images: [],
		availableUnits: 0,
		currency: "NGN",
		unitCategory: "UNFURNISHED",
	});
	const [errors, setErrors] = useState<Partial<RentalFormData>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
	const [selectedProperty, setSelectedProperty] = useState<Property | null>(
		null
	);
	const [features, setFeatures] = useState<string[]>([]);
	const [amenities, setAmenities] = useState<string[]>([]);
	const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);

	const { data: rentalData, isLoading: isLoadingRental } = useFetchData(
		rentalId ? `rentals/${rentalId}/details` : null
	);

	// Fetch properties for dropdown
	const { data: propertiesResponse } = useFetchData(
		"admin/properties?limit=100"
	);

	// API mutations
	const { mutateAsync: createRental, isPending: isCreating } =
		useUploadData("rentals");

	const { mutateAsync: updateRental, isPending: isUpdating } = useUploadPutData(
		rentalId ? `rentals/${rentalId}` : null
	);

	const { mutateAsync: deleteRentalImage, isPending: isDeletingImage } =
		useDeleteData(
			rentalId && imageIdToDelete ? `upload/images/${imageIdToDelete}` : null
		);

	// Extract properties from response
	const properties: Property[] = propertiesResponse?.data?.items || [];

	// Load rental data when editing
	useEffect(() => {
		if (rentalData && isEditMode) {
			const rental = rentalData.data;

			setFormData({
				propertyId: rental?.propertyId || "",
				apartmentType: rental?.apartmentType || "",
				location: rental?.location || "",
				rent: rental?.rent || 0,
				frequency: rental?.frequency || "MONTHLY",
				agencyFee: rental?.agencyFee || 0,
				cautionFee: rental?.cautionFee || 0,
				status: rental?.status || "NOT_AVAILABLE",
				images: rental?.images || [],
				isFurnished: rental?.isFurnished || false,
				availableUnits: rental?.availableUnits || 0,
				currency: rental?.currency || "NGN",
				unitCategory: rental?.unitCategory || "UNFURNISHED",
			});

			// Set selected property for edit mode
			const property = properties.find((p) => p.id === rental?.propertyId);
			if (property) {
				setSelectedProperty(property);
			}

			// Convert API images to UploadedImage format for display
			if (rental?.images && rental.images.length > 0) {
				const existingImages: UploadedImage[] = rental.images.map(
					(image: any) => ({
						id: image.id,
						imageUrl: image.imageUrl,
						name: image.name,
						file: null,
					})
				);
				setUploadedImages(existingImages);
			} else {
				setUploadedImages([]);
			}

			const propertyFeatures = rental?.property?.features || [];
			const propertyAmenities = rental?.property?.amenities || [];

			console.log("Loading features:", propertyFeatures);
			console.log("Loading amenities:", propertyAmenities);

			setFeatures(propertyFeatures);
			setAmenities(propertyAmenities);
		}
	}, [rentalData, isEditMode, properties]);

	// Cleanup object URLs on unmount
	useEffect(() => {
		return () => {
			uploadedImages.forEach((image) => {
				if (image.imageUrl.startsWith("blob:")) {
					URL.revokeObjectURL(image.imageUrl);
				}
			});
		};
	}, []);

	// Handle form input changes
	const handleInputChange = (field: keyof RentalFormData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	// Handle property selection
	const handlePropertyChange = (propertyName: string) => {
		const property = properties.find((p) => p.name === propertyName);
		if (property) {
			setSelectedProperty(property);
			// Update property ID
			handleInputChange("propertyId", property.id);

			// Prefill form fields with property data
			setFormData((prev) => ({
				...prev,
				propertyId: property.id,
				apartmentType: property.units[0]?.unitType || "",
				location: property.address || "",
			}));
		}
	};

	// Handle file upload
	const handleFileUpload = (files: FileList | null) => {
		if (!files || files.length === 0) return;

		// Convert files to UploadedImage format for display
		const newImages: UploadedImage[] = Array.from(files).map((file, index) => {
			return {
				id: `temp-${Date.now()}-${index}`,
				imageUrl: URL.createObjectURL(file),
				name: file.name,
				file: file,
			};
		});

		setUploadedImages((prev) => [...prev, ...newImages]);
		toast.success(`${files.length} image(s) added successfully`);
	};

	// Remove image
	const removeImage = async (imageId: string) => {
		setImageIdToDelete(imageId);

		const handleUploadedImages = (imageId: string) => {
			setUploadedImages((prev) => {
				const imageToRemove = prev.find((img) => img.id === imageId);
				if (imageToRemove && imageToRemove.imageUrl.startsWith("blob:")) {
					URL.revokeObjectURL(imageToRemove.imageUrl);
				}
				return prev.filter((img) => img.id !== imageId);
			});
		};

		if (isEditMode) {
			try {
				await deleteRentalImage();
				handleUploadedImages(imageId);
				toast.success("Image deleted successfully");
			} catch (error) {
				console.log(error);
				toast.error("Failed to delete image");
			}
		} else {
			handleUploadedImages(imageId);
		}
	};

	// Validate form data
	const validateForm = (): boolean => {
		try {
			rentalSchema.parse(formData);
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const newErrors: Partial<RentalFormData> = {};
				error.errors.forEach((err) => {
					if (err.path[0]) {
						const fieldName = err.path[0] as string;
						if (fieldName in formData) {
							(newErrors as any)[fieldName] = err.message;
						}
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

		// Only validate form when creating new rental, not when editing
		if (!isEditMode && !validateForm()) {
			toast.error("Please fix the errors in the form");
			return;
		}


		setIsSubmitting(true);

		try {
			const selectedUnit = selectedProperty?.units?.find(
				(unit) => unit.unitType === formData.apartmentType
			);

			if (!selectedUnit) {
				toast.error("Please select a valid apartment type");
				setIsSubmitting(false);
				return;
			}

			const numberOfUnitsOfType =
				selectedProperty?.units?.filter(
					(unit) => unit.unitType === formData.apartmentType
				).length || 0;

			const formDataToSubmit = new FormData();
			// Add all form fields as strings

			formDataToSubmit.append("propertyUnitId", selectedUnit.id|| "");
			formDataToSubmit.append("numberOfUnits", numberOfUnitsOfType.toString());
			formDataToSubmit.append("propertyId", formData.propertyId);
			formDataToSubmit.append("apartmentType", formData.apartmentType);
			formDataToSubmit.append("location", formData.location);
			formDataToSubmit.append("rent", formData.rent.toString());
			formDataToSubmit.append("frequency", formData.frequency);
			formDataToSubmit.append("agencyFee", formData.agencyFee.toString());
			formDataToSubmit.append("cautionFee", formData.cautionFee.toString());
			formDataToSubmit.append("status", formData.status);
			formDataToSubmit.append(
				"availableUnits",
				formData.availableUnits.toString()
			);
			formDataToSubmit.append("currency", formData.currency);
			formDataToSubmit.append("unitCategory", formData.unitCategory); // ✅ keep only this one

			// Add features and amenities
			console.log("Submitting features:", features);
			console.log("Submitting amenities:", amenities);
			formDataToSubmit.append("features", JSON.stringify(features));
			formDataToSubmit.append("amenities", JSON.stringify(amenities));

			// Handle images for edit vs create mode
			console.log("Uploaded images:", uploadedImages);

			if (isEditMode) {
				// In edit mode, only add new images (those with file objects)
				uploadedImages.forEach((image) => {
					if (image.file) {
						console.log(
							"Adding new image to FormData:",
							image.name,
							image.file
						);
						formDataToSubmit.append("images", image.file);
					}
				});
			} else {
				// In create mode, all images are new
				uploadedImages.forEach((image) => {
					if (image.file) {
						console.log("Adding image to FormData:", image.name, image.file);
						formDataToSubmit.append("images", image.file);
					}
				});
			}

			// Debug: Log FormData contents
			for (let [key, value] of formDataToSubmit.entries()) {
				console.log(`${key}:`, value);
			}

			if (isEditMode) {
				await updateRental(formDataToSubmit);
				toast.success("Rental updated successfully");
			} else {
				await createRental(formDataToSubmit);
				toast.success("Rental created successfully");
			}

			// Trigger refetch of rentals and stats
			window.dispatchEvent(new CustomEvent("refetch-rentals-stats"));

			// Navigate back with refresh parameter
			router.push("/main-admin/rentals?refresh=true");
		} catch (error: any) {
			console.error("Error:", error);
			toast.error(error?.response?.data?.message || "Failed to save rental");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Loading state for edit mode
	if (isEditMode && isLoadingRental) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="flex items-center gap-2">
					<div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
					<span>Loading rental data...</span>
				</div>
			</div>
		);
	}

	// Convert properties to dropdown options
	const propertyOptions = properties.map((property) => property.name);
	const apartmentTypeOptions =
		selectedProperty?.units?.map((unit) => unit.unitType) || [];
	const frequencyOptions = ["Monthly", "Yearly", "Quarterly", "Semi-anually"];
	const currencyOptions = ["NGN", "USD", "EUR", "GBP"];
	const statusOptions = ["Available", "Not Available"];
	const unitCategories = [
		"STANDARD_FURNISHED",
		"LUXURY_FURNISHED",
		"UNFURNISHED",
	];
	console.log("Apartment type options:", apartmentTypeOptions);

	return (
		<div className="">
			{/* Breadcrumb */}
			<div className="border-b border-[#E5E5E7] pb-4">
				<Breadcrumb
					items={[
						{ label: "Rental Management", href: "/main-admin/rentals" },
						{ label: isEditMode ? "Edit" : "Add", href: "#" },
					]}
				/>
			</div>

			{/* Basic Info */}
			<form onSubmit={handleSubmit} className="space-y-6 mt-4 bg-white p-6">
				{/* Title */}
				<h2 className="text-2xl font-medium text-[#116114] mb-4">
					{isEditMode ? "Edit rental" : "Add / Edit rental"}
				</h2>

				<p className="text-[#4C5560] font-medium">Property info</p>

				<div>
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Property name
					</label>
					<Dropdown
						options={propertyOptions}
						value={
							properties.find((p) => p.id === formData.propertyId)?.name || ""
						}
						onChange={handlePropertyChange}
						disabled={isEditMode}
						required
					/>
					{errors.propertyId && (
						<p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>
					)}
				</div>

				<div>
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Apartment type
					</label>
					<Dropdown
						options={apartmentTypeOptions}
						value={formData.apartmentType}
						onChange={(value) => handleInputChange("apartmentType", value)}
						required
					/>
					{errors.apartmentType && (
						<p className="text-red-500 text-sm mt-1">{errors.apartmentType}</p>
					)}
				</div>
				<div>
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Apartment category
					</label>
					<Dropdown
						options={unitCategories}
						value={formData.unitCategory}
						onChange={(value) => handleInputChange("unitCategory", value)}
						required
					/>
					{errors.unitCategory && (
						<p className="text-red-500 text-sm mt-1">{errors.apartmentType}</p>
					)}
				</div>

				<div>
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Available units
					</label>
					<Input
						value={formData.availableUnits}
						type="number"
						onChange={(e) =>
							handleInputChange(
								"availableUnits",
								parseFloat(e.target.value) || 0
							)
						}
						placeholder=""
						required
						className={`bg-[#E5E5E7] border ${
							errors.availableUnits ? "border-red-500" : "border-[#116114]"
						}`}
					/>
					{errors.availableUnits && (
						<p className="text-red-500 text-sm mt-1">{errors.availableUnits}</p>
					)}
				</div>

				<div>
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Address
					</label>
					<Input
						value={formData.location}
						onChange={(e) => handleInputChange("location", e.target.value)}
						placeholder=""
						required
						className={`bg-[#E5E5E7] border ${
							errors.location ? "border-red-500" : "border-[#116114]"
						}`}
						readOnly
					/>
					{errors.location && (
						<p className="text-red-500 text-sm mt-1">{errors.location}</p>
					)}
				</div>

				<div>
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Rental frequency
					</label>
					<Dropdown
						options={frequencyOptions}
						value={
							frequencyOptions.find(
								(f) => f.toUpperCase() === formData.frequency
							) || ""
						}
						onChange={(value) => {
							const frequency = value.toUpperCase() as
								| "MONTHLY"
								| "YEARLY"
								| "SEMIANUALLY"
								| "QUARTERLY";

							handleInputChange("frequency", frequency);
						}}
					/>
				</div>

				<p className="text-[#4C5560] font-medium">Fees</p>

				<div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Currency dropdown */}
						<div>
							<label className="block mb-1 text-sm text-[#323539] font-medium">
								Currency
							</label>
							<Dropdown
								required
								options={currencyOptions}
								value={
									currencyOptions.find(
										(f) => f.toUpperCase() === formData.currency
									) || ""
								}
								onChange={(value) => {
									const currency = value.toUpperCase() as
										| "NGN"
										| "USD"
										| "EUR"
										| "GBP";

									handleInputChange("currency", currency);
								}}
							/>
							{errors.currency && (
								<p className="text-red-500 text-sm mt-1">{errors.currency}</p>
							)}
						</div>

						{/* Rent input */}
						<div>
							<label className="block mb-1 text-sm text-[#323539] font-medium">
								Rent
							</label>
							<Input
								required
								type="number"
								value={formData.rent}
								onChange={(e) =>
									handleInputChange("rent", parseFloat(e.target.value) || 0)
								}
								placeholder="Enter rent"
								className={`bg-[#E5E5E7] border ${
									errors.rent ? "border-red-500" : "border-[#116114]"
								}`}
							/>
							{errors.rent && (
								<p className="text-red-500 text-sm mt-1">{errors.rent}</p>
							)}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<label className="block mb-1 text-sm text-[#323539] font-medium">
							Agency fee
						</label>
						<Input
							required
							type="number"
							value={formData.agencyFee}
							placeholder="Enter agency fee"
							onChange={(e) =>
								handleInputChange("agencyFee", parseFloat(e.target.value) || 0)
							}
							className={`bg-[#E5E5E7] border ${
								errors.agencyFee ? "border-red-500" : "border-[#116114]"
							}`}
						/>
						{errors.agencyFee && (
							<p className="text-red-500 text-sm mt-1">{errors.agencyFee}</p>
						)}
					</div>
					<div>
						<label className="block mb-1 text-sm text-[#323539] font-medium">
							Caution fee
						</label>
						<Input
							required
							type="number"
							value={formData.cautionFee}
							onChange={(e) =>
								handleInputChange("cautionFee", parseFloat(e.target.value) || 0)
							}
							placeholder="Enter caution fee"
							className={`bg-[#E5E5E7] border ${
								errors.cautionFee ? "border-red-500" : "border-[#116114]"
							}`}
						/>
						{errors.cautionFee && (
							<p className="text-red-500 text-sm mt-1">{errors.cautionFee}</p>
						)}
					</div>
				</div>

				{/* Images Upload */}
				<div
					className={`${isDeletingImage ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					{isDeletingImage && (
						<div className="flex items-center gap-2 mb-2">
							<div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
							<span>Deleting image...</span>
						</div>
					)}
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Property Images
					</label>
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={(e) => handleFileUpload(e.target.files)}
						className="hidden"
						id="file-upload"
						disabled={isDeletingImage}
					/>
					<button
						type="button"
						onClick={() => document.getElementById("file-upload")?.click()}
						disabled={isDeletingImage}
						className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#116114] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<div className="flex flex-col items-center">
							<svg
								className="w-8 h-8 text-gray-400 mb-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/>
							</svg>
							<span className="text-sm text-gray-600">
								Click to upload images or drag and drop
							</span>
							<span className="text-xs text-gray-400 mt-1">
								PNG, JPG, JPEG up to 10MB each
							</span>
						</div>
					</button>

					{/* Display uploaded images */}
					{uploadedImages.length > 0 && (
						<div className="mt-4">
							<p className="text-sm text-gray-600 mb-2">
								{uploadedImages.length} image(s) selected
							</p>
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{uploadedImages.map((image) => (
									<div key={image.id} className="relative group">
										<img
											src={image.imageUrl}
											alt={image.name}
											className="w-full h-32 object-cover rounded-lg"
										/>
										<button
											type="button"
											onClick={() => removeImage(image.id)}
											disabled={isDeletingImage}
											className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
										>
											<X className="w-4 h-4" />
										</button>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<div>
					<label className="block mb-1 text-sm text-[#323539] font-medium">
						Status
					</label>
					<Dropdown
						required
						options={statusOptions}
						value={
							formData.status === "AVAILABLE" ? "Available" : "Not Available"
						}
						onChange={(value) => {
							const val = value === "Available" ? "AVAILABLE" : "NOT_AVAILABLE";
							handleInputChange("status", val);
						}}
					/>
				</div>

				<h3 className="text-base py-4 font-medium text-[#116114]">
					Property features and amenities
				</h3>
				<TagInputGroup
					label="Features"
					value={features}
					onChange={setFeatures}
					required
				/>
				<TagInputGroup
					label="Amenities"
					value={amenities}
					onChange={setAmenities}
					required
				/>

				<div className="flex justify-between items-center py-8">
					<button
						type="submit"
						disabled={isSubmitting || isCreating || isUpdating}
						className="bg-[#116114] hover:bg-[#0d4a0d] text-white text-sm px-8 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting || isCreating || isUpdating ? "Saving..." : "Save"}
					</button>

					<Link href="/main-admin/rentals">
						<button
							type="button"
							className="text-[#323539] flex items-center gap-2 hover:text-[#116114] text-sm transition-colors"
						>
							<MdArrowBackIosNew /> Back to rentals
						</button>
					</Link>
				</div>
			</form>
		</div>
	);
}
