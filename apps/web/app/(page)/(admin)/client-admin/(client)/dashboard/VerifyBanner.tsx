import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function VerifyBanner() {
  return (
    <div className="bg-[#EB8A43]/10 border border-orange-100 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-orange-100 rounded-full p-1.5">
          <AlertTriangle className="h-5 w-5 text-[#DD7226]" />
        </div>
        <p className="text-[#DD7226]">
          Verify your identity to unlock full access to your account features.
        </p>
      </div>
      <Button className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white min-w-[100px] rounded-sm">
        Start KYC
      </Button>
    </div>
  );
}
