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
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";

export default function AddUnitModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState("");

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

  if (!open) return null; // ✅ safe now

  const apartmentTypes = [
    { id: "studio", label: "Studio apartment", defaultQuantity: "2" },
    { id: "4bedroom", label: "4 bedroom duplex", defaultQuantity: "" },
    { id: "3br", label: "3BR apartment", defaultQuantity: "" },
    { id: "3br-bq", label: "3BR +BQ", defaultQuantity: "" },
    { id: "2br", label: "2BR apartment", defaultQuantity: "" },
  ];

  const handleSelect = (label: string) => {
    setSelectedUnit(label);
    setSelectedQuantity("");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto p-4">
      <div className="w-full bg-white max-w-3xl overflow-hidden">
        <header className="bg-[#323539] rounded-b-md text-white px-6 py-4">
          <div className="flex justify-center items-center gap-4">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </header>

        <div className="px-6 space-y-4 py-4 ">
               <div className="">
                 <p className="text-[#116114]   font-medium">
                   Add payment
                 </p>
                  </div>
                  <p className="text-[#323539] text-xs ">Customer <span className="font-medium ml-3 text-sm text-black">Grace Olabayo</span></p>
             </div>

        <div className="px-6 pb-6 pt-2 space-y-6">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Property name
              </Label>
              <Select defaultValue="tm-meadows">
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tm-meadows">TM meadows</SelectItem>
                  <SelectItem value="queen-mary">Queen mary</SelectItem>
                  <SelectItem value="queen-mary">TM highgardens</SelectItem>
                  <SelectItem value="queen-mary">Kings landing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Payment type
              </Label>
              <Select defaultValue="cash">
                <SelectTrigger className="bg-[#E5E5E7] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="banktransfer">Bank transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
           <div>
                       <Label className="text-[#323539] text-sm font-medium">
                         Unit type
                       </Label>
         
                       <Select>
                         <SelectTrigger className="bg-[#E5E5E7] text-xs">
                           <SelectValue>
                             {selectedUnit && selectedQuantity
                               ? `${selectedUnit} — ${selectedQuantity} unit${selectedQuantity !== "1" ? "s" : ""}`
                               : "Select unit type"}
                           </SelectValue>
                         </SelectTrigger>
         
                         <SelectContent className="w-full max-w-2xl p-4 space-y-4 bg-white shadow-lg rounded-md">
                           <p className="text-sm py-2 text-gray-600">
                             Check the type and enter number of units acquired
                           </p>
         
                           {apartmentTypes.map((apartment) => (
                             <div
                               key={apartment.id}
                               className="flex items-center py-3 space-y-4 justify-between cursor-pointer"
                               onClick={() => handleSelect(apartment.label)}
                             >
                               <div className="flex items-center space-x-3">
                                 <Checkbox
                                   id={apartment.id}
                                   checked={selectedUnit === apartment.label}
                                   onCheckedChange={() => handleSelect(apartment.label)}
                                   className="h-5 w-5 border-2 border-gray-300"
                                 />
                                 <Label
                                   htmlFor={apartment.id}
                                   className="text-gray-700 font-medium cursor-pointer"
                                 >
                                   {apartment.label}
                                 </Label>
                               </div>
                             </div>
                           ))}
         
                           {selectedUnit && (
                             <div className="pt-2">
                               <Label className="text-sm text-gray-700">
                                 Enter quantity for {selectedUnit}
                               </Label>
                               <Input
                                 type="number"
                                 value={selectedQuantity}
                                 onChange={(e) => setSelectedQuantity(e.target.value)}
                                 placeholder="e.g. 3"
                                 min="1"
                                 className="mt-1 w-20 h-8 text-center text-sm border border-gray-300"
                               />
                             </div>
                           )}
                         </SelectContent>
                       </Select>
                     </div>

            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Amount paid
              </Label>
              <Input
                type="text"
                placeholder="₦"
                className="bg-[#E5E5E7] text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#323539] text-sm font-medium">
                Balance remaining
              </Label>
              <Input
                type="text"
                placeholder="₦"
                className="bg-[#E5E5E7] text-xs"
              />
            </div>
              <div className="space-y-2">
                <Label className="text-[#323539] text-sm font-medium">
                  Payment date
                </Label>
                <Input
                  type="text"
                  className="bg-[#E5E5E7] text-xs"
                />
              </div>
            <div className="flex flex-col sm:flex-row justify-between pt-4">
              <Button
                type="submit"
                className="bg-[#116114] font-medium text-sm hover:bg-[#116114] text-white"
              >
                Save payment
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-[#323539]"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
