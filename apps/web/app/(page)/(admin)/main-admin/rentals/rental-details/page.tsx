"use client";

import React, { Suspense } from "react";

import Details from "./components/Details";
import Loader from "@/components/Loader";

function RentalDetailsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <Details />
    </Suspense>
  );
}

export default RentalDetailsPage;
