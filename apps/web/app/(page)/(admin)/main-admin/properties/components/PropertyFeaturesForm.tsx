"use client";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

interface TagInputGroupProps {
	label: string;
	placeholder?: string;
	value: any[];
	onChange: (tags: any[]) => void;
	required?: boolean;
	errorMessage?: string;
	disabled?: boolean; // ✅ added
}

export default function TagInputGroup({
	label,
	placeholder,
	value,
	onChange,
	required = false,
	errorMessage = "At least one tag is required",
	disabled = false,
}: TagInputGroupProps) {
	const [inputValue, setInputValue] = useState("");
	const [touched, setTouched] = useState(false);

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (disabled) return; // ✅ prevent typing if disabled
		if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
			e.preventDefault();
			const newTag = inputValue.trim();
			if (!value.includes(newTag)) {
				onChange([...value, newTag]);
				setInputValue("");
			}
		}
	};

	const removeTag = (tag: any) => {
		if (disabled) return;
		onChange(value.filter((t) => t !== tag));
	};

	const showError = required && touched && value.length === 0;

	return (
		<div className="w-full space-y-2">
			<label className="text-sm font-medium text-gray-700">{label}</label>

			<div
				className={`flex flex-wrap items-center gap-2 px-2 py-2 rounded-md bg-[#e5e5e7] ${
					showError ? "border border-red-500" : ""
				} ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
			>
				{value?.map((tag: any) => (
					<span
						key={tag?.id || tag}
						className="flex items-center px-3 py-1 rounded-full border border-gray-300 text-sm bg-white uppercase"
					>
						{tag.id &&
							(tag.icon === "" ?
								//  <img src={item.icon} alt={item.name} />
								<p className="text-green-600 font-semibold">{`TM  ${tag.name}`}</p>
							:	<div className="flex gap-2 items-center text-green-700">
									<img
										src={tag.icon}
										alt={tag.name}
										className="mr-2 h-7 w-7"
									/>
									<p>{tag.name}</p>
								</div>)}

						{!disabled && (
							<button
								type="button"
								onClick={() => removeTag(tag)}
								className="ml-2 text-gray-500 hover:text-red-500"
							>
								&times;
							</button>
						)}
					</span>
				))}

				{/* ✅ disable textarea when prop is true */}
				<textarea
					value={inputValue}
					onChange={(e) => !disabled && setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={() => setTouched(true)}
					rows={2}
					placeholder=""
					className="flex-1 resize-none bg-[#e5e5e7] py-2 border-none outline-none text-sm min-w-[100px]"
					disabled={disabled}
				/>
			</div>

			{/* Hint or error */}
			{showError ?
				<p className="text-xs text-red-500">{errorMessage}</p>
			:	placeholder && <p className="text-xs text-gray-500">{placeholder}</p>}
		</div>
	);
}
