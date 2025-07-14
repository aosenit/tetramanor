"use client";

import { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import icon from "@/assets/passwordreset.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { usePostData } from "@/hooks/useApi";

function ResetCodePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const [codeError, setCodeError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const urlEmail = searchParams.get("email");

  const { mutateAsync: postData, isPending: isLoading } = usePostData(
    "auth/verify-reset-code"
  );

  const { mutate: resendCode, isPending: isResendingCode } = usePostData(
    "auth/forgot-password"
  );
  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Clear error when user starts typing
      if (codeError) {
        setCodeError("");
      }

      // Move to next input if current input is filled
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleResendCode = () => {
    resendCode(
      { email: urlEmail },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || "Code resent successfully");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateCode = () => {
    const codeString = code.join("");
    if (codeString.length !== 6) {
      setCodeError("Please enter the complete 6-digit code");
      return false;
    }
    if (!/^\d{6}$/.test(codeString)) {
      setCodeError("Code must contain only numbers");
      return false;
    }
    setCodeError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCode()) {
      return;
    }

    if (!urlEmail) {
      toast.error("Email not found. Please try again.");
      router.push("/forgot-password");
      return;
    }

    try {
      const codeString = code.join("");
      const response = await postData({
        email: urlEmail,
        code: codeString,
      });

      if (response) {
        toast.success(response?.data?.message || "Code verified successfully");
        router.push(`/new-password?code=${codeString}`);
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.message || "Invalid code. Please try again."
      );
    }
  };

  const getMaskedEmail = (urlEmail: string) => {
    if (!urlEmail) return "your email";
    const [username, domain] = urlEmail.split("@");
    if (username.length <= 2) return urlEmail;
    return `${username.substring(0, 1)}****${username.substring(username.length - 1)}@${domain}`;
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
        <h1 className="text-2xl font-bold">Password Reset</h1>
        <p className="text-gray-500">
          Enter the reset code sent to {getMaskedEmail(urlEmail)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el: HTMLInputElement | null): void => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`size-12 lg:size-14 text-center text-xl ${
                  codeError ? "border-red-500" : ""
                }`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                placeholder="*"
                required
              />
            ))}
          </div>
          {codeError && (
            <p className="text-red-500 text-sm text-center">{codeError}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || isResendingCode}
          className="w-full bg-[var(--primary-green)] hover:bg-green-700 rounded-sm text-white disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            "Continue"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResendCode}
            disabled={isResendingCode || isLoading}
            className="text-[var(--primary-green)] hover:text-green-700 font-medium"
          >
            {isResendingCode ? "Resending..." : "Resend code"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function ResetCodePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      }
    >
      <ResetCodePageContent />
    </Suspense>
  );
}
