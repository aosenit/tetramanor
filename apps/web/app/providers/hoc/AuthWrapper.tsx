"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user?.email) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthWrapper;
