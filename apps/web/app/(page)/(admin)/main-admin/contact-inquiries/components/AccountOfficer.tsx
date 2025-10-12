"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInputV2 from "@/components/ui/PhoneInputV2";
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
  Ellipsis,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useFetchData, usePostData, usePutData } from "@/hooks/useApi";
import { axiosInstance } from "@/services/axiosInstance";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Breadcrumb } from "../../customers/components/Breadcrumb";
import { z } from "zod";

//  Validation Schema
const officerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters long"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(8, "Enter a valid phone number"),
});

interface Officer {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedProperties?: number;
  image?: string;
}

export default function AccountOfficerInfo() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingOfficer, setEditingOfficer] = useState<Officer | null>(null);
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [officerToDelete, setOfficerToDelete] = useState<Officer | null>(null);
  const [formData, setFormData] = useState<Partial<Officer>>({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } =
    useFetchData("account-officers");
  const { mutateAsync: createOfficer, isPending: isCreating } =
    usePostData("account-officers");
  const { mutateAsync: updateOfficer, isPending: isUpdating } =
    usePutData("account-officers");

  useEffect(() => {
    if (data) setOfficers(data.data);
  }, [data]);

  const isBusy = isCreating || isUpdating || isDeleting;

  const handleInputChange = (field: keyof Officer, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const result = officerSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
      setFormErrors(errors);
      return false;
    }
    setFormErrors({});
    return true;
  };

  const handleSave = async () => {
    setError(null);
    if (!validateForm()) return;
    try {
      if (isEditing && editingOfficer) {
        await updateOfficer({ ...formData, id: editingOfficer.id });
      } else {
        await createOfficer(formData);
      }
      setShowForm(false);
      setIsEditing(false);
      setEditingOfficer(null);
      setFormData({ name: "", email: "", phone: "" });
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // Edit handler
  const handleEdit = (officer: Officer) => {
    setEditingOfficer(officer);
    setFormData({
      name: officer.name,
      email: officer.email,
      phone: officer.phone,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`account-officers/${id}`);
      setShowDeleteModal(false);
      setOfficerToDelete(null);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: "Admin", href: "/main-admin" },
              { label: "Account Officers", href: "#" },
            ]}
          />
        </div>

        <div className="p-6 bg-white space-y-8 rounded-lg shadow">
          <div className="flex items-center space-x-2 mb-6">
            {isEditing && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Editing Mode
              </span>
            )}
            <h2 className="text-lg font-semibold text-[#181818]">
              {isEditing
                ? `Edit Officer - ${editingOfficer?.name}`
                : "Create Account Officer"}
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Full name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                className={`mt-1 ${formErrors.name ? "border-red-500" : ""}`}
              />
              {formErrors.name && (
                <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email"
                className={`mt-1 ${formErrors.email ? "border-red-500" : ""}`}
              />
              {formErrors.email && (
                <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone number *</Label>
              <PhoneInputV2
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                placeholder="Enter phone number"
                error={!!formErrors.phone}
              />
              {formErrors.phone && (
                <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              onClick={handleSave}
              disabled={isBusy}
              className="bg-[#116114] text-white flex items-center gap-2"
            >
              {isBusy ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" /> Saving...
                </>
              ) : isEditing ? (
                "Update Officer"
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Create Officer
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                setShowForm(false);
                setIsEditing(false);
                setEditingOfficer(null);
                setFormData({ name: "", email: "", phone: "" });
                setFormErrors({});
              }}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/main-admin" },
            { label: "Account Officers", href: "#" },
          ]}
        />
        <Button
          onClick={() => setShowForm(true)}
          disabled={isBusy || isLoading}
          className="bg-[#116114] flex items-center gap-2 text-sm hover:bg-green-800"
        >
          <UserPlus className="w-4 h-4" />
          Add Officer
        </Button>
      </div>

      {isError && (
        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg">
          Failed to load account officers
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="animate-spin text-[#116114] w-8 h-8" />
        </div>
      ) : officers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
          <p>No account officers found</p>
          <p className="text-xs">Click "Add Officer" to create one</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-[#EAEBF0]">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Assigned Properties</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {officers.map((officer) => (
              <TableRow key={officer.id}>
                <TableCell className="!capitalize !font-semibold">
                  {officer.name}
                </TableCell>
                <TableCell>{officer.email}</TableCell>
                <TableCell>{officer.phone}</TableCell>
                <TableCell>{officer.assignedProperties || 0}</TableCell>
                <TableCell>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Ellipsis className="w-4 h-4" />
                      </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="bg-white rounded shadow-md border p-1 text-sm">
                      <DropdownMenu.Item
                        onClick={() => handleEdit(officer)}
                        className="px-2 py-1 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onClick={() => {
                          setOfficerToDelete(officer);
                          setShowDeleteModal(true);
                        }}
                        className="px-2 py-1 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
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
                <span className="font-semibold text-gray-900 first-letter:!capitalize">
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

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
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
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
