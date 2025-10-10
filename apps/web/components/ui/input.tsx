import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
	label?: string;
	required?: boolean;
	errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type = "text",
			label,
			required = false,
			errorMessage,
			onChange,
			value: propValue,
			defaultValue,
			...props
		},
		ref
	) => {
		const [touched, setTouched] = React.useState(false);
		const [internalValue, setInternalValue] = React.useState(
			propValue ?? defaultValue ?? ""
		);

		const id = React.useId();

		// If parent controls value, sync it
		React.useEffect(() => {
			if (propValue !== undefined) setInternalValue(propValue);
		}, [propValue]);

		const showError =
			required &&
			touched &&
			(String(internalValue).trim() === "" || internalValue === null);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let val = e.target.value;

			// Allow empty string for number type
			if (type === "number") {
				if (val === "") {
					setInternalValue("");
					onChange?.({
						...e,
						target: { ...e.target, value: "" },
					});
					return;
				}
				// Only update if numeric
				if (!isNaN(Number(val))) {
					setInternalValue(val);
					onChange?.({
						...e,
						target: { ...e.target, valueAsNumber: Number(val) },
					});
				}
			} else {
				setInternalValue(val);
				onChange?.(e);
			}
		};

		return (
			<div className="w-full space-y-1">
				{label && (
					<label
						htmlFor={id}
						className="text-sm font-medium text-gray-700 flex items-center gap-1"
					>
						{label}
						{required && <span className="text-red-500">*</span>}
					</label>
				)}

				<input
					id={id}
					ref={ref}
					type={type}
					required={required}
					onBlur={() => setTouched(true)}
					onWheel={(e) => e.currentTarget.blur()} // disable scroll number change
					value={internalValue}
					onChange={handleChange}
					inputMode={type === "number" ? "numeric" : undefined}
					className={cn(
						"flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm",
						"border-input bg-background ring-offset-background placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
						"disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150 ease-in-out",
						showError ? "border-red-500 focus-visible:ring-red-500" : "",
						className
					)}
					{...props}
				/>

				{showError && (
					<p className="text-xs text-red-500">
						{errorMessage ?? "This field is required"}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";

export { Input, type InputProps };
