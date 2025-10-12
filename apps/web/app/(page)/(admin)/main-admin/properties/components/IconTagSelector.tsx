"use client";
import React, { useState, useEffect, useRef } from "react";

interface IconOption {
	id: string;
	label: string;
	iconUrl: string;
}

interface IconTagSelectorProps {
	label: string;
	placeholder?: string;
	value: IconOption[];
	onChange: (tags: IconOption[]) => void;
	fetchUrl: string;
	required?: boolean;
	errorMessage?: string;
	disabled?: boolean;
}

export default function IconTagSelector({
	label,
	placeholder = "Select icons...",
	value,
	onChange,
	fetchUrl,
	required = false,
	errorMessage = "At least one icon is required",
	disabled = false,
}: IconTagSelectorProps) {
	const [options, setOptions] = useState<IconOption[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [touched, setTouched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Fetch options from endpoint
	useEffect(() => {
		const fetchOptions = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await fetch(fetchUrl);
				if (!response.ok) throw new Error("Failed to fetch options");
				const data = await response.json();
				setOptions(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load options");
			} finally {
				setLoading(false);
			}
		};

		if (fetchUrl) {
			fetchOptions();
		}
	}, [fetchUrl]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setTouched(true);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const availableOptions = filteredOptions.filter(
		(option) => !value.some((v) => v.id === option.id)
	);

	const handleSelect = (option: IconOption) => {
		if (disabled) return;
		onChange([...value, option]);
		setSearchQuery("");
	};

	const removeTag = (optionId: string) => {
		if (disabled) return;
		onChange(value.filter((t) => t.id !== optionId));
	};

	const showError = required && touched && value.length === 0;

	return (
		<div className="w-full space-y-2" ref={dropdownRef}>
			<label className="text-sm font-medium text-gray-700">{label}</label>

			<div
				className={`relative flex flex-wrap items-center gap-2 px-3 py-2 rounded-md bg-gray-50 border ${
					showError ? "border-red-500" : "border-gray-300"
				} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
				onClick={() => !disabled && setIsOpen(true)}
			>
				{/* Selected Icons */}
				{value.map((tag) => (
					<span
						key={tag.id}
						className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 text-sm bg-white"
					>
						<img
							src={tag.iconUrl}
							alt={tag.label}
							className="w-5 h-5 object-contain"
						/>
						<span className="text-gray-700">{tag.label}</span>
						{!disabled && (
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									removeTag(tag.id);
								}}
								className="ml-1 text-gray-400 hover:text-red-500 font-bold"
							>
								×
							</button>
						)}
					</span>
				))}

				{/* Search Input */}
				{!disabled && (
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onFocus={() => setIsOpen(true)}
						placeholder={value.length === 0 ? placeholder : ""}
						className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px]"
						disabled={disabled}
					/>
				)}

				{/* Dropdown Arrow */}
				{!disabled && (
					<svg
						className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				)}
			</div>

			{/* Dropdown Menu */}
			{isOpen && !disabled && (
				<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
					{loading ?
						<div className="px-4 py-3 text-sm text-gray-500">
							Loading options...
						</div>
					: error ?
						<div className="px-4 py-3 text-sm text-red-500">{error}</div>
					: availableOptions.length === 0 ?
						<div className="px-4 py-3 text-sm text-gray-500">
							{searchQuery ? "No results found" : "No more options available"}
						</div>
					:	availableOptions.map((option) => (
							<button
								key={option.id}
								type="button"
								onClick={() => handleSelect(option)}
								className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
							>
								<img
									src={option.iconUrl}
									alt={option.label}
									className="w-6 h-6 object-contain"
								/>
								<span className="text-sm text-gray-700">{option.label}</span>
							</button>
						))
					}
				</div>
			)}

			{/* Error or Hint */}
			{showError ?
				<p className="text-xs text-red-500">{errorMessage}</p>
			: placeholder && !isOpen ?
				<p className="text-xs text-gray-500">{placeholder}</p>
			:	null}
		</div>
	);
}
