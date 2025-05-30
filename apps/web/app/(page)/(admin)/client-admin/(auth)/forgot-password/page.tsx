"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send a reset code to the email
    router.push("/client-admin/reset-password");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <Key className="h-6 w-6 text-gray-600" />
        </div>
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-700"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
