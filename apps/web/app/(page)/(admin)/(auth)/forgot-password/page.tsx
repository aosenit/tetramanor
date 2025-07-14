"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import icon from "@/assets/passwordreset.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostData } from "@/hooks/useApi";

// ✅ Zod schema
const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { mutateAsync: postData, isPending: isLoading } = usePostData(
    "auth/forgot-password"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await postData({ email: data.email });

      toast.success(response?.data?.message || "Reset code sent to your email");
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
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
