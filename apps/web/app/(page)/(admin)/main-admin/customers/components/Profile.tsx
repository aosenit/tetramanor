"use client";
import { useState, useRef } from "react";
import {
  Plus,
  Loader2,
  AlertCircle,
  Home,
  Camera,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RiEditLine } from "react-icons/ri";
import { MdArrowBackIosNew } from "react-icons/md";
import AddUnitModal from "./UnitModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData, usePostData } from "@/hooks/useApi";
import placeholder from "@/assets/placeholder.svg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  kycStatus: string;
  createdAt: string;
  profileImage?: string;
}

interface Property {
  id: string;
  name: string;
  totalUnitsPurchased: number;
  address: string;
  images: Array<{ imageUrl: string }>;
}

interface KYCData {
  status: string;
  remark?: string;
}

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  const [kycStatus, setKycStatus] = useState("PENDING");
  const [kycRemark, setKycRemark] = useState("");
  const [isUpdatingKyc, setIsUpdatingKyc] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  // Fetch user profile
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useFetchData(userId ? `users/${userId}` : null);

  // Fetch user properties
  const {
    data: propertiesData,
    isLoading: propertiesLoading,
    isError: propertiesError,
    refetch: refetchProperties,
  } = useFetchData(userId ? `admin/purchases/user/${userId}` : null);

  // Fetch KYC data
  const {
    data: kycData,
    isLoading: kycLoading,
    refetch: refetchKyc,
  } = useFetchData(userId ? `kyc/user/${userId}` : null);

  // Update KYC status mutation
  const { mutateAsync: updateKycStatus } = usePostData(
    userId ? `kyc/update-status/${userId}` : null
  );

  const user: User | null = userData?.data || null;
  const properties: Property[] = propertiesData?.data || [];
  const kyc: KYCData | null = kycData?.data || null;

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle edit button click
  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  // Handle KYC status update
  const handleKycStatusUpdate = async () => {
    if (!userId) return;

    setIsUpdatingKyc(true);
    try {
      await updateKycStatus({
        status: kycStatus,
        remark: kycRemark,
      });

      toast.success("KYC status updated successfully");
      setKycDialogOpen(false);
      refetchKyc();
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsUpdatingKyc(false);
    }
  };

  // Get KYC status icon and color
  const getKycStatusDisplay = (status: string) => {
    switch (status?.toUpperCase()) {
      case "VERIFIED":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
          text: "Verified",
          color: "text-green-500",
        };
      case "REJECTED":
        return {
          icon: <XCircle className="w-4 h-4 text-red-500" />,
          text: "Rejected",
          color: "text-red-500",
        };
      case "PENDING":
      default:
        return {
          icon: <Clock className="w-4 h-4 text-yellow-500" />,
          text: "Pending",
          color: "text-yellow-500",
        };
    }
  };

  // Loading state
  if (userLoading || propertiesLoading) {
    return (
      <div className="min-h-screen space-y-6">
        <div className="border-b border-[#E5E5E7] pb-4">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Customer management
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#116114]" />
            <p className="text-sm text-gray-600">Loading customer profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (userError || propertiesError) {
    return (
      <div className="min-h-screen space-y-6">
        <div className="border-b border-[#E5E5E7] pb-4">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Customer management
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="text-sm text-gray-600">
              Failed to load customer profile
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#116114] text-white hover:bg-[#116114]/90"
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state - no user found
  if (!user) {
    return (
      <div className="min-h-screen space-y-6">
        <div className="border-b border-[#E5E5E7] pb-4">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <span>Home</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Customer management
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <Home className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">Customer not found</p>
            <Link href="/main-admin/customers">
              <Button className="bg-[#116114] text-white hover:bg-[#116114]/90">
                Back to customers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Format user initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen space-y-6">
      <div className="border-b border-[#E5E5E7] pb-4">
        <div className="flex items-center space-x-1 text-[#858C95]">
          <Link href="/main-admin/homepage/">
            <span>Home</span>{" "}
          </Link>
          <span className="text-xl text-[#858C95]">/</span>
          <span className="font-medium text-xl text-[#116114]">
            Customer management
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-medium text-[#858C95] mt-4">
            View user profile
            <span className="text-[#116114] font-medium"> - {user.name}</span>
          </h1>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="flex items-center text-[#323539] gap-2 text-sm"
            onClick={() => setIsModalOpen(true)}
            size={"sm"}
          >
            <Plus className="w-4 h-4" />
            Add new property
          </Button>
        </div>
      </div>
      <h5 className="text-[#116114] font-medium py-2">Profile</h5>
      <div className="bg-white rounded-sm p-6 space-y-4">
        <h3 className="text-[#4C5560] font-medium text-sm">
          Customer's information
        </h3>
        <div className="max-w-xl rounded-t-xl space-y-4 p-6 bg-[#F4F4F4] flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-full">
            {/* <div className="absolute right-0 top-0">
              <button
                onClick={handleEditClick}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Camera className="text-[#858C95] h-4 w-4" />
              </button>
            </div> */}
            <Avatar className="h-20 w-20 bg-white border-4 border-white shadow-md">
              <AvatarImage
                src={profileImage || user.profileImage}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-white text-[#4C5560] text-2xl font-medium">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <p className="text-[#4C5560] font-medium">{user.name}</p>
        </div>
        <div className="max-w-xl rounded-b-xl space-y-4 p-10 bg-[#F4F4F4]">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4C5560]">Email address</p>
            <p className="font-medium text-[#181818] text-sm">{user.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4C5560]">Phone number</p>
            <p className="font-medium text-[#181818] text-sm">{user.phone}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#4C5560]">KYC status</p>
            <div className="flex items-center gap-2">
              {kycLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {getKycStatusDisplay(kyc?.status || user.kycStatus).icon}
                  <span
                    className={`font-medium text-sm ${getKycStatusDisplay(kyc?.status || user.kycStatus).color}`}
                  >
                    {kyc?.status || user.kycStatus}
                  </span>
                </>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setKycStatus(kyc?.status || user.kycStatus);
                  setKycRemark(kyc?.remark || "");
                  setKycDialogOpen(true);
                }}
                className="text-xs"
              >
                Edit
              </Button>
            </div>
          </div>
          {user.createdAt && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#4C5560]">Customer since</p>
              <p className="font-medium text-[#181818] text-sm">
                {formatDate(user.createdAt)}
              </p>
            </div>
          )}
        </div>
        <h3 className="text-[#4C5560] font-medium text-sm">
          Property management
        </h3>
        <div>
          {/* <div className="flex items-center font-medium justify-between text-sm">
            <p className="text-[#116114]">Owned properties</p>
            <Link
              href={`/main-admin/customers/owned-properties?tab=owned&userId=${userId}`}
            >
              <Button variant="ghost">View all</Button>
            </Link>
          </div> */}
          <div className="bg-[#F4F4F4] mt-2 rounded-md p-5">
            {properties.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Home className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">No properties found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {properties.slice(0, 4).map((property) => (
                  <div key={property.id} className="flex items-stretch gap-4">
                    <div className="h-full flex items-center">
                      <Image
                        src={property.images[0]?.imageUrl || placeholder}
                        alt={property.name}
                        width={100}
                        height={100}
                        className="object-cover rounded-lg h-full"
                      />
                    </div>
                    <div className="space-y-3 flex flex-col justify-center">
                      <p className="text-sm font-medium ml-3">
                        {property.name}
                      </p>
                      <p className="text-sm font-medium ml-3">
                        {property.totalUnitsPurchased} units
                      </p>
                      <Link
                        href={`/main-admin/customers/property-dashboard?tab=owned&propertyId=${property.id}&userId=${userId}&name=${property.name}`}
                      >
                        <Button variant={"ghost"}>View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center font-medium justify-between text-sm">
            <p className="text-[#116114]">Rented properties</p>
            {/* <Link
              href={`/main-admin/customers/owned-properties?tab=rented&userId=${userId}`}
            >
              <Button variant="ghost">View all</Button>
            </Link> */}
          </div>
          <div className="bg-[#F4F4F4] mt-2 rounded-md p-5">
            <div className="flex flex-col items-center justify-center py-8">
              <Home className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                No rented properties found
              </p>
            </div>
          </div>
        </div>
        <div className="py-8">
          <Link href="/main-admin/customers">
            <button className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm">
              <MdArrowBackIosNew /> Back to homepage
            </button>
          </Link>
        </div>
      </div>
      <AddUnitModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetchProperties={refetchProperties}
      />

      {/* KYC Status Update Dialog */}
      <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update KYC Status</DialogTitle>
            <DialogDescription>
              Update the KYC verification status for {user?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="kyc-status">Status</Label>
              <Select
                onValueChange={(value) => setKycStatus(value)}
                value={kycStatus}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="kyc-remark">Remark (Optional)</Label>
              <textarea
                id="kyc-remark"
                value={kycRemark}
                onChange={(e) => setKycRemark(e.target.value)}
                placeholder="Add a remark about the KYC status..."
                className="w-full p-2 border border-gray-300 rounded-md bg-white min-h-[80px] resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setKycDialogOpen(false)}
              disabled={isUpdatingKyc}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleKycStatusUpdate}
              disabled={isUpdatingKyc}
              className="bg-[#116114] hover:bg-[#116114]/90"
            >
              {isUpdatingKyc ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
