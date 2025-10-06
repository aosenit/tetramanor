"use client";

import React from "react";
import PhoneInput, {
	PhoneInputProps as BasePhoneInputProps,
} from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
interface CustomPhoneInputProps extends Omit<BasePhoneInputProps, "required"> {
	/** Optional field label */
	label?: string;
	/** Show a red asterisk when required */
	required?: boolean;
	/** Show an error message below */
	error?: string;
	/** Helper text */
	helperText?: string;
	/** Add custom class to outer wrapper */
	wrapperClassName?: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
	label,
	required,
	error,
	helperText,
	wrapperClassName = "",
	...props
}) => {
	return (
		<div className={`w-full ${wrapperClassName}`}>
			{label && (
				<label
					htmlFor={
						typeof props.inputProps === "string" ?
							props.inputProps
						:	"phone-input"
					}
					className="block mb-2 text-sm font-medium text-gray-700"
				>
					{label}
					{required && <span className=" ml-1">*</span>}
				</label>
			)}

			<PhoneInput
				country={"ng"}
				{...props}
				inputClass="!w-full !py-3 !px-3 !text-sm !bg-[#E5E5E7] !border-none !rounded-lg focus:!border-black focus:!ring-1 focus:!ring-black"
				buttonClass="!border !border-gray-300 !bg-white hover:!bg-gray-100 !z-0 !mr-4"
				containerClass="!w-full !flex !gap-3"
			/>

			{helperText && !error && (
				<p className="mt-1 text-xs text-gray-500">{helperText}</p>
			)}
			{error && <p className="mt-1 text-xs text-red-500">{error}</p>}
		</div>
	);
};

export default CustomPhoneInput;
{/* <PhoneInput
	country="ng"
	required
	value={formData.phone}
	onChange={(e) => handleInputChange("phone", e as string)}
	inputClass={`w-full border-none bg-[#E5E5E7] py-4 ${
		errors.phone ? "border-red-500" : ""
	}`}
	containerClass="!w-full"
	placeholder="Enter phone number"
/>; */}