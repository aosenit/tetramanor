import React, { Suspense } from "react";
import PropertyManagement from "./components/Properties";
import Loader from "@/components/Loader";

export default function Page() {
  return (
    <div className="">
      <Suspense fallback={<Loader />}>
        <PropertyManagement />
      </Suspense>
    </div>
  );
}
