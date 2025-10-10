"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import icon from "@/assets/key.png";
import Image from "next/image";
import { usePostData } from "@/hooks/useApi";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const adminEmail = "super_admin@example.com";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const { mutateAsync: login, isPending } = usePostData("auth/login");
	const router = useRouter();

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Load saved credentials from localStorage on component mount
	useEffect(() => {
		const savedEmail = localStorage.getItem("rememberedEmail");
		const savedPassword = localStorage.getItem("rememberedPassword");

		if (savedEmail && savedPassword) {
			form.setValue("email", savedEmail);
			form.setValue("password", savedPassword);
			setRememberMe(true);
		}
	}, [form]);

	const onSubmit = async (data: LoginFormValues) => {
		try {
			// Trim email and password before sending
			const trimmedData = {
				email: data.email.trim(),
				password: data.password.trim(),
			};

			const response = await login(trimmedData);
			if (response) {
				const { token, ...user } = response.data;
				localStorage.setItem("token", token);
				localStorage.setItem("user", JSON.stringify(user));

				// Handle remember me functionality
				if (rememberMe) {
					localStorage.setItem("rememberedEmail", trimmedData.email);
					localStorage.setItem("rememberedPassword", trimmedData.password);
				} else {
					localStorage.removeItem("rememberedEmail");
					localStorage.removeItem("rememberedPassword");
				}

				if (user.email.trim() === adminEmail.trim()) {
					router.push("/main-admin");
				} else {
					router.push("/client-admin/dashboard");
				}
				toast.success(response.data.message || "Login successful");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="space-y-6 w-full">
			<div className="flex justify-center">
				<Image
					src={icon}
					alt="icon"
					className="h-[38px] w-[48px] text-gray-600"
					width={14}
					height={14}
				/>
			</div>

			<div className="text-center space-y-2">
				<h1 className="text-2xl font-bold">Welcome!</h1>
				<p className="text-gray-500">
					Seamless access to your real estate journey
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your email address"
										type="email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											{...field}
										/>
										<button
											type="button"
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ?
												<EyeOff className="h-4 w-4" />
											:	<Eye className="h-4 w-4" />}
										</button>
									</div>
								</FormControl>

								{/* remember me checkbox */}
								<FormControl>
									<div className="pt-2 flex gap-1 items-center">
										<Checkbox
											id="remember-me"
											checked={rememberMe}
											onCheckedChange={(checked) =>
												setRememberMe(checked as boolean)
											}
										/>
										<label htmlFor="remember-me" className="text-sm">
											Remember me
										</label>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="text-right">
						<Link
							href="/forgot-password"
							className="text-sm text-gray-600 hover:text-gray-900"
						>
							Forgot password?
						</Link>
					</div>

					<Button
						type="submit"
						className="w-full bg-[var(--primary-green)] hover:bg-green-700 rounded-sm text-white"
						disabled={isPending}
					>
						{isPending ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
