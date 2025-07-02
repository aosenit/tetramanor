"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import icon from "@/assets/passwordreset.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { axiosInstance } from "@/services/axiosInstance";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("auth/forgot-password", {
        email: email,
      });

      if (response.data.success) {
        const { otp } = response.data.data;
        toast.success("Reset code sent to your email");
        router.push(
          `/reset-password?code=${otp}&email=${encodeURIComponent(email)}`
        );
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send reset code. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
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
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-gray-500">
          Please enter your email address to get your reset code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            className={emailError ? "border-red-500" : ""}
            required
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[var(--primary-green)] hover:bg-green-700 rounded-sm text-white disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </div>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  );
}
