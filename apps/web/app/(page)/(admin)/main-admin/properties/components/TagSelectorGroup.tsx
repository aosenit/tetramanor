"use client";

import React, { useState } from "react";

interface TagSelectGroupProps {
	label: string;
	options: { id: string; name: string; icon?: string }[];
	value: { id: string; name: string; icon?: string }[];
	onChange: (tags: { id: string; name: string; icon?: string }[]) => void;
	placeholder?: string;
	required?: boolean;
	errorMessage?: string;
	disabled?: boolean;
}

export default function TagSelectGroup({
	label,
	options,
	value,
	onChange,
	placeholder = "Select tags...",
	required = false,
	errorMessage = "At least one tag is required",
	disabled = false,
}: TagSelectGroupProps) {
	const [selectedValue, setSelectedValue] = useState("");
	const showError = required && value.length === 0;

	const availableOptions = options?.filter(
		(opt) => !value?.some((tag) => tag.id === opt.id)
	);

	const handleSelect = (id: string) => {
		setSelectedValue(id);
		const selected = options.find((opt) => opt.id === id);
		if (selected && !value?.some((tag) => tag.id === id)) {
			onChange([...value, selected]);
			setSelectedValue("");
		}
	};

	const handleRemove = (id: string) => {
		onChange(value?.filter((tag) => tag.id !== id));
	};

	return (
		<div className="w-full space-y-2">
			<label className="text-sm font-medium text-gray-700">{label}</label>

			<div
				className={`flex flex-wrap items-center gap-2 px-2 py-2 rounded-md bg-[#e5e5e7] ${
					showError ? "border border-red-500" : ""
				} ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
			>
				{value?.map((tag) => (
					<span
						key={tag.id}
						className="flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm bg-white uppercase"
					>
						{tag.icon ?
							<img src={tag.icon} alt={tag.name} className="w-6 h-6 mr-2" />
						:	<p className="text-green-600 font-semibold pr-2">TM</p>}
						{tag.name}
						{!disabled && (
							<button
								type="button"
								onClick={() => handleRemove(tag.id)}
								className="ml-2 text-gray-500 hover:text-red-500"
							>
								&times;
							</button>
						)}
					</span>
				))}

				{!disabled && availableOptions?.length > 0 && (
					<select
						value={selectedValue}
						onChange={(e) => handleSelect(e.target.value)}
						className="bg-[#e5e5e7] border-none outline-none text-sm min-w-[120px] py-1 w-full"
					>
						<option value="">{placeholder}</option>
						{availableOptions.map((opt) => (
							<option key={opt.id} value={opt.id}>
								{opt.name}
							</option>
						))}
					</select>
				)}
			</div>

			{showError ?
				<p className="text-xs text-red-500">{errorMessage}</p>
			:	placeholder && <p className="text-xs text-gray-500">{placeholder}</p>}
		</div>
	);
}
