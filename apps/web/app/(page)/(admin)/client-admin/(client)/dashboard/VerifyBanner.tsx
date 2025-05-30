import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function VerifyBanner() {
  return (
    <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-orange-100 rounded-full p-1.5">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
        </div>
        <p className="text-orange-800">
          Verify your identity to unlock full access to your account features.
        </p>
      </div>
      <Button className="bg-green-800 hover:bg-green-700 text-white">
        Start KYC
      </Button>
    </div>
  );
}
