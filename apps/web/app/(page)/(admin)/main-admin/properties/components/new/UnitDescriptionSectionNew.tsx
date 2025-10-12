"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import Dropdown from "../../../rentals/edit-rentals/components/Dropdown";
import { X } from "lucide-react";
import { propertySchema } from "@/lib/schema";

type UnitDescriptionSectionProps = {
	formData: z.infer<typeof propertySchema>;
	errors: any;
	customUnitType: string;
	setCustomUnitType: (v: string) => void;
	handleInputChange: (field: string, value: any) => void;
	handleAddCustomUnitType: () => void;
	handleRemoveUnitType: (type: string) => void;
	unitTypeOptions: string[];
	setFormData: React.Dispatch<
		React.SetStateAction<z.infer<typeof propertySchema>>
	>;
	unitIndex: number;
	handleRemoveUnitsForm;
};

export default function UnitDescriptionSection({
	formData,
	errors,
	customUnitType,
	setCustomUnitType,
	handleInputChange,
	handleAddCustomUnitType,
	handleRemoveUnitType,
	unitTypeOptions,
	setFormData,
	unitIndex,
	handleRemoveUnitsForm,
}: UnitDescriptionSectionProps) {
	const currencyOptions = ["NGN", "USD", "EUR", "GBP"];

	// Get the specific unit for this form
	const currentUnit = formData.units?.[unitIndex] ?? {
		numberOfUnits: 0,
		price: 0,
		currency: "NGN",
		unitType: "",
		description: "",
	};

	// Check if this unit has a selected unit type
	const hasSelectedUnitType =
		currentUnit.unitType && currentUnit.unitType.trim() !== "";

	const handleUnitFieldChange = (field: string, value: any) => {
		setFormData((prev) => {
			const updatedUnits = [...(prev.units || [])];
			updatedUnits[unitIndex] = { ...updatedUnits[unitIndex], [field]: value };
			return {
				...prev,
				units: updatedUnits,
			};
		});
	};

	const handleUnitTypeSelect = (type: string) => {
		const label = type.replace(/_/g, " ");

		// If this unit type is already selected, remove it
		if (currentUnit.unitType?.toLowerCase() === label.toLowerCase()) {
			handleUnitFieldChange("unitType", "");
			return;
		}

		// Otherwise, set it as the selected unit type for this unit
		handleUnitFieldChange("unitType", label);
	};

	const handleCustomUnitTypeAdd = () => {
		const trimmed = customUnitType.trim();
		if (!trimmed) return;

		// Set the custom unit type as selected for this unit
		handleUnitFieldChange("unitType", trimmed);
		setCustomUnitType("");
	};

	return (
		<div className="bg-white border border-gray-200 rounded-lg p-6">
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-base font-medium text-[#116114]">
						Unit Description
					</h2>
					<button
						type="button"
						onClick={() => handleRemoveUnitsForm(unitIndex)}
						className="text-[#116114] hover:text-red-800 text-sm font-medium px-2 rounded-md py-1 hover:bg-red-50 transition-colors"
					>
						<X />
					</button>
				</div>

				{/* Number of Units */}
				<div className="space-y-2">
					<Label
						htmlFor={`no-of-units-${unitIndex}`}
						className="text-sm font-medium text-[#323539]"
					>
						Number of Units *
					</Label>
					<Input
						id={`no-of-units-${unitIndex}`}
						type="number"
						value={currentUnit.numberOfUnits || ""}
						placeholder="Enter number of units"
						onChange={(e) =>
							handleUnitFieldChange(
								"numberOfUnits",
								Number(e.target.value) || 0
							)
						}
						className={`w-full bg-[#E5E5E7] border ${
							errors.numberOfUnits ? "border-red-500" : "border-[#116114]"
						}`}
						min="0"
						required
					/>
					{errors.numberOfUnits && (
						<p className="text-red-500 text-sm">{errors.numberOfUnits}</p>
					)}
				</div>

				{/* Currency and Price */}
				<div className="grid sm:grid-cols-6 gap-4 mb-4">
					<div className="col-span-1">
						<Label className="block mb-1 text-sm text-[#323539] font-medium !text-nowrap">
							Currency
						</Label>
						<Dropdown
							required
							options={currencyOptions}
							value={
								currencyOptions.find(
									(c) => c.toUpperCase() === currentUnit.currency
								) || ""
							}
							onChange={(value) => {
								handleUnitFieldChange("currency", value.toUpperCase());
							}}
						/>
						{errors.currency && (
							<p className="text-red-500 text-sm mt-1">{errors.currency}</p>
						)}
					</div>

					<div className="col-span-5">
						<Label className="block mb-1 text-sm text-[#323539] font-medium">
							Price
						</Label>
						<Input
							required
							type="number"
							value={currentUnit.price || ""}
							onChange={(e) =>
								handleUnitFieldChange("price", Number(e.target.value) || 0)
							}
							placeholder="Enter price"
							className={`bg-[#E5E5E7] border !py-5 ${
								errors.price ? "border-red-500" : "border-[#116114]"
							}`}
						/>
						{errors.price && (
							<p className="text-red-500 text-sm mt-1">{errors.price}</p>
						)}
					</div>
				</div>

				{/* Unit Types */}
				<div className="space-y-2">
					<Label className="text-sm font-medium text-[#323539]">
						Unit Type
					</Label>

					<div className="flex flex-wrap gap-2 mb-2">
						{/* Default unit types */}
						{unitTypeOptions.map((type) => {
							const label = type.replace(/_/g, " ");
							const isSelected =
								currentUnit.unitType?.toLowerCase() === label.toLowerCase();
							const isDisabled = hasSelectedUnitType && !isSelected;

							return (
								<button
									type="button"
									key={type}
									disabled={isDisabled}
									className={`flex items-center px-3 py-1 rounded-full border text-sm transition-colors ${
										isSelected ? "bg-[#116114] text-white border-[#116114]"
										: isDisabled ?
											"bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
										:	"bg-white text-[#323539] border-gray-300 hover:border-[#116114]"
									}`}
									onClick={() => handleUnitTypeSelect(type)}
								>
									{label}
									{isSelected && (
										<span
											className="ml-2 cursor-pointer"
											onClick={(e) => {
												e.stopPropagation();
												handleUnitFieldChange("unitType", "");
											}}
										>
											&times;
										</span>
									)}
								</button>
							);
						})}

						{currentUnit.unitType &&
							!unitTypeOptions
								.map((opt) => opt.replace(/_/g, " ").toLowerCase())
								.includes(currentUnit.unitType.toLowerCase()) && (
								<span className="flex items-center px-3 py-1 rounded-full border bg-[#116114] text-white border-[#116114] text-sm">
									{currentUnit.unitType}
									<button
										type="button"
										className="ml-2"
										onClick={() => handleUnitFieldChange("unitType", "")}
									>
										&times;
									</button>
								</span>
							)}
					</div>

					{/* Add custom unit type */}
					<div className="flex gap-2 mt-2">
						<Input
							type="text"
							placeholder="Add custom unit type"
							value={customUnitType}
							onChange={(e) => setCustomUnitType(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleCustomUnitTypeAdd();
								}
							}}
							disabled={hasSelectedUnitType}
							className={`flex-1 bg-[#E5E5E7] border border-[#116114] ${
								hasSelectedUnitType ? "opacity-50 cursor-not-allowed" : ""
							}`}
						/>
						<button
							type="button"
							onClick={handleCustomUnitTypeAdd}
							disabled={hasSelectedUnitType || !customUnitType.trim()}
							className={`bg-[#116114] text-white px-4 py-2 rounded ${
								hasSelectedUnitType || !customUnitType.trim() ?
									"opacity-50 cursor-not-allowed"
								:	""
							}`}
						>
							Add
						</button>
					</div>

					{hasSelectedUnitType && (
						<p className="text-sm text-gray-600 italic">
							Remove the selected unit type to choose a different one
						</p>
					)}

					{errors.unitType && (
						<p className="text-red-500 text-sm">{errors.unitType}</p>
					)}
				</div>

				{/* Description */}
				<div className="space-y-2">
					<Label
						htmlFor={`description-${unitIndex}`}
						className="text-sm font-medium text-[#323539]"
					>
						Description (Optional)
					</Label>
					<Input
						id={`description-${unitIndex}`}
						type="text"
						value={currentUnit.description || ""}
						placeholder="Enter unit description"
						onChange={(e) =>
							handleUnitFieldChange("description", e.target.value)
						}
						className="w-full bg-[#E5E5E7] border border-[#116114]"
					/>
				</div>
			</div>
		</div>
	);
}
