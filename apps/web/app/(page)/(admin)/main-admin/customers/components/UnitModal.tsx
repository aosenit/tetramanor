"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "@/assets/home/logo.webp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  X,
  Trash2,
  Building2,
  User,
  Home,
  Loader2,
  CheckCircle,
  DollarSign,
  Hash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFetchData, usePostData } from "@/hooks/useApi";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Property {
  id: string;
  name: string;
  address: string;
  unitTypes: string[];
}

interface AccountOfficer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Unit {
  unitName: string;
  type: string;
  bedroomCount: number;
  price: number;
  accountOfficerId: string;
  unitType: string;
  isRented: boolean;
  floor: number;
}

interface PurchasePayload {
  userId: string;
  propertyId: string;
  accountOfficerId: string;
  units: Unit[];
}

const unitTypeOptions = [
  { value: "THREE_BEDROOM_APARTMENT", label: "3 Bedroom Apartment" },
  { value: "TWO_BEDROOM_APARTMENT", label: "2 Bedroom Apartment" },
  { value: "ONE_BEDROOM_APARTMENT", label: "1 Bedroom Apartment" },
  { value: "STUDIO_APARTMENT", label: "Studio Apartment" },
  { value: "FOUR_BEDROOM_MAISONETTE", label: "4 Bedroom Maisonette" },
  { value: "SEMI_DETACHED_DUPLEX", label: "Semi-Detached Duplex" },
];

const bedroomCountMap: Record<string, number> = {
  THREE_BEDROOM_APARTMENT: 3,
  TWO_BEDROOM_APARTMENT: 2,
  ONE_BEDROOM_APARTMENT: 1,
  STUDIO_APARTMENT: 0,
  FOUR_BEDROOM_MAISONETTE: 4,
  SEMI_DETACHED_DUPLEX: 4,
};

