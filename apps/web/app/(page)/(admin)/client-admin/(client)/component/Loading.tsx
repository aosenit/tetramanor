import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center flex-col  items-center h-full min-h-[10vh] gap-2">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  );
};

export default Loading;
