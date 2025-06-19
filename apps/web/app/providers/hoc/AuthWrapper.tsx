"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.email) {
    // remove token and user from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // redirect to login page
    router.push("/login");
  }

  return children;
};

export default AuthWrapper;
