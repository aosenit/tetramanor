import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
interface CustomDropdownProps {
	options: string[];
	value: string;
	onChange: (val: string) => void;
	disabled?: boolean;
	required?: boolean; 
	errorMessage?: string;
}

export default function CustomDropdown({
	options,
	value,
	onChange,
	disabled = false,
	required = false,
	errorMessage = "This field is required",
}: CustomDropdownProps) {
	const [open, setOpen] = useState(false);
	const [touched, setTouched] = useState(false);

	const showError = required && touched && !value;

	return (
		<div className="relative w-full">
			<button
				type="button"
				onBlur={() => setTouched(true)} 
				onClick={() => !disabled && setOpen((prev) => !prev)}
				className={`w-full bg-[#E5E5E7] text-sm px-3 py-3 rounded text-left flex items-center justify-between ${
					disabled ? "opacity-50 cursor-not-allowed" : ""
				} ${showError ? "border border-red-500" : ""}`}
				disabled={disabled}
			>
				<span>
					{value || <span className="text-gray-400">Select option</span>}
				</span>
				{open ?
					<ChevronUp className="w-4 h-4 text-gray-500" />
				:	<ChevronDown className="w-4 h-4 text-gray-500" />}
			</button>

			{open && !disabled && (
				<ul className="absolute z-10 mt-1 w-full bg-white shadow border border-gray-200 rounded">
					{options.map((option) => (
						<li
							key={option}
							onClick={() => {
								onChange(option);
								setOpen(false);
							}}
							className="px-3 py-3 hover:bg-gray-300 cursor-pointer text-sm text-[#181818]"
						>
							{option}
						</li>
					))}
				</ul>
			)}

			{showError && <p className="text-xs text-red-500 mt-1">{errorMessage}</p>}
		</div>
	);
}

