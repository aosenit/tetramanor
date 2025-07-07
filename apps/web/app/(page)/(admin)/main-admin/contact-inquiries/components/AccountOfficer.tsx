"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  Loader2,
  Edit,
  Trash2,
  UserPlus,
  ArrowLeft,
  Ellipsis,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useDeleteData,
  useFetchData,
  usePostData,
  usePutData,
} from "@/hooks/useApi";
import { axiosInstance } from "@/services/axiosInstance";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import five from "@/assets/admin/customer/five.svg";

// Officer type
interface Officer {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedProperties?: number;
  image?: string;
}

export default function AccountOfficerInfo() {
  const [activeTab, setActiveTab] = useState("account-officers");
  const router = useRouter();
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [officerToDelete, setOfficerToDelete] = useState<Officer | null>(null);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [formData, setFormData] = useState<Partial<Officer>>({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } =
    useFetchData("account-officers");
  const { mutateAsync: createOfficer, isPending: isCreating } =
    usePostData("account-officers");
  const { mutateAsync: updateOfficer, isPending: isUpdating } =
    usePutData("account-officers");
  const { mutateAsync: deleteOfficer, isPending: isDeleting } =
    useDeleteData("account-officers");

  useEffect(() => {
    if (data) {
      setOfficers(data?.data);
    }
  }, [data]);

  const handleClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "contact") {
      router.push("/main-admin/contact-inquiries");
    }
  };

  const handleInputChange = (field: keyof Officer, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (isEditing && editingOfficer) {
        await updateOfficer({ ...formData, id: editingOfficer.id });
      } else {
        await createOfficer(formData);
      }
      setFormData({
        name: "",
        email: "",
        phone: "",
      });
      setShowAddAgent(false);
      setIsEditing(false);
      setEditingOfficer(null);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleEdit = (officer: Officer) => {
    setEditingOfficer(officer);
    setFormData({
      name: officer.name,
      email: officer.email,
      phone: officer.phone,
    });
    setIsEditing(true);
    setShowAddAgent(true);
  };

  const handleDeleteClick = (officer: Officer) => {
    setOfficerToDelete(officer);
    setShowDeleteModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      await axiosInstance.delete(`account-officers/${id}`);
      setShowDeleteModal(false);
      setOfficerToDelete(null);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  if (showAddAgent) {
    return (
      <div className="min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[#858C95]">
            <span>Admin</span>
            <span className="text-xl text-[#858C95]">/</span>
            <span className="font-medium text-xl text-[#116114]">
              Contact Page
            </span>
          </div>
        </div>
        <div className="p-6 bg-white space-y-8">
          <div className="">
            <div className="flex items-center space-x-3 mb-6">
              {isEditing && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  <span>✏️</span>
                  <span>Editing Mode</span>
                </div>
              )}
              <h2 className="text-lg font-semibold text-[#181818]">
                {isEditing
                  ? `Edit Account Officer - ${editingOfficer?.name}`
                  : "Account Officer Management"}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full name *
                </Label>
                <Input
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#116114] focus:border-[#116114] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={isCreating || isUpdating}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email address *
                </Label>
                <Input
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#116114] focus:border-[#116114] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isCreating || isUpdating}
                  placeholder="Enter email address"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone number *
                </Label>
                <Input
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#116114] focus:border-[#116114] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={isCreating || isUpdating}
                  placeholder="Enter phone number"
                  type="tel"
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
                  {error}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={isCreating || isUpdating}
              className="px-6 py-3 bg-[#116114] text-white rounded-lg hover:bg-[#116114]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 font-medium"
            >
              {isCreating || isUpdating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : isEditing ? (
                <>
                  <span>💾</span>
                  <span>Update Officer</span>
                </>
              ) : (
                <>
                  <span>➕</span>
                  <span>Create Officer</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setShowAddAgent(false);
                setIsEditing(false);
                setEditingOfficer(null);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                });
                setError(null);
              }}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to page</span>
            </button>
          </div>
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
              Contact Inquiries
            </span>
          </div>
          <Button
            onClick={() => setShowAddAgent(true)}
            disabled={isLoading || isCreating || isUpdating || isDeleting}
            className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800"
          >
            <UserPlus className="w-4 h-4" />
            {isLoading ? "Loading..." : "Add Account Officer"}
          </Button>
        </div>
      </div>

      {/* Global Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="text-red-500">⚠️</div>
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="w-full">
        <div className="grid w-fit text-sm grid-cols-2 gap-2">
          <p
            onClick={() => handleClick("contact")}
            className={`px-6 py-2 rounded text-center text-[#4C5560] cursor-pointer font-medium ${
              activeTab === "contact" ? "bg-white" : ""
            }`}
          >
            Contact
          </p>
          <p
            onClick={() => handleClick("account-officers")}
            className={`px-6 py-2 rounded text-center text-[#4C5560] cursor-pointer font-medium ${
              activeTab === "account-officers" ? "bg-white" : ""
            }`}
          >
            Account officers
          </p>
        </div>
      </div>

      {/* Account Officers Section */}
      <div>
        <h2 className="text-[#116114] font-medium mb-4">Account Officers</h2>
        <div className="bg-white rounded-md shadow overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#116114]" />
                <p className="text-sm text-gray-600">
                  Loading account officers...
                </p>
              </div>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-red-500 text-4xl">⚠️</div>
                <p className="text-sm text-gray-600">
                  Failed to load account officers
                </p>
                <Button
                  onClick={() => refetch()}
                  className="bg-[#116114] text-white hover:bg-[#116114]/90"
                >
                  Try again
                </Button>
              </div>
            </div>
          ) : officers?.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-gray-400 text-4xl">👥</div>
                <p className="text-sm text-gray-600">
                  No account officers found
                </p>
                <p className="text-xs text-gray-500">
                  Add your first account officer to get started
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="!bg-[#EAEBF0] hover:!bg-[#EAEBF0]">
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Officer Name
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Email
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Phone Number
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Assigned Properties
                  </TableHead>
                  <TableHead className="!text-[#181818] font-medium text-sm">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officers?.map((officer) => (
                  <TableRow key={officer.id}>
                    <TableCell className="text-[#181818] text-sm font-medium">
                      {officer.name}
                    </TableCell>
                    <TableCell className="text-[#181818] text-sm">
                      {officer.email}
                    </TableCell>
                    <TableCell className="text-[#181818] text-sm">
                      {officer.phone}
                    </TableCell>
                    <TableCell className="text-[#181818] text-sm">
                      {officer.assignedProperties || 0}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <Ellipsis className="size-2" />
                          </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content
                          sideOffset={4}
                          className="z-50 min-w-[120px] rounded-md border bg-white p-1 shadow-md"
                        >
                          <DropdownMenu.Item
                            className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2"
                            onClick={() => handleEdit(officer)}
                            disabled={isCreating || isUpdating || isDeleting}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2 text-red-600"
                            onClick={() => handleDeleteClick(officer)}
                            disabled={isCreating || isUpdating || isDeleting}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Back to page link */}
      <div className="mt-8">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to page
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Delete Account Officer
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {officerToDelete && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Are you sure you want to delete account officer{" "}
                <span className="font-semibold text-gray-900">
                  {officerToDelete.name}
                </span>
                ?
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    <strong>Email:</strong> {officerToDelete.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {officerToDelete.phone}
                  </div>
                  {officerToDelete.assignedProperties && (
                    <div>
                      <strong>Assigned Properties:</strong>{" "}
                      {officerToDelete.assignedProperties}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800 mb-1">
                      Warning
                    </p>
                    <p className="text-sm text-red-700">
                      This will permanently delete the account officer and all
                      associated data. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteModal(false);
                setOfficerToDelete(null);
              }}
              disabled={isDeleting}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                officerToDelete && handleDelete(officerToDelete.id)
              }
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Officer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddAgent({ onBack }: { onBack: () => void }) {
  // ...rest of file remains unchanged

  const [formData, setFormData] = useState<Partial<Officer>>({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: createOfficer, isPending: isCreating } =
    usePostData("account-officers");
  // For update, you can add a prop for officer to edit and use usePutData(`account-officers/${id}`)

  const handleInputChange = (field: keyof Officer, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError(null);
    try {
      await createOfficer(formData);
      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-1 text-[#858C95]">
          <span>Admin</span>
          <span className="text-xl text-[#858C95]">/</span>
          <span className="font-medium text-xl text-[#116114]">
            Contact Page
          </span>
        </div>
      </div>
      <div className="p-6 bg-white space-y-8">
        <div className="">
          <h2 className="text-sm font-medium text-[#181818] mb-4">
            Account officer management
          </h2>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                className="bg-[#D9D9D9]"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email </Label>
              <Input
                id="email"
                className="bg-[#D9D9D9]"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                className="bg-[#D9D9D9]"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 text-xs">{error}</div>}
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <button
            onClick={handleSave}
            disabled={isCreating}
            className="bg-[#116114] hover:bg-[#116114] text-white text-sm px-8 py-2 rounded"
          >
            {isCreating ? "Saving..." : "Save changes"}
          </button>
          <button
            onClick={onBack}
            className="text-[#323539] flex items-center gap-2 hover:text-[#323539] text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to page
          </button>
        </div>
      </div>
    </div>
  );
}