export default function AddUnitModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  // State management
  const [selectedProperty, setSelectedProperty] = useState<string>("");
  const [selectedAccountOfficer, setSelectedAccountOfficer] =
    useState<string>("");
  const [units, setUnits] = useState<Unit[]>([
    {
      unitName: "",
      type: "",
      bedroomCount: 0,
      price: 0,
      accountOfficerId: "",
      unitType: "",
      isRented: false,
      floor: 0,
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // API data fetching
  const { data: propertiesData, isLoading: propertiesLoading } =
    useFetchData("admin/properties");
  const { data: accountOfficersData, isLoading: accountOfficersLoading } =
    useFetchData("account-officers");
  const { mutateAsync: createPurchase } = usePostData("admin/purchases");

  const properties: Property[] = propertiesData?.data?.items || [];
  const accountOfficers: AccountOfficer[] = accountOfficersData?.data || [];

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setSelectedProperty("");
      setSelectedAccountOfficer("");
      setUnits([
        {
          unitName: "",
          type: "",
          bedroomCount: 0,
          price: 0,
          accountOfficerId: "",
          unitType: "",
          isRented: false,
          floor: 0,
        },
      ]);
    }
  }, [open]);

  // Update account officer for all units when selected
  useEffect(() => {
    if (selectedAccountOfficer) {
      setUnits((prev) =>
        prev.map((unit) => ({
          ...unit,
          accountOfficerId: selectedAccountOfficer,
        }))
      );
    }
  }, [selectedAccountOfficer]);

  const handleAddUnit = () => {
    setUnits((prev) => [
      ...prev,
      {
        unitName: "",
        type: "",
        bedroomCount: 0,
        price: 0,
        accountOfficerId: selectedAccountOfficer,
        unitType: "",
        isRented: false,
        floor: 0,
      },
    ]);
  };

  const handleRemoveUnit = (index: number) => {
    if (units.length > 1) {
      setUnits((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleUnitChange = (index: number, field: keyof Unit, value: any) => {
    setUnits((prev) =>
      prev.map((unit, i) => {
        if (i === index) {
          const updatedUnit = { ...unit, [field]: value };

          // Auto-update bedroom count based on unit type
          if (field === "unitType" && value) {
            updatedUnit.bedroomCount = bedroomCountMap[value] || 0;
          }

          return updatedUnit;
        }
        return unit;
      })
    );
  };

  const handleSubmit = async () => {
    if (!userId || !selectedProperty || !selectedAccountOfficer) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate units
    const validUnits = units.filter(
      (unit) => unit.unitName && unit.unitType && unit.price > 0
    );

    if (validUnits.length === 0) {
      toast.error("Please add at least one valid unit");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: PurchasePayload = {
        userId,
        propertyId: selectedProperty,
        accountOfficerId: selectedAccountOfficer,
        units: validUnits.map((unit) => ({
          ...unit,
          accountOfficerId: selectedAccountOfficer,
        })),
      };

      await createPurchase(payload);
      toast.success("Purchase created successfully");
      onClose();
    } catch (error) {
      console.error("Error creating purchase:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPropertyData = properties.find(
    (p) => p.id === selectedProperty
  );
  const selectedOfficerData = accountOfficers.find(
    (ao) => ao.id === selectedAccountOfficer
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-700 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src={logo} alt="Logo" width={32} height={32} />
              <div>
                <h2 className="text-lg font-semibold">Add Property Purchase</h2>
                <p className="text-sm text-green-100">
                  Create new property purchase for customer
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Property and Account Officer Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-[#116114]" />
                  Select Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Property</Label>
                  <Select
                    value={selectedProperty}
                    onValueChange={setSelectedProperty}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertiesLoading ? (
                        <SelectItem value="loading" disabled>
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading properties...
                          </div>
                        </SelectItem>
                      ) : properties.length > 0 ? (
                        properties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {property.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {property.address}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No properties available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPropertyData && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Selected Property
                      </span>
                    </div>
                    <div className="text-sm text-green-700">
                      <div>
                        <strong>Name:</strong> {selectedPropertyData.name}
                      </div>
                      <div>
                        <strong>Address:</strong> {selectedPropertyData.address}
                      </div>
                      <div>
                        <strong>Available Types:</strong>{" "}
                        {selectedPropertyData.unitTypes?.join(", ") ||
                          "All types"}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Officer Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-[#116114]" />
                  Select Account Officer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Account Officer</Label>
                  <Select
                    value={selectedAccountOfficer}
                    onValueChange={setSelectedAccountOfficer}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose an account officer" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountOfficersLoading ? (
                        <SelectItem value="loading" disabled>
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading account officers...
                          </div>
                        </SelectItem>
                      ) : accountOfficers.length > 0 ? (
                        accountOfficers.map((officer) => (
                          <SelectItem key={officer.id} value={officer.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {officer.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {officer.email}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No account officers available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {selectedOfficerData && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Selected Officer
                      </span>
                    </div>
                    <div className="text-sm text-blue-700">
                      <div>
                        <strong>Name:</strong> {selectedOfficerData.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {selectedOfficerData.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {selectedOfficerData.phone}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Units Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-[#116114]" />
                  Units ({units.length})
                </CardTitle>
                <Button
                  onClick={handleAddUnit}
                  size="sm"
                  className="bg-[#116114] hover:bg-[#116114]/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {units.map((unit, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-white">
                        Unit {index + 1}
                      </Badge>
                      {unit.unitName && (
                        <Badge variant="secondary">{unit.unitName}</Badge>
                      )}
                    </div>
                    {units.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveUnit(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Unit Name */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Unit Name</Label>
                      <Input
                        placeholder="e.g., Unit A1, Apartment 2B"
                        value={unit.unitName}
                        onChange={(e) =>
                          handleUnitChange(index, "unitName", e.target.value)
                        }
                        className="text-sm"
                      />
                    </div>

                    {/* Unit Type */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Unit Type</Label>
                      <Select
                        value={unit.unitType}
                        onValueChange={(value) =>
                          handleUnitChange(index, "unitType", value)
                        }
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Select unit type" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Floor */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Floor</Label>
                      <Input
                        type="number"
                        placeholder="Floor number"
                        value={unit.floor || ""}
                        onChange={(e) =>
                          handleUnitChange(
                            index,
                            "floor",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="text-sm"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Price (₦)</Label>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={unit.price || ""}
                        onChange={(e) =>
                          handleUnitChange(
                            index,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="text-sm"
                      />
                    </div>

                    {/* Bedroom Count */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Bedrooms</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={unit.bedroomCount || ""}
                        onChange={(e) =>
                          handleUnitChange(
                            index,
                            "bedroomCount",
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="text-sm"
                        disabled
                      />
                    </div>

                    {/* Rental Status */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Rental Status
                      </Label>
                      <Select
                        value={unit.isRented ? "true" : "false"}
                        onValueChange={(value) =>
                          handleUnitChange(index, "isRented", value === "true")
                        }
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="false">Available</SelectItem>
                          <SelectItem value="true">Rented</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Unit Summary */}
                  {(unit.unitName || unit.unitType || unit.price > 0) && (
                    <div className="mt-4 p-3 bg-white rounded-lg border">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          {unit.unitName && (
                            <div className="flex items-center gap-1">
                              <Hash className="h-3 w-3 text-gray-500" />
                              <span className="font-medium">
                                {unit.unitName}
                              </span>
                            </div>
                          )}
                          {unit.unitType && (
                            <div className="flex items-center gap-1">
                              <Home className="h-3 w-3 text-gray-500" />
                              <span>
                                {
                                  unitTypeOptions.find(
                                    (opt) => opt.value === unit.unitType
                                  )?.label
                                }
                              </span>
                            </div>
                          )}
                          {unit.bedroomCount > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {unit.bedroomCount} BR
                            </Badge>
                          )}
                        </div>
                        {unit.price > 0 && (
                          <div className="flex items-center gap-1 text-green-600 font-medium">
                            <DollarSign className="h-3 w-3" />₦
                            {unit.price.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{units.length}</span> unit
                {units.length !== 1 ? "s" : ""} selected
              </div>
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting || !selectedProperty || !selectedAccountOfficer
                }
                className="bg-[#116114] hover:bg-[#116114]/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Purchase...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Create Purchase
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
