"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import icon from "@/assets/passwordreset.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function ResetCodePage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if current input is filled
      if (value !== "" && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would verify the code here
    router.push("/client-admin/new-password");
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
          Enter the reset code sent to j****e@gmail.com
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              className="size-12 lg:size-14 text-center text-xl"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              placeholder="*"
              required
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full bg-[var(--primary-green)] hover:bg-green-700 rounded-sm text-white"
        >
          Continue
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Didn&apos;t receive the code?{" "}
          <Link
            href="/client-admin/forgot-password"
            className="text-[var(--primary-green)] hover:text-green-700 font-medium"
          >
            Resend code
          </Link>
        </p>
      </div>
    </div>
  );
}
