"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Mail className="h-6 w-6 text-gray-600" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Password Reset</h1>
        <p className="text-gray-500">
          Enter the reset code sent to j****e@gmail.com
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between gap-2">
          {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el: HTMLInputElement | null): void => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-14 h-14 text-center text-xl"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              required
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-700"
        >
          Continue
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          Didn&apos;t receive the code?{" "}
          <Link
            href="/client-admin/forgot-password"
            className="text-green-800 hover:text-green-700 font-medium"
          >
            Resend code
          </Link>
        </p>
      </div>
    </div>
  );
}
