import React, { Suspense } from "react";
import AddProperties from "../components/AddProperties";
import { Loader2 } from "lucide-react";

export default function page() {
  return (
    <div>
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
        <AddProperties />
      </Suspense>
    </div>
  );
}
