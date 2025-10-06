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
			errorMessage = "This field is required",
			...props
		},
		ref
	) => {
		const [touched, setTouched] = React.useState(false);

		const showError = required && touched && !props.value;

		return (
			<div className="w-full space-y-1">
				{label && (
					<label className="text-sm font-medium text-gray-700">{label}</label>
				)}

				<input
					type={type}
					ref={ref}
					required={required}
					onBlur={() => setTouched(true)}
					className={cn(
						"flex h-10 w-full rounded-md border px-3 py-2 text-base md:text-sm",
						"border-input bg-background ring-offset-background placeholder:text-muted-foreground",
						"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
						"disabled:cursor-not-allowed disabled:opacity-50",
						showError ? "border-red-500 focus-visible:ring-red-500" : "",
						className
					)}
					{...props}
				/>

				{showError && <p className="text-xs text-red-500">{errorMessage}</p>}
			</div>
		);
	}
);

Input.displayName = "Input";

export { Input };
